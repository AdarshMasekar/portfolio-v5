"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Component = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-background px-3 pt-8 text-foreground selection:bg-foreground/20
      pb-16 sm:px-4 sm:pt-12 sm:pb-20 overflow-x-hidden transition-colors duration-300"
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
      </div>

      <div className="flex flex-col items-center justify-center text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground cursor-default">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-foreground/80">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-foreground/60 max-w-md">
            Sorry, the page you are looking for could not be found or has been
            moved.
          </p>
          <Link
            href="/"
            className="group flex items-center space-x-2 bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 hover:border-foreground/20 text-foreground px-6 py-3 mt-8 rounded-full transition-all duration-300 relative z-10"
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
        </motion.div>
      </div>
    </div>
  );
};
