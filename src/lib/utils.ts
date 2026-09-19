import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProductImageAlt(
  product: { title: string; subcategory?: string; category?: string; imageAlts?: string[] },
  imageSrc: string = "",
  index: number = 0,
  total: number = 1
): string {
  // If product provides a curated, per-image alt text, prioritize it
  if (product.imageAlts && product.imageAlts[index]) {
    return product.imageAlts[index];
  }

  const subcat = product.subcategory || "streetwear";
  const lowerSrc = (imageSrc || "").toLowerCase();

  let angleDesc = "display view";
  if (
    lowerSrc.includes("front") ||
    lowerSrc.endsWith("f.jpg") ||
    lowerSrc.endsWith("f.png") ||
    lowerSrc.endsWith("f.webp") ||
    lowerSrc.includes("acidf") ||
    lowerSrc.includes("tee-f")
  ) {
    angleDesc = "front graphic view";
  } else if (
    lowerSrc.includes("back") ||
    lowerSrc.endsWith("b.jpg") ||
    lowerSrc.endsWith("b.png") ||
    lowerSrc.endsWith("b.webp") ||
    lowerSrc.includes("acidb") ||
    lowerSrc.includes("tee-b")
  ) {
    angleDesc = "back graphic view";
  } else if (lowerSrc.includes("close") || lowerSrc.includes("detail")) {
    angleDesc = "print detail close-up";
  } else if (subcat === "tapestries" || subcat === "flags") {
    angleDesc = index === 0 ? "full wall display" : "fabric texture and hem detail";
  } else if (total > 1) {
    angleDesc = index === 0 ? "front view" : index === 1 ? "back graphic view" : `angle view ${index + 1}`;
  }

  const cleanTitle = product.title.trim();

  if (subcat === "acid-wash") {
    return `${cleanTitle} on hand-dyed acid wash streetwear tee — ${angleDesc}`;
  }
  if (subcat === "drop-shoulder") {
    return `${cleanTitle} on heavyweight 240 GSM drop-shoulder oversized tee — ${angleDesc}`;
  }
  if (subcat === "tapestries" || subcat === "flags") {
    return `${cleanTitle} satin wall art tapestry — ${angleDesc}`;
  }
  if (subcat === "mugs") {
    return `${cleanTitle} ceramic graphic print mug — ${angleDesc}`;
  }
  if (subcat === "hoodies") {
    return `${cleanTitle} heavyweight fleece streetwear hoodie — ${angleDesc}`;
  }

  return `${cleanTitle} on premium cotton regular tee — ${angleDesc}`;
}
