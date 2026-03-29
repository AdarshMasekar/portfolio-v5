"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GithubGraph() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="min-h-[165px] w-full" aria-hidden="true" />;



  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
      <motion.div
        className="flex min-w-max justify-center text-xs px-4"
        initial={false}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <GitHubCalendar
          username="AdarshMasekar"
          colorScheme={theme === "dark" ? "dark" : "light"}
          blockSize={9}
          blockMargin={3}
          fontSize={12}
        />
      </motion.div>
    </div>
  );
}
