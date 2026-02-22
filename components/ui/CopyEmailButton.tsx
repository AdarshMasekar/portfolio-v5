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
        "group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-background/55 px-6 py-2.5 font-medium text-foreground transition-all duration-300 hover:bg-background/40 hover:border-foreground/25 hover:-translate-y-0.5 active:scale-95",
        copied && "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
      )}
    >
      <Mail
        className={cn(
          "h-4 w-4 transition-colors",
          copied ? "text-emerald-500" : "text-foreground",
        )}
      />
      <span>{copied ? "Copied to clipboard!" : email}</span>
      <div className="ml-2 relative flex h-4 w-4 items-center justify-center">
        <Check
          className={cn(
            "absolute h-4 w-4 transition-all duration-300",
            copied ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
        <Copy
          className={cn(
            "absolute h-4 w-4 transition-all duration-300",
            copied
              ? "scale-50 opacity-0"
              : "scale-100 opacity-100 text-foreground/50 group-hover:text-foreground",
          )}
        />
      </div>
    </button>
  );
}
