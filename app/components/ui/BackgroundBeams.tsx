"use client";
import { cn } from "@/app/utils/cn";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 h-full w-full overflow-hidden bg-background pointer-events-none",
        className,
      )}
    >
      {/* Subtle ambient depth — neutral/cool tones only */}
      <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2">
        {/* Primary depth blob */}
        <div
          className="absolute inset-0 rounded-full blur-[140px] animate-pulse
            bg-gradient-to-tr from-slate-200/25 to-zinc-200/20
            dark:from-slate-800/40 dark:to-zinc-800/30"
          style={{ animationDuration: "8s" }}
        />
        {/* Secondary depth blob */}
        <div
          className="absolute right-0 bottom-0 rounded-full blur-[120px] animate-pulse w-[35rem] h-[35rem]
            bg-gradient-to-tl from-gray-200/15 to-neutral-200/10
            dark:from-slate-700/25 dark:to-zinc-700/20"
          style={{ animationDuration: "11s", animationDelay: "2s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0
          bg-[linear-gradient(to_right,#80808014_1px,transparent_1px),linear-gradient(to_bottom,#80808014_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)]
          bg-[size:24px_24px]
          [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
      />
    </div>
  );
};
