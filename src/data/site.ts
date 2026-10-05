/**
 * Canonical production URL for all SEO-facing outputs.
 * Change this single value to migrate the canonical domain in the future.
 * Do NOT use window.location.origin or request Host headers for SEO URLs.
 */
export const SITE_URL = "https://deezprints.com";

export const LOGO_URL = "/assets/hero/hero-typography.svg";
export const LOGO_PNG = "/assets/logo.png";

export const CDN = "https://res.cloudinary.com/dsjnjbsgi/image/upload";

export const commercialConfig = {
  shippingKarachiFee: 200,
  shippingNationwideFee: 450,
  freeShippingThreshold: 5000,
  prepTime: "2–3 working days",
  deliveryTimeKarachi: "2–4 working days",
  deliveryTimeNationwide: "3–5 working days",
  exchangeWindow: "7 days",
  acceptedPaymentMethods: ["Easypaisa", "Bank Transfer (Meezan)", "Cash on Delivery"] as const,
};

export const site = {
  name: "Deez Prints",
  tagline: "Streetwear. Custom Prints. No limits.",
  email: "deezprints69@gmail.com",
  location: "Karachi, Pakistan",
  instagram: "https://www.instagram.com/deez_prints/",
  whatsappNumber: "923272487127",
  hours: "Online store — available 24/7",
  shippingFee: 200,
  shippingFeeNationwide: 450,
  freeShippingThreshold: 5000,
  deliveryTime: "3–5 working days",
  deliveryTimeKarachi: "2–4 working days",
  deliveryTimeNationwide: "3–5 working days",
  prepTime: "2–3 working days",
  exchangeWindow: "7 days",
  couriers: "TCS, Leopards, M&P",
  orderPrepNotice: "Orders take 2–3 working days to prepare before dispatch. Delivery time is additional and depends on your location.",
};

export const bankDetails = {
  easypaisa: {
    id: "easypaisa" as const,
    title: "Easypaisa",
    accountTitle: "MUHAMMAD HUZAIFA RIAZ",
    accountNumber: "03272487127",
    logo: "/assets/payment/easypaisa.svg",
  },
  jazzcash: {
    id: "jazzcash" as const,
    title: "JazzCash",
    accountTitle: "MUHAMMAD HUZAIFA RIAZ",
    accountNumber: "03272487127",
    logo: "/assets/payment/jazzcash.svg",
  },
  raast: {
    id: "raast" as const,
    title: "Raast",
    accountTitle: "MUHAMMAD HUZAIFA RIAZ",
    accountNumber: "03272487127",
    logo: "/assets/payment/raast.svg",
  },
  meezan: {
    id: "meezan" as const,
    title: "Meezan Bank",
    bankName: "Meezan Bank",
    accountTitle: "MUHAMMAD HUZAIFA RIAZ",
    accountNumber: "01890110481675",
    logo: "/assets/payment/meezan.svg",
  },
};

export function toAbsoluteImageUrl(path?: string | null): string {
  if (!path) return `${SITE_URL}/og-image.jpg`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Returns a URL guaranteed to produce a 1200×630 JPEG suitable for OG/social previews.
 *
 * For Cloudinary images, injects transformation parameters (crop to fill + format jpeg).
 * For local/static assets, returns them as-is (they should already be 1200×630).
 * Falls back to the global og-image.jpg when no path is given.
 */
export function toOgImageUrl(path?: string | null): string {
  const abs = toAbsoluteImageUrl(path);

  // Detect Cloudinary URLs from either CDN account used in this project
  const cloudinaryMatch = abs.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload)(\/.*)?\/([^/]+)$/
  );
  if (cloudinaryMatch) {
    const base = cloudinaryMatch[1];
    // Strip any existing transformation segment and rebuild with OG transforms
    const rest = cloudinaryMatch[0].replace(base, "");
    // Remove existing transformation params (anything between /upload/ and the version or filename)
    const withoutTransforms = rest.replace(/\/(?:[a-z_]+_[^/,]+,?)+(?=\/v\d|\/[^v])/, "");
    // Inject: width 1200, height 630, crop fill, gravity auto, format jpg, quality auto
    return `${base}/c_fill,w_1200,h_630,g_auto,f_jpg,q_auto${withoutTransforms}`;
  }

  return abs;
}

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=${text}`
    : `https://www.instagram.com/deez_prints/`;
}

export const paymentMethods = ["Easypaisa", "Bank Transfer (Meezan)", "Cash on Delivery"];

/* ─── Shipping / Delivery Configuration ─────────────────────── */

export type DeliveryLocation = "karachi" | "nationwide";

export const SHIPPING_OPTIONS: Record<DeliveryLocation, {
  label: string;
  fee: number;
  method: string;
  description: string;
}> = {
  karachi: {
    label: "Karachi",
    fee: 200,
    method: "Rider",
    description: "Karachi — Rs. 200 via Rider",
  },
  nationwide: {
    label: "Nationwide Pakistan",
    fee: 450,
    method: "Courier",
    description: "Nationwide — Rs. 450 via Courier",
  },
};

export const aestheticSlugs = [
  "anime-archive",
  "comic-universe",
  "minimal-drops",
  "cinema-collection",
  "art-drop",
  "music-drops",
  "dark-artistry",
  "streetwear-essentials",
];

export type CollectionStatus = "ACTIVE" | "COMING_SOON";

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  status: CollectionStatus;
  navHidden?: boolean;
  match: (p: { category: string; subcategory: string; aesthetic?: string }) => boolean;
};

export const collections: Collection[] = [
  {
    slug: "anime-archive",
    name: "Anime Archive",
    blurb: "Iconic anime graphics inspired by classics and new-gen legends.",
    image: "/assets/collections/anime_archive_v3.webp",
    status: "ACTIVE",
    match: (p) => p.aesthetic === "anime-archive",
  },
  {
    slug: "comic-universe",
    name: "Comic Universe",
    blurb: "Marvel, DC, Comics, Superheroes.",
    image: "/assets/collections/comic_universe.webp",
    status: "ACTIVE",
    match: (p) => p.aesthetic === "comic-universe",
  },
  {
    slug: "minimal-drops",
    name: "Minimal Drops",
    blurb: "Small chest prints, clean graphics, typography, symbols, understated everyday wear.",
    image: "/assets/collections/minimal_drops.webp",
    status: "ACTIVE",
    match: (p) => p.aesthetic === "minimal-drops",
  },
  {
    slug: "cinema-collection",
    name: "Cinema Collection",
    blurb: "Iconic films, unforgettable characters, and legendary moments brought to life.",
    image: "/assets/collections/cinema_collection.webp",
    status: "ACTIVE",
    match: (p) => p.aesthetic === "cinema-collection",
  },
  {
    slug: "art-drop",
    name: "Art Drop",
    blurb: "Experimental artwork, surreal graphics and limited releases.",
    image: "/assets/collections/art_drop.webp",
    status: "ACTIVE",
    navHidden: true,
        match: (p) => p.aesthetic === "art-drop" || p.subcategory === "tapestries" || p.title.toLowerCase().includes("abstract") || p.title.toLowerCase().includes("wings"),
  },
  {
    slug: "music-drops",
    name: "Music Drops",
    blurb: "Travis Scott, Metallica, Guns N' Roses — legendary artists on premium streetwear.",
    image: "/assets/collections/street_aesthetic.webp",
    status: "ACTIVE",
    navHidden: true,
        match: (p) => p.aesthetic === "music-drops" || /travis|utopia|metallica|guns|tbsm|seedhe|encore/i.test(p.title),
  },
  {
    slug: "dark-artistry",
    name: "Dark Artistry",
    blurb: "Gothic designs, dark fantasy, and mythological artwork.",
    image: "/assets/collections/street_aesthetic.webp",
    status: "ACTIVE",
    navHidden: true,
        match: (p) => p.aesthetic === "dark-artistry" || /berserk|skull|blade|guts|warrior|curse|ruinborn/i.test(p.title),
  },
  {
    slug: "streetwear-essentials",
    name: "Streetwear Essentials",
    blurb: "Bold typography, street energy and everyday statements.",
    image: "/assets/collections/street_aesthetic.webp",
    status: "ACTIVE",
    navHidden: true,
        match: (p) => !p.retired && (p.subcategory === "drop-shoulder" || p.subcategory === "acid-wash"),
  },
  {
    slug: "drop-shoulder",
    name: "Drop Shoulder",
    blurb: "Oversized cuts, heavyweight cotton.",
    image: "/assets/collections/drop_shoulder_cover_v3.jpg",
    status: "ACTIVE",
    match: (p) => p.subcategory === "drop-shoulder",
  },
  {
    slug: "acid-wash",
    name: "Acid Wash",
    blurb: "Hand-washed. No two identical.",
    image: "/assets/collections/acid_wash_cover_v3.jpg",
    status: "ACTIVE",
    match: (p) => p.subcategory === "acid-wash",
  },
  {
    slug: "t-shirts",
    name: "Regular Tees",
    blurb: "The everyday staple, printed loud.",
    image: "/assets/collections/regular_tees_cover_v3.jpg",
    status: "ACTIVE",
    match: (p) => p.category === "t-shirts" && ["regular", "graphic"].includes(p.subcategory),
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    blurb: "Fleece-backed heavyweight drops in development. Drop coming soon.",
    image: "/assets/collections/hoodies.jpg",
    status: "COMING_SOON",
    match: (p) => p.category === "hoodies",
  },
  {
    slug: "tapestries",
    name: "Tapestries",
    blurb: "High-definition satin wall tapestries for your space.",
    image: "/assets/products/tapestries/berserk_eclipse_tapestry.webp",
    status: "ACTIVE",
    match: (p) => ["tapestries", "flags"].includes(p.subcategory),
  },
  {
    slug: "accessories",
    name: "Mugs",
    blurb: "Premium ceramic graphic mugs & drinkware. Exclusively delivered in Karachi.",
    image: `${CDN}/v1773596802/mug_collection_gntc3f.webp`,
    status: "ACTIVE",
    match: (p) => p.category === "accessories" || p.subcategory === "mugs",
  },
];

export const HERO_IMAGE = `${CDN}/v1772883554/berserkdropf_bed9qx.webp`;
export const CUSTOM_IMAGE = `${CDN}/v1773571102/place_d2aqxn.webp`;

export const faqs = [
  {
    q: "What payment methods do you accept?",
    category: "Payments",
    a: "We accept Easypaisa mobile wallet transfers, Meezan Bank direct transfers, and Cash on Delivery (COD). For prepaid orders, simply transfer the order total and share your receipt screenshot via WhatsApp for instant verification. COD orders are confirmed via WhatsApp before dispatch.",
  },
  {
    q: "How long does delivery take?",
    category: "Shipping",
    a: "Orders take 2–3 working days to prepare at our Karachi studio before dispatch. Delivery time is additional and depends on your location (2–4 working days for Karachi, 3–5 working days via Courier for Nationwide Pakistan).",
  },
  {
    q: "What is your shipping fee?",
    a: "Karachi delivery is Rs. 200 and Nationwide Pakistan delivery is Rs. 450 (via Courier). Karachi orders over Rs. 5,000 qualify for FREE delivery. Please note: ceramic mugs are delivered only within Karachi.",
    category: "Shipping",
  },
  {
    q: "Do you deliver ceramic mugs nationwide?",
    category: "Shipping",
    a: "Due to the fragility of ceramic materials, our mugs are delivered exclusively within Karachi via local rider to guarantee 100% damage-free delivery. All apparel and tapestries are delivered nationwide across Pakistan.",
  },
  {
    q: "What is your exchange policy?",
    category: "Returns",
    a: "We offer a 7-day hassle-free exchange policy from the date of delivery for sizing adjustments or any rare printing/fabric defects. Items must be unworn, unwashed, and in original condition with tags attached.",
  },
  {
    q: "Do you offer cash refunds?",
    category: "Refunds",
    a: "We generally do not issue cash refunds. However, if an ordered item is out of stock upon arrival or confirmed defective, we process a direct bank refund within 7 working days.",
  },
  {
    q: "How does Custom Printing work?",
    category: "Custom Orders",
    a: "Upload your artwork on our /custom-print page or send your high-res design to us on WhatsApp (+92 327 2487127). Our studio team will prepare a digital mockup for approval before printing.",
  },
  {
    q: "What sizes and colors are available?",
    category: "Sizing",
    a: "Acid Wash tees are available in Black, Grey, and Maroon (Sizes: S, M, L). Drop Shoulder tees come in Black, White, Grey, Red, Blue, Army Green, Beige, and Brown (Sizes: S, M, L, XL). Regular Tees come in Black, Charcoal, White, Steel Grey, Navy Blue, Army Green, Red, Beige, and Brown (Sizes: S, M, L, XL, XXL).",
  },
  {
    q: "Where are Deez Prints garments manufactured?",
    category: "Production",
    a: "All blanks and custom prints are proudly designed, manufactured, and hand-inspected in our main Karachi studio using industrial DTF and UV printing machinery.",
  },
  {
    q: "How do I track my package?",
    category: "Shipping",
    a: "Once your parcel is dispatched from our Karachi studio, you will receive a tracking link and consignment ID via Email and SMS to monitor delivery on TCS or Leopards tracking portals.",
  },
  {
    q: "Do you ship internationally?",
    category: "Shipping",
    a: "Currently, we deliver nationwide across Pakistan. We are preparing to launch worldwide international shipping soon. Message us on WhatsApp for international order inquiries.",
  },
];

export const sizes = ["S", "M", "L", "XL", "XXL"];

/* ─── Sitewide Color & Size Specifications ──────────────────── */
export const ACID_WASH_SIZES = ["S", "M", "L"] as const;
export const ACID_WASH_COLORS = ["Black", "Grey", "Maroon"] as const;

export const REGULAR_TEE_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export const REGULAR_TEE_COLORS = [
  "Black",
  "Charcoal",
  "White",
  "Steel Grey",
  "Navy Blue",
  "Army Green",
  "Red",
  "Beige",
  "Brown",
] as const;

export const DROP_SHOULDER_SIZES = ["S", "M", "L", "XL"] as const;
export const DROP_SHOULDER_COLORS = [
  "Black",
  "White",
  "Grey",
  "Red",
  "Blue",
  "Army Green",
  "Beige",
  "Brown",
] as const;

export const COLOR_HEX_MAP: Record<string, string> = {
  Black: "#0a0a0a",
  Charcoal: "#363636",
  White: "#ffffff",
  "Steel Grey": "#71717a",
  "Navy Blue": "#1e3a8a",
  "Army Green": "#3f4e38",
  Red: "#dc2626",
  Beige: "#d6c0b3",
  Brown: "#5c3d2e",
  Grey: "#52525b",
  Maroon: "#6b1d2f",
  Blue: "#2563eb",
};

export const usps = [
  { title: "Premium Quality", body: "Top-notch fabric & prints" },
  { title: "Fast Dispatch", body: "2–3 days prep before dispatch" },
  { title: "Secure Payments", body: "Easypaisa, Bank Transfer & COD" },
  { title: "Easy Returns", body: "7-day exchange policy" },
];

export const navLinks = [
  { label: "Shop", to: "/collections" },
  { label: "Custom Print", to: "/custom-print" },
  { label: "Tapestries", to: "/collections/tapestries" },
  { label: "Mugs", to: "/collections/accessories" },
  { label: "About", to: "/about" },
];
