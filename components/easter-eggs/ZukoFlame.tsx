"use client";

import { motion } from "framer-motion";

export function ZukoFlame() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center justify-center ml-2 text-rose-500 dark:text-rose-400 align-text-bottom cursor-help transition-transform hover:scale-125 hover:-rotate-12"
      title="Honor restored."
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6,2.2 C11.8,1.9 12.3,1.9 12.5,2.2 C14.2,5 17,7.2 18.2,10.5 C19.5,13.8 18.5,17.5 15.5,19.6 C12.5,21.7 8.5,21.5 5.8,19 C3.1,16.5 2.8,12.2 5.5,9.5 C5.8,9.2 6.2,9.2 6.5,9.5 C7.5,10.6 8,12 8.5,13.5 C8.8,14 9.5,14 9.8,13.5 C10.6,11.5 10.6,9.2 11.6,2.2 Z"
          fill="currentColor"
        />
        <path
          d="M12.5,8 C13.5,10 14,12 14.2,14 C14.5,16 13,18 11.5,18 C10,18 9,16.5 9,15 C9,13.5 10.5,12 11.5,10 C11.8,9.5 12.3,8.5 12.5,8 Z"
          fill="rgba(255,255,255,0.4)"
        />
      </svg>
    </motion.span>
  );
}
