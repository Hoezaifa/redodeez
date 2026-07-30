import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { sizes as ALL_SIZES } from "@/data/site";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, wishlist, toggleWish } = useCart();
  const [hover, setHover] = useState(false);
  const wished = wishlist.includes(product.id);
  const primary = product.images[0];
  const alt = product.images[1] ?? primary;
  const isNew = index < 4;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)]"
    >
      <div className="relative w-full overflow-hidden bg-surface aspect-[4/5]">
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="relative block h-full w-full"
        >
          {primary ? (
            <>
              <motion.img
                src={primary}
                alt={product.title}
                width={400}
                height={500}
                loading="lazy"
                style={{ viewTransitionName: `product-img-${product.id}` }}
                className="absolute inset-0 h-full w-full object-cover"
                animate={{ scale: hover ? 1.05 : 1, opacity: hover && alt !== primary ? 0 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              {alt !== primary && (
                <motion.img
                  src={alt}
                  alt={product.title}
                  width={400}
                  height={500}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={false}
                  animate={{ opacity: hover ? 1 : 0, scale: hover ? 1.05 : 1.1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-surface">
              <span className="label-mono text-muted-foreground">Studio shot soon</span>
            </div>
          )}

          <div className="absolute left-0 top-0 flex flex-col items-start gap-px p-3">
            {isNew && (
              <span className="bg-primary px-2 py-1 label-mono text-primary-foreground">New</span>
            )}
            {product.subcategory === "acid-wash" && (
              <span className="bg-background/80 px-2 py-1 label-mono text-foreground">1 of 1</span>
            )}
          </div>
        </Link>

        {/* Wishlist button top right */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWish(product.id)}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center bg-background/70 backdrop-blur-sm transition-colors hover:text-primary active:scale-90"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform active:scale-125",
              wished && "fill-primary text-primary",
            )}
          />
        </button>

        {/* Quick Add '+' button bottom right of image */}
        <button
          type="button"
          aria-label="Quick Add"
          onClick={() =>
            add({
              productId: product.id,
              title: product.title,
              price: product.price,
              image: primary,
              size: "M",
              qty: 1,
            })
          }
          className="absolute right-2.5 bottom-2.5 z-10 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-white text-black shadow-md transition-transform duration-300 hover:scale-110 active:scale-90"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
        </button>

        {/* Quick size selector desktop hover */}
        <motion.div
          initial={false}
          animate={{ y: hover ? 0 : 14, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden px-2 pb-2.5 md:block z-20"
        >
          <div className="pointer-events-auto flex items-stretch justify-center gap-px bg-background/90 backdrop-blur-sm">
            {ALL_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  add({
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: primary,
                    size: s,
                    qty: 1,
                  })
                }
                className="flex-1 py-2 label-mono text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Card Details — matching deezprints.store placement & layout */}
      <div className="flex flex-col gap-1 py-3 text-left">
        <p className="label-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
          {product.subcategory.replace(/-/g, " ")}
        </p>

        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="link-underline font-sans text-xs sm:text-sm font-extrabold uppercase leading-snug tracking-tight text-foreground break-words"
        >
          {product.title}
        </Link>

        {/* Rating stars */}
        <div className="flex items-center gap-0.5 text-amber-400 text-xs my-0.5">
          {"★".repeat(5)}
        </div>

        <p className="font-sans font-bold text-xs sm:text-sm text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  );
}
