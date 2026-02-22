"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

type ToastType = "message" | "success" | "warning" | "error";

interface Toast {
  id: number;
  text: React.ReactNode;
  type: ToastType;
}

interface ToastContextType {
  message: (options: { text: React.ReactNode }) => void;
  success: (text: string) => void;
  warning: (text: string) => void;
  error: (text: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((text: React.ReactNode, type: ToastType) => {
    const id = toastIdCounter++;
    setToasts((prev) => [...prev, { id, text, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const message = useCallback(
    ({ text }: { text: React.ReactNode }) => addToast(text, "message"),
    [addToast],
  );
  const success = useCallback(
    (text: string) => addToast(text, "success"),
    [addToast],
  );
  const warning = useCallback(
    (text: string) => addToast(text, "warning"),
    [addToast],
  );
  const error = useCallback(
    (text: string) => addToast(text, "error"),
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ message, success, warning, error }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={clsx(
                "pointer-events-auto flex items-center justify-between gap-4 rounded-xl px-5 py-3.5 shadow-2xl border text-sm font-medium min-w-[300px] max-w-sm backdrop-blur-md",
                {
                  "bg-black/90 text-white border-white/10 dark:bg-[#1c1917] dark:text-gray-100":
                    toast.type === "message",
                  "bg-emerald-600/90 text-white border-emerald-500/20":
                    toast.type === "success",
                  "bg-amber-500/90 text-white border-amber-400/20":
                    toast.type === "warning",
                  "bg-red-600/90 text-white border-red-500/20":
                    toast.type === "error",
                },
              )}
            >
              <div className="flex-1">{toast.text}</div>
              <button
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
                className="opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z"
                  />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToasts must be used within a ToastProvider");
  }
  return context;
}
