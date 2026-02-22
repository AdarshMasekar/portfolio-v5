"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Lerp factor: higher = snappier, lower = more floaty (0.08–0.18 feels nice)
const LERP = 0.12;
const CIRCLE_D = 8; // px

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Raw target from scroll events (jumps instantly)
  const targetPos = useRef(0);
  // Smoothed display position driven by rAF
  const currentPos = useRef(0);

  // React state only for what needs a re-render (the visual position + visibility)
  const [displayPos, setDisplayPos] = useState(0);
  const [visible, setVisible] = useState(false);

  const rafRef = useRef<number | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dragging
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartFrac = useRef(0);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getScrollFraction = useCallback(() => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    return maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
  }, []);

  const scrollToFraction = useCallback((f: number) => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.round(f * maxScroll) });
  }, []);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setVisible(false), 1800);
  }, []);

  const revealScrollbar = useCallback(() => {
    setVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  // ── rAF loop: smoothly lerp currentPos → targetPos ────────────────────────
  const startRaf = useCallback(() => {
    if (rafRef.current !== null) return; // already running

    const tick = () => {
      const diff = Math.abs(targetPos.current - currentPos.current);

      if (diff < 0.0003) {
        // Close enough — stop the loop
        currentPos.current = targetPos.current;
        setDisplayPos(targetPos.current);
        rafRef.current = null;
        return;
      }

      currentPos.current = lerp(currentPos.current, targetPos.current, LERP);
      setDisplayPos(currentPos.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Sync target on scroll ─────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      targetPos.current = getScrollFraction();
      if (!isDragging.current) {
        startRaf();
        revealScrollbar();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [getScrollFraction, startRaf, revealScrollbar]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // ── Mouse drag ────────────────────────────────────────────────────────────
  const onThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragStartFrac.current = getScrollFraction();
      setVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      document.body.style.userSelect = "none";
    },
    [getScrollFraction],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      const trackH = trackRef.current.clientHeight;
      const delta = (e.clientY - dragStartY.current) / trackH;
      const frac = Math.min(1, Math.max(0, dragStartFrac.current + delta));
      // During drag: snap immediately (no lerp lag feels better)
      targetPos.current = frac;
      currentPos.current = frac;
      setDisplayPos(frac);
      scrollToFraction(frac);
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.userSelect = "";
      scheduleHide();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [scrollToFraction, scheduleHide]);

  // ── Click on track ────────────────────────────────────────────────────────
  const onTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      if ((e.target as HTMLElement).closest("[data-scrollbar-thumb]")) return;
      const rect = trackRef.current.getBoundingClientRect();
      const frac = Math.min(
        1,
        Math.max(0, (e.clientY - rect.top) / rect.height),
      );
      scrollToFraction(frac);
      revealScrollbar();
    },
    [scrollToFraction, revealScrollbar],
  );

  // ── Touch drag ────────────────────────────────────────────────────────────
  const touchStartY = useRef(0);
  const touchStartFrac = useRef(0);

  const onThumbTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartFrac.current = getScrollFraction();
      setVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    },
    [getScrollFraction],
  );

  const onThumbTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!trackRef.current) return;
      const trackH = trackRef.current.clientHeight;
      const delta = (e.touches[0].clientY - touchStartY.current) / trackH;
      const frac = Math.min(1, Math.max(0, touchStartFrac.current + delta));
      targetPos.current = frac;
      currentPos.current = frac;
      setDisplayPos(frac);
      scrollToFraction(frac);
    },
    [scrollToFraction],
  );

  return (
    <div
      role="scrollbar"
      aria-controls="main-content"
      aria-valuenow={Math.round(displayPos * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-orientation="vertical"
      onClick={onTrackClick}
      style={{
        position: "fixed",
        right: "18px",
        top: "12%",
        bottom: "12%",
        width: "16px",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: visible ? "auto" : "none",
        cursor: "pointer",
      }}
    >
      {/* Track */}
      <div
        ref={trackRef}
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          transform: "translateX(-50%)",
          background: "var(--foreground)",
          opacity: 0.15,
          borderRadius: "1px",
        }}
      />

      {/* Thumb circle — no CSS transition, rAF drives it */}
      <div
        data-scrollbar-thumb
        onMouseDown={onThumbMouseDown}
        onTouchStart={onThumbTouchStart}
        onTouchMove={onThumbTouchMove}
        style={{
          position: "absolute",
          left: "50%",
          top: `calc(${displayPos * 100}% - ${CIRCLE_D / 2}px)`,
          width: `${CIRCLE_D}px`,
          height: `${CIRCLE_D}px`,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "var(--foreground)",
          cursor: "grab",
        }}
      />
    </div>
  );
}
