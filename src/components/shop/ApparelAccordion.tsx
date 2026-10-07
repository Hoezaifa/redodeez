import { AccordionItem } from "@/components/shop/AccordionItem";
import type { Product } from "@/data/products";



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
      {/* ── Section 1: Product Details & Fabric ────────────────── */}
      <AccordionItem title="Product Details & Fabric">
        <div className="space-y-3">
          {product.description && <p className="leading-relaxed">{product.description}</p>}
          <ul className="list-disc list-inside space-y-1.5 text-[13px] sm:text-sm text-muted-foreground font-mono">
            {product.subcategory === "drop-shoulder" && (
              <>
                <li><strong className="text-foreground">Fabric:</strong> 100% Combed Compact Cotton (Heavyweight 240+ GSM)</li>
                <li><strong className="text-foreground">Fit:</strong> Modern oversized silhouette with dropped shoulder seams and ribbed collar</li>
                <li><strong className="text-foreground">Print:</strong> Commercial Direct-to-Film (DTF) high-resolution graphic print</li>
              </>
            )}
            {product.subcategory === "acid-wash" && (
              <>
                <li><strong className="text-foreground">Fabric:</strong> 100% Premium Cotton with individual mineral acid-wash finish</li>
                <li><strong className="text-foreground">Fit:</strong> Relaxed streetwear vintage fit with reinforced twin-needle stitching</li>
                <li><strong className="text-foreground">Print:</strong> Industrial DTF print engineered for longevity through dozens of washes</li>
              </>
            )}
            {product.subcategory === "regular" && (
              <>
                <li><strong className="text-foreground">Fabric:</strong> 100% Ring-Spun Cotton (180–200 GSM breathable jersey)</li>
                <li><strong className="text-foreground">Fit:</strong> Standard regular everyday streetwear fit</li>
                <li><strong className="text-foreground">Print:</strong> High-definition digital textile print</li>
              </>
            )}
            {product.category === "hoodies" && (
              <>
                <li><strong className="text-foreground">Fabric:</strong> Heavyweight Cotton-Poly Blend Fleece with brushed thermal interior</li>
                <li><strong className="text-foreground">Fit:</strong> Oversized comfort fit with double-layered hood & kangaroo pocket</li>
                <li><strong className="text-foreground">Print:</strong> Precision DTF back and chest graphic</li>
              </>
            )}
            <li><strong className="text-foreground">Production:</strong> Custom made-to-order in Karachi, Pakistan</li>
            <li><strong className="text-foreground">Preparation Time:</strong> 2–3 business days before courier dispatch</li>
          </ul>
        </div>
      </AccordionItem>

      {/* ── Section 2: Shipping & 7-Day Exchange Policy ───────── */}
      <AccordionItem title="Shipping & 7-Day Exchange Policy">
        <div className="space-y-3 text-[13px] sm:text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground font-semibold">Delivery Time:</strong> 1–2 business days for Karachi, 2–4 business days nationwide across Pakistan via tracked couriers.
          </p>
          <p>
            <strong className="text-foreground font-semibold">Free Nationwide Shipping:</strong> Automatically applied at checkout on all orders of Rs. 5,000 or more (standard flat rate is Rs. 200 Karachi / Rs. 450 Nationwide).
          </p>
          <p>
            <strong className="text-foreground font-semibold">7-Day Exchange:</strong> Exchange is available within 7 days only if you receive a defective item, incorrect product, or a different size than the one you ordered. Please check the size chart, fit and order details carefully before confirming your order. Incorrect size selection or change of mind is not eligible for exchange.
          </p>
        </div>
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
