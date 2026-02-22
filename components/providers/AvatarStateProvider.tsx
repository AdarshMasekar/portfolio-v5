"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useToasts } from "@/components/toast";

interface AvatarStateContextType {
  isAvatarState: boolean;
  toggleAvatarState: () => void;
}

const AvatarStateContext = createContext<AvatarStateContextType | undefined>(
  undefined,
);

export function AvatarStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAvatarState, setIsAvatarState] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toasts = useToasts();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("avatarState");
    if (stored === "true") {
      setIsAvatarState(true);
      document.documentElement.setAttribute("data-avatar-state", "true");
    }
  }, []);

  const toggleAvatarState = () => {
    const newState = !isAvatarState;
    setIsAvatarState(newState);
    if (newState) {
      document.documentElement.setAttribute("data-avatar-state", "true");
      localStorage.setItem("avatarState", "true");
      setTimeout(() => {
        toasts.message({
          text: "Avatar State unlocked. The four nations now guide this journey.",
        });
      }, 100);
    } else {
      document.documentElement.removeAttribute("data-avatar-state");
      localStorage.setItem("avatarState", "false");
    }
  };

  return (
    <AvatarStateContext.Provider value={{ isAvatarState, toggleAvatarState }}>
      {children}
    </AvatarStateContext.Provider>
  );
}

export function useAvatarState() {
  const context = useContext(AvatarStateContext);
  if (context === undefined) {
    throw new Error(
      "useAvatarState must be used within an AvatarStateProvider",
    );
  }
  return context;
}
