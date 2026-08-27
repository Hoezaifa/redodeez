"""
Generate final src/data/products.ts with authentic imported products,
correct filename mapping, aesthetic fields (Anime Archive, etc.), clean grouping,
and diverse graphic showcase & hover cover images (filtering out blank fabric mockups).
"""
import os
import re
import json
from pathlib import Path

MANIFEST_PATH = Path(r"D:\DEEZ SHIT\outputs\upload_manifest.json")
BLANK_KEYS_PATH = Path(r"d:\redo deez\deez-prints-main\scripts\blank_keys.json")
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

# Explicit file remapping rules for misnamed raw files or typo stems
EXPLICIT_REMAP = {
    # In drops: madara-beige & madara-white & tachi-whtie are actually ITACHI
    'drops/madara-beige-back': ('drops', 'itachi', 'Beige', 'back'),
    'drops/madara-beige-front': ('drops', 'itachi', 'Beige', 'front'),
    'drops/madara-white-back': ('drops', 'itachi', 'White', 'back'),
    'drops/madara-white-front': ('drops', 'itachi', 'White', 'front'),
    'drops/madara-blue-back': ('drops', 'itachi', 'Blue', 'back'),
    'drops/tachi-whtie-back': ('drops', 'itachi', 'White', 'back'),
    'drops/tachi-whtie-front': ('drops', 'itachi', 'White', 'front'),
    'drops/luffty-1-beige-back': ('drops', 'luffy-1', 'Beige', 'back'),
    'drops/luffty-1-beige-front': ('drops', 'luffy-1', 'Beige', 'front'),
    'drops/madara-blackl-back': ('drops', 'madara', 'Black', 'back'),
    'drops/madara-blackl-front': ('drops', 'madara', 'Black', 'front'),
    'drops/naruto-2-grye-front': ('drops', 'naruto-2', 'Grey', 'front'),
    'drops/peter-blyue-back': ('drops', 'peter', 'Blue', 'back'),
    'drops/peter-blyue-front': ('drops', 'peter', 'Blue', 'front'),
    'drops/regularssss-back': ('drops', 'regular-series', 'Black', 'back'),
    'drops/regularssss-front': ('drops', 'regular-series', 'Black', 'front'),
    'acid/aizen-gre-back': ('acid', 'aizen', 'Grey', 'back'),
    'acid/aizen-gre-front': ('acid', 'aizen', 'Grey', 'front'),
    'acid/berserk2--black-back': ('acid', 'berserk-2', 'Black', 'back'),
    'acid/berserk2--black-front': ('acid', 'berserk-2', 'Black', 'front'),
    'acid/dbz-2-blkac-back': ('acid', 'dbz-2', 'Black', 'back'),
    'acid/dbz-2-blkac-front': ('acid', 'dbz-2', 'Black', 'front'),
    'acid/eyes-blackkk-back': ('acid', 'eyes', 'Black', 'back'),
    'acid/eyes-blackkk-front': ('acid', 'eyes', 'Black', 'front'),
    'acid/luffy-4-greyt-front': ('acid', 'luffy-4', 'Grey', 'front'),
    'acid/naruto-1-b;ack-back': ('acid', 'naruto-1', 'Black', 'back'),
    'acid/naruto-1-b;ack-front': ('acid', 'naruto-1', 'Black', 'front'),
    'acid/sakuna-black-back': ('acid', 'sukuna', 'Black', 'back'),
    'acid/sakuna-black-front': ('acid', 'sukuna', 'Black', 'front'),
    'acid/solo1-black-back': ('acid', 'solo-1', 'Black', 'back'),
    'acid/solo1-black-front': ('acid', 'solo-1', 'Black', 'front'),
    'acid/solo2--grey-front': ('acid', 'solo-2', 'Grey', 'front'),
    'regular/baby-whiet-back': ('regular', 'baby', 'White', 'back'),
    'regular/baby-whiet-front': ('regular', 'baby', 'White', 'front'),
    'regular/berserkbeige-back': ('regular', 'berserk', 'Beige', 'back'),
    'regular/berserkbeige-front': ('regular', 'berserk', 'Beige', 'front'),
    'regular/berserkwhte-back': ('regular', 'berserk', 'White', 'back'),
    'regular/berserkwhte-front': ('regular', 'berserk', 'White', 'front'),
    'regular/dbz2-black-back': ('regular', 'dbz-2', 'Black', 'back'),
    'regular/dbz2-black-front': ('regular', 'dbz-2', 'Black', 'front'),
    'regular/eye-balck-back': ('regular', 'eye', 'Black', 'back'),
    'regular/eye-balck-front': ('regular', 'eye', 'Black', 'front'),
    'regular/fuckbeige-back': ('regular', 'fuck', 'Beige', 'back'),
    'regular/fuckbeige-front': ('regular', 'fuck', 'Beige', 'front'),
    'regular/fuckblack-back': ('regular', 'fuck', 'Black', 'back'),
    'regular/fuckblack-front': ('regular', 'fuck', 'Black', 'front'),
    'regular/goodfellasblack-back': ('regular', 'goodfellas', 'Black', 'back'),
    'regular/goodfellasblack-front': ('regular', 'goodfellas', 'Black', 'front'),
    'regular/Ichigo-beige-back': ('regular', 'ichigo', 'Beige', 'back'),
    'regular/Ichigo-beige-front': ('regular', 'ichigo', 'Beige', 'front'),
    'regular/Ichigo-black-back': ('regular', 'ichigo', 'Black', 'back'),
    'regular/Ichigo-black-front': ('regular', 'ichigo', 'Black', 'front'),
    'regular/Ichigo-white-back': ('regular', 'ichigo', 'White', 'back'),
    'regular/Ichigo-white-front': ('regular', 'ichigo', 'White', 'front'),
    'regular/luffy2-black-back': ('regular', 'luffy-2', 'Black', 'back'),
    'regular/luffy2-black-front': ('regular', 'luffy-2', 'Black', 'front'),
    'regular/naruto3-white-back': ('regular', 'naruto-3', 'White', 'back'),
    'regular/naruto3-white-front': ('regular', 'naruto-3', 'White', 'front'),
    'regular/responsibilty-beige-back': ('regular', 'responsibility', 'Beige', 'back'),
    'regular/responsibilty-beige-front': ('regular', 'responsibility', 'Beige', 'front'),
    'regular/sakunga-beige-back': ('regular', 'sukuna', 'Beige', 'back'),
    'regular/sakunga-beige-front': ('regular', 'sukuna', 'Beige', 'front'),
    'regular/solo1-beige-back': ('regular', 'solo-1', 'Beige', 'back'),
    'regular/solo1-beige-front': ('regular', 'solo-1', 'Beige', 'front'),
    'regular/solo2-black-back': ('regular', 'solo-2', 'Black', 'back'),
    'regular/solo2-black-front': ('regular', 'solo-2', 'Black', 'front'),
    'regular/uchiha1beige-back': ('regular', 'uchiha-1', 'Beige', 'back'),
    'regular/uchiha1beige-front': ('regular', 'uchiha-1', 'Beige', 'front'),
    'regular/uchiha1black-back': ('regular', 'uchiha-1', 'Black', 'back'),
    'regular/uchiha1black-front': ('regular', 'uchiha-1', 'Black', 'front'),
    'regular/uchiha1white-back': ('regular', 'uchiha-1', 'White', 'back'),
    'regular/uchiha1white-front': ('regular', 'uchiha-1', 'White', 'front'),
    'regular/yamoto1-black-back': ('regular', 'yamoto-1', 'Black', 'back'),
    'regular/yamoto1-black-front': ('regular', 'yamoto-1', 'Black', 'front'),
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
    'uchiha1': 'uchiha-1',
    'yamoto1': 'yamoto-1',
    'dbz2': 'dbz-2',
    'luffy2': 'luffy-2',
    'naruto3': 'naruto-3',
    'sakunga': 'sukuna',
    'responsibilty': 'responsibility',
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

ANIME_KEYWORDS = {
    'aizen', 'ace', 'anime', 'animeshoot', 'arise', 'berserk', 'bleach', 'bluelock',
    'chainsaw', 'curse', 'dbz', 'eye', 'eyes', 'ichigo', 'isagi', 'itachi', 'kaijin',
    'konichiwa', 'luffy', 'madara', 'mob', 'mobland', 'naruto', 'sakuna', 'sukuna',
    'shoot', 'solo', 'titan', 'tujiro', 'uchiha', 'yamoto', 'zoro', 'vagabond'
}

COMIC_KEYWORDS = {'batman', 'dark-knight', 'horn', 'horns'}
CINEMA_KEYWORDS = {'goodfellas', 'peter'}

def get_aesthetic(design_id):
    d = design_id.lower()
    for kw in ANIME_KEYWORDS:
        if kw in d:
            return "anime-archive"
    for kw in COMIC_KEYWORDS:
        if kw in d:
            return "comic-universe"
    for kw in CINEMA_KEYWORDS:
        if kw in d:
            return "cinema-collection"
    return "minimal-drops"

def parse_filename(cat_folder, stem):
    manifest_key = f"{cat_folder}/{stem}"
    if manifest_key in EXPLICIT_REMAP:
        rem = EXPLICIT_REMAP[manifest_key]
        return rem[1], rem[2], rem[3]

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
        "rating": 5,
        "aesthetic": "anime-archive"
    },
    {
        "id": "tapestry-berserk-eclipse",
        "title": "BERSERK ECLIPSE TAPESTRY",
        "price": 1000,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/berserk_eclipse_tapestry.webp"],
        "colors": [],
        "rating": 5,
        "aesthetic": "anime-archive"
    },
    {
        "id": "tapestry-cyber-city",
        "title": "CYBER CITY NIGHT TAPESTRY",
        "price": 2000,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/cyber_city_night_tapestry.webp"],
        "colors": [],
        "rating": 5,
        "aesthetic": "art-drop"
    },
    {
        "id": "tapestry-manga-panel",
        "title": "ITACHI MANGA PANEL TAPESTRY",
        "price": 2100,
        "category": "accessories",
        "subcategory": "tapestries",
        "images": ["/assets/products/tapestries/itachi_manga_panel_tapestry.webp"],
        "colors": [],
        "rating": 5,
        "aesthetic": "anime-archive"
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
        "rating": 5,
        "aesthetic": "anime-archive"
    }
]

def build_ts_catalog():
    if not MANIFEST_PATH.exists():
        print("Manifest missing!")
        return
        
    with open(MANIFEST_PATH, 'r') as f:
        manifest = json.load(f)

    blank_keys = set()
    if BLANK_KEYS_PATH.exists():
        with open(BLANK_KEYS_PATH, 'r') as f:
            blank_keys = set(json.load(f))

    url_to_key = {v: k for k, v in manifest.items()}
        
    cat_mapping = {
        'regular': 'regular',
        'drops': 'drop-shoulder',
        'acid': 'acid-wash',
    }
    
    products_grouped = {}
    
    for manifest_key, url in manifest.items():
        cat_folder, stem = manifest_key.split('/', 1)
        subcat = cat_mapping.get(cat_folder, 'regular')
        
        design, color, side = parse_filename(cat_folder, stem)
        
        pkey = (subcat, design)
        if pkey not in products_grouped:
            products_grouped[pkey] = {}
        if color not in products_grouped[pkey]:
            products_grouped[pkey][color] = {}
            
        products_grouped[pkey][color][side] = url
        
    all_products = []
    
    # Target color rotation sequence for diverse storefront grid presentation
    color_rotation_list = ['Black', 'Beige', 'Grey', 'White', 'Blue', 'Sand', 'Maroon']
    
    def get_color_from_fn(key):
        fn = key.split('/')[-1].lower()
        for c in ['black', 'beige', 'grey', 'gray', 'white', 'blue', 'maroon', 'red', 'olive', 'sand']:
            if c in fn:
                return c.capitalize()
        return 'Black'

    last_color = None
    last_side = None
    color_rot_idx = 0

    for i, ((subcat, design), colors_data) in enumerate(sorted(products_grouped.items())):
        pid = f"dp-{subcat}-{design}"
        title = format_title(design, subcat)
        price = SUBCAT_PRICES.get(subcat, 2500)
        colors = list(colors_data.keys())
        aesthetic = get_aesthetic(design)
        
        raw_images = []
        for color, sides in colors_data.items():
            if 'front' in sides:
                raw_images.append(sides['front'])
            if 'back' in sides:
                raw_images.append(sides['back'])

        # Separate graphic artwork mockups from plain fabric mockups
        graphic_images = [u for u in raw_images if url_to_key.get(u, '') not in blank_keys]
        blank_images = [u for u in raw_images if url_to_key.get(u, '') in blank_keys]
        
        if not graphic_images:
            graphic_images = list(raw_images)

        img_info = []
        for idx, img_url in enumerate(graphic_images):
            key = url_to_key.get(img_url, '')
            c = get_color_from_fn(key)
            s = 'back' if '-back' in key else 'front'
            img_info.append((idx, img_url, c, s, key))

        # 1. Choose Showcase Cover Image (images[0]) — MUST BE GRAPHIC
        available_colors = set(info[2] for info in img_info)
        
        chosen_color = None
        # Find next available color in rotation list that is distinct from last_color
        for offset in range(len(color_rotation_list)):
            candidate_color = color_rotation_list[(color_rot_idx + offset) % len(color_rotation_list)]
            if candidate_color in available_colors:
                if candidate_color != last_color or len(available_colors) == 1:
                    chosen_color = candidate_color
                    color_rot_idx = (color_rot_idx + offset + 1) % len(color_rotation_list)
                    break
        
        if not chosen_color:
            chosen_color = list(available_colors)[0]

        cand = [info for info in img_info if info[2] == chosen_color]

        # Prefer opposite side of last_side if available
        if last_side:
            opp_side = 'back' if last_side == 'front' else 'front'
            opp_cands = [info for info in cand if info[3] == opp_side]
            if opp_cands:
                showcase_info = opp_cands[0]
            else:
                showcase_info = cand[0]
        else:
            showcase_info = cand[0]

        showcase_url = showcase_info[1]
        c0, s0 = showcase_info[2], showcase_info[3]

        last_color = c0
        last_side = s0
        color_rot_idx += 1

        # 2. Choose Hover Image (images[1]) — MUST BE GRAPHIC, PREFER OPPOSITE SIDE OF DIFFERENT COLOR
        hover_candidates = [info for info in img_info if info[1] != showcase_url]
        hover_url = None
        if hover_candidates:
            # Priority 1: Opposite view side AND Different color
            p1 = [info for info in hover_candidates if info[3] != s0 and info[2] != c0]
            if p1:
                hover_url = p1[0][1]
            else:
                # Priority 2: Opposite view side (same color)
                p2 = [info for info in hover_candidates if info[3] != s0]
                if p2:
                    hover_url = p2[0][1]
                else:
                    # Priority 3: Different color (same side)
                    p3 = [info for info in hover_candidates if info[2] != c0]
                    if p3:
                        hover_url = p3[0][1]
                    else:
                        hover_url = hover_candidates[0][1]

        final_images = [showcase_url]
        if hover_url and hover_url != showcase_url:
            final_images.append(hover_url)

        for img in graphic_images:
            if img not in final_images:
                final_images.append(img)

        for img in blank_images:
            if img not in final_images:
                final_images.append(img)
                
        all_products.append({
            'id': pid,
            'title': title,
            'price': price,
            'category': 't-shirts',
            'subcategory': subcat,
            'images': final_images,
            'colors': colors,
            'rating': 5,
            'aesthetic': aesthetic
        })
        
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
  aesthetic?: string;
}

export interface ProductOverrideData {
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  aesthetic?: string;
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
      ...(ov.aesthetic !== undefined && { aesthetic: ov.aesthetic }),
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
