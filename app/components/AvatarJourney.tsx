"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// Accurate ATLA Element SVGs (Based on standard "Symbol" grid)
const WaterSvg = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="50" cy="50" r="45" />
    <path d="M 20 40 Q 35 25 50 40 T 80 40" />
    <path d="M 15 55 Q 35 40 50 55 T 85 55" />
    <path d="M 22 70 Q 35 55 50 70 T 78 70" />
    <circle cx="50" cy="20" r="5" fill="currentColor" />
  </svg>
);

const EarthSvg = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeMiterlimit="10"
  >
    <path d="M 30 15 L 70 15 L 85 64 L 15 64 Z" />
    <path d="M 50 45 A 5 5 0 1 1 45 50 A 10 10 0 1 1 60 45" />
    <line x1="15" y1="76" x2="40" y2="76" />
    <line x1="60" y1="76" x2="85" y2="76" />
    <line x1="15" y1="90" x2="40" y2="90" />
    <line x1="60" y1="90" x2="85" y2="90" />
  </svg>
);

const FireSvg = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Central tall flame and outer structure */}
    <path d="M 50 90 C 15 90 10 50 25 40 C 35 55 40 55 50 20 C 60 55 65 55 75 40 C 90 50 85 90 50 90 Z" />
    {/* Inner flame spiral representing the core of Fire Nation symbol */}
    <path d="M 40 75 C 40 65 50 60 60 65 C 70 75 60 85 50 85 C 40 85 35 75 40 65 C 45 55 55 60 55 70" />
  </svg>
);

const AirSvg = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Top left curl */}
    <path d="M 42 35 C 35 25 20 25 20 40 C 20 55 35 55 35 45 C 35 40 28 40 28 45" />
    {/* Top right curl */}
    <path d="M 58 35 C 65 25 80 25 80 40 C 80 55 65 55 65 45 C 65 40 72 40 72 45" />
    {/* Bottom curl */}
    <path d="M 40 55 C 30 65 40 85 55 85 C 70 85 70 65 55 65 C 45 65 50 75 55 75" />
  </svg>
);

// Ordered: Air -> Water -> Earth -> Fire (Aang's chronological journey to mastery)
const nations = [
  {
    name: "Air Nomads",
    element: "Air",
    phase: "The Boy in the Iceberg",
    SvgComponent: AirSvg,
    iconColor: "text-amber-400",
    shimmerColor: "rgb(251,191,36)",
    phaseColor: "text-amber-500",
    description:
      "Raised by the monks of the Southern Air Temple. A master of evasion and agility, learning to move like the wind before the world needed him.",
  },
  {
    name: "Water Tribe",
    element: "Water",
    phase: "Push and Pull",
    SvgComponent: WaterSvg,
    iconColor: "text-blue-500",
    shimmerColor: "rgb(59,130,246)",
    phaseColor: "text-blue-600 dark:text-blue-400",
    description:
      "Journeying to the Northern Water Tribe to master the fluid and adaptable nature of water, learning that strength comes from turning defense into offense.",
  },
  {
    name: "Earth Kingdom",
    element: "Earth",
    phase: "Substance & Neutral Jing",
    SvgComponent: EarthSvg,
    iconColor: "text-emerald-500",
    shimmerColor: "rgb(16,185,129)",
    phaseColor: "text-emerald-600 dark:text-emerald-400",
    description:
      "Confronting the immovable forces of the Earth Kingdom. Training with Toph to stand his ground, listen to the earth, and attack with unyielding substance.",
  },
  {
    name: "Fire Nation",
    element: "Fire",
    phase: "Energy & Life",
    SvgComponent: FireSvg,
    iconColor: "text-red-500",
    shimmerColor: "rgb(239,68,68)",
    phaseColor: "text-red-500 dark:text-red-400",
    description:
      "Moving past the fear of destruction. Learning from the Sun Warriors and Zuko that true fire is not about anger, but the pure animating energy of life itself.",
  },
];

function NationCard({
  nation,
  index,
}: {
  nation: (typeof nations)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: "easeOut" }}
      className="relative rounded-xl overflow-hidden group transition-all duration-300 shadow-sm border border-slate-200 dark:border-white/5 hover:border-transparent dark:hover:border-transparent bg-slate-200 dark:bg-white/5 p-[1.5px]"
    >
      {/* Rotating Shimmer Border Glow (visible on hover) */}
      <div className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <motion.div
          className="w-full h-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 42%, ${nation.shimmerColor} 50%, transparent 58%, transparent 100%)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Inner Card bounding the background to reveal only the shimmer edges inside the padding */}
      <div className="relative w-full h-full z-10 rounded-[10px] bg-white dark:bg-[#121212] transition-colors p-5 overflow-hidden">
        {/* Large background elemental watermark */}
        <motion.div
          className={`absolute -right-8 -top-8 w-40 h-40 opacity-[0.03] dark:opacity-[0.06] pointer-events-none ${nation.iconColor}`}
          animate={{
            rotate: 0,
            scale: 1,
          }}
          whileHover={{
            rotate: 15,
            scale: 1.1,
            transition: { duration: 0.6, ease: "easeOut" },
          }}
        >
          <nation.SvgComponent className="w-full h-full" />
        </motion.div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 dark:bg-black/40 ${nation.iconColor}`}
            >
              <nation.SvgComponent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                {nation.name}
              </h4>
            </div>
          </div>

          <p className={`text-xs font-medium mb-2 ${nation.phaseColor}`}>
            {nation.phase}
          </p>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-zinc-400">
            {nation.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function AvatarJourney() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mt-8 mb-4 relative z-20"
    >
      <div className="rounded-3xl border border-amber-500/10 bg-slate-50/50 dark:bg-background/80 backdrop-blur-3xl p-6 shadow-[0_0_80px_rgba(251,191,36,0.06)]">
        {/* Header */}
        <div className="mb-6 flex items-center justify-center sm:justify-start gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-500 bg-amber-500/10 dark:bg-black/20 shadow-inner"
          >
            {/* Air Nation rotating logo */}
            <AirSvg className="w-5 h-5 ml-[1px] mt-[1px]" />
          </motion.div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-amber-400/90">
              The Avatar&apos;s Journey
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-foreground/40 mt-0.5 font-medium">
              A story told in elements
            </p>
          </div>
        </div>

        {/* Nations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {nations.map((nation, i) => (
            <NationCard key={nation.name} nation={nation} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
