"use client";

import { motion } from "framer-motion";

export function WhiteLotusSeal({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 45 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`relative flex items-center justify-center ${className}`}
      title="The Order of the White Lotus"
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20 hover:opacity-100 transition-opacity duration-1000 cursor-help"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="#fef08a"
          stroke="#b45309"
          strokeWidth="2"
          opacity="0.1"
        />

        {/* Outer Petals */}
        <path
          d="M50,10 C60,30 70,30 90,50 C70,70 60,70 50,90 C40,70 30,70 10,50 C30,30 40,30 50,10 Z"
          fill="#fef08a"
          stroke="#b45309"
          strokeWidth="2"
        />

        {/* Inner Petals */}
        <path
          d="M50,25 C55,35 60,40 75,50 C60,60 55,65 50,75 C45,65 40,60 25,50 C40,40 45,35 50,25 Z"
          fill="#b45309"
        />

        {/* Center dot */}
        <circle cx="50" cy="50" r="6" fill="#fef08a" />
      </svg>
    </motion.div>
  );
}
