"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAvatarState } from "@/components/providers/AvatarStateProvider";
import { FireNationBalloon } from "@/components/easter-eggs/FireNationBalloon";

export const Component = () => {
  const { isAvatarState } = useAvatarState();

  return (
    <div
      data-avatar-mode={isAvatarState}
      className="relative flex min-h-screen flex-col items-center justify-center bg-background px-3 pt-8 text-foreground selection:bg-foreground/20
      data-[avatar-mode=true]:selection:bg-amber-500/30 data-[avatar-mode=true]:selection:text-amber-500
      pb-16 sm:px-4 sm:pt-12 sm:pb-20 overflow-x-hidden transition-colors duration-300"
    >
      {/* Background Beams for consistency */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </div>

      {/* Avatar State Effects */}
      {isAvatarState && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 120px rgba(249,115,22,0.18), inset 0 0 60px rgba(249,115,22,0.05)",
            }}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center text-center relative z-10 px-4">
        <FireNationBalloon isCentered={true} />
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mt-0 cursor-default">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-medium text-foreground/80 mt-2">
          Page Not Found
        </h2>
        <p className="text-sm sm:text-base text-foreground/60 mt-4 max-w-md">
          Sorry, the page you are looking for could not be found or has been
          moved.
        </p>
        <Link
          href="/"
          className="group flex items-center space-x-2 bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 hover:border-foreground/20 text-foreground px-6 py-3 mt-12 rounded-full transition-all duration-300 relative z-10"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform group-hover:-translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="font-medium tracking-wide">Return Home</span>
        </Link>
      </div>
    </div>
  );
};
