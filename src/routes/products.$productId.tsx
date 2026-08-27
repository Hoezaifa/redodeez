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
      ? `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}. High-definition digital sublimation printed satin wall tapestry. Delivered across Pakistan in 3–5 working days.`
      : `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}. Premium print, oversized fit. Delivered across Pakistan in 3–5 working days.`;
    const title = `${p?.title ?? "Product"} — Deez Prints`;
    const url = `${SITE_URL}/products/${p?.id ?? ""}`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Deez Prints" },
        { property: "og:image", content: absoluteImgUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
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
    <div className="edge pt-20 sm:pt-24 md:pt-28 pb-12 md:pb-16">
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="label-mono text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/collections" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="grid gap-4">
          {product.images.length ? (
            <ProductZoomImage
              images={product.images}
              activeIndex={active}
              onIndexChange={setActive}
              alt={`Deez Prints ${product.title} — ${product.subcategory.replace(/-/g, " ")} view ${active + 1}`}
            />
          ) : (
            <div className="relative aspect-square overflow-hidden border border-border bg-surface rounded-none grid place-items-center">
              <span className="display-md text-muted-foreground">{product.title}</span>
            </div>
          )}

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((src: string, i: number) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "aspect-square overflow-hidden border bg-surface rounded-none transition-all cursor-pointer",
                    i === active
                      ? "border-primary ring-2 ring-primary/20 scale-95"
                      : "border-border hover:border-primary/50 opacity-70 hover:opacity-100",
                  )}
                >
                  <img
                    src={src}
                    alt={`Deez Prints ${product.title} photo ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover p-0"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:sticky lg:top-32 lg:self-start space-y-6">
          <div>
            <p className="label-mono text-primary font-bold tracking-widest text-xs uppercase">
              DEEZ PRINTS · {product.subcategory.replace(/-/g, " ")}
            </p>
            <h1 className="display-md mt-2 text-3xl md:text-5xl font-black">{product.title}</h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="font-display text-3xl font-black text-foreground">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs label-mono text-primary border border-primary/30 bg-primary/10 px-2.5 py-1 rounded-none">
                BEST SELLER
              </span>
            </div>

            {/* Trust Indicators (Square Badges) from old site */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground font-medium border-y border-border py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-none bg-emerald-500" />
                <span>Premium Material</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-none bg-sky-500" />
                <span>7-Day Exchange Policy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-none bg-orange-500" />
                <span>All Over Pakistan Delivery</span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          {needsSize && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="label-mono uppercase text-xs text-muted-foreground font-bold">
                  Select Size
                </p>
                <button
                  type="button"
                  onClick={() => setShowSizeChart((prev) => !prev)}
                  className="label-mono text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Size Chart</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      showSizeChart && "rotate-180"
                    )}
                  />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setErr(false);
                    }}
                    className={cn(
                      "min-w-12 h-12 px-3 rounded-none label-mono transition-all duration-200 active:scale-95 font-bold border text-sm",
                      size === s
                        ? "bg-primary text-primary-foreground border-primary scale-105"
                        : "border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {err && (
                <p className="mt-2 label-mono text-xs text-destructive">
                  Please select a size to proceed
                </p>
              )}

              {/* Inline Size Chart Table when toggled */}
              <AnimatePresence>
                {showSizeChart && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden mt-3"
                  >
                    <SizeChart isDropShoulder={isDropShoulder} isAcidWash={isAcidWash} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Color Selector */}
          {needsColor && (
            <div>
              <p className="label-mono uppercase text-xs text-muted-foreground font-bold mb-2">
                Select Color: <span className="text-foreground">{selectedColor || "Select a color"}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {availableColors.map((c) => {
                  const hex = COLOR_HEX_MAP[c] || "#52525b";
                  const isSelected = selectedColor === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c);
                        setColorErr(false);
                        if (product.images.length) {
                          const colorLower = c.toLowerCase().replace(/\s+/g, "");
                          const foundIdx = product.images.findIndex((img) => {
                            const imgLower = img.toLowerCase();
                            return (
                              imgLower.includes(`-${colorLower}-`) ||
                              imgLower.includes(`-${colorLower}.`) ||
                              imgLower.includes(colorLower)
                            );
                          });
                          if (foundIdx !== -1) {
                            setActive(foundIdx);
                          }
                        }
                      }}
                      title={c}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 border rounded-none text-xs font-mono transition-all duration-200 cursor-pointer active:scale-95",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary"
                          : "border-border bg-surface text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: hex }}
                      />
                      <span>{c}</span>
                    </button>
                  );
                })}
              </div>
              {colorErr && (
                <p className="mt-2 label-mono text-xs text-destructive">
                  Please select a color to proceed
                </p>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <p className="label-mono uppercase text-xs text-muted-foreground font-bold mb-2">
              Quantity
            </p>
            <div className="flex items-center border border-border bg-surface rounded-none w-fit p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-none hover:bg-elevated text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-mono text-base font-bold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-none hover:bg-elevated text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons (Add to Cart + Buy Now) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <button
              type="button"
              onClick={handleAdd}
              className="flex items-center justify-center gap-2 border border-border-strong bg-surface hover:bg-elevated px-6 py-4 label-mono text-sm font-bold transition-all rounded-none cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-foreground hover:text-background text-primary-foreground px-6 py-4 label-mono text-sm font-bold transition-all rounded-none shadow-lg cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Wishlist & WhatsApp Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappLink(`Hi Deez Prints! I'm interested in ordering ${product.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="flex-1 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 py-3.5 text-center label-mono text-xs rounded-none transition-colors font-semibold"
            >
              Order directly on WhatsApp
            </a>
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={() => toggleWish(product.id)}
              className="grid h-12 w-12 shrink-0 place-items-center border border-border rounded-none hover:border-primary hover:text-primary transition-colors"
            >
              <Heart className={cn("h-5 w-5", wished && "fill-primary text-primary")} />
            </button>
          </div>

          {/* ── Apparel Accordion (shared sections) ────────── */}
          {isApparelProduct(product) && (
            <ApparelAccordion product={product} />
          )}

          {/* ── Non-Apparel Accordion (tapestries, mugs, etc.) ── */}
          {!isApparelProduct(product) && (
            <div className="mt-8 border-t border-border/60">
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

              <AccordionItem title="Care Instructions">
                {isTapestry ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Machine wash on gentle cycle or hand wash with mild detergent</li>
                    <li>Hang dry or tumble dry on low heat</li>
                    <li>Steam or iron on low heat (reverse side) to smooth out packing folds</li>
                    <li>Do not bleach</li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Hand wash inside out with cold water</li>
                    <li>Iron inside out on low heat</li>
                    <li>Do not bleach or dry clean</li>
                  </ul>
                )}
              </AccordionItem>
            </div>
          )}
        </div>
      </div>

      {/* You Might Also Like */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-border pt-12">
          <h2 className="display-md">You might also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
