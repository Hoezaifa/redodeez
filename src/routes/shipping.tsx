import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";
import { paymentMethods, site, SITE_URL } from "@/data/site";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy — Deez Prints" },
      {
        name: "description",
        content:
          "Flat Rs. 200 nationwide shipping, free shipping above Rs. 5000. 3–5 working days delivery across Pakistan via TCS, Leopards, and M&P.",
      },
      { property: "og:title", content: "Shipping & Delivery Policy — Deez Prints" },
      {
        property: "og:description",
        content: "Flat Rs. 200 nationwide shipping, 3–5 working days delivery.",
      },
      { property: "og:url", content: `${SITE_URL}/shipping` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/shipping` }],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading eyebrow="Policies" title="Shipping & Delivery" />

      <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-4xl">
        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 space-y-2">
          <Truck className="w-6 h-6 text-primary" />
          <p className="text-sm font-mono text-muted-foreground uppercase">Shipping Rate</p>
          <p className="text-xl font-bold text-foreground">Flat Rs. {site.shippingFee}</p>
          <p className="text-xs text-muted-foreground">
            Free shipping on orders above Rs. {site.freeShippingThreshold}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 space-y-2">
          <Clock className="w-6 h-6 text-primary" />
          <p className="text-sm font-mono text-muted-foreground uppercase">Delivery Time</p>
          <p className="text-xl font-bold text-foreground">{site.deliveryTime}</p>
          <p className="text-xs text-muted-foreground">Orders usually dispatch within 24-48 hrs</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 space-y-2">
          <MapPin className="w-6 h-6 text-primary" />
          <p className="text-sm font-mono text-muted-foreground uppercase">Couriers</p>
          <p className="text-xl font-bold text-foreground">{site.couriers}</p>
          <p className="text-xs text-muted-foreground">Covering all major cities across Pakistan</p>
        </div>
      </div>

      <div className="mt-12 max-w-3xl space-y-8">
        <div className="rounded-xl border border-white/10 bg-surface/50 p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Production &amp; Dispatch Timeline</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every garment is made to order or quality-inspected at our Karachi studio. Blanks and graphic prints undergo a <strong className="text-foreground font-semibold">24 to 48-hour production window</strong> before handed to couriers. Orders placed before 1 PM are processed the same working day.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Local Nationwide Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              We deliver across <strong className="text-foreground font-semibold">250+ cities in Pakistan</strong> including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Quetta. Delivery typically takes <strong className="text-foreground font-semibold">3 to 5 working days</strong> via TCS, Leopards, and M&amp;P.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Order Tracking &amp; SMS Dispatch Alert</h2>
            <p className="text-muted-foreground leading-relaxed">
              As soon as your package leaves our Karachi studio, a consignment tracking link will be sent to your registered Phone Number and Email. You can enter your tracking code on TCS or Leopards official websites anytime.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">International Shipping</h2>
            <p className="text-muted-foreground leading-relaxed">
              Currently, online checkout supports addresses within Pakistan. However, for overseas inquiries or worldwide bulk orders, please contact our team directly via WhatsApp (+92 327 2487127).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
