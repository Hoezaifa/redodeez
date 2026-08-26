import { AccordionItem } from "@/components/shop/AccordionItem";
import type { Product } from "@/data/products";

/* ─── Size Cheat Sheet Data ──────────────────────────────── */

const SIZE_CHEAT_SHEET = [
  { height: '5\'0"–5\'4"', weight: "38–50 kg", size: "XS" },
  { height: '5\'3"–5\'7"', weight: "45–58 kg", size: "S" },
  { height: '5\'5"–5\'9"', weight: "55–68 kg", size: "M" },
  { height: '5\'7"–6\'0"', weight: "65–78 kg", size: "L" },
  { height: '5\'9"–6\'2"', weight: "75–90 kg", size: "XL" },
] as const;

/* ─── Care Guide Items ───────────────────────────────────── */

const CARE_GUIDE = [
  "Machine wash cold / at 30°C on a gentle cycle.",
  "Wash inside out whenever possible.",
  "Do not use bleach directly on the print.",
  "Avoid high heat when drying.",
  "Do not iron directly over the graphic.",
  "Do not dry-clean.",
] as const;

/* ─── Why Deez Prints Benefits ───────────────────────────── */

const BENEFITS = [
  {
    heading: "Original Designs",
    body: "Designed and selected for people who actually wear streetwear.",
  },
  {
    heading: "Made in Pakistan",
    body: "Designed, printed and packed locally.",
  },
  {
    heading: "Quality Prints",
    body: "Built for everyday wear with attention to print quality.",
  },
  {
    heading: "Streetwear Fits",
    body: "Relaxed silhouettes designed for modern streetwear styling.",
  },
  {
    heading: "Made to Order",
    body: "Your piece is prepared specifically for your order.",
  },
  {
    heading: "Order Support",
    body: "Need to change something? Contact us before your order enters production.",
  },
  {
    heading: "Customer Support",
    body: "Need help with sizing or your order? We're here to help.",
  },
] as const;

/* ─── Component ──────────────────────────────────────────── */

type ApparelAccordionProps = {
  product: Product;
};

/**
 * Shared expandable info sections for all Deez Prints apparel product pages.
 *
 * Architecture: Apparel Product Page → ApparelAccordion → AccordionItem
 *
 * The Product Description section renders the product's own `description` field,
 * which can be populated per-product via the admin CMS. All other sections
 * share centralized content that updates globally.
 */
export function ApparelAccordion({ product }: ApparelAccordionProps) {
  return (
    <div className="apparel-accordion mt-8 border-t border-border/60">
      {/* ── Section 1: Product Description ─────────────────── */}
      <AccordionItem title="Product Description">
        {product.description ? (
          <p>{product.description}</p>
        ) : (
          <p className="italic text-muted-foreground/60">
            Product description coming soon.
          </p>
        )}
      </AccordionItem>

      {/* ── Section 2: Size Cheat Sheet ────────────────────── */}
      <AccordionItem title="Size Cheat Sheet">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left border-collapse min-w-[280px]">
            <thead>
              <tr className="border-b border-border/50">
                <th className="py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground/80">
                  Height
                </th>
                <th className="py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground/80 text-right">
                  Weight
                </th>
                <th className="py-2.5 px-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground/80 text-center">
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {SIZE_CHEAT_SHEET.map((row) => (
                <tr key={row.size} className="hover:bg-elevated/30 transition-colors">
                  <td className="py-2.5 px-2 text-[13px] sm:text-sm text-muted-foreground font-mono">
                    {row.height}
                  </td>
                  <td className="py-2.5 px-2 text-[13px] sm:text-sm text-muted-foreground font-mono text-right">
                    {row.weight}
                  </td>
                  <td className="py-2.5 px-2 text-[13px] sm:text-sm text-foreground font-mono font-bold text-center">
                    {row.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[12px] sm:text-[13px] text-muted-foreground/80 leading-relaxed">
          This is only a general recommendation. For the best fit, compare the
          measurements in our size chart with a T-shirt you already own.
        </p>
        <p className="mt-2 text-[12px] sm:text-[13px] text-muted-foreground/80 leading-relaxed">
          Still unsure?{" "}
          <a
            href="https://www.instagram.com/deez_prints/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            DM us on Instagram
          </a>{" "}
          and we'll help you choose.
        </p>
      </AccordionItem>

      {/* ── Section 3: Care Guide ──────────────────────────── */}
      <AccordionItem title="Care Guide">
        <ul className="space-y-2">
          {CARE_GUIDE.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AccordionItem>

      {/* ── Section 4: Order Changes ───────────────────────── */}
      <AccordionItem title="Order Changes">
        <div className="space-y-3">
          <p>
            Our apparel is prepared specifically for each order. If you need to
            change your size, color or other order details, contact us as soon as
            possible after placing your order.
          </p>
          <p>
            If your order has not entered the printing/production process yet, we
            may be able to make the requested change.
          </p>
          <p>
            Once printing has started, changes or cancellations may no longer be
            possible.
          </p>
          <p className="font-semibold text-foreground/90">
            Please double-check your size, color and shipping details before
            placing your order.
          </p>
        </div>
      </AccordionItem>

      {/* ── Section 5: Why Deez Prints? ────────────────────── */}
      <AccordionItem title="Why Deez Prints?">
        <div className="space-y-4">
          {BENEFITS.map((b) => (
            <div key={b.heading}>
              <p className="font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-foreground/90 mb-0.5">
                {b.heading}
              </p>
              <p className="text-[13px] sm:text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}
