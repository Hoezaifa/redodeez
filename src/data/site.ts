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

export type Collection = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  match: (p: { category: string; subcategory: string }) => boolean;
};

export const collections: Collection[] = [
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
    slug: "jerseys",
    name: "Jerseys",
    blurb: "Moto-cut, full sublimation.",
    image: `${CDN}/v1773571102/place_d2aqxn.webp`,
    match: (p) => p.category === "jerseys",
  },
  {
    slug: "wall-art",
    name: "Wall Art",
    blurb: "Tapestries and flags for your space.",
    image: `${CDN}/v1773597161/tapestry_hr14wa.webp`,
    match: (p) => ["tapestries", "flags"].includes(p.subcategory),
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Mugs, keychains, badges, gift boxes.",
    image: `${CDN}/v1773596802/mug_collection_gntc3f.webp`,
    match: (p) => p.category === "accessories",
  },
];

export const HERO_IMAGE = `${CDN}/v1772883554/berserkdropf_bed9qx.webp`;
export const CUSTOM_IMAGE = `${CDN}/v1773571102/place_d2aqxn.webp`;

export const faqs = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery time is 3-5 working days across Pakistan. Orders placed before 1 PM are usually dispatched the same day.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We currently accept Bank Transfers (Meezan Bank) and Mobile Wallets (Easypaisa, JazzCash, Zindigi).",
  },
  {
    q: "Do you offer international shipping?",
    a: "Currently, we only ship within Pakistan. However, we plan to expand internationally in the future.",
  },
  {
    q: "Can I cancel my order?",
    a: "You can cancel your order before it has been dispatched. Once dispatched, the order cannot be cancelled. Please contact us on WhatsApp immediately for cancellations.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is dispatched, we will send you a tracking number via Email/SMS which you can use to track your package.",
  },
  {
    q: "What is your exchange policy?",
    a: "We offer a 7-day exchange policy for size issues or defects. Please verify the size chart before ordering. Items must be unworn and in original condition.",
  },
];

export const sizes = ["S", "M", "L", "XL", "XXL"];

export const usps = [
  { title: "Premium Quality", body: "Top-notch fabric & prints" },
  { title: "Fast Delivery", body: "Nationwide, 3–5 working days" },
  { title: "COD Available", body: "Pay when you receive" },
  { title: "Easy Returns", body: "7-day exchange policy" },
];

export const navLinks = [
  { label: "Shop", to: "/collections" },
  { label: "Custom Print", to: "/custom-print" },
  { label: "Wall Art", to: "/collections/wall-art" },
  { label: "Accessories", to: "/collections/accessories" },
  { label: "About", to: "/about" },
];
