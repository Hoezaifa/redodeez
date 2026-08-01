import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Minus, Plus, ShoppingCart, ArrowRight, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { site, sizes as ALL_SIZES, whatsappLink } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductZoomImage } from "@/components/shop/ProductZoomImage";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const img = p?.images[0];
    return {
      meta: [
        { title: `${p?.title ?? "Product"} — Deez Prints` },
        {
          name: "description",
          content: `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}. Premium print, oversized fit. Delivered across Pakistan in 3–5 working days.`,
        },
        { property: "og:title", content: `${p?.title ?? "Product"} — Deez Prints` },
        {
          property: "og:description",
          content: `${formatPrice(p?.price ?? 0)} · Premium print by Deez Prints.`,
        },
        ...(img
          ? [
              { property: "og:image", content: img },
              { name: "twitter:image", content: img },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: `/products/${p?.id ?? ""}` }],
    };
  },
  component: ProductPage,
});

/* ─── Expandable Accordion Component ──────────────────────── */
function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left label-mono transition-colors hover:text-primary"
      >
        <span className="font-semibold">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add, wishlist, toggleWish } = useCart();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/collections" },
    { name: product.title, url: `/products/${product.id}` },
  ];

  const isTapestry = product.subcategory === "tapestries" || product.subcategory === "flags";
  const availableSizes = isTapestry ? ['24"x36"', '36"x48"', '48"x60"'] : ALL_SIZES;

  const [size, setSize] = useState<string>(isTapestry ? '36"x48"' : "");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [err, setErr] = useState(false);

  const needsSize = product.category !== "accessories" && product.subcategory !== "tapestries";
  const wished = wishlist.includes(product.id);
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category && p.images.length)
    .slice(0, 4);

  function handleAdd() {
    if (needsSize && !size) {
      setErr(true);
      return;
    }
    add({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? "",
      size: size || undefined,
      qty,
    });
  }

  function handleBuyNow() {
    if (needsSize && !size) {
      setErr(true);
      return;
    }
    add({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] ?? "",
      size: size || undefined,
      qty,
    });
    navigate({ to: "/checkout" });
  }

  // Material helpers matching old site PDP
  const getMaterialsText = () => {
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
    <div className="edge py-10 md:py-14">
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
              alt={product.title}
            />
          ) : (
            <div className="relative aspect-square md:aspect-4/5 overflow-hidden border border-border bg-surface rounded-xl grid place-items-center">
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
                    "aspect-square overflow-hidden border bg-surface rounded-xl transition-all cursor-pointer",
                    i === active
                      ? "border-primary ring-2 ring-primary/20 scale-95"
                      : "border-border hover:border-primary/50 opacity-70 hover:opacity-100",
                  )}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover p-0" />
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
              <span className="text-xs label-mono text-primary border border-primary/30 bg-primary/10 px-2.5 py-1 rounded-md">
                BEST SELLER
              </span>
            </div>

            {/* Trust Indicators (Dots) from old site */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-muted-foreground font-medium border-y border-border py-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Premium Material</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
                <span>7-Day Exchange Policy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
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
                <Link to="/faq" className="label-mono text-xs text-primary hover:underline">
                  Size Guide
                </Link>
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
                      "min-w-12 h-12 px-3 rounded-xl label-mono transition-all duration-200 active:scale-95 font-bold border text-sm",
                      size === s
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
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
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <p className="label-mono uppercase text-xs text-muted-foreground font-bold mb-2">
              Quantity
            </p>
            <div className="flex items-center border border-border bg-surface rounded-xl w-fit p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-elevated text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-mono text-base font-bold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-elevated text-muted-foreground hover:text-foreground transition-colors"
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
              className="flex items-center justify-center gap-2 border border-border-strong bg-surface hover:bg-elevated px-6 py-4 label-mono text-sm font-bold transition-all rounded-xl cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4 text-primary" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-foreground hover:text-background text-primary-foreground px-6 py-4 label-mono text-sm font-bold transition-all rounded-xl shadow-lg cursor-pointer"
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
              className="flex-1 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 py-3.5 text-center label-mono text-xs rounded-xl transition-colors font-semibold"
            >
              Order directly on WhatsApp
            </a>
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={() => toggleWish(product.id)}
              className="grid h-12 w-12 shrink-0 place-items-center border border-border rounded-xl hover:border-primary hover:text-primary transition-colors"
            >
              <Heart className={cn("h-5 w-5", wished && "fill-primary text-primary")} />
            </button>
          </div>

          {/* Expandable Accordion Sections */}
          <div className="pt-6">
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
              <ul className="list-disc list-inside space-y-1">
                <li>Hand wash inside out with cold water</li>
                <li>Iron inside out on low heat</li>
                <li>Do not bleach or dry clean</li>
              </ul>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* You Might Also Like */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-border pt-12">
          <h2 className="display-md">You might also like</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
