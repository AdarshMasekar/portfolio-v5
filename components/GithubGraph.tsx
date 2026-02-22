"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAvatarState } from "@/components/providers/AvatarStateProvider";
import { motion } from "framer-motion";

export function GithubGraph() {
  const { theme } = useTheme();
  const { isAvatarState } = useAvatarState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const airTheme = {
    light: ["#fffbeb", "#fde68a", "#fbbf24", "#d97706", "#b45309"],
    dark: ["#451a03", "#b45309", "#d97706", "#fbbf24", "#fde68a"],
  };

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
          theme={isAvatarState ? airTheme : undefined}
          blockSize={9}
          blockMargin={3}
          fontSize={12}
        />
      </motion.div>
    </div>
  );
}
