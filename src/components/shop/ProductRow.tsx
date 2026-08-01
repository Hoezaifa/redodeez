import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

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

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
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
              {/* Circular Carousel Controls (visible on mobile) */}
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  aria-label="Scroll left"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-surface/80 text-foreground shadow-sm transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground active:scale-90 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  aria-label="Scroll right"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-surface/80 text-foreground shadow-sm transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground active:scale-90 cursor-pointer"
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
              className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-sans text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded hover:bg-foreground hover:text-background active:scale-95 transition-all shadow-md"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4 stroke-[3]" />
            </Link>

            {/* Desktop Circular Navigation Controls */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Scroll left"
                className="grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-surface/80 text-foreground shadow-sm transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground active:scale-90 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="grid h-9 w-9 place-items-center rounded-full border border-border-strong bg-surface/80 text-foreground shadow-sm transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground active:scale-90 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Container: Horizontal snap scroll on mobile, responsive grid on desktop */}
        <div
          ref={scrollRef}
          className="flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:pb-4 max-md:-mx-4 max-md:px-4 scrollbar-none md:grid md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-10"
        >
          {items.map((p, i) => (
            <div key={p.id} className="max-md:w-[72vw] max-md:max-w-[280px] max-md:shrink-0 max-md:snap-start">
              <ProductCard product={p} index={i} />
            </div>
          ))}
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
      {eyebrow && <p className="label-mono text-primary">{eyebrow}</p>}
      <h1 className="display-lg mt-4 whitespace-pre-line">{title}</h1>
      {sub && <p className="mt-5 max-w-xl text-sm text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}
