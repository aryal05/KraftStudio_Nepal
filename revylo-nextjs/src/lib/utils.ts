import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Nepali Rupees (NPR)
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted string like "NPR 1,299" or "Rs. 1,299"
 */
export function formatNPR(
  amount: number,
  options?: {
    showDecimals?: boolean;
    shortForm?: boolean; // Use "Rs." instead of "NPR"
  }
): string {
  const { showDecimals = false, shortForm = false } = options || {};
  
  const formatted = new Intl.NumberFormat("en-NP", {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);

  const prefix = shortForm ? "Rs." : "NPR";
  return `${prefix} ${formatted}`;
}
