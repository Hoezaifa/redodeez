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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col overflow-hidden bg-zinc-950 border border-white/10 transition-all duration-300 hover:border-primary/50"
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

          {/* Top Left Badge in accent orange as requested */}
          <div className="absolute left-2 top-2 z-10 flex flex-col items-start gap-1">
            <span className="bg-primary px-2 py-0.5 label-mono text-[9px] sm:text-[10px] font-extrabold text-primary-foreground uppercase shadow-md rounded-none">
              SOLD OUT SOON
            </span>
          </div>
        </Link>

        {/* Wishlist button top right */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWish(product.id);
          }}
          className="absolute right-2 top-2 z-10 grid h-7 w-7 sm:h-8 sm:w-8 place-items-center bg-black/60 text-white backdrop-blur-sm transition-colors hover:text-primary active:scale-90 rounded-none"
        >
          <Heart
            className={cn(
              "h-3.5 w-3.5 transition-transform active:scale-125",
              wished && "fill-primary text-primary",
            )}
          />
        </button>

        {/* Dark Gradient Overlay with Text details & Price */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/85 to-transparent p-2 sm:p-3 pt-10">
          <div className="flex items-end justify-between gap-1 mb-2">
            <div className="min-w-0 flex-1 text-left">
              {/* Title in Accent Orange */}
              <p className="font-display font-black text-xs sm:text-sm uppercase tracking-tight text-primary leading-tight line-clamp-1">
                {product.title}
              </p>
              {/* Subcategory in White */}
              <p className="font-sans font-extrabold text-[10px] sm:text-[11px] uppercase text-white leading-tight line-clamp-1">
                {product.subcategory.replace(/-/g, " ")} TEE
              </p>
              {/* Drop Tagline in Dim Grey */}
              <p className="font-mono text-[8px] sm:text-[9px] text-zinc-400 uppercase tracking-tighter leading-tight mt-0.5">
                LIMITED DROP / DEEZ PRINTS
              </p>
            </div>

            {/* Price on Right in White */}
            <div className="shrink-0 text-right pb-0.5">
              <span className="font-mono font-bold text-xs sm:text-sm text-white whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          {/* Full Width White ADD TO CART Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="pointer-events-auto w-full bg-white hover:bg-zinc-200 text-black font-sans font-black text-[10px] sm:text-xs uppercase tracking-wider py-1.5 sm:py-2 text-center transition-all active:scale-[0.98] cursor-pointer shadow-md rounded-none"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </motion.article>
  );
}
