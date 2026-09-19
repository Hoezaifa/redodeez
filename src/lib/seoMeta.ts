/**
 * DEEZ PRINTS — CENTRALIZED SEO METADATA MODULE (T3)
 *
 * Provides authoritative title, meta description, Open Graph, and Twitter card
 * data for all page types. Guarantees:
 * 1. Single source of truth for SEO copy.
 * 2. No duplicated adjacent words (e.g. "Acid Wash ... | ACID WASH", "Cinema Collection Collection").
 * 3. Search-optimized titles with "in Pakistan" commercial context without changing visible visual H1s.
 * 4. Strict adherence to SEO_FACTS.md (no fabricated GSM or delivery claims).
 */

import { SITE_URL } from "@/data/site";
import type { Product } from "@/data/products";

export interface MetaTag {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
}

export function cleanTitleText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** Homepage SEO Metadata */
export function homeMeta(): { title: string; description: string; meta: MetaTag[] } {
  const title = "Anime Streetwear, Graphic T-Shirts & Custom Printing in Pakistan | Deez Prints";
  const description =
    "Oversized drop-shoulder tees, vintage acid wash, anime streetwear, and satin tapestries. Custom DTF t-shirt printing studio based in Karachi, delivering nationwide across Pakistan.";
  const url = `${SITE_URL}/`;
  const ogImage = `${SITE_URL}/og-image.jpg`;

  return {
    title,
    description,
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Deez Prints" },
      { property: "og:image", content: ogImage },
      { property: "og:image:secure_url", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@deez_prints" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
  };
}

/** Collection-specific SEO metadata dictionary */
const COLLECTION_TITLES: Record<string, { title: string; desc: string }> = {
  "anime-archive": {
    title: "Anime T-Shirts & Streetwear in Pakistan — Naruto, One Piece, JJK, DBZ | Deez Prints",
    desc: "Shop anime graphic tees in oversized drop shoulder, acid wash, and regular fits. Features Naruto, One Piece, Jujutsu Kaisen, Berserk, and Bleach. DTF printed in Karachi.",
  },
  "acid-wash": {
    title: "Acid Wash T-Shirts in Pakistan — Vintage Mineral Wash Anime & Graphic Tees | Deez Prints",
    desc: "Hand-processed mineral acid wash t-shirts in Pakistan. Unique vintage patina on 100% cotton with high-definition anime and streetwear graphic prints.",
  },
  "drop-shoulder": {
    title: "Drop Shoulder T-Shirts in Pakistan — 240+ GSM Oversized Graphic Tees | Deez Prints",
    desc: "Heavyweight 240+ GSM combed compact cotton drop-shoulder tees. Boxy relaxed streetwear fit, DTF printed in Karachi with nationwide delivery across Pakistan.",
  },
  "t-shirts": {
    title: "Regular Fit Graphic T-Shirts in Pakistan — 100% Ring-Spun Cotton | Deez Prints",
    desc: "Classic regular fit graphic t-shirts in Pakistan (180–200 GSM). Soft breathable ring-spun cotton jersey featuring original streetwear and anime designs.",
  },
  tapestries: {
    title: "Anime & Movie Wall Tapestries in Pakistan | Deez Prints",
    desc: "High-definition digital sublimation printed satin wall tapestries in Pakistan. Features anime, cinema, and cult classic artwork. Made in Karachi.",
  },
  hoodies: {
    title: "Streetwear Hoodies in Pakistan — Heavyweight Fleece | Deez Prints",
    desc: "Heavyweight 350+ GSM fleece streetwear hoodies by Deez Prints. Premium boxy fit with durable graphic prints, dispatched across Pakistan.",
  },
  accessories: {
    title: "Anime Mugs & Streetwear Accessories in Pakistan | Deez Prints",
    desc: "High-gloss ceramic anime mugs and graphic drinkware accessories by Deez Prints. Safely packaged and delivered nationwide across Pakistan.",
  },
  "cinema-collection": {
    title: "Cinema Collection Graphic T-Shirts in Pakistan | Deez Prints",
    desc: "Graphic t-shirts and tapestries inspired by cinema classics: Goodfellas, The Godfather, Scarface, Fight Club, and American Psycho. DTF printed in Karachi.",
  },
  "comic-universe": {
    title: "Comic Universe Graphic T-Shirts in Pakistan | Deez Prints",
    desc: "Comic-inspired graphic t-shirts and streetwear apparel in Pakistan. 100% cotton, high-definition DTF prints, dispatched nationwide.",
  },
  "minimal-drops": {
    title: "Minimal Graphic T-Shirts & Streetwear in Pakistan | Deez Prints",
    desc: "Subtle typography and understated streetwear graphic tees by Deez Prints. Clean aesthetics on oversized and regular fit cotton blanks.",
  },
  "art-drop": {
    title: "Art Drop Graphic T-Shirts & Apparel in Pakistan | Deez Prints",
    desc: "Curated artistic graphics, Renaissance remixes, and surrealist streetwear tees by Deez Prints. Printed on premium cotton blanks in Karachi.",
  },
  "street-aesthetic": {
    title: "Street Aesthetic Graphic T-Shirts in Pakistan | Deez Prints",
    desc: "Urban streetwear graphic t-shirts and drop-shoulder silhouettes. Contemporary street typography and bold back-graphic prints.",
  },
};

/** Collection Route SEO Metadata */
export function collectionMeta(
  slug: string,
  rawName: string,
  rawBlurb?: string
): { title: string; description: string } {
  if (COLLECTION_TITLES[slug]) {
    return {
      title: COLLECTION_TITLES[slug].title,
      description: COLLECTION_TITLES[slug].desc,
    };
  }

  // Prevent "Cinema Collection Collection" bug
  const cleanName = rawName.endsWith("Collection") ? rawName : `${rawName} Collection`;
  const title = `${cleanName} — Graphic Apparel in Pakistan | Deez Prints`;
  const description = rawBlurb
    ? `${rawBlurb} Shop ${rawName} by Deez Prints. 100% cotton, made to order in Karachi, delivered nationwide across Pakistan.`
    : `Shop ${rawName} by Deez Prints. Premium graphic apparel and streetwear made in Karachi, delivered across Pakistan.`;

  return { title, description };
}

/** Product Route SEO Metadata */
export function productMeta(
  product: Product,
  franchise?: string | null,
  character?: string | null
): { title: string; description: string; seoTitle: string } {
  const isTapestry = product.subcategory === "tapestries" || product.subcategory === "flags";
  const isMug = product.category === "accessories";
  const isAcidWash = product.subcategory === "acid-wash";
  const isDropShoulder = product.subcategory === "drop-shoulder";

  // Clean the title by removing trailing "Tee", "T-Shirt", "Acid Wash Tee", etc. to avoid duplicate words
  let cleanDesign = product.title
    .replace(/\s+(Acid Wash Tee|Drop Shoulder Tee|Regular Tee|Tee|T-Shirt|Tshirt)$/i, "")
    .replace(/\s+(Acid Wash|Drop Shoulder)$/i, "")
    .trim();

  // If character is known and not already in cleanDesign, prepend or use it
  let entityString = cleanDesign;
  if (character && !cleanDesign.toLowerCase().includes(character.toLowerCase())) {
    entityString = `${character} ${cleanDesign}`;
  }

  let garmentType = "Graphic T-Shirt";
  let fitBlurb = "100% cotton graphic apparel";

  if (isTapestry) {
    garmentType = "Satin Wall Tapestry";
    fitBlurb = "High-definition digital sublimation printed satin tapestry";
  } else if (isMug) {
    garmentType = "Anime Ceramic Mug";
    fitBlurb = "Premium high-gloss ceramic mug";
  } else if (isAcidWash) {
    garmentType = "Acid Wash T-Shirt";
    fitBlurb = "Hand-processed vintage mineral wash (100% cotton)";
  } else if (isDropShoulder) {
    garmentType = "Drop Shoulder T-Shirt";
    fitBlurb = "Heavyweight 240+ GSM oversized combed cotton";
  } else {
    garmentType = "Regular Fit T-Shirt";
    fitBlurb = "180–200 GSM ring-spun cotton jersey";
  }

  const franchisePart = franchise ? ` ${franchise}` : "";
  const title = `${entityString}${franchisePart} ${garmentType} in Pakistan | Deez Prints`;

  let description = "";
  if (product.description && product.description.length > 30) {
    description = product.description.length > 155
      ? `${product.description.slice(0, 151).trim()}...`
      : product.description;
  } else if (isTapestry) {
    description = `${entityString}${franchisePart} satin wall tapestry. Made to order in Karachi, delivered nationwide across Pakistan. 7-day exchange.`;
  } else if (isMug) {
    description = `${entityString} ceramic anime mug by Deez Prints. Scratch-resistant print, safe nationwide dispatch across Pakistan.`;
  } else {
    description = `${entityString}${franchisePart} ${garmentType.toLowerCase()}. ${fitBlurb}, DTF printed in Karachi. Rs. ${product.price}. Free delivery over Rs. 5,000.`;
  }

  // Ensure description is safe length
  if (description.length > 160) {
    description = `${description.slice(0, 155).trim()}...`;
  }

  return {
    title,
    seoTitle: title,
    description,
  };
}

/** Static Pages SEO Metadata */
export function staticPageMeta(path: string): { title: string; description: string } {
  switch (path) {
    case "/custom-print":
      return {
        title: "Custom T-Shirt Printing in Karachi — DTF Printing Across Pakistan | Deez Prints",
        description:
          "High-definition DTF custom t-shirt printing in Karachi, Pakistan. No minimum order constraints, transparent pricing, 300 DPI print quality on premium 100% cotton.",
      };
    case "/about":
      return {
        title: "About Deez Prints — Karachi Streetwear & Custom Printing Studio",
        description:
          "Deez Prints is an independent Pakistani streetwear studio founded in Karachi. We specialize in anime graphic tees, drop-shoulder silhouettes, and DTF print craftsmanship.",
      };
    case "/contact":
      return {
        title: "Contact Us — Order Inquiries & WhatsApp Support | Deez Prints",
        description:
          "Reach out to Deez Prints via WhatsApp or email for sizing help, custom DTF t-shirt inquiries, and order tracking across Pakistan.",
      };
    case "/shipping":
      return {
        title: "Shipping & Delivery Across Pakistan | Deez Prints",
        description:
          "Shipping rates and delivery timelines: Karachi Rs. 200 via Bykea/local courier, nationwide Rs. 450. Free shipping on all orders over Rs. 5,000.",
      };
    case "/returns":
      return {
        title: "7-Day Exchange & Returns Policy | Deez Prints",
        description:
          "Our straightforward 7-day exchange window for size and fit adjustments across Pakistan. Dedicated customer support via WhatsApp.",
      };
    case "/payments":
      return {
        title: "Accepted Payment Methods — Bank Transfer & Mobile Wallets | Deez Prints",
        description:
          "Secure payment instructions for Deez Prints orders via Meezan Bank, Easypaisa, JazzCash, and Raast instant transfers.",
      };
    case "/trust":
      return {
        title: "Print Quality, Fabrics & Craftsmanship | Deez Prints",
        description:
          "Discover our 240+ GSM combed cotton blanks, hand-processed mineral acid wash, and industrial DTF print durability testing.",
      };
    case "/faq":
      return {
        title: "Frequently Asked Questions — Sizing, Delivery & Care | Deez Prints",
        description:
          "Common questions answered: fabric weights (GSM), how to wash acid-wash tees, delivery timelines in Karachi and nationwide Pakistan.",
      };
    case "/terms":
      return {
        title: "Terms of Service | Deez Prints",
        description:
          "Terms of service, purchasing agreements, and order fulfillment policies for Deez Prints Pakistan.",
      };
    case "/privacy":
      return {
        title: "Privacy Policy | Deez Prints",
        description:
          "Privacy policy detailing how customer information is securely processed for order fulfillment and delivery by Deez Prints.",
      };
    default:
      return {
        title: "Deez Prints — Premium Streetwear & Custom Printing in Pakistan",
        description:
          "Oversized drop-shoulder tees, vintage acid wash, and anime graphic apparel made in Karachi, delivered nationwide across Pakistan.",
      };
  }
}
