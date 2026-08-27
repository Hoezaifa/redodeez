import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, ShoppingCart } from "lucide-react";
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

  const subcategoryLabel = product.subcategory.replace(/-/g, " ").toUpperCase();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    add({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: primary,
      size: "M",
      qty: 1,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-800/80 bg-[#121214] transition-all duration-300 hover:border-neutral-700 hover:shadow-xl"
    >
      {/* Image Container — 4:5 on mobile for less wasted space, 1:1 on desktop */}
      <div className="relative w-full overflow-hidden bg-neutral-900 aspect-[4/5] sm:aspect-square">
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="relative block h-full w-full"
        >
          {primary ? (
            <>
              <img
                src={primary}
                alt={`Deez Prints ${product.title} — ${subcategoryLabel}`}
                width={500}
                height={625}
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover img-zoom",
                  alt !== primary && "group-hover:opacity-0"
                )}
              />
              {alt !== primary && (
                <img
                  src={alt}
                  alt={`Deez Prints ${product.title} detail view — ${subcategoryLabel}`}
                  width={500}
                  height={625}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 img-zoom group-hover:opacity-100"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-neutral-900">
              <span className="label-mono text-muted-foreground text-xs uppercase tracking-wider">Studio shot soon</span>
            </div>
          )}

          {/* Badges Top-Left */}
          <div className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 flex flex-col items-start gap-1 z-10 pointer-events-none">
            {isNew && (
              <span className="bg-[#FF4D00] px-2 py-0.5 sm:px-2.5 sm:py-1 label-mono text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm">
                New
              </span>
            )}
            {product.subcategory === "acid-wash" && (
              <span className="bg-black/85 backdrop-blur-sm border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 label-mono text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                1 of 1
              </span>
            )}
          </div>
        </Link>

        {/* Wishlist Button Top-Right */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWish(product.id)}
          className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white transition-all active:scale-90"
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform active:scale-125",
              wished && "fill-primary text-primary stroke-primary",
            )}
          />
        </button>
      </div>

      {/* Details Container Bottom */}
      <div className="flex flex-col gap-0.5 sm:gap-1 p-3 sm:p-4 bg-[#0a0a0c] border-t border-neutral-800/80 text-left flex-1 justify-between">
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <p className="label-mono text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
            {subcategoryLabel}
          </p>

          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            className="font-sans text-xs sm:text-sm font-black uppercase leading-snug tracking-tight text-white line-clamp-1 hover:text-primary transition-colors"
          >
            {product.title}
          </Link>
        </div>

        {/* Price row — with cart button */}
        <div className="flex items-center justify-between mt-1.5 sm:mt-2">
          <p className="font-sans font-bold text-sm sm:text-base text-white tracking-tight">
            {formatPrice(product.price)}
          </p>

          <button
            type="button"
            aria-label="Quick Add to Cart"
            onClick={handleQuickAdd}
            className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border border-neutral-700 bg-neutral-900/90 text-white transition-all active:scale-90 hover:border-white/40 hover:bg-neutral-800 shadow-sm"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[1.8]" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
