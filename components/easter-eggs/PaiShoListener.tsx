"use client";

import { useEffect, useState } from "react";
import { useAvatarState } from "@/components/providers/AvatarStateProvider";
import { AnimatePresence, motion } from "framer-motion";
import { EarthKingdomSeal } from "./EarthKingdomSeal";

const SECRET_CODE = ["t", "o", "p", "h"];

export function PaiShoListener() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const { toggleAvatarState, isAvatarState } = useAvatarState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when user is typing in inputs or textareas
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-SECRET_CODE.length);

        // Check if the sequence matches
        if (newSequence.join("") === SECRET_CODE.join("")) {
          setShowSecret(true);

          if (!isAvatarState) {
            toggleAvatarState();
          }

          // Hide the secret after 5 seconds
          setTimeout(() => setShowSecret(false), 5000);
          return []; // Reset sequence after finding it
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAvatarState, toggleAvatarState]);

  return (
    <AnimatePresence>
      {showSecret && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm pointer-events-none"
        >
          <div className="flex flex-col items-center gap-6">
            <EarthKingdomSeal className="w-48 h-48 drop-shadow-2xl text-emerald-500" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-emerald-500 font-medium tracking-widest uppercase text-center"
            >
              <p className="text-xl">Congratulations!</p>
              <p className="text-sm mt-2 opacity-80">
                You found the greatest earthbender.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
