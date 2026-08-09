import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, wishlist, toggleWish } = useCart();
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
      className="group relative flex flex-col transition-transform duration-700 ease-out hover:-translate-y-1"
    >
      <div className="relative w-full overflow-hidden bg-surface aspect-[4/5]">
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="relative block h-full w-full"
        >
          {primary ? (
            <>
              <img
                src={primary}
                alt={product.title}
                width={400}
                height={500}
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover img-zoom group-hover:scale-105",
                  alt !== primary && "group-hover:opacity-0",
                )}
              />
              {alt !== primary && (
                <img
                  src={alt}
                  alt={product.title}
                  width={400}
                  height={500}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 img-zoom group-hover:opacity-100 group-hover:scale-105"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-surface">
              <span className="label-mono text-muted-foreground">Studio shot soon</span>
            </div>
          )}

          <div className="absolute left-0 top-0 flex flex-col items-start gap-px p-3 z-10 pointer-events-none">
            {isNew && (
              <span className="bg-primary px-2 py-1 label-mono text-primary-foreground text-[10px]">New</span>
            )}
            {product.subcategory === "acid-wash" && (
              <span className="bg-background/80 px-2 py-1 label-mono text-foreground text-[10px]">1 of 1</span>
            )}
          </div>
        </Link>

        {/* Wishlist button top right */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWish(product.id)}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center bg-background/70 backdrop-blur-sm transition-colors hover:text-primary active:scale-90"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform active:scale-125",
              wished && "fill-primary text-primary",
            )}
          />
        </button>

        {/* Quick Add '+' button bottom right */}
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
          className="absolute right-2.5 bottom-2.5 z-10 grid h-8 w-8 place-items-center bg-white text-black shadow-md transition-all duration-300 hover:scale-110 active:scale-90"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Card Details */}
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
