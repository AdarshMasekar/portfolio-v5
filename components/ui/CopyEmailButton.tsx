"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmailButton({
  email = "adarshmasekar@gmail.com",
}: {
  email?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-background/55 px-6 py-2.5 font-medium text-foreground transition-all duration-300 hover:bg-background/40 hover:border-foreground/25 hover:-translate-y-0.5 active:scale-95 avatar:hover:border-amber-500/40 avatar:hover:text-amber-500",
        copied && "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
      )}
    >
      <Mail
        className={cn(
          "h-4 w-4 transition-all duration-300 group-hover:scale-110",
          copied
            ? "text-emerald-500 scale-110"
            : "text-foreground avatar:group-hover:text-amber-500",
          "group-hover:-rotate-6",
        )}
      />
      <span>{copied ? "Copied to clipboard!" : email}</span>
      <div className="ml-2 relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <Check
          className={cn(
            "absolute h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            copied ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        />
        <Copy
          className={cn(
            "absolute h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            copied
              ? "-translate-y-4 opacity-0"
              : "text-foreground/50 group-hover:text-foreground avatar:group-hover:text-amber-500 group-hover:-translate-y-4 group-hover:translate-x-4",
          )}
        />
        <Copy
          className={cn(
            "absolute h-4 w-4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-4 -translate-x-4",
            copied
              ? "opacity-0"
              : "text-foreground/50 group-hover:text-foreground avatar:group-hover:text-amber-500 group-hover:translate-y-0 group-hover:translate-x-0",
          )}
        />
      </div>
    </button>
  );
}
