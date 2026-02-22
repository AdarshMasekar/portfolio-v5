"use client";

import Image from "next/image";
import {
  Github,
  Linkedin,
  Bot,
  User,
  QrCode,
  X,
  Music,
  Pause,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import { ExperienceItem } from "@/components/ExperienceItem";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { LinkedInButton } from "@/components/ui/LinkedInButton";
import { MenuBar, MenuBarItem } from "@/components/ui/bottom-menu";
import { SiLeetcode } from "react-icons/si";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResumeButton } from "@/components/ResumeButton";
import { getMarkdownContent } from "@/lib/data/content";

// Dynamically imported heavy components
const TechStack = dynamic(
  () => import("@/components/TechStack").then((mod) => mod.TechStack),
  { ssr: true },
);
const PomodoroTimer = dynamic(
  () => import("@/components/PomodoroTimer").then((mod) => mod.PomodoroTimer),
  { ssr: false },
);
const GithubGraph = dynamic(
  () => import("@/components/GithubGraph").then((mod) => mod.GithubGraph),
  { ssr: true },
);
const AvatarJourney = dynamic(
  () => import("@/components/AvatarJourney").then((mod) => mod.AvatarJourney),
  { ssr: false },
);
const ATLAQuote = dynamic(
  () => import("@/components/ATLAQuote").then((mod) => mod.ATLAQuote),
  { ssr: false },
);

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);

  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [lofiVolume, setLofiVolume] = useState(1);
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

  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  const menuItems: MenuBarItem[] = [
    {
      label: `Switch to ${mode === "human" ? "agent" : "human"} mode`,
      element: (
        <div className="flex items-center mx-[2px]">
          <button
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-foreground/10 p-1 transition-colors duration-200 ease-in-out hover:bg-foreground/20 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-background shadow-sm transition duration-200 ease-in-out ${
                mode === "agent" ? "translate-x-5" : "translate-x-0"
              }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-foreground" />
              ) : (
                <Bot className="h-3 w-3 text-foreground" />
              )}
            </div>
          </button>
        </div>
      ),
      onClick: () => setMode(mode === "human" ? "agent" : "human"),
    },
    {
      label: "QR Code",
      icon: QrCode,
      onClick: () => setShowQR(true),
    },
    {
      isDivider: true,
    },
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com/adarshmasekar",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/adarsh-masekar/",
    },
    {
      label: "LeetCode",
      icon: SiLeetcode,
      href: "https://leetcode.com/u/adarshmasekar/",
    },
  ];

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center bg-background px-3 pt-8 text-foreground selection:bg-foreground/20 pb-16 sm:px-4 sm:pt-12 sm:pb-20 overflow-x-hidden transition-colors duration-300`}
    >
      {/* Avatar State Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            {/* Outer warm amber edge glow — Air Nomad orange */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="fixed inset-0 z-[100] pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 0 120px rgba(251,191,36,0.18), inset 0 0 60px rgba(251,191,36,0.10)",
              }}
            />

            {/* Twinkling Stars — ATLA element palette */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => {
                const elementColors = [
                  "rgba(147,197,253,0.9)",
                  "rgba(253,186,116,0.9)",
                  "rgba(110,231,183,0.9)",
                  "rgba(251,191,36,0.9)",
                ];
                const color = elementColors[i % 4];
                return (
                  <motion.div
                    key={i}
                    className="absolute h-[2px] w-[2px] rounded-full"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      background: color,
                      boxShadow: `0 0 4px 1px ${color}`,
                    }}
                    animate={{
                      opacity: [0.1, 1, 0.1],
                      scale: [0.6, 1.4, 0.6],
                    }}
                    transition={{
                      duration: pos.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: pos.delay,
                    }}
                  />
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground antialiased"
              style={{
                fontFamily:
                  '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace',
              }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center relative z-10"
          >
            {/* Background Animations */}
            <BackgroundBeams className="fixed -z-10" />

            {/* Profile Image - Easter Egg Trigger */}
            <div className="relative mb-2 group flex items-center justify-center">
              {/* Diffused Airbender Amber Glow */}
              <div className="absolute inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none bg-amber-500/30 blur-[30px] scale-110" />

              <button
                onClick={() => setShowEasterEgg(!showEasterEgg)}
                className="relative h-40 w-40 sm:h-56 sm:w-56 cursor-pointer transition-all duration-500 grayscale filter group-hover:grayscale-0 active:scale-95 drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                }}
                aria-label="Toggle Aura Mode"
              >
                <Image
                  src="/me1.png" // User's photo
                  alt="Profile"
                  fill
                  className={`object-contain transition-all duration-700 scale-100`}
                  priority
                />
              </button>
            </div>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl cursor-default">
              Adarsh Masekar
            </h1>

            {/* Resume Button */}
            <div className="mb-4">
              <ResumeButton />
            </div>

            {/* Phonetic Pronunciation (Aesthetic touch often found in minimal portfolios) */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-foreground/70 sm:text-sm">
              <span>/ˈædɑːrš məˈseɪkər/</span>
              <span className="text-foreground/20">•</span>
              <span>noun</span>
              <span className="text-foreground/20">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">
                    {time || "00:00:00"}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider sm:text-xs">
                    IST
                  </span>
                </div>

                <span className="text-foreground/20">•</span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-tight text-foreground/50">
                    lofi
                  </span>
                  <button
                    onClick={toggleLofi}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-all hover:bg-foreground/10 text-gray-400 hover:text-foreground"
                    aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
                  >
                    {isLofiPlaying ? (
                      <Pause size={10} fill="currentColor" />
                    ) : (
                      <Music size={10} />
                    )}
                  </button>
                  <AnimatePresence>
                    {isLofiPlaying && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 40, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex h-5 items-center overflow-hidden"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={lofiVolume}
                          onChange={(e) =>
                            setLofiVolume(parseFloat(e.target.value))
                          }
                          className="h-[2px] w-8 cursor-pointer appearance-none rounded-full bg-foreground/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground/50 hover:[&::-webkit-slider-thumb]:bg-foreground [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground/50 hover:[&::-moz-range-thumb]:bg-foreground transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mb-16 mt-8 w-full space-y-4 text-left text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
              <p>
                Product Support Engineer with 2+ years in Enterprise B2B SaaS,
                specializing in solving complex engineering-level issues and
                delivering technical solutions using Java, Python, JavaScript,
                SQL, and CI/CD integrations while maintaining 95%+ SLA adherence
                through Root Cause Analysis and automation.
              </p>
            </div>

            {/* Experience Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Experience
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Qualitia Software"
                  role="Product Support Engineer (L2) | Pune, India (Remote)"
                  collapsible={true}
                >
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground/70 text-sm mb-4">
                      January 2025 – Present
                    </p>
                    <p>
                      - Resolved 300+ Tier 2/3 technical issues through
                      code-level debugging of Selenium and Appium frameworks,
                      maintaining 95%+ SLA adherence and reducing overall
                      resolution time by 35%.
                    </p>
                    <p>
                      - Engineered custom Java integration module for IBM DB2
                      within 36 hours, implementing JDBC connectivity layer with
                      connection pooling to retain critical accounts and enable
                      seamless database operations.
                    </p>
                    <p>
                      - Architected 50+ technical knowledge base articles with
                      code samples, achieving 40% increase in self-service
                      deflection and 20% faster customer onboarding.
                    </p>
                    <p>
                      - Mentored 3 junior engineers and trained 30+ QA testers
                      on product architecture and troubleshooting methodologies,
                      reducing team ramp-up time by 40%.
                    </p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Tech Mahindra"
                  role="Associate Software Engineer | Bengaluru, India"
                  collapsible={true}
                >
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground/70 text-sm mb-4">
                      December 2023 – December 2024
                    </p>
                    <p>
                      - Provided L1/L2 production support for enterprise loan
                      platform processing 5,000+ daily transactions, performing
                      code-level debugging in Java/Spring Boot microservices and
                      reducing incident response time by 25%.
                    </p>
                    <p>
                      - Conducted comprehensive Root Cause Analysis on
                      production defects with stack trace analysis and code
                      references, enabling development teams to implement
                      permanent fixes 30% faster.
                    </p>
                    <p>
                      - Optimized database performance through SQL query
                      analysis, indexing strategies, and join refactoring,
                      reducing loan processing time by 20% during peak periods.
                    </p>
                    <p>
                      - Executed API testing across 50+ RESTful endpoints using
                      Postman, creating automated test collections with JSON
                      validation to ensure data integrity across microservices.
                    </p>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Projects
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="AI-Powered Log Analysis Portal"
                  role="MongoDB, Express.js, React.js, Node.js, LLM | 2025"
                  collapsible={true}
                >
                  <div className="space-y-4 pt-2">
                    <p>
                      - Built full-stack MERN portal to automate error log
                      analysis for support teams, integrating file uploads, API
                      integrations, and real-time diagnostics.
                    </p>
                    <p>
                      - Integrated Groq API and local LLM models to parse Java
                      stack traces and error patterns, targeting 40% deflection
                      in L1 support tickets.
                    </p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Product Enhancement: In-House Code Editor"
                  role="Java, Eclipse RCP | 2025"
                  collapsible={true}
                >
                  <div className="space-y-4 pt-2">
                    <p>
                      - Analyzed 20+ escalation tickets to propose in-house code
                      editor solution, creating technical specifications
                      projected to reduce setup-related tickets by 30%.
                    </p>
                    <p>
                      - Researched Eclipse RCP and IDE frameworks, presenting
                      feasibility analysis and implementation roadmap to product
                      engineering team.
                    </p>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Education
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Visvesvaraya Technological University"
                  role="Bachelor of Engineering in Computer Science"
                >
                  <p className="text-foreground/70">
                    Graduated: 2023 | CGPA: 8.6/10
                  </p>
                </ExperienceItem>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                GitHub Contributions
              </h2>
              <p className="mb-8 text-md text-foreground/70">
                Here&apos;s a snapshot of my activity and contributions across
                various projects:
              </p>
              <GithubGraph />
            </div>

            {/* Tech Stack Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Tech Stack
              </h2>
              <p className="mb-8 text-lg text-foreground/70">
                I&apos;ve worked with these core technologies throughout my
                support and engineering engagements:
              </p>
              <TechStack />
            </div>

            {/* Get in Touch Section */}
            <section
              className="mb-16 w-full text-left"
              aria-labelledby="contact-heading"
            >
              <h2
                id="contact-heading"
                className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70"
              >
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="mb-8 text-md text-foreground/70 max-w-xl">
                  I'm currently looking for new opportunities. Whether you have
                  a question, a potential project, or just want to say hi, I'll
                  try my best to get back to you!
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <CopyEmailButton email="adarshmasekar@gmail.com" />
                  <LinkedInButton url="https://www.linkedin.com/in/adarsh-masekar/" />
                </div>
              </div>
            </section>

            {/* Pomodoro Timer Section */}
            <PomodoroTimer />

            {/* Avatar Journey and Quotes — visible only in Avatar State */}
            <AnimatePresence>
              {showEasterEgg && (
                <>
                  <AvatarJourney />
                  <ATLAQuote />
                </>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Liquid Glass Island Navbar */}
      <nav
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center"
        aria-label="Main Navigation"
      >
        <MenuBar items={menuItems} />
      </nav>

      {/* QR Code Modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative rounded-2xl border border-foreground/10 bg-background p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute -right-3 -top-3 rounded-full bg-foreground p-2 text-background transition-transform hover:scale-110"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="rounded-lg bg-white p-2">
              <QRCodeSVG
                value="https://adarshmasekar.vercel.app/"
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
