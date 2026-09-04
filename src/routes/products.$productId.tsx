import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Minus, Plus, ShoppingCart, ArrowRight, ChevronDown } from "lucide-react";
import { AccordionItem } from "@/components/shop/AccordionItem";
import { ApparelAccordion } from "@/components/shop/ApparelAccordion";
import { getProducts, type Product } from "@/data/products";
import {
  site,
  sizes as ALL_SIZES,
  whatsappLink,
  SITE_URL,
  toAbsoluteImageUrl,
  ACID_WASH_SIZES,
  ACID_WASH_COLORS,
  REGULAR_TEE_SIZES,
  REGULAR_TEE_COLORS,
  DROP_SHOULDER_SIZES,
  DROP_SHOULDER_COLORS,
  COLOR_HEX_MAP,
} from "@/data/site";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductZoomImage } from "@/components/shop/ProductZoomImage";
import { SizeChart } from "@/components/shop/SizeChart";
import { MobileProductDetail } from "@/components/shop/MobileProductDetail";
import { DesktopProductDetail } from "@/components/shop/DesktopProductDetail";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ params }) => {
    const allProducts = await getProducts();
    const product = allProducts.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product, allProducts };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const rawImg = p?.images[0];
    const absoluteImgUrl = toAbsoluteImageUrl(rawImg);
    const isTapestryMeta = p?.subcategory === "tapestries" || p?.subcategory === "flags";
    const desc = isTapestryMeta
      ? `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}. High-definition digital sublimation printed satin wall tapestry by Deez Prints. Made in Karachi, delivered across Pakistan.`
      : `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}. Premium graphic streetwear by Deez Prints. Orders take 2–3 working days to prepare before dispatch across Pakistan.`;
    const title = `${p?.title ?? "Product"} — Deez Prints`;
    const url = `${SITE_URL}/products/${p?.id ?? ""}`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)} | Deez Prints` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Deez Prints" },
        { property: "og:image", content: absoluteImgUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:price:amount", content: String(p?.price ?? 0) },
        { property: "og:price:currency", content: "PKR" },
        { property: "product:price:amount", content: String(p?.price ?? 0) },
        { property: "product:price:currency", content: "PKR" },
        { property: "og:availability", content: "instock" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@deez_prints" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: absoluteImgUrl },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProductPage,
});

/* ─── Helper: is this an apparel product? ────────────────── */
const APPAREL_CATEGORIES = new Set(["t-shirts", "hoodies"]);
function isApparelProduct(p: { category: string; subcategory: string }) {
  return APPAREL_CATEGORIES.has(p.category);
}

function ProductPage() {
  const { product, allProducts } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add, wishlist, toggleWish } = useCart();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/collections" },
    { name: product.title, url: `/products/${product.id}` },
  ];

  const isTapestry = product.subcategory === "tapestries" || product.subcategory === "flags";
  const isAcidWash =
    product.subcategory === "acid-wash" ||
    product.title.toLowerCase().includes("acid wash");
  const isDropShoulder =
    product.subcategory === "drop-shoulder" ||
    product.title.toLowerCase().includes("drop shoulder");

  // Sizes are always enforced by category — no per-product overrides for apparel
  const availableSizes = isTapestry
    ? product.sizes || ['24"x36"', '36"x48"', '48"x60"']
    : isAcidWash
    ? [...ACID_WASH_SIZES]
    : isDropShoulder
    ? [...DROP_SHOULDER_SIZES]
    : [...REGULAR_TEE_SIZES];

  // Colors are always the full category list — images are just showcases,
  // customers can pick any color available in the category
  const availableColors: string[] =
    isTapestry || product.category === "accessories" || product.subcategory === "mugs"
    ? []
    : isAcidWash
    ? [...ACID_WASH_COLORS]
    : isDropShoulder
    ? [...DROP_SHOULDER_COLORS]
    : [...REGULAR_TEE_COLORS];

  const [size, setSize] = useState<string>(isTapestry ? '36"x48"' : "");
  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0] || "");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [err, setErr] = useState(false);
  const [colorErr, setColorErr] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const needsSize = product.category !== "accessories" && product.subcategory !== "tapestries" && product.subcategory !== "mugs" && availableSizes.length > 0;
  const needsColor = availableColors.length > 0;
  const wished = wishlist.includes(product.id);
  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category && p.images.length)
    .slice(0, 4);

  function handleAdd() {
    let hasError = false;
    if (needsSize && !size) {
      setErr(true);
      hasError = true;
    }
    if (needsColor && !selectedColor) {
      setColorErr(true);
      hasError = true;
    }
    if (hasError) return;

    add({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? "",
      size: size || undefined,
      color: selectedColor || undefined,
      qty,
    });
  }

  function handleBuyNow() {
    let hasError = false;
    if (needsSize && !size) {
      setErr(true);
      hasError = true;
    }
    if (needsColor && !selectedColor) {
      setColorErr(true);
      hasError = true;
    }
    if (hasError) return;

    add({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? "",
      size: size || undefined,
      color: selectedColor || undefined,
      qty,
    });
    navigate({ to: "/checkout" });
  }

  // Material helpers matching old site PDP
  const getMaterialsText = () => {
    if (product.subcategory === "tapestries" || product.subcategory === "flags") {
      return (
        <ul className="list-disc list-inside space-y-1">
          <li>Material: Premium High-Density Satin Fabric (Smooth, Soft & Durable)</li>
          <li>Printing: High-Definition Digital Sublimation Printing (Ultra-vibrant, edge-to-edge color)</li>
          <li>Hanging & Setup: Reinforced Brass Metal Grommets at corners for effortless wall mounting</li>
          <li>Care & Maintenance: Machine washable, fade-resistant, wrinkle-free drape</li>
          <li>Usage: Premium Wall Art & Room Aesthetic Decor (Decorative Tapestry — Non-apparel)</li>
        </ul>
      );
    }
    if (product.subcategory === "mugs") {
      return (
        <ul className="list-disc list-inside space-y-1">
          <li>Material: High-grade, heat-resistant Ceramic with Polymer Coating.</li>
          <li>Finish: High-gloss white for vibrant, full-color reproduction.</li>
          <li>Durability: Fade-resistant, scratch-resistant, built for daily use.</li>
          <li>Capacity: Standard 11oz (325ml).</li>
        </ul>
      );
    }
    if (product.category === "hoodies") {
      return (
        <ul className="list-disc list-inside space-y-1">
          <li>High GSM Cotton Fleece Fabric for maximum winter warmth</li>
          <li>DTF Prints — Washable and Super Long Lasting</li>
          <li>Print/Design size varies proportionally per design</li>
          <li>Color of hoodie and print might vary slightly from mockup</li>
        </ul>
      );
    }
    return (
      <ul className="list-disc list-inside space-y-1">
        <li>Heavyweight High GSM Premium Cotton Blend</li>
        <li>Direct to Film (DTF) prints — ultra-durable and washable</li>
        <li>Streetwear oversized fit designed for comfort</li>
        <li>Precision stitching and long-lasting fabric structure</li>
      </ul>
    );
  };

  return (
    <div className="pt-16 sm:pt-20 md:pt-28 pb-12 md:pb-16">
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* ═══════════════════════════════════════════════════════
          MOBILE LAYOUT (< lg)
          ═══════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
        {/* Mobile Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="label-mono text-muted-foreground px-5 pb-3 pt-2">
          <Link to="/" className="hover:text-primary">Home</Link>{" "}
          /{" "}
          <Link to="/collections" className="hover:text-primary">Shop</Link>{" "}
          / <span className="text-foreground">{product.title}</span>
        </nav>

        <MobileProductDetail
          product={product}
          availableColors={availableColors}
          availableSizes={availableSizes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          size={size}
          setSize={setSize}
          err={err}
          setErr={setErr}
          colorErr={colorErr}
          setColorErr={setColorErr}
          handleAdd={handleAdd}
          handleBuyNow={handleBuyNow}
          needsSize={needsSize}
          needsColor={needsColor}
          isDropShoulder={isDropShoulder}
          isAcidWash={isAcidWash}
          showSizeChart={showSizeChart}
          setShowSizeChart={setShowSizeChart}
        />

        {/* Mobile: Apparel Accordion */}
        {isApparelProduct(product) && (
          <div className="px-5">
            <ApparelAccordion product={product} />
          </div>
        )}

        {/* Mobile: Non-Apparel Accordion */}
        {!isApparelProduct(product) && (
          <div className="px-5 mt-4">
            <div className="border-t border-border/60">
              <AccordionItem title="Materials & Details">{getMaterialsText()}</AccordionItem>
              <AccordionItem title="Shipping Information">
                <p>
                  Standard delivery time is 3-5 working days across Pakistan, and 2-4 working days for
                  Karachi. You will receive an instant order notification & confirmation update.
                </p>
              </AccordionItem>
              <AccordionItem title="Refund & Exchange">
                <p className="mb-2">
                  We replace any defective or damaged products immediately upon delivery.
                </p>
                <p>
                  For size adjustments or support, contact our team via WhatsApp or email at{" "}
                  <span className="text-primary font-mono">deezprints69@gmail.com</span>.
                </p>
              </AccordionItem>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════
          DESKTOP LAYOUT (>= lg)
          ═══════════════════════════════════════════════════════ */}
      <div className="hidden lg:block edge">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="label-mono text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/collections" className="hover:text-primary">
            Shop
          </Link>{" "}
          / <span className="text-foreground">{product.title}</span>
        </nav>

        <DesktopProductDetail
          product={product}
          availableColors={availableColors}
          availableSizes={availableSizes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          size={size}
          setSize={setSize}
          qty={qty}
          setQty={setQty}
          err={err}
          setErr={setErr}
          colorErr={colorErr}
          setColorErr={setColorErr}
          handleAdd={handleAdd}
          handleBuyNow={handleBuyNow}
          needsSize={needsSize}
          needsColor={needsColor}
          isDropShoulder={isDropShoulder}
          isAcidWash={isAcidWash}
          showSizeChart={showSizeChart}
          setShowSizeChart={setShowSizeChart}
        />
      </div>{/* end hidden lg:block */}

      {/* You Might Also Like */}
      {related.length > 0 && (
        <section className="mt-16 lg:mt-24 border-t border-border pt-8 lg:pt-12 edge">
          <h2 className="display-md">You might also like</h2>
          <div className="mt-6 lg:mt-8 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
