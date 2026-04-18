import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate total years of professional experience, excluding employment gaps.
 *
 * Employment periods:
 *   - Tech Mahindra:    March 2024 – September 2024
 *   - Qualitia Software: January 2025 – March 2026
 *   - Smartsheet:        April 2026 – present
 *
 * Gap excluded: October 2024 – December 2024
 */
export function getYearsOfExperience(): number {
  const now = new Date();

  const periods: { start: Date; end: Date }[] = [
    { start: new Date(2024, 2, 1), end: new Date(2024, 8, 30) },   // Mar–Sep 2024
    { start: new Date(2025, 0, 1), end: new Date(2026, 2, 31) },   // Jan 2025–Mar 2026
    { start: new Date(2026, 3, 1), end: now },                       // Apr 2026–present
  ];

  let totalDays = 0;

  for (const period of periods) {
    const end = period.end > now ? now : period.end;
    if (end < period.start) continue;

    const diffMs = end.getTime() - period.start.getTime();
    totalDays += diffMs / (1000 * 60 * 60 * 24);
  }

  const years = totalDays / 365.25;
  return Math.round(years * 10) / 10;
}
