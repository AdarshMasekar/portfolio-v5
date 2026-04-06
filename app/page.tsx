"use client";

import Image from "next/image";
import { Github, Linkedin, QrCode, X, FileText, Bot, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";

import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { ExperienceItem } from "@/components/ExperienceItem";
import { FocusTools } from "@/components/FocusTools";
import { LinkedInButton } from "@/components/ui/LinkedInButton";
import { MenuBar, MenuBarItem } from "@/components/ui/bottom-menu";
import { SiLeetcode } from "react-icons/si";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SideNav } from "@/components/SideNav";

// Animated Counter Component
function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 20 });
  const [displayValue, setDisplayValue] = useState("0");

  // Determine decimal places from the target value
  const decimalPlaces = (value.toString().split(".")[1] || "").length;

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimalPlaces));
    });

    if (isInView) {
      motionValue.set(value);
    }

    return () => unsubscribe();
  }, [isInView, motionValue, springValue, value, decimalPlaces]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-2xl font-bold text-foreground sm:text-3xl"
    >
      {displayValue}
      {suffix}
    </motion.div>
  );
}


import { AgentMarkdownView } from "@/components/AgentMarkdownView";

const TechStack = dynamic(
  () => import("@/components/TechStack").then((mod) => mod.TechStack),
  { ssr: true },
);

const GithubGraph = dynamic(
  () => import("@/components/GithubGraph").then((mod) => mod.GithubGraph),
  { ssr: true },
);

export default function Home() {
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");


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
      className={`relative flex min-h-screen flex-col items-center bg-background px-3 pt-8 text-foreground selection:bg-foreground/20
      pb-16 sm:px-4 sm:pt-12 sm:pb-20 overflow-x-hidden transition-colors duration-300`}
    >
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <SideNav />

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
            <AgentMarkdownView />
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

            {/* Profile Image */}
            <div className="relative mb-2 group flex items-center justify-center">
              <div
                className="relative h-40 w-40 sm:h-56 sm:w-56"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 70%, transparent 100%)",
                }}
              >
                <Image
                  src="/me1.png"
                  alt="Adarsh Masekar - Profile Photo"
                  fill
                  sizes="(max-width: 640px) 160px, 224px"
                  className="object-contain transition-all duration-700 grayscale filter group-hover:grayscale-0 drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                  priority
                />
              </div>
            </div>

            {/* Hero Text */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-7xl cursor-default">
                Adarsh Masekar
              </h1>
              <h2 className="text-xl font-medium text-foreground/80 sm:text-2xl transition-colors duration-300">
                Technical Support Specialist
              </h2>
              <p className="mt-2 text-sm text-foreground/60 sm:text-base">
                Enterprise B2B SaaS · API &amp; Integration Support · Java · JavaScript · SQL · RCA · SRE Mindset
              </p>
            </div>

            {/* Summary Highlights */}
            <div id="highlights" className="mb-16 w-full relative">
              <div className="rounded-2xl border border-foreground/10 bg-background/90 p-4 sm:p-6 transition-all duration-500">
                <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-foreground/70">
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center">
                    <AnimatedCounter value={1.8} suffix="+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">
                      Years Experience
                    </div>
                    <div className="text-xs text-foreground/50">
                      Enterprise B2B SaaS
                    </div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter value={300} suffix="+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">
                      L2/L3 Escalations Resolved
                    </div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter value={50} suffix="+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">
                      KB Articles
                    </div>
                    <div className="text-xs text-foreground/50">
                      Self-Service +40%
                    </div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter value={95} suffix="%+" />
                    <div className="text-xs text-foreground/60 sm:text-sm">
                      SLA Adherence
                    </div>
                    <div className="text-xs text-foreground/50">
                      MTTR -35%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16 mt-4 w-full space-y-4 text-justify text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
              <p>
                Technical Support Specialist with 1.8+ years in Enterprise B2B SaaS,
                specializing in API/integration debugging, code-level Root Cause Analysis,
                and engineering-grade customer solutions. Proven track record of resolving
                300+ L2/L3 escalations, building self-service knowledge systems, and
                delivering custom fixes under pressure — while maintaining 95%+ SLA
                adherence across global enterprise clients.
              </p>
            </div>

            {/* Experience Section */}
            <div
              id="experience"
              className="mb-16 w-full text-left"
            >
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70">
                Experience
              </h2>
              <div className="space-y-8">
                <ExperienceItem
                  title="Smartsheet"
                  role="Technical Support Specialist | Bengaluru, India (Hybrid)"
                  collapsible={true}
                >
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground/70 text-sm mb-4">
                      April 2026 – Present
                    </p>
                    <p className="text-sm text-foreground/80 mb-4 italic">
                      Completed onboarding and actively ramping up — immersed in product training,
                      exploring the Smartsheet platform end-to-end, and building a deep understanding
                      of the tools and workflows that power enterprise support at scale.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Deep product exploration</strong> — studying Smartsheet&apos;s
                          core platform, automation capabilities, integration ecosystem, and
                          enterprise feature set to build a strong technical foundation.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Structured product training</strong> — going through comprehensive
                          onboarding programs to understand support processes, internal tooling,
                          and the customer journey across enterprise accounts.
                        </span>
                      </p>
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Qualitia Software"
                  role="Product Support Engineer | Pune, India (Remote)"
                  collapsible={true}
                >
                  <div className="space-y-3">
                    <p className="font-semibold text-foreground/70 text-sm mb-4">
                      January 2025 – March 2026
                    </p>
                    <p className="text-sm text-foreground/80 mb-4 italic">
                      Provided L2/L3 technical support for an enterprise test automation SaaS
                      platform, handling complex escalations requiring code-level debugging,
                      custom engineering solutions, and cross-team collaboration for global
                      B2B clients.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>
                            Engineered a custom Java/JDBC integration module for IBM DB2
                          </strong>{" "}
                          within 36 hours, implementing connection pooling to resolve a critical enterprise
                          account failure and prevent churn.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Resolved 300+ L2/L3 escalations</strong>{" "}
                          through code-level debugging of Selenium and Appium frameworks,
                          reducing MTTR by 35% while maintaining 95%+ SLA adherence.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>
                            Authored 50+ technical knowledge base articles
                          </strong>{" "}
                          with executable code samples, achieving 40% increase in
                          self-service resolution and reducing inbound ticket volume.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Mentored 3 junior support engineers</strong> on
                          product architecture and troubleshooting methodologies,
                          cutting team ramp-up time by 40%.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Collaborated directly with product engineering</strong>{" "}
                          on bug escalations, feature validation, and API testing —
                          acting as the technical voice of the customer in roadmap discussions.
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-foreground/10">
                      <p className="text-xs text-foreground/50">
                        <strong>Keywords:</strong> Java, JDBC, IBM DB2, Selenium,
                        Appium, Spring Boot, REST APIs, SQL, RCA, CI/CD
                      </p>
                      <p className="text-xs text-foreground/50 mt-1">
                        <strong>Ticketing:</strong> Jira, internal tools (L1–L3
                        escalations)
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
                      March 2024 – September 2024
                    </p>
                    <p className="text-sm text-foreground/80 mb-4 italic">
                      Provided L1/L2 production support and incident triage for
                      enterprise loan platform performing basic troubleshooting
                      and escalating complex issues to L3 for enterprise banking
                      clients.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Reduced incident response time by 25%</strong>{" "}
                          through L1/L2 production support for enterprise loan
                          platform processing 5,000+ daily transactions using
                          Java/Spring Boot microservices for banking customers.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Enabled 30% faster permanent fixes</strong> by
                          conducting comprehensive Root Cause Analysis on
                          production defects with stack trace analysis and code
                          references for development teams and stakeholders.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Reduced loan processing time by 20%</strong>{" "}
                          during peak periods through SQL query analysis,
                          indexing strategies, and join refactoring for database
                          performance optimization serving enterprise clients.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Ensured data integrity</strong> across 50+
                          RESTful microservices by executing API testing with
                          Postman and creating automated test collections with
                          JSON validation for customer data protection.
                        </span>
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-foreground/10">
                      <p className="text-xs text-foreground/50">
                        <strong>Keywords:</strong> Java, Spring Boot,
                        Microservices, SQL, Postman, API Testing, RCA, CI/CD
                      </p>
                      <p className="text-xs text-foreground/50 mt-1">
                        <strong>Ticketing:</strong> Jira, internal tools (L1–L2
                        escalations)
                      </p>
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Featured Projects Section */}
            <div id="projects" className="mb-16 w-full text-left">
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
                    <p className="text-sm text-foreground/70 mb-1">
                      Internal tool concept for L1/L2 teams to reduce manual
                      stack-trace analysis and accelerate RCA.
                    </p>
                    <p className="text-sm text-foreground/55 mb-3 italic">
                      Identified gap from 300+ manual RCA cycles; built as internal tooling
                      proof-of-concept to address a real support bottleneck.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Problem:</strong> Support teams spending
                          excessive time manually analyzing Java stack traces
                          and error patterns across multiple systems for
                          enterprise customers.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Solution:</strong> Built automated portal
                          with file uploads, API integrations, and Groq API
                          integration to parse errors, targeting 40%
                          deflection in L1 tickets and faster MTTR for L2.
                        </span>
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
                    <p className="text-sm text-foreground/70 mb-1">
                      Technical analysis and specification for in-house IDE
                      solution to reduce customer friction.
                    </p>
                    <p className="text-sm text-foreground/55 mb-3 italic">
                      Proposed after tracking 20+ escalation tickets rooted in external IDE
                      dependency issues — translating support data into a product-level solution.
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Problem:</strong> 20+ escalation tickets
                          related to setup issues and external IDE
                          dependencies causing customer friction and longer
                          onboarding for enterprise clients.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-foreground/40 mt-1">•</span>
                        <span>
                          <strong>Solution:</strong> Researched Eclipse RCP
                          frameworks, created technical specifications
                          projected to reduce setup-related escalation tickets
                          by 30% and cut onboarding time for new users.
                        </span>
                      </p>
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Education Section */}
            <div id="education" className="mb-16 w-full text-left">
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
                Consistent contributions over the past year, focusing on support
                automation tools, log analysis utilities, and backend services.
              </p>
              <GithubGraph />
            </div>

            {/* Tech Stack Section */}
            <div id="skills" className="mb-16 w-full text-left">
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
              id="contact"
              className="mb-16 w-full text-left"
              aria-labelledby="contact-heading"
            >
              <h2
                id="contact-heading"
                className="mb-6 text-xs font-bold uppercase tracking-widest text-foreground/70"
              >
                Get in Touch
              </h2>
              <div className="rounded-2xl border border-foreground/10 bg-background/90 p-6 sm:p-8 relative">
                <div className="space-y-6 relative z-10">
                  <div>
                    <p className="mb-4 text-lg font-medium text-foreground max-w-xl">
                      Currently a Technical Support Specialist at Smartsheet.
                    </p>
                    <p className="text-md text-foreground/70 max-w-xl">
                      Open to connecting with folks working on enterprise SaaS, support engineering,
                      or SRE-adjacent problems. If you value engineers who debug at the code level
                      and treat every ticket as a product signal — let&apos;s talk.
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
