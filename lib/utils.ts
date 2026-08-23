import { type ClassValue, clsx } from "clsx";

/**
 * Utility to merge class names conditionally.
 * Simplified version — no tailwind-merge needed for Phase 0.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
