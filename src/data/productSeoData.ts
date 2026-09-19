/**
 * DEEZ PRINTS — NORMALIZED PRODUCT SEO DATA MODEL (T23)
 *
 * Single source of truth for machine-readable product SEO representation across:
 * - HTML Head Metadata (seoMeta.ts)
 * - JSON-LD Structured Data (structuredData.ts)
 * - Google Merchant Center Feed (products-feed.xml)
 * - OpenAI ChatGPT Merchant Feed (openai-products-feed.json)
 * - Sitemaps & Image Sitemaps (sitemap.xml)
 */

import { products, type Product } from "@/data/products";
import { SITE_URL, toAbsoluteImageUrl } from "@/data/site";
import { productMeta } from "@/lib/seoMeta";

export interface NormalizedProductSeo {
  id: string;
  canonicalUrl: string;
  displayName: string;
  seoTitle: string;
  metaDescription: string;
  productType: string;
  designName: string;
  franchise: string | null;
  characters: string[];
  fit: "drop-shoulder" | "acid-wash" | "regular" | "tapestry" | "mug" | "hoodie";
  gsm: string;
  material: string;
  printMethod: string;
  color: string;
  sizes: string[];
  price: number;
  currency: "PKR";
  availability: "in_stock" | "out_of_stock";
  description: string;
  imageUrls: string[];
  imageAlt: string[];
  designKey: string;
}

const FRANCHISE_PATTERNS: Array<{
  franchise: string;
  keywords: string[];
  characters: Array<{ name: string; aliases: string[] }>;
}> = [
  {
    franchise: "One Piece",
    keywords: ["one piece", "luffy", "zoro", "fire fist ace", "ace"],
    characters: [
      { name: "Luffy", aliases: ["luffy", "gear 5", "freedom"] },
      { name: "Zoro", aliases: ["zoro", "bushido", "ronin"] },
      { name: "Ace", aliases: ["ace", "fire fist"] },
    ],
  },
  {
    franchise: "Dragon Ball",
    keywords: ["dragon ball", "dbz", "goku", "vegeta", "majin vegeta", "shenron"],
    characters: [
      { name: "Vegeta", aliases: ["vegeta", "majin vegeta"] },
      { name: "Goku", aliases: ["goku", "shenron", "black rebellion"] },
    ],
  },
  {
    franchise: "Naruto",
    keywords: ["naruto", "itachi", "madara", "akatsuki"],
    characters: [
      { name: "Itachi", aliases: ["itachi"] },
      { name: "Madara", aliases: ["madara"] },
      { name: "Naruto", aliases: ["naruto"] },
    ],
  },
  {
    franchise: "Jujutsu Kaisen",
    keywords: ["jujutsu kaisen", "jjk", "sukuna", "gojo", "choso", "maki"],
    characters: [
      { name: "Sukuna", aliases: ["sukuna"] },
      { name: "Gojo", aliases: ["gojo"] },
      { name: "Choso", aliases: ["choso"] },
      { name: "Maki", aliases: ["maki"] },
    ],
  },
  {
    franchise: "Bleach",
    keywords: ["bleach", "ichigo", "aizen"],
    characters: [
      { name: "Aizen", aliases: ["aizen"] },
      { name: "Ichigo", aliases: ["ichigo"] },
    ],
  },
  {
    franchise: "Berserk",
    keywords: ["berserk", "guts"],
    characters: [{ name: "Guts", aliases: ["guts", "skull blade"] }],
  },
  {
    franchise: "Chainsaw Man",
    keywords: ["chainsaw man", "chainsaw", "denji"],
    characters: [{ name: "Denji", aliases: ["denji", "chainsaw"] }],
  },
  {
    franchise: "Blue Lock",
    keywords: ["blue lock", "bluelock", "isagi"],
    characters: [{ name: "Isagi", aliases: ["isagi"] }],
  },
  {
    franchise: "Tokyo Ghoul",
    keywords: ["tokyo ghoul", "kaneki"],
    characters: [{ name: "Kaneki", aliases: ["kaneki"] }],
  },
  {
    franchise: "One Punch Man",
    keywords: ["one punch man", "garou"],
    characters: [{ name: "Garou", aliases: ["garou"] }],
  },
  {
    franchise: "Hunter x Hunter",
    keywords: ["hunter x hunter", "hxh", "kurapika"],
    characters: [{ name: "Kurapika", aliases: ["kurapika"] }],
  },
  {
    franchise: "Demon Slayer",
    keywords: ["demon slayer", "tanjiro"],
    characters: [{ name: "Tanjiro", aliases: ["tanjiro"] }],
  },
  {
    franchise: "Marvel",
    keywords: ["spider-man", "spiderman", "peter parker", "spiderverse", "marvel"],
    characters: [{ name: "Spider-Man", aliases: ["spider-man", "spiderman", "peter parker"] }],
  },
  {
    franchise: "DC",
    keywords: ["batman", "dark knight"],
    characters: [{ name: "Batman", aliases: ["batman", "dark knight"] }],
  },
  {
    franchise: "Cinema",
    keywords: ["goodfellas", "scarface", "godfather", "fight club", "american psycho", "breaking bad"],
    characters: [],
  },
  {
    franchise: "TV",
    keywords: ["rick & morty", "rick and morty"],
    characters: [{ name: "Rick & Morty", aliases: ["rick & morty", "rick and morty"] }],
  },
];

/** Extract canonical design key to group sibling fits (drop, acid, regular) */
export function deriveDesignKey(product: Product): string {
  return product.id
    .replace(/^dp-(acid-wash|drop-shoulder|regular)-/, "")
    .replace(/^dp-(mug|tapestry|hoodie)-/, "")
    .replace(/^tshirt-(acid|drop)-/, "");
}

/** Normalize and enrich product data for SEO consumption */
export function getProductSeoData(product: Product): NormalizedProductSeo {
  const titleLower = product.title.toLowerCase();
  const idLower = product.id.toLowerCase();
  const subcat = product.subcategory || product.category;

  let franchise: string | null = null;
  const characters: string[] = [];

  for (const group of FRANCHISE_PATTERNS) {
    if (group.keywords.some((kw) => titleLower.includes(kw) || idLower.includes(kw))) {
      franchise = group.franchise;
      for (const char of group.characters) {
        if (char.aliases.some((al) => titleLower.includes(al) || idLower.includes(al))) {
          characters.push(char.name);
        }
      }
      break;
    }
  }

  let fit: "drop-shoulder" | "acid-wash" | "regular" | "tapestry" | "mug" | "hoodie" = "regular";
  let gsm = "180–200 GSM";
  let material = "100% Combed Ring-Spun Cotton Jersey";
  let printMethod = "Direct-to-Film (DTF)";
  let productType = "Apparel > T-Shirts > Regular Fit Graphic Tees";
  const defaultSizes = ["S", "M", "L", "XL"];

  if (subcat === "drop-shoulder") {
    fit = "drop-shoulder";
    gsm = "240+ GSM";
    material = "100% Combed Compact Cotton Jersey";
    printMethod = "Direct-to-Film (DTF)";
    productType = "Apparel > T-Shirts > Drop Shoulder Oversized Tees";
  } else if (subcat === "acid-wash") {
    fit = "acid-wash";
    gsm = "220+ GSM Mineral Wash";
    material = "100% Cotton (Hand-Dyed Mineral Wash)";
    printMethod = "Direct-to-Film (DTF)";
    productType = "Apparel > T-Shirts > Vintage Acid Wash Graphic Tees";
  } else if (subcat === "tapestries" || subcat === "flags") {
    fit = "tapestry";
    gsm = "Standard High-Density Satin";
    material = "High-Density Lustrous Satin Fabric";
    printMethod = "Digital Sublimation";
    productType = "Home & Decor > Wall Art > Tapestries";
  } else if (product.category === "accessories") {
    fit = "mug";
    gsm = "11 oz Ceramic";
    material = "Ceramic";
    printMethod = "Sublimation Heat Press";
    productType = "Home & Kitchen > Drinkware > Coffee Mugs";
  } else if (product.category === "hoodies") {
    fit = "hoodie";
    gsm = "350+ GSM";
    material = "100% Cotton Fleece";
    printMethod = "Direct-to-Film (DTF)";
    productType = "Apparel > Outerwear > Streetwear Hoodies";
  }

  const primaryColor = product.colors && product.colors.length > 0 ? product.colors[0] : "Black";
  const absImages = (product.images || []).map(toAbsoluteImageUrl).filter(Boolean);

  const meta = productMeta(product, franchise, characters[0] || null);

  const imageAlt = absImages.map((_, idx) => {
    const viewType = idx === 0 ? "front view" : idx === 1 ? "back graphic view" : "detail view";
    const entity = characters[0] ? `${characters[0]} ${franchise || ""}` : product.title;
    return `${entity.trim()} ${fit === "tapestry" ? "wall tapestry" : "t-shirt in " + primaryColor} — ${viewType}`;
  });

  return {
    id: product.id,
    canonicalUrl: `${SITE_URL}/products/${product.id}`,
    displayName: product.title,
    seoTitle: meta.title,
    metaDescription: meta.description,
    productType,
    designName: product.title.replace(/\s+(Tee|T-Shirt|Acid Wash|Drop Shoulder)$/i, "").trim(),
    franchise,
    characters,
    fit,
    gsm,
    material,
    printMethod,
    color: primaryColor,
    sizes: defaultSizes,
    price: product.price,
    currency: "PKR",
    availability: "in_stock",
    description: product.description || meta.description,
    imageUrls: absImages,
    imageAlt,
    designKey: deriveDesignKey(product),
  };
}

export function getAllProductSeoData(): NormalizedProductSeo[] {
  return products.map(getProductSeoData);
}
