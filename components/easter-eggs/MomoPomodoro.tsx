"use client";

import { motion } from "framer-motion";

export function MomoPomodoro() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="inline-flex ml-2 text-foreground/40 hover:text-foreground/80 transition-colors"
      title="Momo wants a snack."
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Huge ears */}
        <path d="M9,10 L3,2 L7,10 Z" fill="currentColor" opacity="0.8" />
        <path d="M15,10 L21,2 L17,10 Z" fill="currentColor" opacity="0.8" />
        {/* Momo Head */}
        <circle cx="12" cy="12" r="5" fill="currentColor" />
        {/* Eyes */}
        <circle cx="10" cy="11" r="2" fill="var(--background)" />
        <circle cx="14" cy="11" r="2" fill="var(--background)" />
        <circle cx="10" cy="11" r="1" fill="currentColor" />
        <circle cx="14" cy="11" r="1" fill="currentColor" />
        {/* Nose */}
        <circle cx="12" cy="14" r="0.5" fill="var(--background)" />
        {/* Body */}
        <path
          d="M9,15 C7,18 8,22 12,22 C16,22 17,18 15,15 Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
}
