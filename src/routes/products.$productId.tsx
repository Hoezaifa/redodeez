import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Minus, Plus, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";
import { site, sizes as ALL_SIZES, whatsappLink } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

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
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, wishlist, toggleWish } = useCart();
  const [size, setSize] = useState<string>("");
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

  return (
    <div className="edge py-10 md:py-14">
      <nav className="label-mono text-muted-foreground">
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
        {/* gallery */}
        <div className="grid gap-3">
          <div className="relative aspect-4/5 overflow-hidden bg-surface">
            {product.images.length ? (
              <motion.img
                key={active}
                src={product.images[active]}
                alt={product.title}
                style={{ viewTransitionName: active === 0 ? `product-img-${product.id}` : undefined }}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center">
                <span className="display-md text-muted-foreground">{product.title}</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((src: string, i: number) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "aspect-square overflow-hidden border bg-surface",
                    i === active ? "border-primary" : "border-border",
                  )}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* info */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-mono text-primary">{product.subcategory.replace(/-/g, " ")}</p>
          <h1 className="display-md mt-3">{product.title}</h1>
          <p className="mt-4 font-display text-2xl font-extrabold">{formatPrice(product.price)}</p>
          <p className="label-mono mt-1 text-muted-foreground">
            + Rs. {site.shippingFee} shipping · COD available
          </p>

          {needsSize && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="label-mono">Size</p>
                <Link to="/faq" className="label-mono text-muted-foreground hover:text-primary">
                  Size guide
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {ALL_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setErr(false);
                    }}
                    className={cn(
                      "h-12 w-14 label-mono transition-all duration-200 active:scale-95",
                      size === s
                        ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                        : "border border-border hover:border-primary hover:text-primary",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {err && <p className="mt-2 label-mono text-destructive">Pick a size first</p>}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-4 hover:text-primary active:scale-90 transition-transform"
              >
                <Minus className="h-4 w-4" />
              </button>
              <motion.span
                key={qty}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-10 text-center font-mono text-sm"
              >
                {qty}
              </motion.span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-4 hover:text-primary active:scale-90 transition-transform"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 bg-primary px-8 py-4 label-mono text-primary-foreground transition-all duration-200 hover:bg-foreground hover:text-background active:scale-[0.98]"
            >
              Add to bag — {formatPrice(product.price * qty)}
            </button>
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={() => toggleWish(product.id)}
              className="grid h-14 w-14 place-items-center border border-border hover:border-primary hover:text-primary active:scale-90 transition-transform"
            >
              <Heart className={cn("h-5 w-5 transition-transform active:scale-125", wished && "fill-primary text-primary")} />
            </button>
          </div>

          <a
            href={whatsappLink(`Hi! I'm interested in ${product.title}.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block border border-border-strong py-4 text-center label-mono hover:border-primary hover:text-primary"
          >
            Order on WhatsApp
          </a>

          <ul className="mt-9 grid gap-px bg-border">
            {[
              [Truck, `Delivery in ${site.deliveryTime} via ${site.couriers}`],
              [RefreshCw, "7-day exchange for size issues or defects"],
              [ShieldCheck, "Premium fabric, DTF & sublimation printing"],
            ].map(([Icon, text], i) => {
              const I = Icon as typeof Truck;
              return (
                <li key={i} className="flex items-center gap-3 bg-background p-4">
                  <I className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{text as string}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

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
