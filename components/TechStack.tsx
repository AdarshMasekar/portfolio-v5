"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAvatarState } from "@/components/providers/AvatarStateProvider";
import { Badgermole } from "@/components/easter-eggs/Badgermole";
import {
  SiJavascript,
  SiPython,
  SiSelenium,
  SiPostman,
  SiJenkins,
  SiGit,
  SiGithub,
  SiLinux,
  SiMysql,
  SiMongodb,
  SiJira,
  SiSlack,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiShadcnui,
} from "react-icons/si";
import { BsMicrosoftTeams } from "react-icons/bs";

import { FaJava } from "react-icons/fa";
import { Database, Smartphone } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import { LogoCloud, type Logo } from "@/components/logo-cloud-3";

interface Skill {
  name: string;
  icon: IconType | LucideIcon;
  color: string; // brand hex color
}

interface Category {
  name: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    name: "Languages & Backend",
    skills: [
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    ],
  },
  {
    name: "DevOps & Collaboration",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#6e40c9" },
      { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },
  {
    name: "Web & Frontend",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Shadcn", icon: SiShadcnui, color: "#000000" },
    ],
  },
  {
    name: "Support & Testing Tools",
    skills: [
      { name: "Selenium", icon: SiSelenium, color: "#43B02A" },
      { name: "Appium", icon: Smartphone, color: "#662D91" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    name: "Collaboration Tools",
    skills: [
      { name: "Jira", icon: SiJira, color: "#0052CC" },
      { name: "Teams", icon: BsMicrosoftTeams, color: "#464EB8" },
      { name: "Slack", icon: SiSlack, color: "#4A154B" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQL", icon: Database, color: "#336791" },
    ],
  },
];

const marqueeSkills = categories.flatMap((c) => c.skills);

function TechIcon({
  icon: Icon,
  color,
  size = "h-8 w-8",
}: {
  icon: IconType | LucideIcon;
  color: string;
  size?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Icon
      className={`${size} transition-all duration-300 cursor-pointer`}
      style={{ color: hovered ? color : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
}

function CloudLogo({ tech }: { tech: Skill }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 transition-all duration-300 cursor-pointer text-foreground/70 hover:text-foreground will-change-transform"
      style={{
        color: hovered ? tech.color : undefined,
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <tech.icon className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
      <span className="text-sm md:text-lg font-bold tracking-tight whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

export function TechStack() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAvatarState } = useAvatarState();

  const logoCloudLogos: Logo[] = marqueeSkills.map((tech) => ({
    alt: tech.name,
    component: <CloudLogo tech={tech} />,
  }));

  return (
    <div className="w-full space-y-2 relative">
      {isAvatarState && <Badgermole />}
      <div className="flex justify-between items-end">
        {isAvatarState ? (
          <p className="text-xs text-foreground/40 italic flex-1 pb-1">
            Hint: try typing the strongest earthbender's name.
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-all duration-300"
        >
          {isExpanded ? "Show Less" : "View Full Stack"}
          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="marquee"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full relative"
          >
            <div
              aria-hidden="true"
              className="absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-full max-w-[600px] pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-foreground)_0%,transparent_50%)] opacity-[0.03] blur-[20px] rounded-full"
            />

            <div className="mx-auto my-5 h-px max-w-sm bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

            <LogoCloud logos={logoCloudLogos} />

            <div className="mt-5 mb-4 h-px max-w-sm mx-auto bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-4">
              {categories.map((category) => (
                <div key={category.name} className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/50 border-b border-foreground/10 pb-2">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        data-avatar-mode={isAvatarState}
                        className="group flex items-center gap-3 rounded-xl border border-foreground/5 bg-foreground/5 p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:border-[var(--brand)] hover:shadow-[0_4px_20px_var(--brand-shadow)] data-[avatar-mode=true]:border-b-4 data-[avatar-mode=true]:border-[var(--color-earth-accent)] data-[avatar-mode=true]:bg-[var(--color-earth-bg)] data-[avatar-mode=true]:shadow-[0_4px_0_var(--color-earth-accent)] data-[avatar-mode=true]:hover:-translate-y-2 data-[avatar-mode=true]:hover:shadow-[0_8px_0_var(--color-earth-accent)]"
                        style={
                          {
                            "--brand": skill.color,
                            "--brand-shadow": skill.color + "20", // ~12% opacity
                          } as React.CSSProperties
                        }
                      >
                        <skill.icon className="h-5 w-5 shrink-0 text-foreground/80 transition-all duration-300 group-hover:[color:var(--brand)] avatar:group-hover:!text-amber-500" />
                        <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors avatar:group-hover:text-amber-500">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
