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
import { ExperienceItem } from "./components/ExperienceItem";
import { TechStack } from "./components/TechStack";
import { ResumeButton } from "./components/ResumeButton";
import { SiLeetcode } from "react-icons/si";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

import { PomodoroTimer } from "./components/PomodoroTimer";
import { getMarkdownContent } from "./data/content";

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

  return (
    <div
      className={`relative flex min-h-screen flex-col items-center bg-background px-3 pt-16 text-foreground selection:bg-foreground/20 pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300`}
    >
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            {/* Bluish Aura Edge Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            {/* Twinkling Stars Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
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
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Profile Image - Easter Egg Trigger */}
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="group relative mb-2 h-40 w-40 grayscale filter sm:h-56 sm:w-56 overflow-hidden cursor-pointer transition-all duration-500 hover:grayscale-0 active:scale-95"
              aria-label="Toggle Aura Mode"
            >
              <Image
                src="/me.png" // User's photo
                alt="Profile"
                fill
                className={`object-contain transition-all duration-700 ${showEasterEgg ? "grayscale-0 scale-105" : "grayscale"}`}
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/60 to-transparent backdrop-blur-[1px]" />

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] rounded-full pointer-events-none" />
            </button>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl cursor-default">
              Adarsh Masekar
            </h1>

            {/* Resume Button */}
            <div className="mb-4">
              <ResumeButton />
            </div>

            {/* Phonetic Pronunciation (Aesthetic touch often found in minimal portfolios) */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-foreground/70 sm:text-sm">
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
                  <div className="space-y-4">
                    <p>
                      - Built full-stack MERN portal to automate error log
                      analysis for support teams, integrating file uploads, API
                      integrations, and real-time diagnostics.
                    </p>
                    <p>
                      - Integrated Grok API and local LLM models to parse Java
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
                  <div className="space-y-4">
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
                Skills
              </h2>
              <div className="space-y-4">
                <p className="text-foreground/70 text-sm leading-relaxed">
                  <strong className="text-foreground">
                    Product Support & Troubleshooting:
                  </strong>{" "}
                  Production Debugging, Root Cause Analysis (RCA), Log Analysis,
                  Incident Management, SLA Monitoring
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  <strong className="text-foreground">
                    DevOps & Support Tools:
                  </strong>{" "}
                  Jira, Git, Jenkins, Linux/Unix, Bash Scripting
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  <strong className="text-foreground">
                    Automation & Testing:
                  </strong>{" "}
                  Selenium, Appium, API Testing, Postman
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  <strong className="text-foreground">
                    Frontend & Integrations:
                  </strong>{" "}
                  React.js, JavaScript, HTML5, CSS3
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  <strong className="text-foreground">
                    Backend & Databases:
                  </strong>{" "}
                  Java, MySQL, Python, Node.js, Express.js, REST APIs
                </p>
              </div>
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
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-foreground/70">
                  Connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/adarsh-masekar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4 hover:text-foreground/70"
                  >
                    LinkedIn
                  </a>{" "}
                  or shoot an{" "}
                  <a
                    href="mailto:adarshmasekar@gmail.com"
                    className="text-foreground underline underline-offset-4 hover:text-foreground/70"
                  >
                    email
                  </a>
                </p>
              </div>
            </div>

            {/* Pomodoro Timer Section */}
            <PomodoroTimer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-foreground/10 bg-background/70 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-background/90 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-foreground/10 p-1 transition-colors duration-200 ease-in-out hover:bg-foreground/20 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
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
        <button
          onClick={() => setShowQR(true)}
          className="text-foreground/70 hover:text-foreground transition-colors hover:scale-110"
          aria-label="Show QR Code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-foreground/10" />
        <a
          href="https://github.com/adarshmasekar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-foreground transition-colors hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/adarsh-masekar/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-foreground transition-colors hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://leetcode.com/u/adarshmasekar/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 hover:text-foreground transition-colors hover:scale-110"
        >
          <SiLeetcode className="h-5 w-5" />
        </a>
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
