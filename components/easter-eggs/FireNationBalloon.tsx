"use client";

import { motion } from "framer-motion";

interface FireNationBalloonProps {
  className?: string;
  isCentered?: boolean;
}

export function FireNationBalloon({
  className,
  isCentered,
}: FireNationBalloonProps) {
  return (
    <motion.div
      initial={
        isCentered ? { opacity: 0, scale: 0.8 } : { opacity: 0, x: -80, y: 50 }
      }
      animate={
        isCentered
          ? { opacity: 1, scale: 1, y: [0, -10, 0] }
          : { opacity: 1, x: 0, y: [0, -10, 0] }
      }
      transition={{
        opacity: { duration: 1 },
        x: { duration: 1, ease: "easeOut" },
        scale: { duration: 1, ease: "easeOut" },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
      className={
        isCentered
          ? `relative z-10 pointer-events-none drop-shadow-xl opacity-90 mix-blend-multiply dark:mix-blend-normal ${className || ""}`
          : `absolute right-6 -top-24 z-10 pointer-events-none drop-shadow-xl opacity-90 mix-blend-multiply dark:mix-blend-normal ${className || ""}`
      }
      title="The Mechanist's War Balloon"
    >
      <svg
        width="140"
        height="140"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform -scale-x-100" // To face left/inward
      >
        <defs>
          <linearGradient id="balloonRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c54631" />
            <stop offset="60%" stopColor="#9c3220" />
            <stop offset="100%" stopColor="#5f1d11" />
          </linearGradient>
          <linearGradient id="metalDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#414141" />
            <stop offset="100%" stopColor="#222222" />
          </linearGradient>
        </defs>

        {/* Back Fin/Sail (Right side since we scale-x-100) */}
        <path
          d="M 100 40 L 140 35 L 120 70 L 105 55 Z"
          fill="url(#balloonRed)"
          stroke="#222"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M 100 40 L 140 35 M 140 35 L 120 70 M 120 70 L 105 55"
          stroke="#222"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Sail frame / structural strut pointing out */}
        <path
          d="M 100 38 L 145 33"
          stroke="#222"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 105 55 L 125 75"
          stroke="#222"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Main Balloon Envelope (Oval shape with slightly pointed bottom) */}
        <path
          d="M 60 20 C 100 20 120 40 110 70 C 100 90 70 100 60 100 C 30 100 10 90 10 70 C 0 40 30 20 60 20 Z"
          fill="url(#balloonRed)"
          stroke="#222"
          strokeWidth="3"
        />

        {/* Vertical/Curved structural seams */}
        <path
          d="M 60 20 C 40 35 40 85 60 100"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M 60 20 C 80 35 80 85 60 100"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M 30 35 C 20 50 20 70 30 85"
          fill="none"
          stroke="#222"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M 90 35 C 100 50 100 70 90 85"
          fill="none"
          stroke="#222"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Horizontal Seams */}
        <path
          d="M 15 50 C 30 55 90 55 105 50"
          fill="none"
          stroke="#222"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M 12 75 C 30 80 90 80 108 75"
          fill="none"
          stroke="#222"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Top Cap/Valve */}
        <rect
          x="52"
          y="14"
          width="16"
          height="6"
          fill="url(#metalDark)"
          stroke="#222"
          strokeWidth="1.5"
        />
        <rect
          x="56"
          y="10"
          width="8"
          height="4"
          fill="url(#metalDark)"
          stroke="#222"
          strokeWidth="1"
        />
        <line x1="60" y1="5" x2="60" y2="10" stroke="#222" strokeWidth="2" />

        {/* Center Fire Nation Emblem (Classic Black/Dark Brown Flame) */}
        <g transform="translate(60, 58) scale(0.6)">
          <path
            d="M 0 -30 C -15 -10 -25 10 -15 25 C -5 40 20 40 25 25 C 28 15 20 15 15 20 C 10 25 -5 15 -2 -5 C -2 -5 5 15 20 5 C 30 -5 10 -20 0 -30 Z"
            fill="#222222"
          />
        </g>

        {/* Base Ring / Burner section attached to balloon */}
        <rect
          x="40"
          y="100"
          width="40"
          height="8"
          rx="2"
          fill="url(#metalDark)"
          stroke="#222"
          strokeWidth="2"
        />
        <path
          d="M 45 108 L 50 115 L 70 115 L 75 108 Z"
          fill="#333"
          stroke="#222"
          strokeWidth="1.5"
        />

        {/* Ropes / Metal struts holding the basket */}
        <line x1="42" y1="108" x2="42" y2="135" stroke="#222" strokeWidth="2" />
        <line x1="78" y1="108" x2="78" y2="135" stroke="#222" strokeWidth="2" />
        <line x1="60" y1="115" x2="60" y2="135" stroke="#222" strokeWidth="2" />

        {/* The Basket (Dark Metal Cage structure) */}
        {/* Back wall of basket */}
        <path
          d="M 38 135 L 82 135 L 75 150 L 45 150 Z"
          fill="#4a3e35"
          stroke="#222"
          strokeWidth="1.5"
        />

        {/* Basket railing/frame */}
        <path
          d="M 35 130 L 85 130 L 75 152 L 45 152 Z"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line x1="38" y1="135" x2="82" y2="135" stroke="#222" strokeWidth="2" />
        <line x1="41" y1="143" x2="79" y2="143" stroke="#222" strokeWidth="2" />

        {/* Basket vertical bars */}
        <line x1="45" y1="130" x2="48" y2="151" stroke="#222" strokeWidth="2" />
        <line x1="55" y1="130" x2="57" y2="152" stroke="#222" strokeWidth="2" />
        <line x1="65" y1="130" x2="63" y2="152" stroke="#222" strokeWidth="2" />
        <line x1="75" y1="130" x2="72" y2="151" stroke="#222" strokeWidth="2" />

        {/* Little Propeller at back of basket (Right side due to flip) */}
        <line x1="85" y1="140" x2="95" y2="140" stroke="#222" strokeWidth="2" />
        <line x1="95" y1="130" x2="95" y2="150" stroke="#222" strokeWidth="2" />
        <rect x="94" y="128" width="2" height="4" fill="#222" />
        <rect x="94" y="148" width="2" height="4" fill="#222" />

        {/* Animated Burner Flame visible inside structure */}
        <motion.path
          d="M 60 115 Q 55 105 60 95 Q 65 105 60 115"
          fill="#facc15"
          animate={{
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.8, 1, 0.7, 1, 0.8],
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
          style={{ transformOrigin: "60px 115px" }}
        />
        <motion.path
          d="M 60 115 Q 57 108 60 102 Q 63 108 60 115"
          fill="#f97316"
          animate={{ scaleY: [1, 1.3, 0.8, 1.2, 1] }}
          transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
          style={{ transformOrigin: "60px 115px" }}
        />
      </svg>
    </motion.div>
  );
}
