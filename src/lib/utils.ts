import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get relative time
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;

    const units: [Intl.RelativeTimeFormatUnit, number][] = [
        ["year", 60 * 60 * 24 * 365],
        ["month", 60 * 60 * 24 * 30],
        ["week", 60 * 60 * 24 * 7],
        ["day", 60 * 60 * 24],
        ["hour", 60 * 60],
        ["minute", 60],
        ["second", 1],
    ];

    for (const [unit, secondsInUnit] of units) {
        if (Math.abs(diff) >= secondsInUnit || unit === "second") {
            const value = Math.floor(diff / secondsInUnit);
            return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-value, unit);
        }
    }
    return "just now";
}