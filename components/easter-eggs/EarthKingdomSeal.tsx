"use client";

import { motion } from "framer-motion";

export function EarthKingdomSeal({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`relative flex items-center justify-center ${className}`}
      title="The Earth Kingdom"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#10b981] drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
      >
        <g
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* Trapezoid */}
          <path d="M 22 55 L 35 20 L 65 20 L 78 55 Z" />

          {/* Spiral / Swirl Inside */}
          <path
            d="M 50 45 C 55 45 55 35 48 35 C 40 35 40 45 48 50 C 56 50 60 45 60 40"
            strokeWidth="6"
          />

          {/* Upper row of broken lines */}
          <line x1="22" y1="72" x2="43" y2="72" />
          <line x1="57" y1="72" x2="78" y2="72" />

          {/* Lower row of broken lines */}
          <line x1="22" y1="88" x2="43" y2="88" />
          <line x1="57" y1="88" x2="78" y2="88" />
        </g>
      </svg>
    </motion.div>
  );
}
