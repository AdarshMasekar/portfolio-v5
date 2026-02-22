"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock, Music, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAvatarState } from "@/components/providers/AvatarStateProvider";
import { MomoPomodoro } from "@/components/easter-eggs/MomoPomodoro";

interface FocusToolsProps {
  className?: string;
}

export function FocusTools({ className = "" }: FocusToolsProps) {
  const [activeTab, setActiveTab] = useState<"pomodoro" | "lofi">("pomodoro");
  const { isAvatarState } = useAvatarState();

  return (
    <div
      className={`rounded-2xl border border-foreground/10 bg-background/55 h-24 ${className} data-[avatar-mode=true]:bg-[var(--color-air-bg)] transition-all duration-500`}
      data-avatar-mode={isAvatarState}
    >
      {/* Tab Headers */}
      <div className="flex items-center gap-1 p-2 bg-background/55 rounded-t-lg border-b border-foreground/10 data-[avatar-mode=true]:bg-[var(--color-air-bg)] transition-colors">
        <button
          onClick={() => setActiveTab("pomodoro")}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
            activeTab === "pomodoro"
              ? "bg-background text-foreground shadow-sm"
              : "text-foreground/60 hover:text-foreground/80"
          }`}
        >
          <Clock size={10} />
          Pomodoro
          {isAvatarState && <MomoPomodoro />}
        </button>
        <button
          onClick={() => setActiveTab("lofi")}
          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
            activeTab === "lofi"
              ? "bg-background text-foreground shadow-sm"
              : "text-foreground/60 hover:text-foreground/80"
          }`}
        >
          <Music size={10} />
          Lofi
        </button>
      </div>

      {/* Tab Content */}
      <div className="h-12 overflow-hidden flex items-center bg-background/55">
        <AnimatePresence mode="wait">
          {activeTab === "pomodoro" ? (
            <motion.div
              key="pomodoro"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full px-3"
            >
              <PomodoroContent />
            </motion.div>
          ) : (
            <motion.div
              key="lofi"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full px-3"
            >
              <LofiContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PomodoroContent() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    if (completed) {
      audio = new Audio("/jingle.mp3");
      audio.loop = true;
      audio.play().catch((e) => console.error("Audio play failed:", e));
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [completed]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setCompleted(true);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    if (completed) {
      setCompleted(false);
      setTimeLeft(mode === "work" ? workDuration * 60 : breakDuration * 60);
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setCompleted(false);
    setTimeLeft(mode === "work" ? workDuration * 60 : breakDuration * 60);
  };

  const switchMode = (newMode: "work" | "break") => {
    setIsActive(false);
    setCompleted(false);
    setMode(newMode);
    setTimeLeft(newMode === "work" ? workDuration * 60 : breakDuration * 60);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Timer Display */}
      <div className="flex items-center gap-3">
        <div className="text-lg font-bold text-foreground">
          {formatTime(timeLeft)}
        </div>
        <div className="text-xs text-foreground/60">
          {mode === "work" ? "Work" : "Break"}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTimer}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 transition-all hover:bg-foreground/20 hover:scale-105 active:scale-95"
          aria-label={isActive ? "Pause" : "Start"}
        >
          {isActive ? (
            <Pause size={12} className="text-foreground" />
          ) : (
            <Play size={12} className="text-foreground ml-0.5" />
          )}
        </button>

        <button
          onClick={resetTimer}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 transition-all hover:bg-foreground/20 hover:scale-105 active:scale-95"
          aria-label="Reset"
        >
          <RotateCcw size={12} className="text-foreground" />
        </button>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 border-l border-foreground/20 pl-2">
          <button
            onClick={() => switchMode("work")}
            className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all ${
              mode === "work"
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground/80"
            }`}
          >
            W
          </button>
          <button
            onClick={() => switchMode("break")}
            className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all ${
              mode === "break"
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:text-foreground/80"
            }`}
          >
            B
          </button>
        </div>
      </div>
    </div>
  );
}

function LofiContent() {
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [lofiVolume, setLofiVolume] = useState(0.5);
  const lofiRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (lofiRef.current) {
      lofiRef.current.volume = lofiVolume;
    }
  }, [lofiVolume]);

  useEffect(() => {
    return () => {
      if (lofiRef.current) {
        lofiRef.current.pause();
        lofiRef.current = null;
      }
    };
  }, []);

  const toggleLofi = () => {
    if (!lofiRef.current) {
      lofiRef.current = new Audio("/lofi.mp3");
      lofiRef.current.loop = true;
      lofiRef.current.volume = lofiVolume;
    }

    if (isLofiPlaying) {
      lofiRef.current.pause();
    } else {
      lofiRef.current
        .play()
        .catch((e) => console.error("Lofi play failed:", e));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Left Side - Status and Title */}
      <div>
        <div className="text-xs font-medium text-foreground">Focus Music</div>
      </div>

      {/* Right Side - Controls */}
      <div className="flex items-center gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={toggleLofi}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 transition-all duration-300 hover:bg-foreground/20 hover:scale-105 active:scale-95 border border-foreground/20"
          aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
        >
          {isLofiPlaying ? (
            <Pause size={12} className="text-foreground" fill="currentColor" />
          ) : (
            <Play
              size={12}
              className="text-foreground ml-0.5"
              fill="currentColor"
            />
          )}
        </button>

        {/* Volume Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLofiVolume(Math.max(0, lofiVolume - 0.1))}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 transition-all hover:bg-foreground/20 hover:scale-105 active:scale-95"
            aria-label="Decrease volume"
          >
            <span className="text-xs text-foreground/60">−</span>
          </button>

          <button
            onClick={() => setLofiVolume(Math.min(1, lofiVolume + 0.1))}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 transition-all hover:bg-foreground/20 hover:scale-105 active:scale-95"
            aria-label="Increase volume"
          >
            <span className="text-xs text-foreground/60">+</span>
          </button>
        </div>

        {/* Volume Percentage */}
        <div className="text-xs text-foreground/60 font-medium">
          {Math.round(lofiVolume * 100)}%
        </div>

        {/* Volume Slider (shown when playing) */}
        <AnimatePresence>
          {isLofiPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 60 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1"
            >
              <Volume2 size={8} className="text-foreground/50" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={lofiVolume}
                onChange={(e) => setLofiVolume(parseFloat(e.target.value))}
                className="w-12 h-[1px] cursor-pointer appearance-none rounded-full bg-foreground/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-1 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-1 [&::-moz-range-thumb]:w-1 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground hover:[&::-moz-range-thumb]:scale-110 transition-all"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
