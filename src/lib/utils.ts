import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProductImageAlt(
  product: { title: string; subcategory?: string; category?: string },
  imageSrc: string = "",
  index: number = 0,
  total: number = 1
): string {
  const subcat = product.subcategory ? product.subcategory.replace(/-/g, " ") : "streetwear";
  const lowerSrc = (imageSrc || "").toLowerCase();

  let angle = "";
  if (lowerSrc.includes("front") || lowerSrc.endsWith("f") || lowerSrc.includes("acidf") || lowerSrc.includes("tee-f")) {
    angle = "front graphic view";
  } else if (lowerSrc.includes("back") || lowerSrc.endsWith("b") || lowerSrc.includes("acidb") || lowerSrc.includes("tee-b")) {
    angle = "back graphic view";
  } else if (product.subcategory === "tapestries" || product.subcategory === "flags") {
    angle = index === 0 ? "full aesthetic display" : "detail fabric print";
  } else if (total > 1) {
    if (index === 0) angle = "front view";
    else if (index === 1) angle = "back graphic view";
    else angle = `angle view ${index + 1}`;
  } else {
    angle = "product shot";
  }

  return `Deez Prints ${product.title} ${subcat} — ${angle}`;
}

