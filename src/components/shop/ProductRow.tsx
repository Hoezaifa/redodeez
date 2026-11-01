import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export function ProductRow({
  eyebrow,
  title,
  items,
  ctaLabel,
  ctaTo,
  ctaParams,
}: {
  eyebrow: string;
  title: string;
  items: Product[];
  ctaLabel: string;
  ctaTo: string;
  ctaParams?: Record<string, string>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Maximum 5 products per section
  const displayItems = items.slice(0, 5);

  const updateScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, displayItems]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 260;
      const scrollAmount = direction === "left" ? -(cardWidth * 2) : (cardWidth * 2);
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="edge border-t border-border py-12 md:py-24 overflow-hidden">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-14">
        {/* Section Header & Circular Controls */}
        <div className="flex flex-col justify-between lg:sticky lg:top-32 lg:self-start">
          <div>
            <div className="flex items-center justify-between">
              <p className="label-mono text-primary">{eyebrow}</p>
              {/* Circular Carousel Controls (visible on both mobile & desktop) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                  className={cn(
                    "grid h-8 w-8 place-items-center border border-border-strong bg-surface/80 text-foreground shadow-sm transition-all active:scale-90 cursor-pointer",
                    canScrollLeft
                      ? "hover:bg-primary hover:border-primary hover:text-primary-foreground"
                      : "opacity-30 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                  className={cn(
                    "grid h-8 w-8 place-items-center border border-border-strong bg-surface/80 text-foreground shadow-sm transition-all active:scale-90 cursor-pointer",
                    canScrollRight
                      ? "hover:bg-primary hover:border-primary hover:text-primary-foreground"
                      : "opacity-30 cursor-not-allowed pointer-events-none"
                  )}
                >
                  <ChevronRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <h2 className="display-md mt-3 md:mt-4 whitespace-pre-line">{title}</h2>
          </div>

          <div className="mt-6 md:mt-8 flex items-center justify-between">
            <Link
              to={ctaTo}
              params={ctaParams}
              className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-sans text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-none hover:bg-foreground hover:text-background active:scale-95 transition-all shadow-md"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4 stroke-[3]" />
            </Link>
          </div>
        </div>

        {/* Products Container: Single horizontal row with smooth scrolling and no visible scrollbars */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3 md:gap-4 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {displayItems.map((p, i) => (
            <div
              key={p.id}
              className="w-[calc(50%-0.375rem)] min-w-[150px] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] shrink-0 snap-start flex flex-col"
            >
              <ProductCard product={p} index={i} />
            </div>
          ))}

          {/* VIEW ALL Card at end of carousel */}
          <div className="w-[calc(50%-0.375rem)] min-w-[150px] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] shrink-0 snap-start flex flex-col">
            <Link
              to={ctaTo}
              params={ctaParams}
              className="group relative flex flex-col items-center justify-center h-full min-h-[260px] sm:min-h-[320px] rounded-lg border border-dashed border-border-strong bg-[#121214]/60 hover:bg-[#121214] hover:border-primary transition-all duration-300 p-6 text-center"
            >
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-border-strong bg-surface group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-3 shadow-sm group-hover:scale-110">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
              </div>
              <span className="label-mono text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-1">
                {eyebrow}
              </span>
              <span className="font-sans font-black text-xs sm:text-sm uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                VIEW ALL
              </span>
              <span className="label-mono text-[9px] sm:text-[10px] text-muted-foreground mt-2 inline-flex items-center gap-1 group-hover:text-foreground transition-colors">
                Full Catalogue &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && <p className="label-mono text-primary text-[10px] md:text-xs">{eyebrow}</p>}
      <h1 className="display-lg mt-1 md:mt-2 whitespace-pre-line">{title}</h1>
      {sub && <p className="mt-1 md:mt-2 max-w-xl text-[11px] md:text-xs text-muted-foreground leading-relaxed">{sub}</p>}
    </motion.div>
  );
}
