import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { ToastProvider } from "@/components/toast";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Adarsh Masekar | Technical Support Specialist at Smartsheet",
    template: "%s | Adarsh Masekar",
  },
  description:
    "Technical Support Specialist at Smartsheet specializing in enterprise B2B SaaS, API & integration debugging, Root Cause Analysis, and engineering-grade customer solutions.",
  keywords: [
    "Technical Support Specialist",
    "Smartsheet",
    "Enterprise SaaS Support",
    "API Integration Support",
    "Product Support Engineer",
    "Java",
    "JavaScript",
    "SQL",
    "Root Cause Analysis",
    "B2B SaaS",
    "L2/L3 SaaS Support",
    "Support Automation Engineer",
    "Enterprise Technical Support",
    "Production Debugging",
    "Incident Management",
    "SRE Mindset",
    "Java Stack Trace Analysis",
    "MERN Stack Support Tools",
    "Next.js",
    "Full-Stack Support Engineering",
  ],
  authors: [{ name: "Adarsh Masekar" }],
  creator: "Adarsh Masekar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adarshmasekar.vercel.app/",
    title: "Adarsh Masekar | Technical Support Specialist at Smartsheet",
    description:
      "Technical Support Specialist at Smartsheet — enterprise B2B SaaS, API debugging, RCA, and engineering-grade support.",
    siteName: "Adarsh Masekar Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adarsh Masekar — Technical Support Specialist at Smartsheet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Masekar | Technical Support Specialist at Smartsheet",
    description:
      "Technical Support Specialist at Smartsheet — enterprise B2B SaaS, API debugging, RCA, and engineering-grade support.",
    creator: "@adarshmasekar",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://adarshmasekar.vercel.app"),
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Adarsh Masekar",
      jobTitle: "Technical Support Specialist",
      description:
        "Technical Support Specialist with 2+ years in Enterprise B2B SaaS, specializing in API/integration debugging, code-level Root Cause Analysis, and engineering-grade customer solutions.",
      url: "https://adarshmasekar.vercel.app",
      sameAs: [
        "https://github.com/adarshmasekar",
        "https://www.linkedin.com/in/adarsh-masekar/",
        "https://leetcode.com/u/adarshmasekar/",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Smartsheet",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Visvesvaraya Technological University",
      },
      knowsAbout: [
        "Enterprise B2B SaaS Support",
        "API & Integration Debugging",
        "Root Cause Analysis",
        "Java",
        "JavaScript",
        "TypeScript",
        "SQL",
        "Selenium",
        "Appium",
        "Next.js",
        "React",
        "Node.js",
        "MongoDB",
        "CI/CD",
        "Docker",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Technical Support Specialist",
        occupationLocation: {
          "@type": "City",
          name: "Bengaluru, India",
        },
        skills:
          "Production Debugging, Root Cause Analysis, API Testing, Java, JavaScript, SQL, Incident Management",
      },
    },
    {
      "@type": "SoftwareSourceCode",
      name: "AI-Powered Log Analysis Portal",
      description:
        "Full-stack MERN portal automating error log analysis for support teams with LLM-powered Java stack trace parsing, targeting 40% deflection in L1 support tickets.",
      programmingLanguage: ["JavaScript", "Node.js"],
      runtimePlatform: "Node.js",
      author: { "@type": "Person", name: "Adarsh Masekar" },
      dateCreated: "2025",
    },
    {
      "@type": "SoftwareSourceCode",
      name: "In-House Code Editor Specification",
      description:
        "Technical specification for an Eclipse RCP-based IDE solution, projected to reduce setup-related escalation tickets by 30% and cut enterprise customer onboarding time.",
      programmingLanguage: ["Java"],
      author: { "@type": "Person", name: "Adarsh Masekar" },
      dateCreated: "2025",
    },
    {
      "@type": "WebSite",
      url: "https://adarshmasekar.vercel.app",
      name: "Adarsh Masekar Portfolio",
      description:
        "Portfolio of Adarsh Masekar — Technical Support Specialist at Smartsheet.",
      author: { "@type": "Person", name: "Adarsh Masekar" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased transition-colors duration-300`}
      >
        <div
          className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.05] dark:opacity-[0.05] bg-noise"
          aria-hidden="true"
        />
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <JsonLd data={jsonLd} />
      </body>
    </html>
  );
}
