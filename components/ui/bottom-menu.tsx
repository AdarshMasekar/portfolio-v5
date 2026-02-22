"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { JSX } from "react";

export interface MenuBarItem {
  icon?: React.ElementType;
  element?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  isDivider?: boolean;
}

interface MenuBarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  items: MenuBarItem[];
}

const springConfig = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

export function MenuBar({ items, className, ...props }: MenuBarProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState({
    left: 0,
    width: 0,
  });
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeIndex !== null && menuRef.current && tooltipRef.current) {
      const menuItem = menuRef.current.children[activeIndex] as HTMLElement;
      const menuRect = menuRef.current.getBoundingClientRect();
      const itemRect = menuItem.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const left =
        itemRect.left -
        menuRect.left +
        (itemRect.width - tooltipRect.width) / 2;

      setTooltipPosition({
        left: Math.max(0, Math.min(left, menuRect.width - tooltipRect.width)),
        width: tooltipRect.width,
      });
    }
  }, [activeIndex]);

  return (
    <div className={cn("relative", className)} {...props}>
      <AnimatePresence>
        {activeIndex !== null && items[activeIndex]?.label && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={springConfig}
            className="absolute left-0 right-0 -top-[38px] pointer-events-none z-50"
          >
            <motion.div
              ref={tooltipRef}
              className={cn(
                "h-7 px-3 rounded-full inline-flex justify-center items-center overflow-hidden",
                "bg-background/95 backdrop-blur",
                "border border-border/20",
                "shadow-[0_0_0_1px_rgba(0,0,0,0.08)]",
                "dark:border-border/20 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
              )}
              initial={{ x: tooltipPosition.left }}
              animate={{ x: tooltipPosition.left }}
              transition={springConfig}
              style={{ width: "auto" }}
            >
              <p className="text-[13px] font-medium leading-tight whitespace-nowrap text-foreground avatar:text-amber-500">
                {items[activeIndex].label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={menuRef}
        className={cn(
          "h-12 px-3 inline-flex justify-center items-center gap-[6px] overflow-hidden z-10",
          "rounded-full bg-background/40 backdrop-blur-xl backdrop-saturate-[1.8]",
          "border border-white/10 dark:border-white/5",
          "shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all hover:bg-background/60",
        )}
      >
        {items.map((item, index) => {
          if (item.isDivider) {
            return (
              <div
                key={index}
                className="h-6 w-px bg-foreground/10 mx-1"
                onMouseEnter={() => setActiveIndex(null)}
              />
            );
          }

          const content = item.element ? (
            item.element
          ) : (
            <>
              <div className="flex justify-center items-center text-foreground/70 transition-colors group-hover:scale-110 group-hover:text-foreground avatar:group-hover:text-amber-500">
                {item.icon && <item.icon className="h-5 w-5" />}
              </div>
              <span className="sr-only">{item.label}</span>
            </>
          );

          if (item.href) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-8 w-8 rounded-full flex justify-center items-center transition-colors hover:bg-foreground/5 dark:hover:bg-foreground/10 avatar:hover:bg-amber-500/10"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {content}
              </a>
            );
          }

          const Element = item.element ? "div" : "button";

          return (
            <Element
              key={index}
              onClick={item.onClick}
              className={cn(
                "group flex rounded-full justify-center items-center transition-colors",
                item.element
                  ? ""
                  : "h-8 w-8 hover:bg-foreground/5 dark:hover:bg-foreground/10 avatar:hover:bg-amber-500/10",
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {content}
            </Element>
          );
        })}
      </div>
    </div>
  );
}
