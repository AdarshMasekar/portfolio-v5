"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

interface ExperienceItemProps {
  title: string;
  role: string;
  children: React.ReactNode;
  collapsible?: boolean;
  link?: string;
  collapsedHeight?: string;
}

export function ExperienceItem({
  title,
  role,
  children,
  collapsible = false,
  link,
  collapsedHeight = "max-h-20",
}: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group hover-shimmer relative rounded-[1rem] border border-foreground/10 p-6 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 avatar:hover:border-amber-500/50 avatar:hover:shadow-amber-500/10">
      <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-baseline">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground text-lg">{title}</span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-foreground/50 underline underline-offset-2 hover:text-foreground transition-colors"
            >
              link <ArrowRight className="h-3 w-3 -rotate-45" />
            </a>
          )}
        </div>
        <span className="text-sm text-foreground/60">{role}</span>
      </div>

      <div
        className={`relative max-w-xl text-sm leading-relaxed text-foreground/70 transition-all duration-300 ${!isExpanded && collapsible ? `${collapsedHeight} overflow-hidden` : ""}`}
      >
        {children}
        {collapsible && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      {collapsible && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-1 text-xs font-medium text-foreground/50 hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <>
              View Less <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              View More <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
