"use client";

import { Linkedin, ArrowUpRight } from "lucide-react";

export function LinkedInButton({
  url = "https://www.linkedin.com/in/adarsh-masekar/",
}: {
  url?: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-foreground/5 px-6 py-2.5 font-medium text-foreground transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/25 hover:-translate-y-0.5 active:scale-95"
    >
      <Linkedin className="h-4 w-4 transition-colors duration-300" />
      <span>LinkedIn</span>
      <div className="ml-1 relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <ArrowUpRight className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-4 group-hover:translate-x-4" />
        <ArrowUpRight className="absolute h-4 w-4 translate-y-4 -translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:translate-x-0" />
      </div>
    </a>
  );
}
