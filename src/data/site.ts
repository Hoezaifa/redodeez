export const LOGO_URL = "/assets/hero/hero-typography.svg";
export const LOGO_PNG = "/assets/logo.png";

export const CDN = "https://res.cloudinary.com/dsjnjbsgi/image/upload";

export const site = {
  name: "Deez Prints",
  tagline: "Streetwear. Custom Prints. No limits.",
  email: "deezprints69@gmail.com",
  location: "Karachi, Pakistan",
  instagram: "https://www.instagram.com/deez_prints/",
  whatsappNumber: "923272487127",
  hours: "Online store — available 24/7",
  shippingFee: 200,
  freeShippingThreshold: 5000,
  deliveryTime: "3–5 working days",
  couriers: "TCS, Leopards, M&P",
};

export const bankDetails = {
  meezan: {
    bankName: "Meezan Bank",
    accountTitle: "MUHAMMAD HUZAIFA RIAZ",
    accountNumber: "01890110481675",
  },
  easypaisa: {
    title: "Easypaisa / JazzCash / Zindigi",
    accountTitle: "MUHAMMAD HUZAIFA RIAZ",
    accountNumber: "03272487127",
  },
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=${text}`
    : `https://www.instagram.com/deez_prints/`;
}

export const paymentMethods = ["Meezan Bank Transfer", "Easypaisa / JazzCash / Zindigi"];

export const aestheticSlugs = [
  "anime-archive",
  "comic-universe",
  "minimal-drops",
  "cinema-collection",
  "art-drop",
  "street-aesthetic",
];

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  match: (p: { category: string; subcategory: string; aesthetic?: string }) => boolean;
};

export const collections: Collection[] = [
  {
    slug: "anime-archive",
    name: "Anime Archive",
    blurb: "Iconic anime graphics inspired by classics and new-gen legends.",
    image: "/assets/collections/anime_archive_v3.webp",
    match: (p) => p.aesthetic === "anime-archive",
  },
  {
    slug: "comic-universe",
    name: "Comic Universe",
    blurb: "Marvel, DC, Comics, Superheroes.",
    image: "/assets/collections/comic_universe.webp",
    match: (p) => p.aesthetic === "comic-universe",
  },
  {
    slug: "minimal-drops",
    name: "Minimal Drops",
    blurb: "Small chest prints, clean graphics, typography, symbols, understated everyday wear.",
    image: "/assets/collections/minimal_drops.webp",
    match: (p) => p.aesthetic === "minimal-drops",
  },
  {
    slug: "cinema-collection",
    name: "Cinema Collection",
    blurb: "Iconic films, unforgettable characters, and legendary moments brought to life.",
    image: "/assets/collections/cinema_collection.webp",
    match: (p) => p.aesthetic === "cinema-collection",
  },
  {
    slug: "art-drop",
    name: "Art Drop",
    blurb: "Experimental artwork, surreal graphics and limited releases.",
    image: "/assets/collections/art_drop.webp",
    match: (p) => p.aesthetic === "art-drop",
  },
  {
    slug: "street-aesthetic",
    name: "Street Aesthetic",
    blurb: "Bold typography, street energy and new everyday statements.",
    image: "/assets/collections/street_aesthetic.webp",
    match: (p) => p.aesthetic === "street-aesthetic",
  },
  {
    slug: "drop-shoulder",
    name: "Drop Shoulder",
    blurb: "Oversized cuts, heavyweight cotton.",
    image: `${CDN}/v1772883554/berserkdropf_bed9qx.webp`,
    match: (p) => p.subcategory === "drop-shoulder",
  },
  {
    slug: "acid-wash",
    name: "Acid Wash",
    blurb: "Hand-washed. No two identical.",
    image: `${CDN}/v1773086650/spiderAcidF_m4jkna.webp`,
    match: (p) => p.subcategory === "acid-wash",
  },
  {
    slug: "t-shirts",
    name: "Regular Tees",
    blurb: "The everyday staple, printed loud.",
    image: `${CDN}/v1772739461/white_ber_bztrq9.webp`,
    match: (p) => p.category === "t-shirts",
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    blurb: "Fleece-backed, built for winter.",
    image: `${CDN}/v1771268359/deez-prints/assets/products/hoodies/kanye-west-hoodie-v1.jpg`,
    match: (p) => p.category === "hoodies",
  },
  {
    slug: "wall-art",
    name: "Wall Art",
    blurb: "Tapestries for your space.",
    image: `${CDN}/v1773597161/tapestry_hr14wa.webp`,
    match: (p) => ["tapestries", "flags"].includes(p.subcategory),
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Premium ceramic mugs & lifestyle accessories.",
    image: `${CDN}/v1773596802/mug_collection_gntc3f.webp`,
    match: (p) => p.category === "accessories",
  },
];

export const HERO_IMAGE = `${CDN}/v1772883554/berserkdropf_bed9qx.webp`;
export const CUSTOM_IMAGE = `${CDN}/v1773571102/place_d2aqxn.webp`;

export const faqs = [
  {
    q: "What payment methods do you accept?",
    category: "Payments",
    a: "We accept Direct Bank Transfers (Meezan Bank IBAN & App) as well as Mobile Wallet transfers via Easypaisa, JazzCash, and Zindigi. Simply transfer the order total and upload your transaction reference or screenshot at checkout or via WhatsApp for instant verification.",
  },
  {
    q: "How long does delivery take?",
    category: "Shipping",
    a: "Standard delivery time is 3 to 5 working days across 250+ cities in Pakistan. Orders placed before 1 PM are usually dispatched the same working day via TCS, Leopards, and M&P.",
  },
  {
    q: "What is your shipping fee?",
    a: "We charge a flat nationwide delivery fee of Rs. 200. Orders above Rs. 5,000 qualify for FREE shipping automatically at checkout.",
    category: "Shipping",
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
    q: "What sizes are available and how do drop-shoulder tees fit?",
    category: "Sizing",
    a: "Our sizes range from S to XXL. Drop shoulder and acid wash tees feature a relaxed, luxury streetwear oversized fit with heavy 240+ GSM cotton. If you prefer a regular tailored fit, we recommend sizing down.",
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

export const usps = [
  { title: "Premium Quality", body: "Top-notch fabric & prints" },
  { title: "Fast Delivery", body: "Nationwide, 3–5 working days" },
  { title: "Secure Payments", body: "Meezan, Easypaisa & JazzCash" },
  { title: "Easy Returns", body: "7-day exchange policy" },
];

export const navLinks = [
  { label: "Shop", to: "/collections" },
  { label: "Custom Print", to: "/custom-print" },
  { label: "Wall Art", to: "/collections/wall-art" },
  { label: "Accessories", to: "/collections/accessories" },
  { label: "About", to: "/about" },
];
