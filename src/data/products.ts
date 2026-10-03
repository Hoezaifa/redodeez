export interface Product {
  id: string;
  title: string;
  price: number;
  category: "t-shirts" | "accessories" | "hoodies" | "jerseys" | "tapestries";
  subcategory: "regular" | "graphic" | "drop-shoulder" | "acid-wash" | "mugs" | "flags" | "tapestries" | "wristbands" | "badges" | "wallet-cards" | "keychains" | "magnets" | "notebooks" | "gift-boxes" | "hoodies" | "jerseys";
  images: string[];
  sizes?: string[];
  colors?: string[];
  description?: string;
  rating?: number;
  aesthetic?: string;
  productType?: string;
  style?: string;
  imageAlts?: string[];
}

/* ─── Three-Axis Taxonomy Helper ────────────────────────────── */

export type ProductType = "t-shirt" | "hoodie" | "jersey" | "tapestry" | "flag" | "mug" | "accessory";
export type ProductStyle = "regular" | "drop-shoulder" | "acid-wash" | "graphic" | null;
export type ProductTheme = string | null;

export interface ProductDimensions {
  productType: ProductType;
  style: ProductStyle;
  theme: ProductTheme;
}

/**
 * Derives the three-axis taxonomy (productType / style / theme) from
 * a product's existing category, subcategory, and aesthetic fields.
 *
 * This is a pure derivation function — no product data is mutated.
 */
export function deriveProductDimensions(p: Product): ProductDimensions {
  // Product type — what the physical item IS
  const typeMap: Record<string, ProductType> = {
    "hoodies": "hoodie",
    "jerseys": "jersey",
    "tapestries": "tapestry",
    "flags": "flag",
    "mugs": "mug",
  };

  let productType: ProductType;
  if (typeMap[p.subcategory]) {
    productType = typeMap[p.subcategory];
  } else if (p.category === "accessories") {
    productType = "accessory";
  } else {
    productType = "t-shirt";
  }

  // Style — apparel fit/treatment variant (only meaningful for t-shirts)
  const styleMap: Record<string, ProductStyle> = {
    "drop-shoulder": "drop-shoulder",
    "acid-wash": "acid-wash",
    "graphic": "graphic",
    "regular": "regular",
  };
  const style: ProductStyle = styleMap[p.subcategory] ?? null;

  // Theme — design universe / aesthetic
  const theme: ProductTheme = p.aesthetic ?? null;

  return { productType, style, theme };
}


export interface ProductOverrideData {
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  aesthetic?: string;
}

export const products: Product[] = [
  {
    "id": "dp-drop-shoulder-batman-bat-swarm",
    "title": "Batman Bat Swarm Drop Shoulder Tee",
    "description": "Batman is seen from behind at the lower back, surrounded by a spreading swarm of bats. A small red-and-black Batman chest graphic completes the front of this drop-shoulder tee, keeping the cape-and-bats scene as its main feature.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927796/batman_bat_swarm_dropshoulder_beige_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927815/batman_bat_swarm_dropshoulder_beige_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789925951/batman_bat_swarm_dropshoulder_white_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789925972/batman_bat_swarm_dropshoulder_white_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-tbsm-encore",
    "title": "TBSM ENCORE DRP SHLDR",
    "description": "A red-and-grey graphic with crossed lines, a horned mask-like shape and a yin-yang symbol fills the back. The black front combines a small red chest emblem with ENCORE lettering near the side and smaller text at the hem.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmencoreDropf_zg7rey.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmencoreb_qb39e5.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-dbz-bardock-the-fallen-warrior",
    "title": "DBZ Bardock Fallen Warrior Acid Wash Tee",
    "description": "Bardock appears in a red, black and white back graphic with large BARDOCK lettering beneath the portrait. A small crossed-mark chest graphic gives this acid-wash tee a minimal front and a much more detailed reverse.",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926166/dbz_bardock_the_fallen_warrior_black_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926200/dbz_bardock_the_fallen_warrior_black_acid_wash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-bleach",
    "title": "BLEACH REGULAR TEE",
    "description": "A laughing, spiky-haired manga portrait rises from the lower back, surrounded by small lettering. The front carries a compact BLEACH wordmark, balancing detailed linework with a simple title treatment on this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768529/deez-prints/regular/bleach-whte-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768514/deez-prints/regular/bleach-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768526/deez-prints/regular/bleach-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768517/deez-prints/regular/bleach-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768520/deez-prints/regular/bleach-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768523/deez-prints/regular/bleach-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768533/deez-prints/regular/bleach-whte-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-gogeta-blue-fusion",
    "title": "Gogeta Blue Fusion Drop Shoulder Tee",
    "description": "Blue-haired Gogeta stands within a rectangular back composition of bold lettering, red panels and small graphic details. A blue-and-red circular emblem sits on the chest, carrying the palette to the front of this drop-shoulder tee.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926501/gogeta_blue_fusion_green_dropshoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926484/gogeta_blue_fusion_green_dropshoulder_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926458/gogeta_blue_fusion_black_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926398/gogeta_blue_fusion_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black",
      "Green"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-spiderman-comic-battle",
    "title": "Spiderman Comic Battle Drop Shoulder Tee",
    "description": "An upside-down Spider-Man hangs on the front, with a larger red-and-blue comic action scene rising from the lower back. The two illustrations use separate placements across this drop-shoulder tee, leaving the upper back largely clear.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927096/spiderman_comic_battle_dropshoulder_beige_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927078/spiderman_comic_battle_dropshoulder_beige_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927093/spiderman_comic_battle_dropshoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927121/spiderman_comic_battle_dropshoulder_black_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927127/spiderman_comic_battle_dropshoulder_white_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927142/spiderman_comic_battle_dropshoulder_white_front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-berserk-classic",
    "title": "BERSERK ACID WASH TEE",
    "description": "A compact red chest graphic pairs with a back print built from Berserk manga panels, red Japanese lettering and small editorial details. The acid-wash base adds a mottled backdrop to the sharp rectangular artwork.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085752/BerserkAcidB_pow8mm.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/BerserkAcidF_x9zx9m.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-berserk-eclipse-tapestry",
    "title": "BERSERK ECLIPSE TAPESTRY",
    "description": "A red circular centre is surrounded by a dense black-and-white Berserk collage in this horizontal tapestry. The bright central shape draws attention against the surrounding manga-style imagery and dark silhouettes.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/berserk_eclipse_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-lcnst",
    "title": "LCNST DRP SHLDR",
    "description": "A dripping red sculptural form rises from the lower front beneath a small LCSNT wordmark. The uneven silhouette and long trails of red give this drop-shoulder design its distinctive placement and shape.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884869/LCNSTWHITE_gully7.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883562/lcsntDropF_tlpen9.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-batman-vengeance",
    "title": "Batman Vengeance Drop Shoulder Tee",
    "description": "Pink BATMAN lettering and a shadowed portrait form the large back graphic, with a bat emblem beneath. A smaller pink wordmark sits on the chest, giving this black drop-shoulder tee a consistent two-colour treatment.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789925993/batman_vengeance_dropshoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789925995/batman_vengeance_dropshoulder_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-travis-scott-highest-in-the-room",
    "title": "Travis Scott Highest In The Room Acid Wash Tee",
    "description": "A Travis Scott portrait sits low on the back beneath handwritten-style lettering and sketched marks. Small orange and yellow face graphics add colour, while compact dark lettering keeps the front of the grey acid-wash tee comparatively minimal.",
    "price": 2550,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927368/travis_scott_highest_in_the_room_grey_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927371/travis_scott_highest_in_the_room_grey_acid_wash_front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-regular-abstract-wings",
    "title": "ABSTRACT WINGS TEE",
    "description": "White skeletal wings stretch across the back and taper into a long spine down the centre. A compact pointed emblem sits on the chest, giving this regular tee a smaller front detail beside the wide back illustration.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737955/calligraphyf_i50rtp.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737946/wingsback_ojdcgx.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-spiderman-comic",
    "title": "Spiderman Comic Drop Shoulder Tee",
    "description": "Red SPIDER and MAN lettering frames a jagged monochrome character illustration on the back. A smaller yellow Spider-Man wordmark sits on the chest, adding a separate colour accent to this drop-shoulder tee.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927181/spiderman_comic_dropshoulder_white_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927149/spiderman_comic_dropshoulder_white_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927149/spiderman_comic_dropshoulder_beige_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927148/spiderman_comic_dropshoulder_beige_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-punish",
    "title": "Punish Drop Shoulder Tee",
    "description": "A gold-toned skull is surrounded by long spikes and smaller star-like shapes on the back. A matching PUNISH wordmark sits on the chest, connecting the two sides of this drop-shoulder tee through the same muted palette.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/whiteskulldropf_wvd5fg.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904109/whiteskulldropb_vubnr2.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/blackskulldropf_flp7ma.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904109/blackskulldropb_yq9f2b.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-punisher-distressed",
    "title": "Punisher Distressed Acid Wash Tee",
    "description": "A large distressed white skull fills the back, with long teeth extending down the torso. A smaller red-and-white Punisher wordmark sits on the chest, setting the graphic against the mottled acid-wash finish.",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926844/punisher_distressed_acidwash_maroon_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926891/punisher_distressed_acidwash_maroon_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926836/punisher_distressed_acidwash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926867/punisher_distressed_acidwash_black_front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "tapestry-berserk-tapestry",
    "title": "BERSERK TAPESTRY",
    "description": "Large white BERSERK lettering tops a red-and-black character composition in this vertical tapestry. Heavy black shapes and angular white highlights give the artwork a high-contrast, tightly cropped appearance.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/berserk_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-venom-symbiote",
    "title": "Venom Symbiote Drop Shoulder Tee",
    "description": "Venom\'s large monochrome head rises from the lower back, with a long red tongue curling outward. A compact VENOM chest wordmark gives the front a smaller matching detail on this drop-shoulder tee.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927694/venom_symbiote_dropshoulder_green_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789928027/venom_symbiote_dropshoulder_green_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927688/venom_symbiote_dropshoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789928019/venom_symbiote_dropshoulder_black_front.jpg"
    ],
    "colors": [
      "Black",
      "Green"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-the-batman-gotham",
    "title": "The Batman Gotham Drop Shoulder Tee",
    "description": "A red-and-black character collage forms the back graphic, with a prominent question mark and THE BATMAN lettering beneath. A small red Batman title sits on the chest, keeping the front of this drop-shoulder tee comparatively spare.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927256/the_batman_gotham_dropshoulder_white_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927301/the_batman_gotham_dropshoulder_white_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927289/the_batman_gotham_dropshoulder_beige_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927250/the_batman_gotham_dropshoulder_beige_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-berserk-skull-blade",
    "title": "BERSERK SKULL BLADE ACID WASH TEE",
    "description": "A central sword, skull imagery and Gothic Berserk lettering form a tall front graphic. Small symbols and text blocks surround the blade, giving this acid-wash tee a densely arranged, monochrome composition.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788970854/deez-prints/covers/berserk_skull_blade_acid_wash_new.jpg",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidBerserkEmbossF_izdjez.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-regular-chainsaw-2",
    "title": "DENJI CHAINSAW REGULAR TEE",
    "description": "Denji\'s chainsaw-headed action pose sits beside vertical lettering in the large red-and-monochrome back graphic. A small Chainsaw Man title on the chest repeats the theme without duplicating the full illustration.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768553/deez-prints/regular/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768555/deez-prints/regular/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768558/deez-prints/regular/chainsaw-2-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-snake",
    "title": "SNAKE DRP SHLDR",
    "description": "A winding snake illustration curves down from one shoulder towards the chest. The off-centre placement leaves most of the front unprinted, making the shape of the snake the main feature of this drop-shoulder tee.",
    "price": 1400,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772909295/whitesnakeDropF_choivf.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883546/snakeDropF_t9bwzi.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773256442/snakevariations_f1h87f.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-look-mom-i-can-fly",
    "title": "Look Mom I Can Fly Drop Shoulder Tee",
    "description": "LOOK MOM I CAN FLY sits above a monochrome portrait and a film-rating-style block. The rectangular front graphic resembles a compact movie poster, combining large headline text with finer details on this drop-shoulder tee.",
    "price": 1850,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926601/look_mom_i_can_fly_green_drop_shoulder_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926624/look_mom_i_can_fly_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black",
      "Green"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-acid-wash-dr-doom",
    "title": "Dr. Doom Acid Wash Tee",
    "description": "A large side-profile portrait of Dr. Doom fills the back, with a green hood framing the metallic mask. A compact DOOM chest graphic echoes the green palette against the dark acid-wash base.",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926300/dr_doom_acidwash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926411/dr_doom_acidwash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "tapestry-dragon-ball-z-characters-tapestry",
    "title": "DRAGON BALL Z CHARACTERS TAPESTRY",
    "description": "A colour lineup of Dragon Ball Z characters stretches across a background of black-and-white manga panels. The horizontal composition groups the figures through the centre, making this tapestry distinct from a single-character portrait.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/dragon_ball_z_characters_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-no-mercy",
    "title": "No Mercy Drop Shoulder Tee",
    "description": "White NO MERCY lettering crosses a large scene in red, black and blue-purple. The illustration fills much of the front of this drop-shoulder tee, with an angled red panel forming its upper edge.",
    "price": 2600,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926760/no_mercy_black_dropshoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-tbsm",
    "title": "TBSM DRP SHLDR",
    "description": "Two black performer silhouettes with raised arms and microphones rise from the lower front. A small emblem sits at the chest, leaving the middle of this white drop-shoulder tee open between the two print placements.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908159/whitesmdropF_tfl5vw.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-utopia-skeleton",
    "title": "UTOPIA Skeleton Acid Wash Tee",
    "description": "A black skeleton illustration rises from the lower front beneath a small wordmark. The back uses UTOPIA lettering above a narrow column of text, balancing an illustrated front with a typography-focused reverse on grey acid wash.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927485/utopia_skeleton_grey_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789928108/utopia_skeleton_grey_acid_wash_front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-regular-chainsaw-1",
    "title": "CHAINSAW MAN REGULAR TEE",
    "description": "A chainsaw-headed figure in a collared shirt fills the back, framed by red strokes and Japanese lettering. A smaller Chainsaw Man chest wordmark keeps the front of this regular tee comparatively minimal.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768535/deez-prints/regular/chainsaw-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768550/deez-prints/regular/chainsaw-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768538/deez-prints/regular/chainsaw-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768541/deez-prints/regular/chainsaw-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768544/deez-prints/regular/chainsaw-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768547/deez-prints/regular/chainsaw-1-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-utopia-screwed",
    "title": "UTOPIA Screwed Drop Shoulder Tee",
    "description": "An overlapping arrangement of gold-toned screws creates the back graphic. A small red-bordered rectangular design sits on the chest, giving this UTOPIA drop-shoulder tee a distinct object-based graphic on each side.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927429/utopia_screwed_green_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927439/utopia_screwed_green_drop_shoulder_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927437/utopia_screwed_black_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927429/utopia_screwed_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black",
      "Green"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-drop-shoulder-venom-demon-inside",
    "title": "Venom Demon Inside Drop Shoulder Tee",
    "description": "Venom\'s eye, teeth and red tongue extend along one side of both front and back. DEMON INSIDE lettering sits near the artwork, keeping this black drop-shoulder tee\'s graphic weight towards the side rather than the centre.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927979/venom_demon_inside_dropshoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789928080/venom_demon_inside_dropshoulder_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-berserk-warrior",
    "title": "BERSERK WARRIOR ACID WASH TEE",
    "description": "A white ornamental chest emblem pairs with a much larger Guts illustration on the back. The red Brand of Sacrifice sits above the figure, creating a single colour accent against the black-and-white artwork and acid-wash texture.",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/AcidBerB_hlqkml.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidBerF_csztus.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-dragon-ball-z-goku-collage-tapestry",
    "title": "DRAGON BALL Z GOKU COLLAGE TAPESTRY",
    "description": "Several Goku portraits and figures overlap in a tall collage, with orange clothing and bright blue energy-like accents. The vertical tapestry brings a full standing figure together with larger cropped faces in one densely illustrated composition.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/dragon_ball_z_goku_collage_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-berserk",
    "title": "Berserk Drop Shoulder Tee",
    "description": "Red Japanese lettering tops a back collage of Berserk manga panels, small text and a barcode-style detail. A compact red-and-black front illustration gives this drop-shoulder tee separate artwork on both sides.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772898857/berserkdropwF_kacpml.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772898857/berserkdropwb_ap83rw.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883554/berserkdropf_bed9qx.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883553/berserkdropb_ktediz.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-ruinborn-requiem",
    "title": "Ruinborn Requiem Drop Shoulder Tee",
    "description": "Gothic mechanical wings and a central spine form the detailed back graphic, with red accents and fine lettering. A smaller front emblem keeps this drop-shoulder tee balanced between its intricate reverse and minimal front.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927040/ruinborn_requiem_drop_shoulder_maroon_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927008/ruinborn_requiem_drop_shoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927009/ruinborn_requiem_drop_shoulder_black_front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "dp-acid-wash-odyssey-spartan",
    "title": "Odyssey Spartan Acid Wash Tee",
    "description": "A large crested helmet illustration occupies the front, while stacked text and THE ODYSSEY lettering cover the back. The monochrome artwork gives this grey acid-wash tee a classical-warrior theme with distinct designs on each side.",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926823/odyssey_spartan_grey_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926811/odyssey_spartan_grey_acid_wash_front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "dp-regular-divine",
    "title": "DIVINE TEE",
    "description": "Gold-toned Divine lettering and a branching illustration occupy the front, with an oversized 00 on the back. Smaller words and symbols complete this regular tee\'s coordinated typography-led design.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738656/divin_en7ejg.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738656/div_uzioib.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-dbz-bardock-the-fallen-warrior",
    "title": "DBZ Bardock Fallen Warrior Drop Shoulder Tee",
    "description": "Bardock\'s portrait is set against red shapes and large white BARDOCK lettering on the back. The front has a small crossed-mark emblem, keeping this drop-shoulder design focused on the character illustration when viewed from behind.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926165/dbz_bardock_the_fallen_warrior_black_dropshoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926156/dbz_bardock_the_fallen_warrior_black_dropshoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-tbsm-calm",
    "title": "TBSM CALM DRP SHLDR",
    "description": "A red-and-black back graphic combines a horned mask-like form, crossed diagonal lines and a yin-yang symbol. The white front carries a small red chest emblem with separate lettering near the hem, including CALM.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmcalmDropf_l9ue5n.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772904108/tbsmcalmb_iycg6e.webp"
    ],
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-cactus-takeover",
    "title": "Cactus Takeover Acid Wash Tee",
    "description": "A black figure and loose green lettering overlap in a graffiti-style front composition. The Cactus Takeover artwork uses scattered marks and uneven typography against the grey acid-wash surface.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927816/cactus_takeover_grey_acid_wash_front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "tapestry-goku-dragon-ball-z-manga-tapestry",
    "title": "GOKU DRAGON BALL Z MANGA TAPESTRY",
    "description": "Large decorative Son Goku lettering sits above a colour Goku illustration on a dark background. Orange clothing, white linework and smaller manga-style details build a tightly packed vertical tapestry design.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/goku_dragon_ball_z_manga_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-no-friends",
    "title": "No Friends Drop Shoulder Tee",
    "description": "Large distressed AUTHENTIC lettering arches above a hand-and-face illustration on the front. An outlined circular R and smaller marks complete the collage, making this drop-shoulder tee a typography-heavy graphic design.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926722/no_friends_dropshoulder_green_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926702/no_friends_dropshoulder_black_front.jpg"
    ],
    "colors": [
      "Black",
      "Green"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-guns-n-roses",
    "title": "Guns N Roses Drop Shoulder Tee",
    "description": "Tall Guns N\' Roses lettering runs vertically around a central emblem and two red roses. The long front composition pairs white typography with small green and red details on a black drop-shoulder base.",
    "price": 1850,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "/assets/products/guns-n-roses/guns_n_roses_drop_shoulder_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-acid-wash-breakout",
    "title": "BREAKOUT ACID WASH TEE",
    "description": "The BREAKOUT chest graphic combines large outlined lettering with a red-and-white snake winding through it. Its wide placement contrasts with the irregular texture of the acid-wash base.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773086685/breakoutAcid_dp04ei.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-regular-anime1",
    "title": "CHOSO BLOODLINE REGULAR TEE",
    "description": "Choso\'s raised-hand pose fills the lower back in black linework with small red accents. An angular chest wordmark keeps the front of this regular tee much simpler than its large character illustration.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768439/deez-prints/regular/anime1beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768454/deez-prints/regular/anime1white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768442/deez-prints/regular/anime1beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768445/deez-prints/regular/anime1blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768451/deez-prints/regular/anime1white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768448/deez-prints/regular/anime1blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-punk-is-dead",
    "title": "PUNK\'S NOT DEAD DROP SHOULDER TEE",
    "description": "PUNK\'S NOT DEAD lettering and punk-inspired graphic details form the main front composition. The oversized drop-shoulder fit pairs with the distressed typography for a streetwear take on punk aesthetics.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883545/punkdropf_wrggcm.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772884578/punkdropfWHITE_o74ukj.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-astral-ruins",
    "title": "Astral Ruins Drop Shoulder Tee",
    "description": "An irregular black spiral is built from fine lines, stars, crosses and diagram-like marks. The Astral Ruins graphic spreads vertically across the front of this drop-shoulder tee, with open space between its looping shapes.",
    "price": 1850,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927839/astral_ruins_drop_shoulder_beige_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789925952/astral_ruins_drop_shoulder_white_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "dp-acid-wash-wired-different",
    "title": "Wired Different Acid Wash Tee",
    "description": "A white, diagram-like hand graphic fills the back, surrounded by fine labels, lines and cross marks. A smaller version sits on the chest, giving the Wired Different acid-wash tee a coordinated technical-drawing look.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927753/wired_different_maroon_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927787/wired_different_maroon_acid_wash_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927722/wired_different_black_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789928022/wired_different_black_acid_wash_front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-goku-kamehameha-tapestry",
    "title": "GOKU KAMEHAMEHA TAPESTRY",
    "description": "A close-up Goku action pose cuts diagonally across this horizontal tapestry, surrounded by bright blue energy-like streaks. The cropped face, red-orange clothing and luminous background make the composition feel concentrated on one moment of movement.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/goku_kamehameha_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-punisher-distressed",
    "title": "Punisher Distressed Drop Shoulder Tee",
    "description": "A distressed white skull with long vertical teeth fills the back. The smaller red-and-white Punisher chest graphic gives this drop-shoulder tee a minimal front beside the oversized emblem on the reverse.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926868/punisher_distressed_dropshoulder_green_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926895/punisher_distressed_dropshoulder_green_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926844/punisher_distressed_dropshoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926902/punisher_distressed_dropshoulder_black_front.jpg"
    ],
    "colors": [
      "Black",
      "Green"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-abstract-wings",
    "title": "ABSTRACT WINGS DRP SHLDR",
    "description": "Skeletal wings spread across the back and narrow into a long central spine. A smaller pointed emblem sits on the chest, pairing detailed monochrome artwork with the broader shape of a drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255990/wingsdropF_shnexu.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255989/wingsdropb_uzek1d.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255893/wingsvariations_u6b8p5.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-gogeta-blue-fusion",
    "title": "Gogeta Blue Fusion Acid Wash Tee",
    "description": "Blue-haired Gogeta fills a rectangular back graphic beside vertical GOGETA lettering and red accents. A small blue-and-red circular chest emblem links the front to the detailed character artwork on this acid-wash tee.",
    "price": 2250,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926545/gogeta_blue_fusion_maroon_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926498/gogeta_blue_fusion_maroon_acid_wash_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926415/gogeta_blue_fusion_black_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926417/gogeta_blue_fusion_black_acid_wash_front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-aizen",
    "title": "AIZEN REGULAR TEE",
    "description": "Aizen appears in a large red, white and black back illustration with vertical lettering and circular details. A smaller Aizen emblem sits at the chest, concentrating the most detailed artwork on the reverse of this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768431/deez-prints/regular/aizen-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768425/deez-prints/regular/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768434/deez-prints/regular/aizen-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768437/deez-prints/regular/aizen-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768428/deez-prints/regular/aizen-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-metallica-2-0",
    "title": "Metallica 2.0 Drop Shoulder Tee",
    "description": "A skeletal reaper and sweeping scythe fill the front beneath red Metallica lettering. White and grey details follow the curved blade and dark figure, standing out against the black drop-shoulder base.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926638/metallica_2_0_black_dropshoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-drop-shoulder-dr-doom",
    "title": "Dr. Doom Drop Shoulder Tee",
    "description": "A green-hooded Dr. Doom portrait fills the back, with the metallic mask shown in side profile. The small DOOM chest graphic repeats the green tone on the otherwise black front of this drop-shoulder tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926310/dr_doom_dropshoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926334/dr_doom_dropshoulder_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-knightfall",
    "title": "KNIGHTFALL ACID WASH TEE",
    "description": "A kneeling armoured figure occupies the centre of the chest, with arrow-like lines radiating around it. Small text blocks and framed details give the Knightfall graphic a compact poster-style layout against the dark acid-wash surface.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085757/AcidKnioghtF_smiizk.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-goku-manga-collage-tapestry",
    "title": "GOKU MANGA COLLAGE TAPESTRY",
    "description": "A monochrome Goku portrait fills the lower section of this vertical tapestry, framed by manga panels and bold red blocks. Large red Japanese lettering at the top balances the darker character illustration below.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/goku_manga_collage_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-divine",
    "title": "DIVINE DRP SHLDR",
    "description": "Gold-toned Divine lettering sits above a branching front illustration, while an oversized 00 fills the back. Small words and symbols accompany both prints, making this drop-shoulder tee a coordinated typography-led design.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883558/divinedropf_rdsrbr.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883558/divinedropb_gr0u8g.webp"
    ],
    "colors": [
      "Black",
      "beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-travis-scott-highest-in-the-room",
    "title": "Travis Scott Highest In The Room Drop Shoulder Tee",
    "description": "A Travis Scott portrait is framed by handwritten-style words, sketched marks and small coloured faces on the back. The front uses compact dark lettering and a separate vertical detail near the hem of this drop-shoulder tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927397/travis_scott_highest_in_the_room_beige_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927343/travis_scott_highest_in_the_room_beige_drop_shoulder_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927366/travis_scott_highest_in_the_room_white_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927382/travis_scott_highest_in_the_room_white_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-acid-wash-bluelock",
    "title": "BLUELOCK ACID WASH TEE",
    "description": "An Isagi Yoichi collage combines football imagery, manga panels and blue lettering across the back. A smaller blue BLUELOCK wordmark sits on the chest, linking both sides of this acid-wash tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770067/deez-prints/acid/bluelock-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770061/deez-prints/acid/bluelock-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770070/deez-prints/acid/bluelock-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770064/deez-prints/acid/bluelock-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-ferrari",
    "title": "FERRARI TEE",
    "description": "Red Ferrari lettering and racing-style badges decorate the front, with a prancing-horse graphic on the back. Yellow sleeve motifs extend the motorsport theme around this regular tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908159/regferrariFblack_kpig1e.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908160/regferrariBblack_wgsjpf.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-metallica",
    "title": "Metallica Drop Shoulder Tee",
    "description": "White Metallica lettering heads a hooded skeletal figure surrounded by red shapes and flowing lines. Red Master of Puppets text sits below, forming a tall front graphic on this black drop-shoulder tee.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927929/metallica_black_dropshoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-drop-shoulder-ferrari",
    "title": "FERRARI DRP SHLDR",
    "description": "Red Ferrari lettering and racing-style badges decorate the front, with a larger prancing-horse graphic on the back. Yellow sleeve details extend the motorsport design beyond the torso of this drop-shoulder tee.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908159/ferrariFblack_vnhkw1.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772908160/ferrariBblack_ofgzyq.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-digital-angel",
    "title": "Digital Angel Acid Wash Tee",
    "description": "Large DIGITAL ANGEL lettering sits above a winged figure and a grid of small graphic panels. Blue accents break up the monochrome artwork, giving the front of this acid-wash tee a layered, poster-like arrangement.",
    "price": 2250,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926261/digital_angel_grey_acid_wash_front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "tapestry-goku-super-saiyan-tapestry",
    "title": "GOKU SUPER SAIYAN TAPESTRY",
    "description": "A yellow-haired Goku action pose sits over black-and-white manga panels in this vertical tapestry. Orange clothing and blue accents separate the central figure from the surrounding illustrated background.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/goku_super_saiyan_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-bleach",
    "title": "BLEACH DROP SHOULDER TEE",
    "description": "BLEACH lettering sits on the chest, with a much larger laughing manga portrait rising from the lower back. Fine black linework and small surrounding characters give this drop-shoulder tee a drawn-panel look.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769233/deez-prints/drops/bleach-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769230/deez-prints/drops/bleach-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769227/deez-prints/drops/bleach-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769236/deez-prints/drops/bleach-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769239/deez-prints/drops/bleach-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769242/deez-prints/drops/bleach-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-utopia-skeleton",
    "title": "UTOPIA Skeleton Drop Shoulder Tee",
    "description": "A black skeleton rises from the lower front beneath a small wordmark. On the back, UTOPIA lettering heads a narrow column of titles, contrasting the illustrated front with a text-focused layout on this drop-shoulder tee.",
    "price": 2250,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927468/utopia_skeleton_drop_shoulder_white_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927524/utopia_skeleton_drop_shoulder_white_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927481/utopia_skeleton_drop_shoulder_beige_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927493/utopia_skeleton_drop_shoulder_beige_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-acid-wash-punk-is-dead",
    "title": "PUNK\'S NOT DEAD ACID WASH TEE",
    "description": "Bold PUNK\'S NOT DEAD lettering stretches across the front with distressed typography and punk-inspired graphic elements. The acid-wash texture adds a vintage feel to the rebellious slogan.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/PunkAcidF_rz3omv.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-regular-ace-1",
    "title": "FIRE FIST ACE REGULAR TEE",
    "description": "An orange-accented Ace illustration fills the back beside tall ACE lettering and flame-like marks. Two small orange face emblems sit on the chest, giving this regular tee matching character references on both sides.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768420/deez-prints/regular/ace-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768414/deez-prints/regular/ace-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768411/deez-prints/regular/ace-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768422/deez-prints/regular/ace-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768417/deez-prints/regular/ace-1-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-4",
    "title": "Goku Shenron Drop Shoulder Tee",
    "description": "An orange dragon coils above a small silhouetted figure in the large back illustration. A compact circular emblem sits on the chest, keeping the front understated beside the fiery Goku Shenron artwork.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769402/deez-prints/drops/dbz-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769386/deez-prints/drops/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769391/deez-prints/drops/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769395/deez-prints/drops/dbz-4-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769406/deez-prints/drops/dbz-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769409/deez-prints/drops/dbz-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769398/deez-prints/drops/dbz-4-blue-front.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-stay-safe",
    "title": "Stay Safe Drop Shoulder Tee",
    "description": "A red figure built from overlapping ribbon-like strips occupies one side of the front. A small black-and-white text graphic sits opposite it, giving this white drop-shoulder tee an asymmetrical layout.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927243/stay_safe_white_drop_shoulder_front.jpg"
    ],
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-spiderman-comic-battle",
    "title": "Spiderman Comic Battle Acid Wash Tee",
    "description": "An upside-down Spider-Man hangs on the front, while a larger red-and-blue comic action scene rises from the lower back. The two placements carry the character artwork across both sides without covering the entire acid-wash surface.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927080/spiderman_comic_battle_acidwash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927089/spiderman_comic_battle_acidwash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "tapestry-goku-ultra-instinct-red-tapestry",
    "title": "GOKU ULTRA INSTINCT RED TAPESTRY",
    "description": "A silver-haired Goku figure stands against a strong red backdrop with oversized black Japanese lettering. Dark trousers and heavily shaded character details give this tapestry a graphic red-and-monochrome treatment rather than a manga-panel collage.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/goku_ultra_instinct_red_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-cactus-takeover",
    "title": "Cactus Takeover Drop Shoulder Tee",
    "description": "A black figure is overlaid with green graffiti-style lettering, small handwritten marks and compact text. The front-focused Cactus Takeover graphic gives this drop-shoulder tee a loose, layered composition rather than a neatly boxed illustration.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926030/cactus_takeover_drop_shoulder_beige_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926022/cactus_takeover_drop_shoulder_white_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-crimson-thorn-sigil",
    "title": "Crimson Thorn Sigil Drop Shoulder Tee",
    "description": "Mirrored thorn-like shapes surround a red central sigil on the back. A separate white ornamental drawing covers the front, combining fine branches, pointed forms and small lettering on this black drop-shoulder tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926111/crimson_thorn_sigil_black_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926111/crimson_thorn_sigil_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "dp-acid-wash-no-mercy",
    "title": "No Mercy Acid Wash Tee",
    "description": "NO MERCY cuts across a large red, black and blue-purple illustration covering much of the front. The tightly framed scene and bold white lettering make this a more print-heavy acid-wash design.",
    "price": 3000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926797/no_mercy_black_acidwash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-regular-dbz-8",
    "title": "GOKU BLACK REBELLION REGULAR TEE",
    "description": "A dark Goku Black portrait is framed by red Japanese lettering and bold white graphic text. The smaller circular front motif repeats the red-and-monochrome palette on this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768653/deez-prints/regular/dbz-8-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768647/deez-prints/regular/dbz-8-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768650/deez-prints/regular/dbz-8-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768656/deez-prints/regular/dbz-8-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768658/deez-prints/regular/dbz-8-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-odyssey-spartan",
    "title": "Odyssey Spartan Drop Shoulder Tee",
    "description": "A large crested helmet occupies the front, paired with stacked text and THE ODYSSEY lettering on the back. Both sides use monochrome artwork, keeping the helmet\'s detailed shading as the main visual feature.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926764/odyssey_spartan_drop_shoulder_white_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926809/odyssey_spartan_drop_shoulder_white_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926765/odyssey_spartan_drop_shoulder_beige_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926798/odyssey_spartan_drop_shoulder_beige_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "dp-drop-shoulder-the-odyssey",
    "title": "The Odyssey Drop Shoulder Tee",
    "description": "A metallic-looking helmeted warrior rises beneath oversized red THE ODYSSEY lettering on the back. The small red chest title repeats the typography at a quieter scale on this black drop-shoulder tee.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927320/the_odyssey_black_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927288/the_odyssey_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "dp-acid-wash-abstract-wings",
    "title": "ABSTRACT WINGS ACID WASH TEE",
    "description": "White, bone-like wings stretch across the back and taper into a long central spine. A smaller spiked chest graphic balances the detailed back print against the mottled acid-wash finish.",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773086408/acidwingsB_kejkg1.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085757/AcidWingsF_nb80ux.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-goku-ultra-instinct-tapestry",
    "title": "GOKU ULTRA INSTINCT TAPESTRY",
    "description": "A full-length Goku figure stands within a bright purple-and-blue aura against a dark background. Orange clothing contrasts with the luminous surrounding effects, creating a vertical tapestry centred on the character\'s silhouette.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/goku_ultra_instinct_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-wired-different",
    "title": "Wired Different Drop Shoulder Tee",
    "description": "A white hand-like schematic fills the back, surrounded by fine labels, guide lines and small geometric marks. A reduced version sits on the chest, giving this drop-shoulder tee a coordinated technical-illustration treatment.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789928075/wired_different_green_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927751/wired_different_green_drop_shoulder_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927744/wired_different_black_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927716/wired_different_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black",
      "Green"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-rick-and-morty",
    "title": "Rick and Morty Drop Shoulder Tee",
    "description": "A pink-framed Rick and Morty illustration fills the back beneath arched lettering. A small green Rick and Morty wordmark sits on the chest, repeating one of the illustration\'s accent colours across this drop-shoulder tee.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926973/rick_and_morty_dropshoulder_white_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926938/rick_and_morty_dropshoulder_white_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926937/rick_and_morty_dropshoulder_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926958/rick_and_morty_dropshoulder_black_front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-acid-wash-look-mom-i-can-fly",
    "title": "Look Mom I Can Fly Acid Wash Tee",
    "description": "LOOK MOM I CAN FLY heads a rectangular portrait graphic with a film-rating-style panel underneath. The monochrome front print uses stacked typography and a photographic image against the textured acid-wash finish.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926633/look_mom_i_can_fly_maroon_acid_wash_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926639/look_mom_i_can_fly_black_acid_wash_front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-regular-spiderverse",
    "title": "SPIDERVERSE TEE",
    "description": "A large red spider outline spans the back, with narrow white lettering through its centre. A smaller white-and-red spider emblem sits on the chest, giving this black regular tee a matching two-sided design.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737932/sppiderf_aqsefr.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772737932/sppiderb_srlaq3.webp"
    ],
    "colors": [
      "Black",
      "White",
      "Olive",
      "Sand"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-naruto-2",
    "title": "Madara 1 Drop Shoulder Tee",
    "description": "Madara stands with folded arms in a large monochrome illustration rising from the lower back. A small leaf-shaped chest symbol completes the front, contrasting a minimal emblem with detailed armour and hair linework.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769775/deez-prints/drops/naruto-2-grye-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769760/deez-prints/drops/naruto-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769766/deez-prints/drops/naruto-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769762/deez-prints/drops/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769769/deez-prints/drops/naruto-2-blue-front.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-curse",
    "title": "Choso Bloodline Drop Shoulder Tee",
    "description": "A line-drawn Choso illustration rises from the lower back, with red accents around his raised hand. A small angular chest wordmark gives the front a lighter graphic treatment on this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769306/deez-prints/drops/curse-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769297/deez-prints/drops/curse-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769300/deez-prints/drops/curse-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769303/deez-prints/drops/curse-blue-back.jpg"
    ],
    "colors": [
      "Beige",
      "Blue"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-solo-2",
    "title": "Arise Solo Leveling Acid Wash Tee",
    "description": "A tall monochrome character illustration and Solo Leveling lettering fill the back, framed by curling black shapes. The front carries an ARISE wordmark, keeping the two sides of this acid-wash tee visually distinct.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770370/deez-prints/acid/solo2--grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770361/deez-prints/acid/solo-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770358/deez-prints/acid/solo-2-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-guts-berserk-tapestry",
    "title": "GUTS BERSERK TAPESTRY",
    "description": "A monochrome Guts portrait fills the lower half beneath red Berserk lettering and a red Brand of Sacrifice. The black background and limited colour palette give this vertical tapestry a stark, portrait-focused layout.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/guts_berserk_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-digital-angel",
    "title": "Digital Angel Drop Shoulder Tee",
    "description": "DIGITAL ANGEL lettering heads a winged illustration surrounded by small graphic panels and blue accents. The front layout layers portrait-like imagery and fine details across the broad body of this drop-shoulder tee.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926254/digital_angel_drop_shoulder_beige_front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926254/digital_angel_drop_shoulder_white_front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-conquer",
    "title": "Conquer Drop Shoulder Tee",
    "description": "Bold CONQUER lettering arches over a narrow skeletal illustration with a red vertical centre. Small blocks of type sit alongside the graphic, giving this black drop-shoulder tee a structured, front-focused composition.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926120/conquer_black_dropshoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-divine",
    "title": "DIVINE ACID WASH TEE",
    "description": "Gold-toned Divine lettering and a branching illustration cover the front, while an oversized 00 anchors the back. Small supporting words and symbols connect both sides of this typography-led acid-wash tee.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/DivineAcidF_xi1lrp.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/DivineAcidB_k4xqvo.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-regular-kaijin",
    "title": "GAROU KAIJIN REGULAR TEE",
    "description": "Garou\'s monochrome back illustration is crossed by vivid red branching lines. The front pairs KAIJIN lettering with two thorn-like motifs near the hem, giving this regular tee distinct artwork on each side.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768774/deez-prints/regular/kaijin-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768790/deez-prints/regular/kaijin-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768777/deez-prints/regular/kaijin-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768780/deez-prints/regular/kaijin-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768784/deez-prints/regular/kaijin-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768787/deez-prints/regular/kaijin-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-bluelock",
    "title": "BLUELOCK DROP SHOULDER TEE",
    "description": "An Isagi Yoichi back collage brings together football imagery, monochrome panels and bright blue lettering. The small blue BLUELOCK chest wordmark repeats the accent colour on the front of this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769252/deez-prints/drops/bluelock-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769245/deez-prints/drops/bluelock-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769255/deez-prints/drops/bluelock-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769248/deez-prints/drops/bluelock-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769258/deez-prints/drops/bluelock-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-hellstar",
    "title": "Hellstar Drop Shoulder Tee",
    "description": "A large skull illustration sits below HELLSTAR lettering on the back, surrounded by red marks and smaller symbols. A compact pale chest emblem leaves the front mostly clear on this black drop-shoulder tee.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926560/hellstar_black_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926575/hellstar_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-venom-symbiote",
    "title": "Venom Symbiote Acid Wash Tee",
    "description": "A large Venom profile rises from the lower back, with white facial detail and a long red tongue. A compact VENOM wordmark sits on the chest, contrasting the smaller front treatment with the oversized reverse illustration.",
    "price": 2350,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927964/venom_symbiote_acidwash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927987/venom_symbiote_acidwash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "tapestry-guts-brand-of-sacrifice-tapestry",
    "title": "GUTS BRAND OF SACRIFICE TAPESTRY",
    "description": "Guts looks back over one shoulder against a solid red field, with the Brand of Sacrifice above him. Dark armour, a cape and sword details build the lower silhouette in this vertical Berserk tapestry.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/guts_brand_of_sacrifice_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-aizen",
    "title": "AIZEN DROP SHOULDER TEE",
    "description": "Aizen\'s red, white and black character illustration fills the back beside vertical lettering and circular motifs. A small Aizen chest emblem repeats the palette on the front of this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769174/deez-prints/drops/aizen-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769160/deez-prints/drops/aizen-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769163/deez-prints/drops/aizen-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769165/deez-prints/drops/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769171/deez-prints/drops/aizen-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769168/deez-prints/drops/aizen-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-madara",
    "title": "Madara Uchiha Drop Shoulder Tee",
    "description": "A large line-drawn Madara figure is paired with purple background linework and small Japanese lettering. The open outlines allow the blue drop-shoulder base to show through the illustration.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769720/deez-prints/drops/madara-blue-front.jpg"
    ],
    "colors": [
      "Blue"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-venom-demon-inside",
    "title": "Venom Demon Inside Acid Wash Tee",
    "description": "Venom\'s white eye, jagged teeth and red tongue occupy one side of the tee, with DEMON INSIDE text nearby. The artwork appears on both front and back, creating a side-weighted composition over the dark acid-wash base.",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789928048/venom_demon_inside_acidwash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927977/venom_demon_inside_acidwash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-regular-isagi-1",
    "title": "ISAGI YOICHI REGULAR TEE",
    "description": "An Isagi Yoichi collage mixes football imagery, manga panels and blue graphic blocks on the back. A smaller BLUELOCK chest wordmark gives this regular tee a clear title treatment without repeating the full panel layout.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768764/deez-prints/regular/isagi-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768758/deez-prints/regular/isagi-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768761/deez-prints/regular/isagi-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768767/deez-prints/regular/isagi-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768770/deez-prints/regular/isagi-1-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-6",
    "title": "Goku Black Rebellion Drop Shoulder Tee",
    "description": "A dark Goku Black portrait sits inside a red-and-white arrangement of Japanese lettering and bold graphic marks. A smaller circular motif sits on the chest, balancing the tall rectangular back print on this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769438/deez-prints/drops/dbz-6-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769449/deez-prints/drops/dbz-6-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769441/deez-prints/drops/dbz-6-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769445/deez-prints/drops/dbz-6-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769452/deez-prints/drops/dbz-6-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769455/deez-prints/drops/dbz-6-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-sukuna",
    "title": "Sukuna Cursed Drop Shoulder Tee",
    "description": "A detailed Sukuna portrait fills the back of this drop-shoulder tee, with cursed markings and dark linework. A smaller chest emblem carries the Jujutsu Kaisen theme to the front.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788970875/deez-prints/covers/sukuna_cursed_drop_shoulder_new.png",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769914/deez-prints/drops/sukuna-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769922/deez-prints/drops/sukuna-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769917/deez-prints/drops/sukuna-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769919/deez-prints/drops/sukuna-white-back.jpg"
    ],
    "colors": [
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-ferrari",
    "title": "FERRARI ACID WASH TEE",
    "description": "Red Ferrari lettering, a prancing-horse graphic and racing-style badge details appear across the front, back and sleeves. This acid-wash tee spreads its motorsport imagery across several placements rather than using one isolated chest print.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidFerrariF_wlx5yi.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085750/AcidFerrariB_oechir.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773506363/ferari_model_mzzxev.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-manga-panel",
    "title": "ITACHI MANGA PANEL TAPESTRY",
    "description": "A full-length Itachi figure stands against a red-and-black field of manga panels. The horizontal composition places the character near the centre while the repeated background imagery extends across the width.",
    "price": 2100,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/itachi_manga_panel_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-3",
    "title": "Goku Rage Drop Shoulder Tee",
    "description": "A red-and-purple Goku illustration dominates the back, with energetic strokes extending around the figure. The small Dragon Ball Z chest wordmark gives this drop-shoulder tee a compact front detail that echoes the colourful reverse.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769332/deez-prints/drops/dbz--3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769383/deez-prints/drops/dbz-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769335/deez-prints/drops/dbz--3-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769372/deez-prints/drops/dbz-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769379/deez-prints/drops/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769376/deez-prints/drops/dbz-3-beige-front.jpg"
    ],
    "colors": [
      "White",
      "Beige",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-supra",
    "title": "Supra Drop Shoulder Tee",
    "description": "Purple SUPRA lettering towers over a rectangular automotive layout with a car illustration at the bottom. A smaller purple script wordmark sits on the chest, linking the front to the back design of this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927207/supra_black_drop_shoulder_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927187/supra_black_drop_shoulder_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-chainsaw",
    "title": "Denji Chainsawman Acid Wash Tee",
    "description": "Denji\'s chainsaw-headed figure appears in a red, white and black action composition across the back, beside vertical lettering. A smaller Chainsaw Man wordmark keeps the front comparatively spare on this acid-wash tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770087/deez-prints/acid/chainsaw-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770081/deez-prints/acid/chainsaw-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770090/deez-prints/acid/chainsaw-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770084/deez-prints/acid/chainsaw-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "berserk-tee",
    "title": "BERSERK TEE",
    "description": "A red-and-black chest graphic leads into a larger Berserk manga collage on the back. Japanese lettering, monochrome panels and a barcode-style detail give this regular tee a printed-page layout, with the artwork concentrated down the centre.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "graphic",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739461/bersk_B_yzgt10.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739461/berserk_Bb_dsrns9.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739462/whtieb_mewjvg.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772739461/white_ber_bztrq9.webp"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 4,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-titan",
    "title": "Attack Titan Drop Shoulder Tee",
    "description": "The Attack Titan\'s roaring form fills the back, with exposed jaw, wild hair and red steam lines rising from the muscular figure. This Attack on Titan drop-shoulder tee uses a single dramatic character illustration as its centrepiece.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769936/deez-prints/drops/titan-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769934/deez-prints/drops/titan-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769931/deez-prints/drops/titan-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769942/deez-prints/drops/titan-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769939/deez-prints/drops/titan-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769945/deez-prints/drops/titan-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-chainsaw-2",
    "title": "Chainsawman Drop Shoulder Tee",
    "description": "A chainsaw-headed figure in a collared shirt fills the back against red strokes and Japanese lettering. The front carries a small Chainsaw Man wordmark, leaving the larger character artwork to define this drop-shoulder design.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769283/deez-prints/drops/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769279/deez-prints/drops/chainsaw-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769276/deez-prints/drops/chainsaw-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769287/deez-prints/drops/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769291/deez-prints/drops/chainsaw2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769294/deez-prints/drops/chainsaw2-blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-mobland",
    "title": "Outlaw Acid Wash Tee",
    "description": "A small angular OUTLAW wordmark sits at the chest, while a monochrome group scene runs along the lower front. The wide hem-level illustration gives this acid-wash tee an unusual placement compared with a standard central print.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770288/deez-prints/acid/mobland-maroon-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770282/deez-prints/acid/mobland-grey-front.jpg"
    ],
    "colors": [
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-itachi-uchiha-akatsuki-tapestry",
    "title": "ITACHI UCHIHA AKATSUKI TAPESTRY",
    "description": "Itachi stands in a dark cloak with red details against a background of monochrome manga panels. A red circular shape behind the head separates the portrait from the surrounding collage in this vertical tapestry.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/itachi_uchiha_akatsuki_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-kaijin",
    "title": "Garou Kaijin Drop Shoulder Tee",
    "description": "Garou\'s back illustration is overlaid with red branching strokes, while KAIJIN lettering sits on the chest. Separate thorn-like marks near the front hem give this drop-shoulder tee several graphic placements rather than one continuous print.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769598/deez-prints/drops/kaijin-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769608/deez-prints/drops/kaijin-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769601/deez-prints/drops/kaijin-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769604/deez-prints/drops/kaijin-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769611/deez-prints/drops/kaijin-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769614/deez-prints/drops/kaijin-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-5",
    "title": "Goku Ronin Drop Shoulder Tee",
    "description": "Goku\'s monochrome portrait is framed by curling clouds, red clothing accents and vertical Japanese lettering. A small circular chest emblem completes the front of this drop-shoulder tee without repeating the large back print.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769412/deez-prints/drops/dbz-5-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769435/deez-prints/drops/dbz-5-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769421/deez-prints/drops/dbz-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769424/deez-prints/drops/dbz-5-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769431/deez-prints/drops/dbz-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769416/deez-prints/drops/dbz-5-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769428/deez-prints/drops/dbz-5-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-spiderverse",
    "title": "SPIDERVERSE ACID WASH TEE",
    "description": "An oversized red spider outline spans the back, with narrow white lettering through its centre. The chest carries a smaller white-and-red spider motif, creating a two-sided emblem design on the acid-wash base.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788958737/deez-prints/covers/spiderverse_acid_wash_tee.png",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773085749/spiderAcidBack_dlpk7d.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773086650/spiderAcidF_m4jkna.webp"
    ],
    "colors": [
      "Acid Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-regular-uchiha-5",
    "title": "ITACHI AKATSUKI REGULAR TEE - EDITION III",
    "description": "A cloaked Itachi figure appears inside swirling monochrome shapes with red cloud accents on the back. A slim vertical character graphic sits on the chest, giving this regular-tee edition a lighter front treatment.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769069/deez-prints/regular/uchiha-5-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769072/deez-prints/regular/uchiha-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769075/deez-prints/regular/uchiha-5-white-front.jpg"
    ],
    "colors": [
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-1",
    "title": "Vegeta Super Saiyan Drop Shoulder Tee",
    "description": "A high-contrast Vegeta portrait uses bright hair and face outlines against a dark central silhouette. A small Majin symbol sits on the chest, giving this drop-shoulder tee a simple front and a larger monochrome back print.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769348/deez-prints/drops/dbz-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769340/deez-prints/drops/dbz-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769344/deez-prints/drops/dbz-1-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-5",
    "title": "Itachi Akatsuki Drop Shoulder Tee - Edition II",
    "description": "An Itachi portrait is surrounded by red symbols, black birds and flowing graphic shapes on the back. A smaller red-and-monochrome portrait motif sits on the chest, giving this edition a character-focused design on both sides.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769781/deez-prints/drops/naruto-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769754/deez-prints/drops/naruto-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769756/deez-prints/drops/naruto-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769778/deez-prints/drops/naruto-2-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-metallica-2-0",
    "title": "Metallica 2.0 Acid Wash Tee",
    "description": "Red Metallica lettering sits over a skeletal reaper carrying a curved scythe. White and grey detailing picks out the blade, skull and surrounding forms, creating a tall front graphic against the acid-wash surface.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926661/metallica_2_0_blackacid_wash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "tapestry-itachi-uchiha-crows-tapestry",
    "title": "ITACHI UCHIHA CROWS TAPESTRY",
    "description": "A close-up Itachi portrait is framed by black crows, a red circle and scattered red marks. The pale background emphasizes the dark clothing and hair, giving this vertical tapestry a strongly contrasted illustration.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/itachi_uchiha_crows_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-6",
    "title": "Itachi Akatsuki Drop Shoulder Tee - Edition III",
    "description": "A cloaked Itachi figure appears within swirling monochrome shapes and red cloud accents on the back. A slim vertical character graphic sits on the chest, keeping the front lighter than the illustrated reverse.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769788/deez-prints/drops/naruto-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769784/deez-prints/drops/naruto-3-beige-back.jpg"
    ],
    "colors": [
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-chainsaw-1",
    "title": "Denji Chainsaw Man Drop Shoulder Tee",
    "description": "A red-and-monochrome Denji action illustration sits beside vertical lettering on the back. A compact Chainsaw Man chest wordmark balances the larger character print on this drop-shoulder tee.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769261/deez-prints/drops/chainsaw-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769264/deez-prints/drops/chainsaw-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769273/deez-prints/drops/chainsaw-1-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-utopia-screwed",
    "title": "UTOPIA Screwed Acid Wash Tee",
    "description": "An overlapping cluster of gold-toned screws forms the back graphic. The front uses a separate red-bordered rectangular motif, making this UTOPIA acid-wash tee an object-led design rather than a portrait or logo collage.",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927467/utopia_screwed_black_acidwash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927434/utopia_screwed_black_acidwash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-regular-eye-2",
    "title": "GOJO SATORU REGULAR TEE",
    "description": "Gojo appears in side profile near the lower front, with white hair, dark clothing and blue fragments around him. The portrait\'s angled placement gives this regular tee a distinct silhouette without filling the upper chest.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768681/deez-prints/regular/eye-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768687/deez-prints/regular/eyewhite-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-speed",
    "title": "Formula Speed Drop Shoulder Tee",
    "description": "A Formula-style racing car runs along the lower front beneath a compact SPEED wordmark. The wide car illustration and open upper chest give this drop-shoulder tee a low-set, automotive graphic layout.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769908/deez-prints/drops/speed-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769896/deez-prints/drops/speed-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769902/deez-prints/drops/speed-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769910/deez-prints/drops/speed-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-fire",
    "title": "FIRE DROP SHOULDER TEE",
    "description": "Red-and-yellow flames frame a monochrome character beneath stacked FIRE POWER lettering at the lower back. A small chest symbol keeps the front simple, contrasting with the wider illustrated panel on this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769516/deez-prints/drops/fire-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769497/deez-prints/drops/fire-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769503/deez-prints/drops/fire-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769500/deez-prints/drops/fire-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769506/deez-prints/drops/fire-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-guns-n-roses",
    "title": "Guns N Roses Acid Wash Tee",
    "description": "Tall Guns N\' Roses lettering stretches down the front around a central emblem and red roses. The mostly monochrome design uses the flowers as its main colour accent against the dark acid-wash surface.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "/assets/products/guns-n-roses/guns_n_roses_acid_wash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "tapestry-itachi-uchiha-sharingan-tapestry",
    "title": "ITACHI UCHIHA SHARINGAN TAPESTRY",
    "description": "An extreme close-up of Itachi\'s face fills this vertical tapestry, with a red eye as the main colour accent. Black hair, grey facial shading and red edge details create a tightly cropped, portrait-led composition.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/itachi_uchiha_sharingan_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-4",
    "title": "Itachi Uchiha Drop Shoulder Tee",
    "description": "An Itachi silhouette and a vertical line of Japanese lettering run down the back above a flock of birds. More bird silhouettes rise from the lower front beneath a small chest symbol on this drop-shoulder tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769805/deez-prints/drops/naruto-4-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769808/deez-prints/drops/naruto-4-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769802/deez-prints/drops/naruto-4-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769811/deez-prints/drops/naruto-4-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769818/deez-prints/drops/naruto-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769821/deez-prints/drops/naruto-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769815/deez-prints/drops/naruto-4-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-ace",
    "title": "Fire Fist Ace Drop Shoulder Tee",
    "description": "An orange-accented Ace illustration and tall lettering fill the back, while two small face emblems sit on the chest. The drop-shoulder cut gives the flame-framed character graphic a wide area across the reverse.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769148/deez-prints/drops/ace-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769146/deez-prints/drops/ace-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769143/deez-prints/drops/ace-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769154/deez-prints/drops/ace-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769157/deez-prints/drops/ace-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769151/deez-prints/drops/ace-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-4",
    "title": "DBZ Goku Rage Acid Wash Tee",
    "description": "Goku\'s red-and-purple character graphic stands out across the back, framed by energetic strokes and stylized lettering. The front carries a small Dragon Ball Z wordmark over the mottled acid-wash base.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770154/deez-prints/acid/dbz-4-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770147/deez-prints/acid/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770144/deez-prints/acid/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770150/deez-prints/acid/dbz-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770157/deez-prints/acid/dbz-4-maroon-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "breakout-tee",
    "title": "BREAKOUT REGULAR TEE",
    "description": "Oversized BREAKOUT lettering runs across the chest, threaded with a red-and-white snake illustration. This regular tee keeps the design focused on one wide graphic rather than an all-over pattern.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "graphic",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255816/breakoutvariations_birjvm.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738506/breakb_zkkch0.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772738506/break2_bnjlfy.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773255816/breakoutvariations_birjvm.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-peter",
    "title": "PETER DROP SHOULDER TEE",
    "description": "A red mask graphic sits at the chest, while an oversized red spider outline stretches down the back. Fine lettering runs through the centre of the back emblem on this Spider-Man-themed drop-shoulder tee.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769848/deez-prints/drops/peter-blyue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769839/deez-prints/drops/peter-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769845/deez-prints/drops/peter-blyue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769842/deez-prints/drops/peter-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769851/deez-prints/drops/peter-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-drop-shoulder-shoot",
    "title": "Kaneki Reaper Drop Shoulder Tee",
    "description": "A monochrome Kaneki illustration on the back is crossed by sharp red diagonal marks. The front carries a narrow column of Japanese lettering around an eye symbol, giving this drop-shoulder tee separate character and emblem treatments.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769862/deez-prints/drops/shoot-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769865/deez-prints/drops/shoot-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769859/deez-prints/drops/shoot-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769870/deez-prints/drops/shoot-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769873/deez-prints/drops/shoot-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769867/deez-prints/drops/shoot-blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-bleach",
    "title": "BLEACH ACID WASH TEE",
    "description": "An expressive, spiky-haired manga portrait rises from the lower part of the tee, framed by small lettering. The loose black linework leaves much of the grey acid-wash surface exposed rather than filling the tee with a solid print.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770058/deez-prints/acid/bleach-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-luffy-one-piece-tapestry",
    "title": "LUFFY ONE PIECE TAPESTRY",
    "description": "Red ONE PIECE lettering sits above a full-body Luffy illustration surrounded by monochrome manga panels and red emblems. The dark vertical layout combines a central character with smaller framed scenes around him.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/luffy_one_piece_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-eye",
    "title": "Living the Dream Drop Shoulder Tee",
    "description": "A close-up eye graphic sits between red LIVE THE DREAM lettering and smaller handwritten-style words. The central placement gives this drop-shoulder tee one focused image with plenty of unprinted space around it.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769486/deez-prints/drops/eye-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769493/deez-prints/drops/eye-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dbz-2",
    "title": "Majin Vegeta 1.0 Drop Shoulder Tee",
    "description": "Yellow-haired Majin Vegeta fills the back in a red, blue and white composition. A red Majin symbol and a smaller character print near the front hem carry the design across two separate front placements.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769369/deez-prints/drops/dbz-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769352/deez-prints/drops/dbz-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769357/deez-prints/drops/dbz-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769361/deez-prints/drops/dbz-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769364/deez-prints/drops/dbz-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769367/deez-prints/drops/dbz-2-white-back.jpg"
    ],
    "colors": [
      "Black",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-metallica",
    "title": "Metallica Acid Wash Tee",
    "description": "A hooded skeletal figure sits beneath white Metallica lettering, framed by red marks and flowing lines. Red Master of Puppets text completes the lower edge of the front print on this acid-wash tee.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926701/metallica_black_acidwash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "music-drops"
  },
  {
    "id": "dp-regular-uchiha-2",
    "title": "ITACHI UCHIHA REGULAR TEE",
    "description": "An Itachi silhouette sits beneath a vertical line of Japanese lettering on the back, with birds spreading out below. More bird silhouettes rise from the lower front beneath a small chest symbol on this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769033/deez-prints/regular/uchiha-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769023/deez-prints/regular/uchiha-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769026/deez-prints/regular/uchiha-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769030/deez-prints/regular/uchiha-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769036/deez-prints/regular/uchiha-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769039/deez-prints/regular/uchiha-2-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-yamoto",
    "title": "Yamoto Inferno Drop Shoulder Tee",
    "description": "A monochrome warrior stands within a broad red, flame-like halo on the back. Small YAMAMOTO lettering occupies the chest, connecting the minimal front to the larger illustrated reverse of this drop-shoulder tee.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769948/deez-prints/drops/yamoto-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769956/deez-prints/drops/yamoto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769953/deez-prints/drops/yamoto-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769959/deez-prints/drops/yamoto-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769965/deez-prints/drops/yamoto-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769950/deez-prints/drops/yamoto-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769962/deez-prints/drops/yamoto-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769968/deez-prints/drops/yamoto-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-zoro-2",
    "title": "Zoro Bushido Drop Shoulder Tee",
    "description": "A sword-carrying Zoro figure stands against a vivid green circle on the back, framed by Japanese lettering. A narrow column of green characters sits on the chest, repeating the back print\'s strongest colour.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769971/deez-prints/drops/zoro-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769979/deez-prints/drops/zoro-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769976/deez-prints/drops/zoro-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769974/deez-prints/drops/zoro-2-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-chrome-wyrm",
    "title": "Chrome Wyrm Acid Wash Tee",
    "description": "A coiled, dragon-like creature forms the detailed back graphic, surrounded by crosses and fine lettering. Curved, silver-toned thorn shapes frame the front neckline and shoulders, carrying the Chrome Wyrm design across both sides of the acid-wash tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926061/chrome_wyrm_acid_wash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926060/chrome_wyrm_acid_wash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "tapestry-madara-uchiha-sharingan-tapestry",
    "title": "MADARA UCHIHA SHARINGAN TAPESTRY",
    "description": "Madara stands in front of a dense grid of monochrome manga panels, with red armour and eye details providing the colour accents. The vertical tapestry layers the figure over the panel borders rather than keeping him inside a single frame.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/madara_uchiha_sharingan_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-luffy-2",
    "title": "Luffy Straw Hat Drop Shoulder Tee",
    "description": "Luffy is shown from behind in red clothing and a straw hat beneath large LUFFY lettering. A small straw-hat skull motif sits on the chest, linking the front detail to the illustrated back of this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769683/deez-prints/drops/luffy-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769674/deez-prints/drops/luffy-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769680/deez-prints/drops/luffy-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769677/deez-prints/drops/luffy-2-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-berserk-black-1",
    "title": "Guts Berserker Armor Drop Shoulder Tee",
    "description": "An armoured Guts figure grips a sword in the large red-and-monochrome back illustration. The front combines a red Brand of Sacrifice with an angular helmet graphic near the hem, giving this drop-shoulder tee multiple distinct print placements.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769225/deez-prints/drops/berserk-black-1-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769222/deez-prints/drops/berserk-black-1-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-7",
    "title": "Goku Black Rebellion Acid Wash Tee",
    "description": "A sharply shaded Goku Black portrait sits between red Japanese lettering and a large white wordmark. The rectangular composition brings together red graphic accents and monochrome character art on grey acid wash.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770178/deez-prints/acid/dbz-7-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-luffy-2",
    "title": "LUFFY GEAR 5 REGULAR TEE - EDITION II",
    "description": "ONE PIECE and red GEAR 5 lettering frame a large Luffy illustration on the back. A small straw-hat skull motif sits on the chest, keeping this regular-tee edition focused on a titled character graphic rather than a hem border.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768825/deez-prints/regular/luffy-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768852/deez-prints/regular/luffy2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768854/deez-prints/regular/luffy2-black-front.jpg"
    ],
    "colors": [
      "Grey",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-zoro",
    "title": "Zoro Ronin Drop Shoulder Tee",
    "description": "A monochrome Zoro portrait with swords occupies the lower back. The front pairs small green lettering with a separate sword-handle illustration near the hem, giving this drop-shoulder tee detail beyond the chest area.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769985/deez-prints/drops/zoro-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769988/deez-prints/drops/zoro-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769982/deez-prints/drops/zoro-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769996/deez-prints/drops/zoro-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769999/deez-prints/drops/zoro-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769990/deez-prints/drops/zoro-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769993/deez-prints/drops/zoro-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-berserk-2",
    "title": "Guts Brand of Sacrifice Drop Shoulder Tee",
    "description": "A red Brand of Sacrifice sits high above a monochrome Guts illustration rising from the lower back. The front uses a small red Berserk wordmark, keeping the strongest imagery on the reverse of this drop-shoulder tee.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769219/deez-prints/drops/berserk-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769216/deez-prints/drops/berserk-2-black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-crimson-thorn-sigil",
    "title": "Crimson Thorn Sigil Acid Wash Tee",
    "description": "A red central sigil sits between mirrored, pale thorn-like forms on the back. The front carries a separate white ornamental graphic, combining fine lines, pointed shapes and small text over the acid-wash texture.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926125/crimson_thorn_sigil_acid_wash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926154/crimson_thorn_sigil_acid_wash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "tapestry-one-piece-gear-5-luffy-tapestry",
    "title": "ONE PIECE GEAR 5 LUFFY TAPESTRY",
    "description": "Gear 5 Luffy occupies the centre of a black-and-white manga collage beneath ONE PIECE lettering. Small warm-coloured accents on the character break up the monochrome panels in this vertical tapestry.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/one_piece_gear_5_luffy_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-dark-knight",
    "title": "DARK KNIGHT DROP SHOULDER TEE",
    "description": "Batman appears in a large outline drawing on the back beside DARK KNIGHT lettering. The front carries a compact angular graphic, leaving the character illustration as the main feature of the drop-shoulder silhouette.",
    "price": 1850,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769320/deez-prints/drops/dark-knight-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769323/deez-prints/drops/dark-knight-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769316/deez-prints/drops/dark-knight-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769326/deez-prints/drops/dark-knight-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769329/deez-prints/drops/dark-knight-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-horn",
    "title": "Ichigo Hollow Drop Shoulder Tee",
    "description": "A horned Ichigo illustration fills the back in monochrome, with sweeping red strokes and vertical lettering. A small red chest emblem links the front to the larger character artwork on this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769561/deez-prints/drops/horn-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769583/deez-prints/drops/horn-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769567/deez-prints/drops/horn-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769574/deez-prints/drops/horn-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769580/deez-prints/drops/horn-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769564/deez-prints/drops/horn-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769570/deez-prints/drops/horn-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769577/deez-prints/drops/horn-blue-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-acid-wash-curse",
    "title": "Choso Bloodline Acid Wash Tee",
    "description": "Choso appears in black manga-style linework in a low-set graphic, with one raised hand and a red graphic accent. The open composition lets the grey acid-wash finish remain visible around the character.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770099/deez-prints/acid/curse-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-lcnst",
    "title": "LCNST TEE",
    "description": "A red, dripping sculptural form rises from the lower front beneath a small LCSNT wordmark. Long red trails and the off-centre placement give this black regular tee its distinctive graphic shape.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883234/lcsntregF_g3cnas.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-drop-shoulder-baby",
    "title": "Cupid Vintage Drop Shoulder Tee",
    "description": "Cherub illustrations frame the shoulders and lower front around a small central text block. This Cupid drop-shoulder tee uses offset artwork placements, leaving open space across the middle rather than one large boxed print.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788970851/deez-prints/covers/cupid_vintage_white_new.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769196/deez-prints/drops/baby-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769202/deez-prints/drops/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769205/deez-prints/drops/baby-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769210/deez-prints/drops/baby-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-itachi",
    "title": "Gojo Satoru Drop Shoulder Tee",
    "description": "Gojo Satoru\'s blindfolded portrait fills the front, with spiky white hair and glowing blue energy fragments floating around him. The dark high-collar jacket and upward gaze give this drop-shoulder tee its signature Jujutsu Kaisen look.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769595/deez-prints/drops/itachi-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769590/deez-prints/drops/itachi-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-ruinborn-requiem",
    "title": "Ruinborn Requiem Acid Wash Tee",
    "description": "Red-and-white skeletal wings and a long central spine spread across the back beneath jagged lettering. A smaller matching wordmark sits on the chest, giving this acid-wash tee a coordinated front and back treatment.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927106/ruinborn_requiem_acidwash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927008/ruinborn_requiem_acidwash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "tapestry-tanjiro-kamado-tapestry",
    "title": "TANJIRO KAMADO TAPESTRY",
    "description": "Tanjiro\'s side-profile portrait and checkered clothing sit within a beige, black and red collage. Vertical Japanese lettering and a red sun-like circle give this tapestry a layered, weathered-paper-style appearance within the printed artwork.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/tanjiro_kamado_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-itachi-2",
    "title": "Itachi Eclipse Drop Shoulder Tee",
    "description": "Itachi Uchiha sits atop a pole in his Akatsuki cloak, framed by a red moon, the Uchiha crest and swarming crows across the back. A MADARA front panel completes this Naruto-themed drop-shoulder tee with distinct artwork on each side.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769710/deez-prints/drops/madara-blackl-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769708/deez-prints/drops/madara-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769704/deez-prints/drops/madara-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769713/deez-prints/drops/madara-blackl-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769723/deez-prints/drops/madara-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769925/deez-prints/drops/tachi-whtie-back.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto",
    "title": "Naruto Eyes Drop Shoulder Tee",
    "description": "A stack of manga eye panels covers the back, combining black-and-white faces with small red and yellow details. The front has a compact leaf-shaped chest symbol, keeping the two sides of this drop-shoulder tee distinct.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769831/deez-prints/drops/naruto-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769827/deez-prints/drops/naruto-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769824/deez-prints/drops/naruto-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769833/deez-prints/drops/naruto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769836/deez-prints/drops/naruto-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-the-odyssey",
    "title": "The Odyssey Acid Wash Tee",
    "description": "Large red THE ODYSSEY lettering rises behind a metallic-looking helmeted warrior on the back. A small red title sits on the chest, giving this acid-wash tee a quiet front and a dramatic illustrated reverse.",
    "price": 2650,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927310/the_odyssey_black_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927299/the_odyssey_black_acid_wash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "dark-artistry"
  },
  {
    "id": "dp-regular-berserk-3",
    "title": "GUTS BERSERKER REGULAR TEE",
    "description": "A large monochrome Guts figure rises from the lower front beneath Japanese lettering. The character\'s armour and sword details form a dense silhouette, with open space separating the illustration from the smaller chest text.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768511/deez-prints/regular/berserkwhte-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768505/deez-prints/regular/berserkbeige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-mobland",
    "title": "Outlaw Drop Shoulder Tee",
    "description": "A small angular OUTLAW wordmark sits above a monochrome group scene near the front hem. The wide lower illustration leaves open space through the middle of this drop-shoulder tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769735/deez-prints/drops/mobland-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769747/deez-prints/drops/mobland-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769743/deez-prints/drops/mobland-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769750/deez-prints/drops/mobland-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769732/deez-prints/drops/mobland-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-konichiwa",
    "title": "Rockstar Tokyo Drop Shoulder Tee",
    "description": "Red Japanese lettering and a star overlap a monochrome portrait on the front. Small red text completes the Rockstar Tokyo composition, combining a photographic face with sharp graphic accents on this drop-shoulder tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769630/deez-prints/drops/konichiwa-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769634/deez-prints/drops/konichiwa-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-conquer",
    "title": "Conquer Acid Wash Tee",
    "description": "CONQUER arches above a narrow, skeletal graphic with a red centre line. Small text blocks sit beside the illustration, giving this acid-wash tee a front-focused layout built from typography and sharp vertical detail.",
    "price": 2100,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927903/conquer_black_acidwash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-ultra-instinct-goku-energy-tapestry",
    "title": "ULTRA INSTINCT GOKU ENERGY TAPESTRY",
    "description": "Goku holds a bright blue energy sphere in a horizontal action composition, surrounded by blue and purple streaks. The light concentrates around the hands and face, giving this tapestry a different focus from the full-body aura design.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/ultra_instinct_goku_energy_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-luffy-1",
    "title": "Luffy Gear 5 Drop Shoulder Tee",
    "description": "A Gear 5 Luffy illustration fills the back with One Piece-themed artwork and curling cloud details. A compact straw-hat skull motif sits on the chest, connecting both sides of this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769651/deez-prints/drops/luffy-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769648/deez-prints/drops/luffy-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769645/deez-prints/drops/luffy-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769662/deez-prints/drops/luffy-1-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769668/deez-prints/drops/luffy-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769654/deez-prints/drops/luffy-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769665/deez-prints/drops/luffy-1-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769671/deez-prints/drops/luffy-1-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-arise",
    "title": "Solo Leveling Arise Drop Shoulder Tee",
    "description": "ARISE lettering sits at the chest, with a larger monochrome Solo Leveling illustration across the back. Curling shapes frame the central figure, making the reverse the main graphic feature of this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769187/deez-prints/drops/arise-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769178/deez-prints/drops/arise-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769184/deez-prints/drops/arise-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769181/deez-prints/drops/arise-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769190/deez-prints/drops/arise-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-kaijin",
    "title": "Garou Kaijin Acid Wash Tee",
    "description": "Garou\'s monochrome figure is crossed by vivid red branching lines on the back. KAIJIN lettering and two separate thorn-like shapes occupy the front, giving both sides of the grey acid-wash tee distinct graphic placements.",
    "price": 2800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770228/deez-prints/acid/kaijin-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770231/deez-prints/acid/kaijin-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-madara-1",
    "title": "MADARA 1 REGULAR TEE",
    "description": "A monochrome Madara portrait with folded arms rises from the lower back. The front uses a narrow eye-panel graphic with small lettering, pairing detailed character artwork with a compact chest placement.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768869/deez-prints/regular/madara-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768857/deez-prints/regular/madara-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768860/deez-prints/regular/madara-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768863/deez-prints/regular/madara-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768866/deez-prints/regular/madara-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768872/deez-prints/regular/madara-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768875/deez-prints/regular/madara-1-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-luffy-3",
    "title": "Luffy Freedom Drop Shoulder Tee",
    "description": "A cropped Luffy portrait with a straw hat and red clothing occupies the lower front. Small birds and compact lettering extend the design upward while leaving much of the drop-shoulder tee unprinted.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769695/deez-prints/drops/luffy-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769689/deez-prints/drops/luffy-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769701/deez-prints/drops/luffy-3-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-naruto-3",
    "title": "NARUTO 3 DROP SHOULDER TEE",
    "description": "A Naruto character illustration forms the back graphic with manga-inspired details and sharp linework. The front keeps a smaller emblem, giving this drop-shoulder tee distinct artwork on each side.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769795/deez-prints/drops/naruto-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769792/deez-prints/drops/naruto-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769799/deez-prints/drops/naruto-3-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-hellstar",
    "title": "Hellstar Acid Wash Tee",
    "description": "A skull illustration, red markings and large HELLSTAR lettering form the back graphic. A smaller pale emblem on the chest leaves the front relatively open, showing the acid-wash finish around it.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926580/hellstar_acid_wash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926562/hellstar_acid_wash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "tapestry-vagabond",
    "title": "VAGABOND TAPESTRY",
    "description": "A loose black line drawing of a tied-back-haired swordsman fills this pale vertical tapestry. Fine red Japanese lettering, scattered marks and small decorative details surround the portrait without forming a dense background collage.",
    "price": 2100,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/vagabond_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-goodfellas",
    "title": "GOODFELLAS DROP SHOULDER TEE",
    "description": "A Goodfellas collage groups monochrome portraits and scene imagery beneath dark red title lettering. Thin red framing connects the panels into one front graphic on this drop-shoulder tee.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769531/deez-prints/drops/goodfellas-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769538/deez-prints/drops/goodfellas-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769544/deez-prints/drops/goodfellas-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-drop-shoulder-curse-whtie",
    "title": "Choso Bloodline Drop Shoulder Tee",
    "description": "Choso\'s raised-hand blood manipulation pose fills the back in detailed linework, with red blood splatters around his hands. The distinct facial blood mark across his nose identifies this Jujutsu Kaisen character on this white drop-shoulder tee.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769310/deez-prints/drops/curse-whtie-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769313/deez-prints/drops/curse-whtie-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-5",
    "title": "Goku Shenron Acid Wash Tee",
    "description": "A small silhouetted figure faces a coiling dragon in the large orange-and-red back illustration. A compact circular chest emblem gives this Goku Shenron acid-wash tee a quieter front to contrast with the fiery artwork.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770166/deez-prints/acid/dbz-5-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770163/deez-prints/acid/dbz-5-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770160/deez-prints/acid/dbz-5-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-batman-grye",
    "title": "Batman Noir Drop Shoulder Tee",
    "description": "NO MORE LIES and THE BATMAN lettering in red frame a dark Batman cowl portrait, with Riddler question mark annotations scattered around. This grey drop-shoulder tee uses a film-poster-style graphic with red accents.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769213/deez-prints/drops/batman-grye-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-drop-shoulder-fuckoff",
    "title": "FUCKOFF DROP SHOULDER TEE",
    "description": "Large red FUCK OFF lettering stretches across the upper back above a crouching astronaut illustration. The monochrome figure and bold text make this drop-shoulder tee a direct, graphic statement rather than a subtle logo design.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769519/deez-prints/drops/fuckoff-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769525/deez-prints/drops/fuckoff-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-luffy-1",
    "title": "Luffy Gear 5 Acid Wash Tee",
    "description": "A white Gear 5 Luffy illustration fills the back, surrounded by curling clouds. The front combines a small straw-hat skull motif with a cloud border along the hem, carrying the cloud theme across both sides of the acid-wash tee.",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770246/deez-prints/acid/luffy-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770243/deez-prints/acid/luffy-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770240/deez-prints/acid/luffy-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770249/deez-prints/acid/luffy-1-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-vegeta-prince-of-saiyans-tapestry",
    "title": "VEGETA PRINCE OF SAIYANS TAPESTRY",
    "description": "A monochrome Vegeta layout combines a large central face with smaller character panels and bold DRAGON BALL lettering. The restrained black-and-white palette gives this vertical tapestry the look of an enlarged manga page.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/vegeta_prince_of_saiyans_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-regular-series",
    "title": "Garou Kaijin Series Drop Shoulder Tee",
    "description": "KAIJIN lettering and two thorn-like front motifs accompany a large Garou back illustration crossed by red branching lines. This edition presents the artwork on a beige drop-shoulder tee in the supplied gallery.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769856/deez-prints/drops/regularssss-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769854/deez-prints/drops/regularssss-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-fire-bleu",
    "title": "Tanjiro Fire Water Drop Shoulder Tee",
    "description": "Tanjiro in his checkered haori stands amid swirling flames, with FIRE WATER lettering framing the Demon Slayer artwork. A smaller chest graphic balances the larger back illustration on this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769509/deez-prints/drops/fire-bleu-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769512/deez-prints/drops/fire-bleu-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-supra",
    "title": "Supra Acid Wash Tee",
    "description": "Tall purple SUPRA lettering, small text panels and a purple car illustration form a vertical back composition. A matching script wordmark sits on the chest, connecting the automotive artwork across this acid-wash tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927267/supra_black_acid_wash_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789927252/supra_black_acid_wash_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-regular-uchiha-3",
    "title": "ITACHI AKATSUKI REGULAR TEE - EDITION II",
    "description": "A dark Itachi portrait is layered with a red circular symbol, vertical lettering and a red-cloud cloak detail. The narrow back composition leaves clear space around the artwork on this regular-tee edition.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769050/deez-prints/regular/uchiha-3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769043/deez-prints/regular/uchiha-3-black-back.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-head",
    "title": "Tanjiro Kamado Drop Shoulder Tee",
    "description": "A red-and-black side-profile character illustration rises from the lower front beneath a small red symbol. White highlights define the hair and face, creating a compact, high-contrast print on this black drop-shoulder tee.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769559/deez-prints/drops/head-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-solo-1",
    "title": "Solo Leveling Drop Shoulder Tee",
    "description": "Blue SOLO LEVELING lettering tops a split portrait in blue, black and purple on the back. A small purple chest emblem carries the colour forward without repeating the larger illustration.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769876/deez-prints/drops/solo-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769884/deez-prints/drops/solo-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769882/deez-prints/drops/solo-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769887/deez-prints/drops/solo1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769878/deez-prints/drops/solo-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769890/deez-prints/drops/solo1-beige-front.jpg"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-naruto-3",
    "title": "Itachi Uchiha Acid Wash Tee",
    "description": "Bird silhouettes rise from the lower front beneath a small chest symbol. On the back, an Itachi silhouette, more birds and a vertical line of Japanese lettering create a narrow composition on the grey acid-wash base.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770312/deez-prints/acid/naruto-3-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770309/deez-prints/acid/naruto-3-grey-back.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-vegeta-super-saiyan-tapestry",
    "title": "VEGETA SUPER SAIYAN TAPESTRY",
    "description": "Yellow-haired Vegeta lunges forward in blue clothing against black-and-white manga artwork. The bright central figure breaks through the surrounding linework, giving this vertical tapestry a strong colour-versus-monochrome contrast.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/vegeta_super_saiyan_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-drop-shoulder-hands",
    "title": "Kurapika Drop Shoulder Tee",
    "description": "Two skeletal hands hold several chains across the lower back, with a small cross-shaped motif above. A reduced chest graphic repeats the fine gold-toned linework on the front of this black drop-shoulder tee.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769547/deez-prints/drops/hands-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769551/deez-prints/drops/hands-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-drop-shoulder-evil",
    "title": "See No Evil Drop Shoulder Tee",
    "description": "SEE NO EVIL lettering sits beside a cropped, classical-style sculpture illustration at the lower front. The asymmetrical composition leaves the shoulders and upper chest clear on this drop-shoulder tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "drop-shoulder",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769470/deez-prints/drops/evil-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769461/deez-prints/drops/evil-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769476/deez-prints/drops/evil-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769479/deez-prints/drops/evil-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-naruto-4",
    "title": "Itachi Eclipse Acid Wash Tee",
    "description": "A red-and-black circular scene frames a small figure on the back, with a white centre and birds overhead. A narrow eye-panel graphic sits on the chest, echoing the black, white and red palette.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770322/deez-prints/acid/naruto-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770318/deez-prints/acid/naruto-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770315/deez-prints/acid/naruto-4-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-7",
    "title": "GOKU RONIN REGULAR TEE",
    "description": "Goku\'s monochrome portrait is framed by curling clouds, red accents and Japanese lettering on the back. A compact circular chest emblem gives this regular tee a clean front beside the more detailed reverse.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768641/deez-prints/regular/dbz-7-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768638/deez-prints/regular/dbz-7-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768635/deez-prints/regular/dbz-7-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768644/deez-prints/regular/dbz-7-white-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-rick-and-morty",
    "title": "Rick and Morty Acid Wash Tee",
    "description": "Pink lettering and an oval-framed Rick and Morty illustration cover the back, mixing green-grey character details with a bright border. A small green Rick and Morty wordmark sits on the chest of the acid-wash tee.",
    "price": 2100,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926964/rick_and_morty_acid_wash_black_back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1789926973/rick_and_morty_acid_wash_black_front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "tapestry-american-psycho-bateman-portrait-tapestry",
    "title": "AMERICAN PSYCHO BATEMAN PORTRAIT TAPESTRY",
    "description": "A close-up Patrick Bateman portrait fills this vertical tapestry, with red brush-like blocks behind the face and black graphic details along the sides. The American Psycho design focuses on the wide-eyed expression rather than a full film-poster layout.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/american_psycho_bateman_portrait_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-luffy-3",
    "title": "Luffy Straw Hat Acid Wash Tee",
    "description": "Luffy is shown from behind in a red outfit and straw hat, beneath large handwritten-style LUFFY lettering. The graphic uses an angled character pose and small supporting marks against the grey acid-wash background.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770261/deez-prints/acid/luffy-3-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-snake",
    "title": "SNAKE TEE",
    "description": "A snake curves down from one shoulder towards the chest in a single monochrome illustration. Its off-centre placement keeps most of this regular tee clear, with the winding outline providing the main detail.",
    "price": 1550,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772883233/snakeREGF_ezwmpp.webp",
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772909295/whitesnakeREGF_qczni7.webp"
    ],
    "colors": [
      "Black"
    ],
    "rating": 4,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-shoot",
    "title": "Kaneki Reaper Acid Wash Tee",
    "description": "A monochrome Kaneki illustration is crossed by sharp red diagonal marks. The composition sits low on the grey acid-wash tee, with the red lines cutting through the otherwise black-and-white character artwork.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770355/deez-prints/acid/shoot-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-american-psycho-movie-poster-tapestry",
    "title": "AMERICAN PSYCHO MOVIE POSTER TAPESTRY",
    "description": "Tall AMERICAN PSYCHO lettering heads a dark Patrick Bateman portrait in this vertical tapestry. A red side panel and fine poster-style text break up the black background, giving the design a restrained red, white and monochrome palette.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/american_psycho_movie_poster_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-eye",
    "title": "Living the Dream Acid Wash Tee",
    "description": "A close-up eye illustration sits beneath red LIVE THE DREAM lettering, with additional red handwriting below. The small central composition keeps this acid-wash tee focused on a single surreal image rather than an oversized character print.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770189/deez-prints/acid/eye-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-4",
    "title": "MAJIN VEGETA RAGE REGULAR TEE",
    "description": "Yellow-haired Majin Vegeta appears in a red-and-blue back graphic with sharp white highlights. A red Majin symbol and a small character print near the front hem extend the design across both sides of this regular tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768599/deez-prints/regular/dbz-4-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768593/deez-prints/regular/dbz-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768595/deez-prints/regular/dbz-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768601/deez-prints/regular/dbz-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768604/deez-prints/regular/dbz-4-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-aizen",
    "title": "AIZEN ACID WASH TEE",
    "description": "A red, black and white Aizen illustration fills the back, framed by vertical lettering and swirling graphic details. The front carries a smaller Aizen emblem, leaving the acid-wash texture visible around the print.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770002/deez-prints/acid/aizen-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770007/deez-prints/acid/aizen-gre-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770004/deez-prints/acid/aizen-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770010/deez-prints/acid/aizen-gre-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-breaking-bad-walter-white-jesse-tapestry",
    "title": "BREAKING BAD WALTER WHITE JESSE TAPESTRY",
    "description": "Walter White and Jesse face each other with their hands meeting at the centre of a wide landscape scene. Muted sky and ground tones give this Breaking Bad tapestry a quieter photographic look, with a small title mark in the upper corner.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/breaking_bad_walter_white_jesse_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-naruto-1",
    "title": "Naruto Eyes Acid Wash Tee",
    "description": "Stacked manga eye panels form a rectangular back print, with red and yellow accents among the monochrome faces. A small leaf-shaped symbol sits on the chest, keeping the front of this Naruto-themed acid-wash tee minimal.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770297/deez-prints/acid/naruto-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770294/deez-prints/acid/naruto-1-b_ack-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770291/deez-prints/acid/naruto-1-b_ack-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-sukuna",
    "title": "Attack Titan Regular Tee",
    "description": "The Attack Titan\'s fierce roaring portrait dominates this regular tee, with exposed jaw muscles and red steam accents. A compact chest emblem balances the detailed back illustration.",
    "price": 1950,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768939/deez-prints/regular/sakuna-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768945/deez-prints/regular/sakuna-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768951/deez-prints/regular/sakunga-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768942/deez-prints/regular/sakuna-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768948/deez-prints/regular/sakuna-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768954/deez-prints/regular/sakunga-beige-front.jpg"
    ],
    "colors": [
      "Blue",
      "White",
      "Beige",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-chainsaw-2",
    "title": "Chainsawman Acid Wash Tee",
    "description": "A chainsaw-headed figure in a collared shirt fills the back, with red Japanese lettering down the side. The front uses a compact Chainsaw Man wordmark, keeping the larger character illustration as the main feature.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770075/deez-prints/acid/chainsaw-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770079/deez-prints/acid/chainsaw-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770094/deez-prints/acid/chainsaw2-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770073/deez-prints/acid/chainsaw-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770096/deez-prints/acid/chainsaw2-maroon-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-cyber-city",
    "title": "CYBER CITY NIGHT TAPESTRY",
    "description": "A night-time city street glows with blue and pink signs, reflected across the road around a dark car. This vertical Cyber City tapestry uses deep shadows and neon colour to create a densely lit urban scene.",
    "price": 2000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/cyber_city_night_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-zoro-1",
    "title": "Zoro Ronin Acid Wash Tee",
    "description": "A monochrome Zoro portrait with swords occupies the lower back. Green lettering and a separate cluster of sword handles decorate the front, spreading the design across two smaller placements on the grey acid-wash base.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770402/deez-prints/acid/zoro-1-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770405/deez-prints/acid/zoro-1-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-animeshoot",
    "title": "KANEKI REAPER REGULAR TEE",
    "description": "Kaneki\'s monochrome figure is crossed by sharp red diagonal marks on the back. A vertical arrangement of Japanese lettering and an eye symbol sits on the chest, giving this regular tee a separate emblem-style front.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768462/deez-prints/regular/animeshootwhite-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768459/deez-prints/regular/animeshootbeige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768457/deez-prints/regular/animeshootbeige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768465/deez-prints/regular/animeshootwhite-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-zoro-3",
    "title": "Fire Fist Ace Acid Wash Tee",
    "description": "Ace appears in an orange-and-black back graphic with large ACE lettering and flame-like accents. Two small orange face emblems sit on the chest, giving the front a compact reference to the larger character design.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770412/deez-prints/acid/zoro-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770418/deez-prints/acid/zoro-3-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770415/deez-prints/acid/zoro-3-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-fight-club-tyler-durden-tapestry",
    "title": "FIGHT CLUB TYLER DURDEN TAPESTRY",
    "description": "Tyler Durden\'s monochrome portrait sits beneath and beside large red FIGHT CLUB lettering. Red radial marks and small text blocks complete the vertical poster-style tapestry against a pale background.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/fight_club_tyler_durden_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-batman",
    "title": "BATMAN ACID WASH TEE",
    "description": "A Batman portrait, red lettering and small framed details form a poster-style back graphic. The front keeps things simpler with a solid bat emblem on the textured acid-wash base.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770028/deez-prints/acid/batman-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770031/deez-prints/acid/batman-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-regular-luffy-4",
    "title": "LUFFY FREEDOM REGULAR TEE",
    "description": "A cropped Luffy portrait with a straw hat sits low on the front, accented with red clothing and small flying birds. The off-centre layout leaves the upper chest open on this regular tee.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768843/deez-prints/regular/luffy-4-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768849/deez-prints/regular/luffy-4-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-berserk-2",
    "title": "BERSERK 2 ACID WASH TEE",
    "description": "A large monochrome Guts illustration rises from the lower front beneath Japanese lettering. The armour and sword details create a dense, off-centre silhouette, leaving the acid-wash texture visible across the upper part of the tee.",
    "price": 3200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770055/deez-prints/acid/berserk2--black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770043/deez-prints/acid/berserk-3-maroon-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-scarface-tony-montana-tapestry",
    "title": "SCARFACE TONY MONTANA TAPESTRY",
    "description": "Large red SCARFACE lettering heads a black-and-white Tony Montana collage divided into rectangular panels. Portraits, close-up eyes and a larger action image give this vertical tapestry a film-contact-sheet layout.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/scarface_tony_montana_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-fire",
    "title": "Tanjiro Fire Water Acid Wash Tee",
    "description": "Tanjiro in his checkered haori is surrounded by dramatic flame effects, with FIRE WATER block lettering behind him. The Demon Slayer-inspired composition uses red and orange fire details against the grey acid-wash finish.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770207/deez-prints/acid/fire-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770204/deez-prints/acid/fire-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770201/deez-prints/acid/fire-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-dbz-6",
    "title": "GOKU SHENRON REGULAR TEE",
    "description": "An orange dragon coils above a small silhouetted figure in the large back print. The front carries a small orange circular emblem, linking the two sides of this Goku Shenron regular tee through colour.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768624/deez-prints/regular/dbz-6-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768632/deez-prints/regular/dbz-6-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768629/deez-prints/regular/dbz-6-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768627/deez-prints/regular/dbz-6-black-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-eyes",
    "title": "Gojo Satoru Acid Wash Tee",
    "description": "A side-profile Gojo portrait rises from the lower front, with white hair, dark clothing and bright blue fragments around the figure. The upper chest remains open, allowing the acid-wash texture to frame the artwork.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770195/deez-prints/acid/eyes-blackkk-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770192/deez-prints/acid/eyes-blackkk-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770198/deez-prints/acid/eyes-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "tapestry-spider-man-comic-tapestry",
    "title": "SPIDER-MAN COMIC TAPESTRY",
    "description": "Spider-Man sits centrally between oversized pale SPIDER and MAN lettering against a red comic-style background. The wide horizontal composition stretches the title and surrounding linework across the tapestry.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/spider-man_comic_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-sukuna",
    "title": "Sukuna Cursed Acid Wash Tee - Mineral Grey Edition",
    "description": "Sukuna is drawn in fine black linework with bold red markings in a large character graphic. Vertical Japanese lettering sits beside the portrait, with the mineral-grey acid-wash background visible through the open parts of the illustration.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770382/deez-prints/acid/sukuna-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-luffy-1",
    "title": "LUFFY GEAR 5 REGULAR TEE - EDITION I",
    "description": "A cloud-framed Gear 5 Luffy illustration fills the back. The front combines a small straw-hat skull motif with a curling cloud border along the hem, distinguishing this regular-tee edition through its lower-edge detail.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768816/deez-prints/regular/luffy-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768819/deez-prints/regular/luffy-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768814/deez-prints/regular/luffy-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768822/deez-prints/regular/luffy-1-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dark-knight",
    "title": "DARK KNIGHT ACID WASH TEE",
    "description": "A large outline illustration of Batman occupies the back beside DARK KNIGHT lettering. The smaller chest graphic uses pointed, angular lettering, giving this acid-wash tee a clear contrast between its restrained front and illustrated back.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770108/deez-prints/acid/darknight-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770105/deez-prints/acid/dark-night-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770102/deez-prints/acid/dark-night-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "tapestry-the-godfather-tapestry",
    "title": "THE GODFATHER TAPESTRY",
    "description": "A monochrome portrait of Vito Corleone sits beside The Godfather title on a black background. A small red flower provides the main colour accent, keeping this vertical tapestry focused on the portrait and lettering.",
    "price": 3000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/the_godfather_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "art-drop"
  },
  {
    "id": "dp-acid-wash-naruto-5",
    "title": "Naruto 3 Acid Wash Tee",
    "description": "A Naruto character portrait fills the back of this acid-wash tee, with Japanese lettering and manga-panel details framing the illustration. The design uses sharp linework against the mottled acid-wash texture.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770331/deez-prints/acid/naruto-5-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770325/deez-prints/acid/naruto-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770334/deez-prints/acid/naruto-5-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770328/deez-prints/acid/naruto-5-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-berserk",
    "title": "GUTS BRAND OF SACRIFICE REGULAR TEE",
    "description": "A red Brand of Sacrifice sits above a monochrome Guts illustration at the lower back. A compact red Berserk chest wordmark ties the front to the larger reverse artwork on this regular tee.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768490/deez-prints/regular/berserk-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768493/deez-prints/regular/berserk-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-goodfellas",
    "title": "GOODFELLAS ACID WASH TEE",
    "description": "A Goodfellas portrait collage combines monochrome faces, scene imagery and dark red typography. The front graphic is arranged like a compact film poster against the grey acid-wash background.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770210/deez-prints/acid/goodfellas-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "tapestry-rick-and-morty",
    "title": "RICK & MORTY TAPESTRY",
    "description": "Rick and Morty imagery fills this tapestry with bright pink, green, yellow and blue. Oversized faces, a lab-coated figure and curling background shapes create a busy illustrated composition with very little empty space.",
    "price": 2000,
    "category": "tapestries",
    "subcategory": "tapestries",
    "images": [
      "/assets/products/tapestries/rick_and_morty_tapestry.webp"
    ],
    "colors": [],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  },
  {
    "id": "dp-acid-wash-dbz-6",
    "title": "Goku Ronin Acid Wash Tee",
    "description": "A monochrome Goku portrait is framed by curling cloud shapes and red Japanese lettering on the back. The small circular front emblem keeps the same black, white and red palette across this acid-wash design.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770171/deez-prints/acid/dbz-6-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770174/deez-prints/acid/dbz-6-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770169/deez-prints/acid/dbz-6-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-naruto-3",
    "title": "ITACHI AKATSUKI REGULAR TEE - EDITION I",
    "description": "An Itachi portrait is surrounded by black birds, red symbols and flowing shapes on the back. A smaller red-and-monochrome chest motif gives this regular-tee edition a related character detail on the front.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768917/deez-prints/regular/naruto3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768914/deez-prints/regular/naruto-3-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768911/deez-prints/regular/naruto-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768919/deez-prints/regular/naruto3-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-luffy-4",
    "title": "Luffy Freedom Acid Wash Tee",
    "description": "A cropped Luffy portrait with a straw hat and red clothing rises from the lower front, with small birds and text nearby. This acid-wash tee leaves much of the upper chest open around the illustration.",
    "price": 2100,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770267/deez-prints/acid/luffy-4-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770264/deez-prints/acid/luffy-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770270/deez-prints/acid/luffy-4-greyt-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-berserk",
    "title": "Guts Brand of Sacrifice Acid Wash Tee",
    "description": "The red Brand of Sacrifice sits high on the back above a monochrome Guts illustration rising from the hem. Red Berserk lettering on the chest ties the two sides together on this acid-wash tee.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770046/deez-prints/acid/berserk-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770049/deez-prints/acid/berserk-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-5",
    "title": "GOKU RAGE REGULAR TEE",
    "description": "A vivid red-and-purple Goku illustration covers the back, with coloured strokes spreading beyond the character\'s outline. A compact Dragon Ball Z wordmark sits on the chest, adding a smaller front reference on this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768612/deez-prints/regular/dbz-5-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768610/deez-prints/regular/dbz-5-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768607/deez-prints/regular/dbz-5-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768618/deez-prints/regular/dbz-5-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768621/deez-prints/regular/dbz-5-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768615/deez-prints/regular/dbz-5-black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-luffy-2",
    "title": "Luffy Gear 5 2.0 Acid Wash Tee",
    "description": "ONE PIECE and red GEAR 5 lettering frame a large Luffy illustration on the back. A small straw-hat skull motif sits on the chest, creating a compact front detail beside the much larger acid-wash back design.",
    "price": 2300,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770255/deez-prints/acid/luffy-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770258/deez-prints/acid/luffy-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770253/deez-prints/acid/luffy-2-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-naruto-2",
    "title": "Madara 1 Acid Wash Tee",
    "description": "A large monochrome Madara portrait fills the lower back, with folded arms and layered armour detail. The front carries a small leaf-shaped chest symbol, leaving the acid-wash texture as the main surface detail.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770303/deez-prints/acid/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770306/deez-prints/acid/naruto-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770300/deez-prints/acid/naruto-2-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-luffy-3",
    "title": "LUFFY STRAW HAT REGULAR TEE",
    "description": "Luffy is shown from behind in a red outfit and straw hat beneath handwritten-style LUFFY lettering. A small straw-hat skull chest motif links the front of this regular tee to the larger back print.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768829/deez-prints/regular/luffy-3-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768837/deez-prints/regular/luffy-3-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768834/deez-prints/regular/luffy-3-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768832/deez-prints/regular/luffy-3-beige-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-madara",
    "title": "Madara Uchiha Acid Wash Tee",
    "description": "Madara appears as a large line-drawn figure across the front, accompanied by purple linework and a small text block above. The acid-wash background remains visible through the open outlines of the illustration.",
    "price": 1900,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770276/deez-prints/acid/madara-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770279/deez-prints/acid/madara-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-3",
    "title": "Majin Vegeta 2.0 Acid Wash Tee",
    "description": "A full-colour Majin Vegeta graphic dominates the back, with yellow hair, blue clothing and red accents. The front pairs a red Majin symbol with a smaller character illustration near the hem, adding detail to both sides of this acid-wash tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788970867/deez-prints/covers/majin_vegeta_acid_wash_new.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770130/deez-prints/acid/dbz-3-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770136/deez-prints/acid/dbz-3-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770127/deez-prints/acid/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770133/deez-prints/acid/dbz-3-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770138/deez-prints/acid/dbz-3-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770141/deez-prints/acid/dbz-3-maroon-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-uchiha-1",
    "title": "MADARA UCHIHA REGULAR TEE",
    "description": "A line-drawn Madara figure overlaps purple background linework beneath a small text block. The open outlines and fine lettering give this regular tee a layered front composition without a solid rectangular background.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769080/deez-prints/regular/uchiha1beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769087/deez-prints/regular/uchiha1black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769092/deez-prints/regular/uchiha1white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-sakuna",
    "title": "Tanjiro Demon Slayer Acid Wash Tee",
    "description": "A side-profile Tanjiro portrait with his distinctive forehead scar and Hanafuda earring sits across the front. Red Japanese kanji adds a bold accent against the dark acid-wash finish.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770352/deez-prints/acid/sakuna-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-konichiwa",
    "title": "Rockstar Tokyo Acid Wash Tee",
    "description": "A monochrome portrait, red Japanese lettering and star shapes build a layered front graphic. This Rockstar Tokyo acid-wash tee concentrates the artwork on the chest and torso, with an unprinted back shown in the gallery.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788958697/deez-prints/covers/rockstar_tokyo_acid_wash.png",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770237/deez-prints/acid/konichiwa-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770234/deez-prints/acid/konichiwa-black-back.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-ichigo",
    "title": "ICHIGO HOLLOW REGULAR TEE",
    "description": "A horned Ichigo figure fills the back in detailed monochrome, framed by red strokes and vertical lettering. A small red chest emblem gives this regular tee a compact front detail in the same colour palette.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768747/deez-prints/regular/Ichigo-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768744/deez-prints/regular/Ichigo-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768741/deez-prints/regular/Ichigo-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768753/deez-prints/regular/Ichigo-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768749/deez-prints/regular/Ichigo-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768755/deez-prints/regular/Ichigo-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-1",
    "title": "Majin Vegeta Acid Wash Tee",
    "description": "Majin Vegeta stands in a battle-ready pose with the iconic M mark on his forehead. The front pairs a close-up portrait with manga-style background details on this acid-wash tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788958669/deez-prints/covers/majin_vegeta_acid_wash_tee_front.png",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770111/deez-prints/acid/dbz-1-maroon-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770115/deez-prints/acid/dbz-1-maroon-front.jpg"
    ],
    "colors": [
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-titan",
    "title": "TITAN ACID WASH TEE",
    "description": "A muscular, spiky-haired manga figure fills the lower part of the tee in heavy black linework, with scattered red lettering alongside it. The grey acid-wash finish shows through the open areas of this large character drawing.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788958781/deez-prints/covers/titan_acid_wash_tee.png",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770385/deez-prints/acid/titan-grey-front.jpg"
    ],
    "colors": [
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-solo-2",
    "title": "SOLO LEVELING ARISE REGULAR TEE",
    "description": "A tall monochrome Solo Leveling illustration covers the back, framed by curling dark shapes. The front carries an ARISE chest wordmark, contrasting the detailed character art with a smaller typography-based graphic.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768974/deez-prints/regular/solo-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768971/deez-prints/regular/solo-2-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768968/deez-prints/regular/solo-2-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768977/deez-prints/regular/solo-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768986/deez-prints/regular/solo2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768989/deez-prints/regular/solo2-black-front.jpg"
    ],
    "colors": [
      "Blue",
      "White",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-dbz-2",
    "title": "Vegeta Super Saiyan Acid Wash Tee",
    "description": "A high-contrast Vegeta portrait fills the back, using bright hair and facial outlines against a dark silhouette. A small Majin symbol sits on the chest, leaving the rest of the acid-wash front open.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770118/deez-prints/acid/dbz-2-blkac-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770124/deez-prints/acid/dbz-2-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770121/deez-prints/acid/dbz-2-blkac-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-yamoto",
    "title": "Yamoto Inferno Acid Wash Tee",
    "description": "A monochrome warrior stands within a broad red flame-like halo on the back. Small YAMAMOTO lettering on the chest echoes the red-and-white palette, leaving the rest of the acid-wash front open.",
    "price": 2500,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788958466/deez-prints/covers/yamoto_inferno_black.png",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770390/deez-prints/acid/yamoto-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770393/deez-prints/acid/yamoto-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770388/deez-prints/acid/yamoto-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dbz-1",
    "title": "MAJIN VEGETA REGULAR TEE",
    "description": "A monochrome Vegeta portrait is surrounded by a red outline and energetic red marks on the back. The front carries a small red Majin symbol, keeping the character artwork as the main feature of this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768573/deez-prints/regular/dbz-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768567/deez-prints/regular/dbz-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768575/deez-prints/regular/dbz-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768570/deez-prints/regular/dbz-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768579/deez-prints/regular/dbz-1-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-zoro-2",
    "title": "Zoro Bushido Acid Wash Tee",
    "description": "Zoro stands in front of a vivid green circular backdrop, with sword details and vertical lettering around him. The front uses a smaller column of green characters, carrying the same accent colour across this acid-wash tee.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788970863/deez-prints/covers/zoro_bushido_acid_wash_new.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770397/deez-prints/acid/zoro-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770400/deez-prints/acid/zoro-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770408/deez-prints/acid/zoro-2-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-horns",
    "title": "Ichigo Hollow Acid Wash Tee",
    "description": "A horned Ichigo illustration fills the back in black and white, framed by red lettering and sweeping red accents. A small red mask-like chest emblem carries the colour through to the front of this acid-wash tee.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770219/deez-prints/acid/horns-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770225/deez-prints/acid/horns-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770222/deez-prints/acid/horns-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-regular-sukuna-2",
    "title": "SUKUNA CURSED REGULAR TEE",
    "description": "Sukuna\'s back portrait combines fine black linework, bold red markings and vertical Japanese lettering. Red Sukuna text and an eye-and-mouth motif appear separately on the front, giving this regular tee three distinct graphic placements.",
    "price": 1850,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769003/deez-prints/regular/sukuna-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769012/deez-prints/regular/sukuna-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769006/deez-prints/regular/sukuna-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769009/deez-prints/regular/sukuna-white-back.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-speed",
    "title": "Formula Speed Acid Wash Tee",
    "description": "A Formula-style racing car stretches across the lower front beneath a small SPEED wordmark. The low, wide illustration leaves the chest mostly clear and makes the hemline the focal point of this acid-wash tee.",
    "price": 2100,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788970860/deez-prints/covers/formula_speed_acid_wash_new.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770379/deez-prints/acid/speed-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770376/deez-prints/acid/speed-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770373/deez-prints/acid/speed-grey-front.jpg"
    ],
    "colors": [
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-solo-1",
    "title": "Solo Leveling Acid Wash Tee",
    "description": "Blue SOLO LEVELING lettering sits above a split portrait graphic in blue and purple. The large back print contrasts with a small purple chest emblem on the textured acid-wash base.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770364/deez-prints/acid/solo1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770367/deez-prints/acid/solo1-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-hands",
    "title": "KURAPIKA RAGE REGULAR TEE",
    "description": "Skeletal hands hold draped chains across the lower back, with a small cross-shaped motif above. A compact chest version repeats the muted gold-toned linework on the front of this regular tee.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768734/deez-prints/regular/hands-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768732/deez-prints/regular/hands-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768729/deez-prints/regular/hands-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768738/deez-prints/regular/hands-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-hands",
    "title": "Kurapika Rage Acid Wash Tee",
    "description": "Two skeletal hands hold draped chains across the lower back, with a small cross-shaped detail above. A matching compact chest motif gives this acid-wash tee a restrained front and a more intricate reverse.",
    "price": 2400,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770213/deez-prints/acid/hands-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770216/deez-prints/acid/hands-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-acid-wash-evil",
    "title": "See No Evil Acid Wash Tee",
    "description": "SEE NO EVIL lettering and a cropped classical-style sculpture illustration sit low on the front. The print extends towards the hem, leaving the upper half open and emphasizing the acid-wash surface.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788958717/deez-prints/covers/see_no_evil_acid_wash_tee.png",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770186/deez-prints/acid/evil-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770180/deez-prints/acid/evil-grey-front.jpg"
    ],
    "colors": [
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-zoro-2",
    "title": "ZORO BUSHIDO REGULAR TEE",
    "description": "Zoro stands with swords against a vivid green circle, framed by vertical lettering on the back. A smaller column of green Japanese characters sits on the chest, repeating the illustration\'s strongest accent colour.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769126/deez-prints/regular/zoro-2-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769140/deez-prints/regular/zoro-2-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769137/deez-prints/regular/zoro-2-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769130/deez-prints/regular/zoro-2-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769133/deez-prints/regular/zoro-2-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-acid-wash-peter",
    "title": "Peter Parker Great Power Acid Wash Tee",
    "description": "A small red Spider-Man mask sits on the chest, paired with a much larger red spider emblem on the back. Fine lettering runs through the back emblem, keeping this acid-wash tee focused on red linework and recognizable shapes.",
    "price": 2200,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770340/deez-prints/acid/peter-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770346/deez-prints/acid/peter-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770343/deez-prints/acid/peter-grey-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770337/deez-prints/acid/peter-black-back.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-acid-wash-baby",
    "title": "Cupid Vintage Acid Wash Tee",
    "description": "White cherub illustrations sit around the shoulders and lower front, with a compact block of text at the centre. The off-centre arrangement gives this Cupid design a different layout from a conventional chest-logo tee, set against an acid-wash finish.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "acid-wash",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770016/deez-prints/acid/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787770019/deez-prints/acid/baby-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "Maroon"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-zoro-1",
    "title": "ZORO RONIN REGULAR TEE",
    "description": "A monochrome Zoro portrait with sword details rises from the lower back. Small green lettering and a separate sword-handle illustration decorate the front, giving this regular tee more than a single chest placement.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769116/deez-prints/regular/zoro-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769110/deez-prints/regular/zoro-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769113/deez-prints/regular/zoro-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769119/deez-prints/regular/zoro-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769122/deez-prints/regular/zoro-1-white-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-batman1",
    "title": "BATMAN NOIR REGULAR TEE",
    "description": "A Batman portrait collage with red headlines and small framed details fills the back. The front uses a solid black bat emblem, giving this regular tee a clear contrast between simple iconography and layered poster artwork.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768484/deez-prints/regular/batman1white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768482/deez-prints/regular/batman1beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768479/deez-prints/regular/batman1beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768487/deez-prints/regular/batman1white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "comic-universe"
  },
  {
    "id": "dp-regular-fire",
    "title": "Tanjiro Fire Water Regular Tee",
    "description": "Tanjiro\'s checkered haori and surrounding flame effects create the FIRE WATER-themed graphic on this regular tee. The Demon Slayer character illustration pairs fiery detail with bold block lettering.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768696/deez-prints/regular/fire-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768690/deez-prints/regular/fire-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768693/deez-prints/regular/fire-black-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-speed",
    "title": "FORMULA SPEED REGULAR TEE",
    "description": "A Formula-style racing car stretches across the lower front, with a small SPEED wordmark above. The wide, low-set illustration gives this regular tee an automotive theme without filling the chest with a large logo.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768995/deez-prints/regular/speed-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769000/deez-prints/regular/speed-white-front.jpg"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-berserk-2",
    "title": "GUTS BERSERKER ARMOR REGULAR TEE",
    "description": "An armoured Guts figure grips a sword against red circular accents on the back. The front pairs a red Brand of Sacrifice with a separate helmet illustration near the hem, giving this regular tee several linked design elements.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768496/deez-prints/regular/berserk2black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768499/deez-prints/regular/berserk2black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-fuck",
    "title": "FUCK OFF REGULAR TEE",
    "description": "Bold red FUCK OFF lettering spans the upper back above a crouching astronaut illustration. The grey-and-white figure gives this regular tee a detailed central image beneath the oversized headline.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768699/deez-prints/regular/fuckbeige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768705/deez-prints/regular/fuckblack-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768711/deez-prints/regular/fuckgrey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-uchiha-4",
    "title": "ITACHI ECLIPSE REGULAR TEE",
    "description": "A small figure is framed within a red, black and white circular scene on the back, with birds overhead. A narrow eye-panel chest graphic repeats the palette at a smaller scale on this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769056/deez-prints/regular/uchiha-4-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769066/deez-prints/regular/uchiha-4-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769063/deez-prints/regular/uchiha-4-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769060/deez-prints/regular/uchiha-4-black-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-dream",
    "title": "LIVE THE DREAM REGULAR TEE",
    "description": "A close-up eye graphic sits beneath red LIVE THE DREAM lettering, with smaller handwritten-style words below. The design stays centred on the front, leaving the rest of this regular tee clear around the illustration.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768670/deez-prints/regular/dreamwhite-front.jpg"
    ],
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-naruto-1",
    "title": "NARUTO EYES REGULAR TEE",
    "description": "Stacked manga eye panels form a rectangular back graphic with red and yellow accents. A small leaf-shaped chest symbol provides a minimal front detail on this Naruto-themed regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768890/deez-prints/regular/naruto-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768899/deez-prints/regular/naruto-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768896/deez-prints/regular/naruto-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768893/deez-prints/regular/naruto-1-black-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-goodfellas",
    "title": "GOODFELLAS REGULAR TEE",
    "description": "A Goodfellas collage combines monochrome portraits, scene imagery and dark red title lettering. Thin red framing links the images into a single movie-poster-style front print on this regular tee.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768717/deez-prints/regular/goodfellas-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768723/deez-prints/regular/goodfellasblack-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768726/deez-prints/regular/goodfellasgrey-front.jpg"
    ],
    "colors": [
      "White",
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "cinema-collection"
  },
  {
    "id": "dp-regular-mob",
    "title": "OUTLAW REGULAR TEE",
    "description": "An angular OUTLAW wordmark sits at the chest above a monochrome group scene near the hem. The two separated front placements leave an open band through the middle of this regular tee.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768881/deez-prints/regular/mob-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768886/deez-prints/regular/mob-white-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-solo-1",
    "title": "SOLO LEVELING SHADOW REGULAR TEE",
    "description": "A split portrait in blue and purple sits beneath SOLO LEVELING lettering on the back. A small purple emblem on the chest repeats the accent colour while leaving the front of this regular tee mostly open.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768957/deez-prints/regular/solo-1-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768965/deez-prints/regular/solo-1-white-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768962/deez-prints/regular/solo-1-white-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768981/deez-prints/regular/solo1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768960/deez-prints/regular/solo-1-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768983/deez-prints/regular/solo1-beige-front.jpg"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-tujiro",
    "title": "TANJIRO KAMADO REGULAR TEE",
    "description": "A red-and-black side-profile portrait sits low on the front beneath a small red symbol. White highlights pick out the character\'s hair and face, leaving the rest of this black regular tee clear around the illustration.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769021/deez-prints/regular/tujiro-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-yamoto-1",
    "title": "YAMAMOTO INFERNO REGULAR TEE",
    "description": "A monochrome Yamamoto illustration stands within a broad red flame-like halo on the back. A small chest wordmark echoes the red-and-white palette on the front of this regular tee.",
    "price": 2000,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769105/deez-prints/regular/yamoto1-Black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769098/deez-prints/regular/yamoto-1-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769096/deez-prints/regular/yamoto-1-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769101/deez-prints/regular/yamoto-1-grey-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787769108/deez-prints/regular/yamoto1-Black-front.jpg"
    ],
    "colors": [
      "Beige",
      "Grey",
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-naruto-2",
    "title": "NARUTO SHADOW REGULAR TEE",
    "description": "A high-contrast Naruto portrait fills the back, using solid white shapes and fine outlines to define the face and clothing. A small leaf-shaped symbol sits on the chest, keeping the front of this regular tee simple.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768902/deez-prints/regular/naruto-2-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768905/deez-prints/regular/naruto-2-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768908/deez-prints/regular/naruto-2-grey-front.jpg"
    ],
    "colors": [
      "Black",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "dp-regular-baby",
    "title": "CUPID VINTAGE REGULAR TEE",
    "description": "Cherub illustrations frame the shoulders and lower front around a small central text block. This regular tee uses offset placements and open space, with the largest Cupid artwork sitting close to the hem.",
    "price": 1800,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1788970857/deez-prints/covers/cupid_vintage_regular_black.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768470/deez-prints/regular/baby-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768476/deez-prints/regular/baby-whiet-front.jpg"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-knight",
    "title": "KNIGHT REGULAR TEE",
    "description": "A large Batman outline drawing rises from the lower back beside DARK KNIGHT lettering. A small angular chest graphic balances the detailed reverse on this regular tee.",
    "price": 1700,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768798/deez-prints/regular/knight-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768792/deez-prints/regular/knight-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768808/deez-prints/regular/knight-blue-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768801/deez-prints/regular/knight-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768805/deez-prints/regular/knight-blue-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768795/deez-prints/regular/knight-beige-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768811/deez-prints/regular/knight-grey-front.jpg"
    ],
    "colors": [
      "Beige",
      "Black",
      "Blue",
      "Grey"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-responsibility",
    "title": "PETER PARKER GREAT POWER REGULAR TEE",
    "description": "A red mask graphic sits on the chest, paired with a large red spider outline across the back. Fine lettering runs through the centre of the back emblem on this Peter Parker-themed regular tee.",
    "price": 1850,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768925/deez-prints/regular/responsibility-black-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768931/deez-prints/regular/responsibilitywhite-front.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768934/deez-prints/regular/responsibilty-beige-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768922/deez-prints/regular/responsibility-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768937/deez-prints/regular/responsibilty-beige-front.jpg"
    ],
    "colors": [
      "Black",
      "White",
      "Beige"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-chinese",
    "title": "ROCKSTAR TOKYO REGULAR TEE",
    "description": "A monochrome portrait is layered with red Japanese lettering, a star and smaller text blocks. The Rockstar Tokyo graphic concentrates its detail in one vertical composition on the front of this regular tee.",
    "price": 1750,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768564/deez-prints/regular/chinese-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "minimal-drops"
  },
  {
    "id": "dp-regular-dbz-3",
    "title": "VEGETA SUPER SAIYAN REGULAR TEE",
    "description": "Vegeta\'s spiked hair and face emerge in bright monochrome outlines against a dark silhouette. A small Majin symbol sits at the chest, giving this regular tee a restrained front beside its large back portrait.",
    "price": 1850,
    "category": "t-shirts",
    "subcategory": "regular",
    "images": [
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768587/deez-prints/regular/dbz-3-black-back.jpg",
      "https://res.cloudinary.com/okcxaese/image/upload/v1787768590/deez-prints/regular/dbz-3-black-front.jpg"
    ],
    "colors": [
      "Black"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
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
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "anime-archive"
  },
  {
    "id": "mug-white",
    "title": "SKULL CERAMIC MUG",
    "description": "A red-and-black skull and upper-spine illustration runs vertically down the outside of this white ceramic mug. The side-profile artwork creates a strong colour contrast with the plain white handle and interior shown in the product image.",
    "price": 600,
    "category": "accessories",
    "subcategory": "mugs",
    "images": [
      "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1772897480/mug_sample_sfu1kd.webp"
    ],
    "colors": [
      "White"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
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
    "colors": [
      "Red",
      "Green",
      "Black",
      "Blue"
    ],
    "rating": 5,
    "aesthetic": "streetwear-essentials"
  }
];

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
/**
 * Subcategories currently visible in the store.
 * To re-enable a category, simply add it back to this set.
 */
const VISIBLE_SUBCATEGORIES: ReadonlySet<string> = new Set([
  "regular",
  "drop-shoulder",
  "acid-wash",
  "tapestries",
  "flags",
]);

export async function getProducts(): Promise<Product[]> {
  const overrides = await fetchProductOverrides();
  const all = mergeOverrides(products, overrides);
  return all.filter((p) => VISIBLE_SUBCATEGORIES.has(p.subcategory));
}

export type ProductWithTimestamp = Product & {
  lastmod?: string;
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

  const overridesMap: Record<string, ProductOverrideData> = {};
  for (const [id, meta] of Object.entries(dbMetadata)) {
    if (meta && meta.data) {
      overridesMap[id] = meta.data;
    }
  }

  const merged = mergeOverrides(products, overridesMap);

  return merged.map((p) => {
    const meta = dbMetadata[p.id];
    const lastmod = meta?.updatedAt;
    return {
      ...p,
      ...(lastmod ? { lastmod } : {}),
    };
  });
}