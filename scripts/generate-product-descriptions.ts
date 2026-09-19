import fs from "node:fs";
import path from "node:path";
import { products, type Product } from "../src/data/products";
import { getProductSeoData } from "../src/data/productSeoData";

function generateDescription(p: Product, index: number): string {
  const seo = getProductSeoData(p);
  const cleanTitle = p.title.trim();
  const primaryChar = seo.characters[0] || "";
  const franchise = seo.franchise || "";
  const isTapestry = seo.fit === "tapestry";
  const isMug = seo.fit === "mug";
  const isHoodie = seo.fit === "hoodie";
  const isAcidWash = seo.fit === "acid-wash";
  const isDropShoulder = seo.fit === "drop-shoulder";
  const isRegular = seo.fit === "regular";

  let entityPhrase = cleanTitle;
  if (primaryChar && franchise) {
    entityPhrase = `${primaryChar} from ${franchise}`;
  } else if (primaryChar) {
    entityPhrase = primaryChar;
  } else if (franchise) {
    entityPhrase = `${franchise} graphic`;
  }

  // 1. Varied opening sentences to prevent duplicate first sentence flags
  const OPENINGS = [
    `${cleanTitle} is a ${seo.fit.replace("-", " ")} graphic release from Deez Prints, showcasing ${entityPhrase} artwork.`,
    `Designed for streetwear enthusiasts, the ${cleanTitle} highlights ${entityPhrase} visuals in a distinct ${seo.fit.replace("-", " ")} profile.`,
    `The ${cleanTitle} brings authentic ${entityPhrase} detailing to a carefully finished ${seo.fit.replace("-", " ")} silhouette.`,
    `Featuring high-definition ${entityPhrase} artwork, the ${cleanTitle} is crafted for everyday durability and statement comfort.`,
    `Deez Prints presents the ${cleanTitle}, combining custom ${entityPhrase} imagery with a dedicated ${seo.fit.replace("-", " ")} cut.`,
    `Engineered for casual styling, the ${cleanTitle} features detailed ${entityPhrase} graphics across a specialized garment build.`,
    `The ${cleanTitle} delivers bold ${entityPhrase} artwork tailored directly on our signature ${seo.fit.replace("-", " ")} blank.`,
    `Inspired by ${entityPhrase}, the ${cleanTitle} showcases precise graphic execution on an authentic streetwear cut.`,
  ];

  const opening = OPENINGS[index % OPENINGS.length];

  // 2. Garment & fabric facts
  let garmentFact = "";
  if (isDropShoulder) {
    garmentFact =
      "Constructed from heavyweight 240+ GSM 100% combed compact cotton jersey, providing a structured boxy silhouette, dropped shoulders, and a durable ribbed neckband.";
  } else if (isAcidWash) {
    garmentFact =
      "Each shirt undergoes a specialized hand-processed mineral acid wash on 100% cotton fabric, yielding an individualized vintage patina with subtle tonal contrasts at the seams.";
  } else if (isRegular) {
    garmentFact =
      "Tailored in a classic regular fit using 180–200 GSM ring-spun cotton jersey, balancing breathable daily wear with clean drape lines.";
  } else if (isTapestry) {
    garmentFact =
      "Produced on lustrous high-density satin fabric, featuring finished hems and vibrant color contrast designed for clean wall hanging and room decoration.";
  } else if (isMug) {
    garmentFact =
      "Crafted from premium 11 oz white ceramic with a glossy finish and an ergonomic handle, perfect for daily coffee, tea, and desk display.";
  } else if (isHoodie) {
    garmentFact =
      "Constructed from plush 350+ GSM cotton fleece with a double-lined hood, kangaroo pocket, and ribbed cuffs for substantial cold-weather warmth.";
  }

  // 3. Print technology & production location
  let printFact = "";
  if (isTapestry) {
    printFact =
      "Digitally printed in Karachi using sublimation dye technology to ensure crisp graphical gradients that remain smooth and uniform across the textile.";
  } else if (isMug) {
    printFact =
      "Heat-pressed with high-resolution sublimation ink in Karachi, resulting in a scratch-resistant graphic surface that holds clarity through regular hand washing.";
  } else {
    printFact =
      "Discharged and cured in Karachi with industrial Direct-to-Film (DTF) printing technology, producing sharp edge definition and elastic print flexibility.";
  }

  // 4. Care guidelines
  let careFact = "";
  if (isTapestry) {
    careFact = "Hand wash in cool water or gentle spot-clean; iron on reverse at low temperature to release folds.";
  } else if (isMug) {
    careFact = "Microwave safe; gentle hand washing with non-abrasive sponge is recommended to preserve high-gloss luster.";
  } else {
    careFact =
      "Machine wash cold inside-out, wash with like colors, and air dry in shade. Avoid ironing directly on the printed artwork.";
  }

  // 5. Commercial & delivery facts from SEO_FACTS.md
  const deliveryFact =
    "Dispatched across Pakistan with flat shipping rates (Rs. 200 in Karachi, Rs. 450 nationwide, free on orders over Rs. 5,000) backed by a 7-day exchange window.";

  return `${opening} ${garmentFact} ${printFact} ${careFact} ${deliveryFact}`;
}

export function updateCatalogDescriptions() {
  const productsPath = path.resolve(process.cwd(), "src/data/products.ts");
  const rawContent = fs.readFileSync(productsPath, "utf-8");

  // Read existing products array
  const updatedProducts = products.map((p, index) => {
    const desc = generateDescription(p, index);
    return {
      ...p,
      description: desc,
    };
  });

  const declMatch = rawContent.match(/export const products: Product\[\] = \[/);
  if (!declMatch || declMatch.index === undefined) {
    throw new Error("Could not find export const products in products.ts");
  }

  const prefix = rawContent.slice(0, declMatch.index);
  const closingRegex = /\r?\n\];\r?\n\r?\n\/\/[^\r\n]*Product Override Merge/;
  const closingMatch = rawContent.match(closingRegex);
  if (!closingMatch || closingMatch.index === undefined) {
    throw new Error("Could not find closing token in products.ts");
  }
  const suffix = rawContent.slice(closingMatch.index + closingMatch[0].indexOf(";\n") + 1 || closingMatch.index + 3);

  // Read suffix from the semicolon after ];
  const matchStr = closingMatch[0];
  const semiIndex = matchStr.indexOf(";");
  const trueSuffix = rawContent.slice(closingMatch.index + semiIndex + 1);

  const serializedProducts =
    "export const products: Product[] = " + JSON.stringify(updatedProducts, null, 2) + ";\n";

  const newContent = prefix + serializedProducts + trueSuffix;

  fs.writeFileSync(productsPath, newContent, "utf-8");
  console.log(`Successfully updated descriptions for all ${updatedProducts.length} products!`);
}

updateCatalogDescriptions();
