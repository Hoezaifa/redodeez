import type { CartLine } from "./cart";

export const PROMO_FIRSTDROP = "FIRSTDROP";
export const PROMO_WELCOMEDEEZ = "WELCOMEDEEZ";

export const LS_KEY_FIRST_CLAIMED = "deez_first_order_claimed_v1";
export const LS_KEY_APPLIED_PROMO = "deez_applied_promo_v1";

/**
 * Checks if a line item is eligible standard merchandise for FIRSTDROP.
 * Excludes unpriced custom quotes and bulk custom jobs.
 */
export function isEligibleMerchandise(line: CartLine): boolean {
  if (line.price <= 0) return false;
  // If line is custom with an unpriced/quote note, exclude it
  if (line.isCustom && line.note?.toLowerCase().includes("quote")) return false;
  if (line.title.toLowerCase().includes("quote") || line.title.toLowerCase().includes("bulk")) {
    return false;
  }
  return true;
}

/**
 * Calculate eligible merchandise subtotal (excluding unpriced quotes/bulk jobs & shipping).
 */
export function calculateMerchSubtotal(lines: CartLine[]): number {
  return lines
    .filter(isEligibleMerchandise)
    .reduce((sum, item) => sum + item.price * item.qty, 0);
}

/**
 * Calculate discount amount in PKR rupees based on applied promo code.
 * Non-stackable: only one promo code can be active.
 */
export function calculatePromoDiscount(
  code: string | null | undefined,
  lines: CartLine[],
  subtotal: number
): {
  discount: number;
  merchSubtotal: number;
  percent: number;
  code: string | null;
  label: string;
} {
  const normalized = (code || "").trim().toUpperCase();
  const merchSubtotal = calculateMerchSubtotal(lines);

  if (normalized === PROMO_FIRSTDROP) {
    // 10% off merchandise, excluding delivery and unpriced custom quotes
    const discount = Math.round(merchSubtotal * 0.1);
    return {
      discount,
      merchSubtotal,
      percent: 10,
      code: PROMO_FIRSTDROP,
      label: "First Order Discount (FIRSTDROP -10%)",
    };
  }

  if (normalized === PROMO_WELCOMEDEEZ) {
    // Preserve existing 20% customer/gift-card offer
    const discount = Math.round(subtotal * 0.2);
    return {
      discount,
      merchSubtotal,
      percent: 20,
      code: PROMO_WELCOMEDEEZ,
      label: "Welcome Promo (WELCOMEDEEZ -20%)",
    };
  }

  return {
    discount: 0,
    merchSubtotal,
    percent: 0,
    code: null,
    label: "",
  };
}

/**
 * Client storage helpers
 */
export function getSavedClaimStatus(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(LS_KEY_FIRST_CLAIMED) === "true";
  } catch {
    return false;
  }
}

export function saveClaimStatus(claimed: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (claimed) {
      localStorage.setItem(LS_KEY_FIRST_CLAIMED, "true");
    } else {
      localStorage.removeItem(LS_KEY_FIRST_CLAIMED);
    }
  } catch {
    /* ignore */
  }
}

export function getSavedPromoCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LS_KEY_APPLIED_PROMO);
  } catch {
    return null;
  }
}

export function savePromoCode(code: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (code) {
      localStorage.setItem(LS_KEY_APPLIED_PROMO, code);
    } else {
      localStorage.removeItem(LS_KEY_APPLIED_PROMO);
    }
  } catch {
    /* ignore */
  }
}
