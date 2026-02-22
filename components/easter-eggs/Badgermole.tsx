"use client";

import { motion } from "framer-motion";

export function Badgermole() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: [20, 0, 0, 20],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 8,
        times: [0, 0.2, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 15,
      }}
      className="absolute -top-12 right-10 z-10 text-amber-900/40 dark:text-amber-700/60 pointer-events-none"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12,2 C9,2 6.5,4 6,7 C4,7 3,8.5 3,10.5 C3,12 3.5,13 4,14 L3,16 L5,16 C5.5,18 7.5,19 10,19 L14,19 C16.5,19 18.5,18 19,16 L21,16 L20,14 C20.5,13 21,12 21,10.5 C21,8.5 20,7 18,7 C17.5,4 15,2 12,2 Z"
          opacity="0.8"
        />
        <path
          d="M7,10 A2,2 0 1,1 11,10"
          stroke="var(--background)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M13,10 A2,2 0 1,1 17,10"
          stroke="var(--background)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="12" cy="14" r="1.5" fill="var(--background)" />
        <path
          d="M7,19 Q12,23 17,19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
