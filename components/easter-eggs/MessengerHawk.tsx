"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function MessengerHawk() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 30 }}
      animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.8 },
        x: { duration: 0.8, ease: "easeOut" },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute right-6 -top-12 z-10 pointer-events-none drop-shadow-2xl"
      title="A message from the Fire Nation!"
    >
      <Image
        src="/images/hawky.png"
        alt="Hawky the Messenger Hawk"
        width={100}
        height={100}
        className="object-contain"
        priority
      />
    </motion.div>
  );
}
