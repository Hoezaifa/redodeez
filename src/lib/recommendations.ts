import type { Product } from "@/data/products";

export function deriveDesignKey(p: Product): string {
  return p.id
    .replace(/^dp-(acid-wash|drop-shoulder|regular)-/, "")
    .replace(/^dp-(mug|tapestry|hoodie)-/, "")
    .replace(/^tshirt-(acid|drop)-/, "");
}

interface EntityInfo {
  character: string | null;
  universe: string | null;
  series: string | null;
}

export function getEntityInfo(p: Product): EntityInfo {
  const t = `${p.title} ${p.id}`.toLowerCase();

  // Marvel Universe
  if (/spider-?man|peter parker|spiderverse/.test(t)) {
    return { character: "Spider-Man", universe: "Marvel", series: "Spider-Man" };
  }
  if (/doctor doom|dr\.? doom|\bdoom\b/.test(t)) {
    return { character: "Doctor Doom", universe: "Marvel", series: "Fantastic Four / Avengers" };
  }
  if (/\bvenom\b/.test(t)) {
    return { character: "Venom", universe: "Marvel", series: "Spider-Man" };
  }
  if (/punisher|punish\b/.test(t)) {
    return { character: "Punisher", universe: "Marvel", series: "Punisher" };
  }

  // DC Universe
  if (/batman|dark knight|gotham|bruce wayne/.test(t)) {
    return { character: "Batman", universe: "DC", series: "Batman" };
  }
  if (/joker/.test(t)) {
    return { character: "Joker", universe: "DC", series: "Batman" };
  }

  // Anime Universes & Series
  if (/berserk|guts|griffith|skull blade|brand of sacrifice|eclipse/.test(t)) {
    return { character: "Guts", universe: "Anime", series: "Berserk" };
  }
  if (/dbz|dragon ball|goku|vegeta|bardock|gogeta|shenron/.test(t)) {
    return { character: "Goku/DBZ", universe: "Anime", series: "Dragon Ball" };
  }
  if (/naruto|itachi|sasuke|kakashi|madara|akatsuki/.test(t)) {
    return { character: "Naruto", universe: "Anime", series: "Naruto" };
  }
  if (/bleach|ichigo|aizen|yamamoto/.test(t)) {
    return { character: "Bleach", universe: "Anime", series: "Bleach" };
  }
  if (/jujutsu|jjk|gojo|sukuna|toji|choso|maki/.test(t)) {
    return { character: "Jujutsu Kaisen", universe: "Anime", series: "Jujutsu Kaisen" };
  }
  if (/chainsaw|denji|makima/.test(t)) {
    return { character: "Chainsaw Man", universe: "Anime", series: "Chainsaw Man" };
  }
  if (/blue lock|bluelock|isagi/.test(t)) {
    return { character: "Blue Lock", universe: "Anime", series: "Blue Lock" };
  }
  if (/one piece|luffy|zoro|ace/.test(t)) {
    return { character: "One Piece", universe: "Anime", series: "One Piece" };
  }
  if (/demon slayer|tanjiro/.test(t)) {
    return { character: "Demon Slayer", universe: "Anime", series: "Demon Slayer" };
  }
  if (/attack on titan|titan|eren|levi/.test(t)) {
    return { character: "Attack on Titan", universe: "Anime", series: "Attack on Titan" };
  }
  if (/tokyo ghoul|kaneki/.test(t)) {
    return { character: "Kaneki", universe: "Anime", series: "Tokyo Ghoul" };
  }
  if (/hunter x hunter|hxh|kurapika/.test(t)) {
    return { character: "Kurapika", universe: "Anime", series: "Hunter x Hunter" };
  }
  if (/one punch man|garou/.test(t)) {
    return { character: "Garou", universe: "Anime", series: "One Punch Man" };
  }

  // Music
  if (/tbsm|seedhe maut|encore|calm\b/.test(t)) {
    return { character: "Seedhe Maut", universe: "Music", series: "Seedhe Maut" };
  }
  if (/travis|cactus|utopia|highest in the room/.test(t)) {
    return { character: "Travis Scott", universe: "Music", series: "Travis Scott" };
  }
  if (/metallica/.test(t)) {
    return { character: "Metallica", universe: "Music", series: "Metallica" };
  }
  if (/guns n'? roses/.test(t)) {
    return { character: "Guns N' Roses", universe: "Music", series: "Guns N' Roses" };
  }

  // Cinema
  if (/american psycho|bateman/.test(t)) {
    return { character: "American Psycho", universe: "Cinema", series: "American Psycho" };
  }
  if (/fight club|tyler durden/.test(t)) {
    return { character: "Fight Club", universe: "Cinema", series: "Fight Club" };
  }
  if (/scarface|tony montana/.test(t)) {
    return { character: "Scarface", universe: "Cinema", series: "Scarface" };
  }
  if (/godfather/.test(t)) {
    return { character: "The Godfather", universe: "Cinema", series: "The Godfather" };
  }
  if (/breaking bad|walter white/.test(t)) {
    return { character: "Breaking Bad", universe: "Cinema", series: "Breaking Bad" };
  }

  return { character: null, universe: null, series: null };
}

/**
 * Prioritized recommendation engine:
 * 1. Same verified design in another garment edition (designKey match: +10,000 pts)
 * 2. Same character / series (+2,000 pts / +1,500 pts)
 * 3. Same universe (+500 pts) — ensures Marvel stays with Marvel, DC with DC
 * 4. Broader theme / aesthetic (+100 pts)
 * 5. Garment subcategory / fit (+30 pts)
 * 6. Deterministic tie-breaker (+0..9 pts)
 */
export function getRelatedProducts(product: Product, allProducts: Product[], limit = 4): Product[] {
  const isTapestry = product.subcategory === "tapestries" || product.subcategory === "flags";
  const isMug = product.category === "accessories" || product.subcategory === "mugs";
  const currentDesignKey = deriveDesignKey(product);
  const currentEntity = getEntityInfo(product);

  const candidates = allProducts.filter((p) => {
    if (p.id === product.id || (p as any).retired || !p.images || p.images.length === 0) return false;
    if (isTapestry) return p.subcategory === "tapestries" || p.subcategory === "flags";
    if (isMug) return p.category === "accessories" || p.subcategory === "mugs";
    return p.category === "t-shirts" || p.category === "hoodies";
  });

  const scored = candidates.map((p) => {
    let score = 0;
    const pDesignKey = deriveDesignKey(p);
    const pEntity = getEntityInfo(p);

    // 1. Same verified design in another garment edition
    if (currentDesignKey && pDesignKey && currentDesignKey === pDesignKey) {
      score += 10000;
    }

    // 2. Same character / series
    if (currentEntity.character && pEntity.character && currentEntity.character === pEntity.character) {
      score += 2000;
    } else if (currentEntity.series && pEntity.series && currentEntity.series === pEntity.series) {
      score += 1500;
    }

    // 3. Same universe (Marvel, DC, Anime, Music, Cinema)
    if (currentEntity.universe && pEntity.universe && currentEntity.universe === pEntity.universe) {
      score += 500;
    }

    // 4. Same aesthetic / theme
    if (product.aesthetic && p.aesthetic && product.aesthetic === p.aesthetic) {
      score += 100;
    }

    // 5. Same garment fit / subcategory
    if (product.subcategory === p.subcategory) {
      score += 30;
    }

    // Deterministic hash tie-breaker
    let hash = 0;
    const combined = product.id + p.id;
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash |= 0;
    }
    score += Math.abs(hash) % 10;

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.product);
}
