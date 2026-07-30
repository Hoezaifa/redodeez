import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";
import { paymentMethods, site } from "@/data/site";
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
    ],
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
            <h2 className="text-2xl font-bold text-foreground">Delivery Timeline</h2>
            <p className="text-muted-foreground leading-relaxed">
              Standard delivery time is{" "}
              <strong className="text-foreground font-semibold">3-5 working days</strong> across
              Pakistan. Orders placed before 1 PM are usually dispatched the same day. During sales
              or national holidays, delivery may take up to 7 working days.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Tracking Your Order</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once your order is dispatched, we send a tracking number via Email/SMS so you can
              track your package directly on courier portals.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Payment Methods</h2>
            <p className="text-muted-foreground leading-relaxed">
              We currently accept:{" "}
              <strong className="text-foreground font-semibold">{paymentMethods.join(", ")}</strong>
              .
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">International Shipping</h2>
            <p className="text-muted-foreground leading-relaxed">
              Currently, we only ship within Pakistan. However, we plan to expand internationally in
              the near future!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
