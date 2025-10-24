/**
 * @fileoverview Utility functions for class name manipulation and language color lookup.
 */

import { languageColors } from "@/constants/languageColors";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and conditionally applies Tailwind CSS class names.
 * Combines clsx for conditional classes and tailwind-merge to resolve conflicts.
 *
 * @param {...ClassValue} inputs - Class names, objects, or arrays to merge.
 * @return {string} Merged and deduplicated class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the color hex code associated with a programming language.
 * Uses GitHub Linguist color scheme for consistency with GitHub's UI.
 *
 * @param {string | null} language - The programming language name.
 * @return {string} Hex color code for the language, or default gray (#6b7280) if not found.
 */
export function getLanguageColor(language: string | undefined): string {
  if (!language) return "#6b7280"; // Default gray color
  return languageColors[language] || "#6b7280";
}

/**
 * Formats a date string into a human-readable relative time.
 *
 * @param {string} dateString - ISO 8601 date string to format.
 * @return {string} Human-readable relative time (e.g., "2 days ago", "3 months ago").
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

/**
 * Formats a number for display, abbreviating thousands with 'k'.
 *
 * @param {number} num - The number to format.
 * @return {string} Formatted number string (e.g., "1.5k" for 1500).
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
};
