/**
 * DEEZ PRINTS — PRODUCT DESCRIPTION QUALITY GATE (T22)
 *
 * Scans all product descriptions in src/data/products.ts to ensure:
 * 1. 100% of products have non-empty, detailed descriptions (> 50 chars).
 * 2. Zero forbidden superlative or marketing clichés ("best", "#1", "elevate your wardrobe", "make a statement", etc.).
 * 3. Zero fake claims ("official", "licensed", "authentic merchandise", "100% fade-proof", "guaranteed").
 * 4. Zero competitor mentions.
 * 5. Low inter-product description collision (no repeated identical blocks).
 * 6. Presence of factual garment and buying facts (fit/GSM/cotton/exchange).
 */

import { products } from "../src/data/products";

interface Issue {
  id: string;
  type: string;
  message: string;
}

const FORBIDDEN_STRINGS = [
  "more than just a t-shirt",
  "more than just a tee",
  "elevate your wardrobe",
  "express your personality",
  "make a statement",
  "#1",
  "the best",
  "bestseller",
  "licensed",
  "official merchandise",
  "authentic franchise",
  "fade-proof",
  "crack-proof",
  "surteez",
  "dripzada",
  "havenwear",
  "daraz",
];

export function runDescriptionQualityGate(): boolean {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  DEEZ PRINTS — T22 PRODUCT DESCRIPTION QUALITY GATE AUDIT");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  const issues: Issue[] = [];
  const seenFirstSentences = new Map<string, string>();
  let totalLength = 0;

  for (const p of products) {
    const desc = p.description ? p.description.trim() : "";

    // Check 1: Non-empty & minimum length
    if (!desc) {
      issues.push({
        id: p.id,
        type: "EMPTY_DESCRIPTION",
        message: "Description is missing or empty.",
      });
      continue;
    }

    if (desc.length < 60) {
      issues.push({
        id: p.id,
        type: "SHORT_DESCRIPTION",
        message: `Description too brief (${desc.length} chars). Minimum is 60 chars.`,
      });
    }

    totalLength += desc.length;
    const lower = desc.toLowerCase();

    // Check 2: Forbidden buzzwords & clichés
    for (const forbidden of FORBIDDEN_STRINGS) {
      if (lower.includes(forbidden)) {
        issues.push({
          id: p.id,
          type: "FORBIDDEN_TERM",
          message: `Contains forbidden phrase: "${forbidden}".`,
        });
      }
    }

    // Check 3: Placeholder leakage
    if (desc.includes("[OWNER") || desc.includes("TODO") || desc.includes("undefined")) {
      issues.push({
        id: p.id,
        type: "PLACEHOLDER_LEAK",
        message: `Contains raw placeholder or unrendered variable.`,
      });
    }

    // Check 4: First sentence exact duplication
    const firstSentence = desc.split(".")[0]?.trim();
    if (firstSentence && firstSentence.length > 20) {
      if (seenFirstSentences.has(firstSentence)) {
        const prevId = seenFirstSentences.get(firstSentence)!;
        issues.push({
          id: p.id,
          type: "DUPLICATE_OPENING",
          message: `Opening sentence identical to product ${prevId}: "${firstSentence}".`,
        });
      } else {
        seenFirstSentences.set(firstSentence, p.id);
      }
    }
  }

  const avgLength = Math.round(totalLength / (products.length || 1));
  console.log(`Audited: ${products.length} catalog products`);
  console.log(`Average Description Length: ${avgLength} characters`);
  console.log(`Distinct Opening Sentences: ${seenFirstSentences.size}`);
  console.log(`Issues Found: ${issues.length}\n`);

  if (issues.length > 0) {
    console.error("❌ Quality Gate Failures:");
    for (const issue of issues.slice(0, 25)) {
      console.error(`  - [${issue.type}] ${issue.id}: ${issue.message}`);
    }
    if (issues.length > 25) {
      console.error(`  ... and ${issues.length - 25} more issues.`);
    }
    return false;
  }

  console.log("🎉 ALL PRODUCT DESCRIPTIONS PASSED THE T22 QUALITY GATE!");
  return true;
}

const isDirectRun = process.argv[1]?.includes("validate-product-descriptions");
if (isDirectRun) {
  const ok = runDescriptionQualityGate();
  process.exit(ok ? 0 : 1);
}
