"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "highlights", label: "Highlights" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Tech Stack" },
  { id: "contact", label: "Contact" },
];

export function SideNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
      {navItems.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={`group relative flex items-center justify-end w-32`}
          aria-label={`Scroll to ${label}`}
        >
          <span
            className={`mr-4 text-xs font-medium tracking-wide transition-all duration-300 opacity-0 group-hover:opacity-100 ${
              activeSection === id
                ? "text-foreground opacity-100 font-bold"
                : "text-foreground/50"
            }`}
          >
            {label}
          </span>
          <div
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              activeSection === id
                ? "bg-foreground scale-150"
                : "bg-foreground/20 group-hover:bg-foreground/50 group-hover:scale-125"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
