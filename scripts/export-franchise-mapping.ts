import fs from "node:fs";
import path from "node:path";
import { products } from "../src/data/products";

interface FranchiseRule {
  franchise: string;
  characters: string[];
  keywords: string[];
}

const RULES: FranchiseRule[] = [
  {
    franchise: "One Piece",
    characters: ["Luffy", "Zoro", "Ace", "Fire Fist Ace"],
    keywords: ["one piece", "luffy", "zoro", "fire fist ace", "ace"],
  },
  {
    franchise: "Dragon Ball",
    characters: ["Goku", "Vegeta", "Majin Vegeta", "Shenron"],
    keywords: ["dragon ball", "dbz", "goku", "vegeta", "majin vegeta", "shenron"],
  },
  {
    franchise: "Naruto",
    characters: ["Naruto", "Itachi", "Madara", "Akatsuki"],
    keywords: ["naruto", "itachi", "madara", "akatsuki"],
  },
  {
    franchise: "Jujutsu Kaisen",
    characters: ["Sukuna", "Gojo", "Choso", "Maki"],
    keywords: ["jujutsu kaisen", "jjk", "sukuna", "gojo", "choso", "maki"],
  },
  {
    franchise: "Bleach",
    characters: ["Ichigo", "Aizen"],
    keywords: ["bleach", "ichigo", "aizen"],
  },
  {
    franchise: "Berserk",
    characters: ["Guts"],
    keywords: ["berserk", "guts"],
  },
  {
    franchise: "Chainsaw Man",
    characters: ["Denji"],
    keywords: ["chainsaw man", "chainsaw", "denji"],
  },
  {
    franchise: "Solo Leveling",
    characters: ["Sung Jinwoo"],
    keywords: ["solo leveling"],
  },
  {
    franchise: "Blue Lock",
    characters: ["Isagi"],
    keywords: ["blue lock", "bluelock", "isagi"],
  },
  {
    franchise: "Tokyo Ghoul",
    characters: ["Kaneki"],
    keywords: ["tokyo ghoul", "kaneki"],
  },
  {
    franchise: "One Punch Man",
    characters: ["Garou"],
    keywords: ["one punch man", "garou"],
  },
  {
    franchise: "Hunter x Hunter",
    characters: ["Kurapika"],
    keywords: ["hunter x hunter", "hxh", "kurapika"],
  },
  {
    franchise: "Demon Slayer",
    characters: ["Tanjiro"],
    keywords: ["demon slayer", "tanjiro"],
  },
  {
    franchise: "Marvel",
    characters: ["Spider-Man", "Peter Parker"],
    keywords: ["spider-man", "spiderman", "peter parker", "spiderverse", "marvel"],
  },
  {
    franchise: "DC",
    characters: ["Batman", "Dark Knight"],
    keywords: ["batman", "dark knight"],
  },
  {
    franchise: "Cinema",
    characters: [],
    keywords: ["goodfellas", "scarface", "godfather", "fight club", "american psycho", "breaking bad"],
  },
  {
    franchise: "TV",
    characters: ["Rick & Morty"],
    keywords: ["rick & morty", "rick and morty"],
  },
];

const FLAG_FOR_REVIEW_TERMS = [
  "yamoto",
  "yamamoto",
  "inferno",
  "titan",
  "formula speed",
  "cupid vintage",
  "see no evil",
  "rockstar tokyo",
  "outlaw",
  "living the dream",
  "maki oze",
];

function escapeCsv(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export function analyzeCatalog() {
  const rows: Array<{
    slug: string;
    current_title: string;
    fit: string;
    proposed_character: string;
    proposed_franchise: string;
    confidence: "high" | "low" | "none";
    needs_owner_review: "yes" | "no";
    notes: string;
  }> = [];

  for (const p of products) {
    const titleLower = p.title.toLowerCase();
    const idLower = p.id.toLowerCase();
    const subcat = p.subcategory || p.category;

    let fit = "regular";
    if (subcat === "drop-shoulder") fit = "drop-shoulder";
    else if (subcat === "acid-wash") fit = "acid-wash";
    else if (subcat === "tapestries" || subcat === "flags") fit = "tapestry";
    else if (p.category === "accessories") fit = "mug";
    else if (p.category === "hoodies") fit = "hoodie";

    let proposedFranchise = "";
    let proposedCharacter = "";
    let confidence: "high" | "low" | "none" = "none";
    let needsReview: "yes" | "no" = "no";
    let notes = "";

    // Check review flags
    const matchedFlag = FLAG_FOR_REVIEW_TERMS.find((term) => titleLower.includes(term) || idLower.includes(term));
    if (matchedFlag) {
      needsReview = "yes";
      notes += `Contains flagged term '${matchedFlag}'. `;
    }

    // Check rules
    for (const rule of RULES) {
      const matchKeyword = rule.keywords.find((k) => titleLower.includes(k) || idLower.includes(k));
      if (matchKeyword) {
        proposedFranchise = rule.franchise;
        confidence = "high";
        // Find matching character
        const matchedChar = rule.characters.find((c) => titleLower.includes(c.toLowerCase()) || idLower.includes(c.toLowerCase()));
        if (matchedChar) {
          proposedCharacter = matchedChar;
        } else if (matchKeyword && !rule.characters.length) {
          // Cinema / title based
          proposedCharacter = matchKeyword.toUpperCase();
        }
        break;
      }
    }

    if (!proposedFranchise) {
      needsReview = "yes";
      confidence = "none";
      notes += "Original / uncategorized design. ";
    }

    rows.push({
      slug: p.id,
      current_title: p.title,
      fit,
      proposed_character: proposedCharacter,
      proposed_franchise: proposedFranchise,
      confidence,
      needs_owner_review: needsReview,
      notes: notes.trim(),
    });
  }

  const csvHeader = "slug,current_title,fit,proposed_character,proposed_franchise,confidence,needs_owner_review,notes\n";
  const csvContent =
    csvHeader +
    rows
      .map((r) =>
        [
          r.slug,
          escapeCsv(r.current_title),
          r.fit,
          escapeCsv(r.proposed_character),
          escapeCsv(r.proposed_franchise),
          r.confidence,
          r.needs_owner_review,
          escapeCsv(r.notes),
        ].join(",")
      )
      .join("\n");

  const outPath = path.resolve(process.cwd(), "franchise_mapping.csv");
  fs.writeFileSync(outPath, csvContent, "utf-8");
  console.log(`Exported ${rows.length} products to ${outPath}`);
  return rows;
}

analyzeCatalog();
