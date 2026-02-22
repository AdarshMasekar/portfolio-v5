"use client";

import Image from "next/image";
import {
  Github,
  Linkedin,
  Bot,
  User,
  QrCode,
  X,
  FileText,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

import { BackgroundBeams } from '@/components/ui/BackgroundBeams'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'
import { ExperienceItem } from '@/components/ExperienceItem'
import { FocusTools } from '@/components/FocusTools'
import { LinkedInButton } from '@/components/ui/LinkedInButton'
import { MenuBar, MenuBarItem } from "@/components/ui/bottom-menu";
import { SiLeetcode } from "react-icons/si";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getMarkdownContent } from "@/lib/data/content";

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    
    if (isInView) {
      motionValue.set(value);
    }
    
    return () => unsubscribe();
  }, [isInView, motionValue, springValue, value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-2xl font-bold text-foreground sm:text-3xl"
    >
      {displayValue}{suffix}
    </motion.div>
  );
}

// Dynamically imported heavy components
const TechStack = dynamic(
  () => import("@/components/TechStack").then((mod) => mod.TechStack),
  { ssr: true },
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
      label: "Download Resume",
      icon: FileText,
      href: "/Adarsh Masekar - PSE.pdf",
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
      data-avatar-mode={showEasterEgg}
      className={`relative flex min-h-screen flex-col items-center bg-background px-3 pt-8 text-foreground selection:bg-foreground/20
      data-[avatar-mode=true]:selection:bg-amber-500/30 data-[avatar-mode=true]:selection:text-amber-500
      pb-16 sm:px-4 sm:pt-12 sm:pb-20 overflow-x-hidden transition-colors duration-300`}
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
                  sizes="(max-width: 640px) 160px, 224px"
                  className={`object-contain transition-all duration-700 scale-100`}
                  priority
                />
              </button>
            </div>

            {/* Hero Text */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-7xl cursor-default">
                Adarsh Masekar
              </h1>
              <h2 className="text-xl font-medium text-foreground/80 sm:text-2xl">
                Product Support Engineer
              </h2>
              <p className="mt-2 text-sm text-foreground/60 sm:text-base">
                Enterprise B2B SaaS · L2/L3 Support · JavaScript · Java · SQL · Ticketing · RCA · SRE mindset
              </p>
            </div>

            {/* Summary Highlights */}
            <div className="mb-16 w-full">
              <div className="rounded-2xl border border-foreground/10 bg-background/55 p-4 sm:p-6">
                <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-foreground/70">
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center">
                    <AnimatedCounter value={2} suffix="+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">Years Experience</div>
                    <div className="text-xs text-foreground/50">Enterprise B2B SaaS</div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter value={300} suffix="+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">L2/L3 Issues</div>
                    <div className="text-xs text-foreground/50">Code-Level Debugging</div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter value={50} suffix="+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">Knowledge Base</div>
                    <div className="text-xs text-foreground/50">Self-Service usage +40%</div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter value={95} suffix="%+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">SLA Adherence</div>
                    <div className="text-xs text-foreground/50">Resolution Time -35%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16 mt-4 w-full space-y-4 text-left text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
              <p>
                Product Support Engineer with 2+ years in Enterprise B2B SaaS,
                specializing in solving complex engineering-level issues and
                delivering technical solutions using Java, Python, JavaScript,
                SQL, and CI/CD integrations while maintaining 95%+ SLA adherence
                through Root Cause Analysis and automation.
              </p>
            </div>

            {/* Scroll Hint for Easter Egg */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full flex justify-center mb-16 overflow-hidden"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="flex flex-col items-center gap-2 text-amber-500/80"
                  >
                    <span className="text-sm font-semibold tracking-widest uppercase">
                      The Avatar&apos;s Journey Awaits Below
                    </span>
                    <svg
                      className="w-5 h-5 animate-bounce"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Experience Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Experience
              </h2>
              <div className="space-y-8">
                <ExperienceItem
                  title="Qualitia Software"
                  role="Product Support Engineer (L2) | Pune, India (Remote)"
                  collapsible={true}
                >
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground/70 text-sm mb-4">
                      January 2025 – Present
                    </p>
                    <p className="text-sm text-foreground/80 mb-4 italic">
                      Own L2/L3 support for enterprise test automation platform, handling escalations, RCA, and customer-facing fixes for global B2B clients.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Reduced incident resolution time by 35%</strong> by debugging Selenium/Appium automation and optimizing test scripts across 300+ L2/L3 issues using Java and Python for enterprise customers.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Engineered custom Java integration module for IBM DB2</strong> within 36 hours, implementing JDBC connectivity layer with connection pooling to retain critical accounts for enterprise stakeholders.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Architected 50+ technical knowledge base articles</strong> with code samples, achieving 40% increase in self-service deflection and 20% faster customer onboarding for QA and product teams.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Mentored 3 junior engineers</strong> and trained 30+ QA testers on product architecture and troubleshooting methodologies, reducing team ramp-up time by 40% for customer success.</span>
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-foreground/10">
                      <p className="text-xs text-foreground/50">
                        <strong>Keywords:</strong> Java, Spring Boot, REST APIs, SQL, RCA, Selenium, Appium, CI/CD
                      </p>
                      <p className="text-xs text-foreground/50 mt-1">
                        <strong>Ticketing:</strong> Jira, internal tools (L1–L3 escalations)
                      </p>
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Tech Mahindra"
                  role="Associate Software Engineer | Bengaluru, India"
                  collapsible={true}
                >
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground/70 text-sm mb-4">
                      December 2023 – December 2024
                    </p>
                    <p className="text-sm text-foreground/80 mb-4 italic">
                      Provided L1/L2 production support and incident triage for enterprise loan platform performing basic troubleshooting and escalating complex issues to L3 for enterprise banking clients.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Reduced incident response time by 25%</strong> through L1/L2 production support for enterprise loan platform processing 5,000+ daily transactions using Java/Spring Boot microservices for banking customers.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Enabled 30% faster permanent fixes</strong> by conducting comprehensive Root Cause Analysis on production defects with stack trace analysis and code references for development teams and stakeholders.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Reduced loan processing time by 20%</strong> during peak periods through SQL query analysis, indexing strategies, and join refactoring for database performance optimization serving enterprise clients.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Ensured data integrity</strong> across 50+ RESTful microservices by executing API testing with Postman and creating automated test collections with JSON validation for customer data protection.</span>
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-foreground/10">
                      <p className="text-xs text-foreground/50">
                        <strong>Keywords:</strong> Java, Spring Boot, Microservices, SQL, Postman, API Testing, RCA, CI/CD
                      </p>
                      <p className="text-xs text-foreground/50 mt-1">
                        <strong>Ticketing:</strong> Jira, internal tools (L1–L2 escalations)
                      </p>
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Featured Projects Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Featured projects
              </h2>
              <div className="space-y-8">
                <ExperienceItem
                  title="AI-Powered Log Analysis Portal"
                  role="MongoDB, Express.js, React.js, Node.js, LLM | 2025"
                  collapsible={true}
                >
                  <div className="space-y-3">
                    <p className="text-sm text-foreground/70 mb-3">
                      Internal tool concept for L1/L2 teams to reduce manual stack-trace analysis and accelerate RCA
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Problem:</strong> Support teams spending excessive time manually analyzing Java stack traces and error patterns across multiple systems for enterprise customers.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Solution:</strong> Built automated portal with file uploads, API integrations, and Groq API integration to parse errors, targeting 40% deflection in L1 tickets and faster MTTR for L2.</span>
                      </p>
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Product Enhancement: In-House Code Editor"
                  role="Java, Eclipse RCP | 2025"
                  collapsible={true}
                >
                  <div className="space-y-3">
                    <p className="text-sm text-foreground/70 mb-3">
                      Technical analysis and specification for in-house IDE solution to reduce customer friction
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Problem:</strong> 20+ escalation tickets related to setup issues and external IDE dependencies causing customer friction and longer onboarding for enterprise clients.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span><strong>Solution:</strong> Researched Eclipse RCP frameworks, created technical specifications projected to reduce setup-related escalation tickets by 30% and cut onboarding time for new users.</span>
                      </p>
                    </div>
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

            {/* GitHub Activity Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                GitHub Activity
              </h2>
              <p className="mb-8 text-md text-foreground/70">
                <strong>307 contributions in the last year</strong>, focusing on support automation tools, log analysis utilities, and backend services.
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
              <div className="rounded-2xl border border-foreground/10 bg-background/55 p-6 sm:p-8">
                <div className="space-y-6">
                  <div>
                    <p className="mb-4 text-lg font-medium text-foreground max-w-xl">
                      Ready to contribute to your team's success. Available for Product Support / Application Support / SRE-adjacent roles.
                    </p>
                    <p className="text-md text-foreground/70 max-w-xl">
                      Strong background in enterprise B2B SaaS support, incident management, and automation. Let's discuss how I can help reduce your ticket volume and improve customer satisfaction.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <CopyEmailButton email="adarshmasekar@gmail.com" />
                    <LinkedInButton url="https://www.linkedin.com/in/adarsh-masekar/" />
                  </div>
                </div>
              </div>
            </section>

            {/* Focus Tools */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Extras
              </h2>
              <p className="mb-8 text-md text-foreground/70 max-w-xl">
                Tools I built and use personally for focus and flow:
              </p>
              
              <FocusTools />
            </div>

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
