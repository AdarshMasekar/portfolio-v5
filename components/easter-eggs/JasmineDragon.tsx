"use client";

import { motion } from "framer-motion";

export function JasmineDragon() {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center justify-center ml-2 text-emerald-600 dark:text-emerald-400 align-text-bottom cursor-help transition-transform hover:scale-110"
      title="A cup of tea is always a good idea."
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,7 C20,7 21,7 21.5,7.5 C22,8 22,9 21.5,9.5 C21,10 20,10 20,10 L20,7 Z M18,5 L6,5 C4.9,5 4,5.9 4,7 L4,11 C4,14.3 6.7,17 10,17 L14,17 C17.3,17 20,14.3 20,11 L20,5 L18,5 Z M10,19 L14,19 C15.1,19 16,19.9 16,21 C16,21.6 15.6,22 15,22 L9,22 C8.4,22 8,21.6 8,21 C8,19.9 8.9,19 10,19 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M8,2 C8,2 7,3 7,4 C7,5 8,6 8,6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="opacity-40 animate-pulse"
        />
        <path
          d="M12,1 C12,1 11,2 11,3 C11,4 12,5 12,5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="opacity-40 animate-pulse"
          style={{ animationDelay: "200ms" }}
        />
        <path
          d="M16,2 C16,2 15,3 15,4 C15,5 16,6 16,6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          className="opacity-40 animate-pulse"
          style={{ animationDelay: "400ms" }}
        />
      </svg>
    </motion.span>
  );
}
