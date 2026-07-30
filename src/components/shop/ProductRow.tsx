import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
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
  return (
    <section className="edge border-t border-border py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-mono text-primary">{eyebrow}</p>
          <h2 className="display-md mt-4 whitespace-pre-line">{title}</h2>
          <Link
            to={ctaTo}
            params={ctaParams}
            className="mt-7 inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-sans text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded hover:bg-foreground hover:text-background active:scale-95 transition-all shadow-md"
          >
            {ctaLabel} <ArrowRight className="h-4 w-4 stroke-[3]" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
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
