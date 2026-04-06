import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { ToastProvider } from "@/components/toast";
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Masekar | Technical Support Specialist at Smartsheet",
    description:
      "Technical Support Specialist at Smartsheet — enterprise B2B SaaS, API debugging, RCA, and engineering-grade support.",
    creator: "@adarshmasekar",
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
  "@type": "Person",
  name: "Adarsh Masekar",
  jobTitle: "Technical Support Specialist",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
      </body>
    </html>
  );
}
