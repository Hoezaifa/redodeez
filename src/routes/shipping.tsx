import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";
import { paymentMethods, site, SITE_URL, SHIPPING_OPTIONS } from "@/data/site";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy — Deez Prints" },
      {
        name: "description",
        content:
          "Karachi: Orders usually prepared within 2 days, delivered around day 3. Outside Karachi: 2–3 days prep plus typically 3–4 additional courier days.",
      },
      { property: "og:title", content: "Shipping & Delivery Policy — Deez Prints" },
      {
        property: "og:description",
        content:
          "Standard delivery timings: Karachi around day 3 after confirmation; Outside Karachi prep 2–3 days plus around 3–4 additional courier days.",
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
          <p className="text-sm font-mono text-muted-foreground uppercase">Shipping Rates</p>
          <p className="text-xl font-bold text-foreground">Karachi Rs. {SHIPPING_OPTIONS.karachi.fee} | Nationwide Rs. {SHIPPING_OPTIONS.nationwide.fee}</p>
          <p className="text-xs text-muted-foreground">
            Karachi via Rider | Rest of Pakistan via Courier
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 space-y-2">
          <Clock className="w-6 h-6 text-primary" />
          <p className="text-sm font-mono text-muted-foreground uppercase">Karachi Timings</p>
          <p className="text-xl font-bold text-foreground">Delivered Around Day 3</p>
          <p className="text-xs text-muted-foreground">Prepared within 2 days after confirmation</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 space-y-2">
          <MapPin className="w-6 h-6 text-primary" />
          <p className="text-sm font-mono text-muted-foreground uppercase">Outside Karachi</p>
          <p className="text-xl font-bold text-foreground">Prep 2–3 Days + 3–4 Days Transit</p>
          <p className="text-xs text-muted-foreground">Courier delivery happens after studio preparation</p>
        </div>
      </div>

      <div className="mt-12 max-w-3xl space-y-8">
        <div className="rounded-xl border border-white/10 bg-surface/50 p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Standard Delivery Timings</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground font-semibold">Karachi:</strong> Orders are usually prepared within 2 days and delivered around day 3 after confirmation.
              </p>
              <p>
                <strong className="text-foreground font-semibold">Outside Karachi:</strong> Preparation usually takes 2–3 days. Courier delivery then typically takes around 3–4 additional days, but can take longer depending on the courier and destination.
              </p>
              <div className="rounded-lg bg-zinc-900/80 border border-white/10 p-4 text-xs text-zinc-300 space-y-1.5">
                <p className="font-semibold text-primary uppercase tracking-wider text-[11px]">Important Delivery Notes:</p>
                <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                  <li>Preparation happens before courier transit; nationwide delivery does not mean 3–4 days total.</li>
                  <li>These timings are estimates, not guaranteed arrival dates. Delivery speed may vary depending on courier routing and destination.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Delivery Rates &amp; Methods</h2>
            <p className="text-muted-foreground leading-relaxed">
              We offer two delivery options during checkout:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground font-semibold">Karachi (Rs. {SHIPPING_OPTIONS.karachi.fee}):</strong> Delivered directly to your doorstep via rider.
              </li>
              <li>
                <strong className="text-foreground font-semibold">Nationwide Pakistan (Rs. {SHIPPING_OPTIONS.nationwide.fee}):</strong> Dispatched via reliable courier services across all provinces.
              </li>
              <li>
                <strong className="text-emerald-400 font-semibold">Free Karachi Delivery:</strong> Karachi orders exceeding <strong className="text-foreground font-semibold">Rs. {site.freeShippingThreshold.toLocaleString()}</strong> qualify for complimentary free shipping.
              </li>
              <li>
                <strong className="text-amber-400 font-semibold">Ceramic Mugs (Karachi Only):</strong> Due to the fragility of ceramic drinkware, mugs are delivered exclusively within Karachi via local rider and cannot be dispatched via nationwide courier.
              </li>
            </ul>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Order Tracking &amp; Notifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              As soon as your package leaves our Karachi studio, a consignment tracking update and dispatch details will be sent via SMS/Email or WhatsApp.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">International Shipping</h2>
            <p className="text-muted-foreground leading-relaxed">
              Currently, online checkout supports addresses within Pakistan. For overseas inquiries or worldwide bulk custom printing orders, please contact our team directly via WhatsApp (+92 327 2487127).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
