"""
Generate final src/data/products.ts with authentic imported products and accessories.
"""
import os
import re
import json
from pathlib import Path

MANIFEST_PATH = Path(r"D:\DEEZ SHIT\outputs\upload_manifest.json")
OUTPUT_TS = Path(r"d:\redo deez\deez-prints-main\src\data\products.ts")

KNOWN_COLORS = {
    'black': 'Black',
    'white': 'White',
    'whte': 'White',
    'whiet': 'White',
    'wite': 'White',
    'beige': 'Beige',
    'biege': 'Beige',
    'grey': 'Grey',
    'gray': 'Grey',
    'gre': 'Grey',
    'blue': 'Blue',
    'navy': 'Navy',
    'maroon': 'Maroon',
    'red': 'Red',
    'olive': 'Olive',
    'sand': 'Sand',
    'green': 'Green',
    'yellow': 'Yellow',
    'purple': 'Purple',
}

DESIGN_TYPO_MAP = {
    'solo1': 'solo-1',
    'solo2': 'solo-2',
    'berserk2': 'berserk-2',
    'berserk3': 'berserk-3',
    'chainsaw2': 'chainsaw-2',
    'luffty-1': 'luffy-1',
    'sakuna': 'sukuna',
    'regularssss': 'regular-series',
    'tachi': 'itachi',
    'darknight': 'dark-knight',
    'dark-night': 'dark-knight',
    'naruto-2-grye': 'naruto-2',
    'naruto-1-b;ack': 'naruto-1',
    'madara-blackl': 'madara',
    'peter-blyue': 'peter',
    'eyes-blackkk': 'eyes',
}

SUBCAT_PRICES = {
    'regular': 2500,
    'drop-shoulder': 2900,
    'acid-wash': 3200,
}

SUBCAT_LABELS = {
    'regular': 'REGULAR OVERSIZED TEE',
    'drop-shoulder': 'DROP SHOULDER TEE',
    'acid-wash': 'ACID WASH TEE',
}

def parse_filename(stem):
    side = 'front'
    if stem.endswith('-back'):
        side = 'back'
        stem = stem[:-5]
    elif stem.endswith('-front'):
        side = 'front'
        stem = stem[:-6]
    
    stem = re.sub(r'-+', '-', stem).strip('-')
    
    color = 'Black'
    design = stem
    
    found_color = None
    parts = stem.split('-')
    if len(parts) > 1 and parts[-1].lower() in KNOWN_COLORS:
        found_color = KNOWN_COLORS[parts[-1].lower()]
        design = '-'.join(parts[:-1])
    else:
        for c_key, c_val in KNOWN_COLORS.items():
            if stem.lower().endswith(c_key) and len(stem) > len(c_key):
                found_color = c_val
                design = stem[:-len(c_key)].rstrip('-')
                break
    
    if found_color:
        color = found_color
        
    design = re.sub(r'-+', '-', design).strip('-').lower()
    if design in DESIGN_TYPO_MAP:
        design = DESIGN_TYPO_MAP[design]
        
    return design, color, side

def format_title(design, subcat):
    parts = [p.upper() for p in design.split('-')]
    design_name = ' '.join(parts)
    label = SUBCAT_LABELS.get(subcat, 'TEE')
    return f"{design_name} {label}"

AUTHENTIC_ACCESSORIES = [
    {
        "id": "mug-white",
        "title": "SKULL CERAMIC MUG",
        "price": 600,
        "category": "accessories",
        "subcategory": "mugs",
        "images": [
            "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772897480/mug_sample_sfu1kd.webp"
        ],
        "colors": ["White"],
        "rating": 5
    },
    {
        "id": "mug-colored",
        "title": "SUBLIMATION MUG (INNER + HANDLE COLORED)",
        "price": 1200,
        "category": "accessories",
        "subcategory": "mugs",
        "images": [
            "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"
        ],
        "colors": ["Red", "Green", "Black", "Blue"],
        "rating": 5
    },
    {
        "id": "mug-manga-panel",
        "title": "MANGA PANEL MUG",
        "price": 2000,
        "category": "accessories",
        "subcategory": "mugs",
        "images": [
            "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773596802/mug_collection_gntc3f.webp"
        ],
        "colors": ["White"],
        "rating": 5
    },
    {
        "id": "tapestry-berserk-eclipse",
        "title": "BERSERK ECLIPSE TAPESTRY",
        "price": 1000,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/berserk_eclipse_tapestry.webp"],
        "colors": [],
        "rating": 5
    },
    {
        "id": "tapestry-cyber-city",
        "title": "CYBER CITY NIGHT TAPESTRY",
        "price": 2000,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/cyber_city_night_tapestry.webp"],
        "colors": [],
        "rating": 5
    },
    {
        "id": "tapestry-manga-panel",
        "title": "ITACHI MANGA PANEL TAPESTRY",
        "price": 2100,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/itachi_manga_panel_tapestry.webp"],
        "colors": [],
        "rating": 5
    },
    {
        "id": "tapestry-rick-and-morty",
        "title": "RICK & MORTY TAPESTRY",
        "price": 2000,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/rick_and_morty_tapestry.webp"],
        "colors": [],
        "rating": 5
    },
    {
        "id": "tapestry-vagabond",
        "title": "VAGABOND TAPESTRY",
        "price": 2100,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/vagabond_tapestry.webp"],
        "colors": [],
        "rating": 5
    }
]

def build_ts_catalog():
    if not MANIFEST_PATH.exists():
        print("Manifest missing!")
        return
        
    with open(MANIFEST_PATH, 'r') as f:
        manifest = json.load(f)
        
    cat_mapping = {
        'regular': 'regular',
        'drops': 'drop-shoulder',
        'acid': 'acid-wash',
    }
    
    products_grouped = {}
    
    for manifest_key, url in manifest.items():
        cat_folder, stem = manifest_key.split('/', 1)
        subcat = cat_mapping.get(cat_folder, 'regular')
        
        design, color, side = parse_filename(stem)
        
        pkey = (subcat, design)
        if pkey not in products_grouped:
            products_grouped[pkey] = {}
        if color not in products_grouped[pkey]:
            products_grouped[pkey][color] = {}
            
        products_grouped[pkey][color][side] = url
        
    all_products = []
    
    # Process apparel products
    for (subcat, design), colors_data in sorted(products_grouped.items()):
        pid = f"dp-{subcat}-{design}"
        title = format_title(design, subcat)
        price = SUBCAT_PRICES.get(subcat, 2500)
        colors = list(colors_data.keys())
        
        images = []
        for color, sides in colors_data.items():
            if 'front' in sides:
                images.append(sides['front'])
            if 'back' in sides:
                images.append(sides['back'])
                
        all_products.append({
            'id': pid,
            'title': title,
            'price': price,
            'category': 't-shirts',
            'subcategory': subcat,
            'images': images,
            'colors': colors,
            'rating': 5
        })
        
    # Append authentic accessories
    all_products.extend(AUTHENTIC_ACCESSORIES)
    
    print(f"Total products ready for export: {len(all_products)}")
    return all_products

def generate_ts_file(products):
    ts_code = '''export interface Product {
  id: string;
  title: string;
  price: number;
  category: "t-shirts" | "accessories" | "hoodies" | "jerseys";
  subcategory: "regular" | "graphic" | "drop-shoulder" | "acid-wash" | "mugs" | "flags" | "tapestries" | "wristbands" | "badges" | "wallet-cards" | "keychains" | "magnets" | "notebooks" | "gift-boxes" | "hoodies" | "jerseys";
  images: string[];
  sizes?: string[];
  colors?: string[];
  description?: string;
  rating?: number;
}

export interface ProductOverrideData {
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

export const products: Product[] = ''' + json.dumps(products, indent=2) + ''';

// ─── Product Override Merge ────────────────────────────────────────────────────

/**
 * Merge a map of database overrides onto the static products array.
 * Returns a new array — does NOT mutate the original.
 */
export function mergeOverrides(
  base: Product[],
  overrides: Record<string, ProductOverrideData>
): Product[] {
  if (!overrides || Object.keys(overrides).length === 0) return base;
  return base.map((p) => {
    const ov = overrides[p.id];
    if (!ov) return p;
    return {
      ...p,
      ...(ov.title !== undefined && { title: ov.title }),
      ...(ov.price !== undefined && { price: ov.price }),
      ...(ov.description !== undefined && { description: ov.description }),
      ...(ov.sizes !== undefined && { sizes: ov.sizes }),
      ...(ov.colors !== undefined && { colors: ov.colors }),
    };
  });
}

import { getProductOverridesFn } from "@/lib/productFunctions";

/**
 * Fetch product overrides from the DB.
 * Works from both client-side and during SSR.
 * Returns a record keyed by product ID.
 */
export async function fetchProductOverrides(): Promise<Record<string, ProductOverrideData>> {
  try {
    const overrides = await getProductOverridesFn();
    if (overrides && typeof overrides === "object") {
      return overrides;
    }
  } catch (err) {
    console.warn("getProductOverridesFn error, trying fallback:", err);
  }

  try {
    if (typeof window === "undefined") {
      const { getProductOverridesFromDb } = await import("@/lib/dbService");
      return await getProductOverridesFromDb();
    }
    const res = await fetch("/api/products");
    if (!res.ok) return {};
    const json = await res.json();
    return json.ok ? json.overrides : {};
  } catch {
    return {};
  }
}

/**
 * Get the full product list with DB overrides applied.
 * This is the primary function all product-consuming code should use.
 */
export async function getProducts(): Promise<Product[]> {
  const overrides = await fetchProductOverrides();
  return mergeOverrides(products, overrides);
}

export type ProductWithTimestamp = Product & {
  lastmod: string;
};

/**
 * Get products with accurate update timestamps (lastmod) for sitemap generation.
 */
export async function getProductsWithTimestamps(): Promise<ProductWithTimestamp[]> {
  let dbMetadata: Record<string, { data: ProductOverrideData; updatedAt?: string }> = {};

  try {
    if (typeof window === "undefined") {
      const { getProductOverridesWithMetadataFromDb } = await import("@/lib/dbService");
      dbMetadata = await getProductOverridesWithMetadataFromDb();
    }
  } catch (err) {
    console.warn("Failed to fetch product overrides with metadata:", err);
  }

  let baseCatalogLastMod = new Date().toISOString();
  if (typeof window === "undefined") {
    try {
      const fs = await import("node:fs");
      const path = await import("node:path");
      const filePath = path.resolve(process.cwd(), "src/data/products.ts");
      if (fs.existsSync(filePath)) {
        baseCatalogLastMod = fs.statSync(filePath).mtime.toISOString();
      }
    } catch {
      /* fallback */
    }
  }

  const overridesMap: Record<string, ProductOverrideData> = {};
  for (const [id, meta] of Object.entries(dbMetadata)) {
    if (meta && meta.data) {
      overridesMap[id] = meta.data;
    }
  }

  const merged = mergeOverrides(products, overridesMap);

  return merged.map((p) => {
    const meta = dbMetadata[p.id];
    const lastmod = meta?.updatedAt || baseCatalogLastMod;
    return {
      ...p,
      lastmod,
    };
  });
}
'''
    with open(OUTPUT_TS, 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print(f"Successfully written updated products catalog to {OUTPUT_TS}")

if __name__ == '__main__':
    prods = build_ts_catalog()
    if prods:
        generate_ts_file(prods)
