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
          "Karachi Rs. 200 via Bykea, Nationwide Pakistan Rs. 300 via Courier. Orders take 2–3 working days to prepare before dispatch.",
      },
      { property: "og:title", content: "Shipping & Delivery Policy — Deez Prints" },
      {
        property: "og:description",
        content: "Karachi Rs. 200 (Bykea), Nationwide Rs. 300 (Courier). 2–3 working days preparation time.",
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
          <p className="text-xl font-bold text-foreground">Karachi Rs. 200 | Nationwide Rs. 300</p>
          <p className="text-xs text-muted-foreground">
            Karachi via Bykea | Rest of Pakistan via Courier
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 space-y-2">
          <Clock className="w-6 h-6 text-primary" />
          <p className="text-sm font-mono text-muted-foreground uppercase">Preparation Time</p>
          <p className="text-xl font-bold text-foreground">2–3 Working Days</p>
          <p className="text-xs text-muted-foreground">Made-to-order production before dispatch</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-surface/50 p-6 space-y-2">
          <MapPin className="w-6 h-6 text-primary" />
          <p className="text-sm font-mono text-muted-foreground uppercase">Delivery Method</p>
          <p className="text-xl font-bold text-foreground">Bykea &amp; Courier Services</p>
          <p className="text-xs text-muted-foreground">Covering Karachi and all major cities across Pakistan</p>
        </div>
      </div>

      <div className="mt-12 max-w-3xl space-y-8">
        <div className="rounded-xl border border-white/10 bg-surface/50 p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Order Preparation Notice</h2>
            <p className="text-muted-foreground leading-relaxed">
              Because Deez Prints products are made-to-order/custom, orders take <strong className="text-foreground font-semibold">2–3 working days to prepare</strong> at our Karachi studio before dispatch. Delivery time is additional and depends on your location.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Delivery Rates &amp; Methods</h2>
            <p className="text-muted-foreground leading-relaxed">
              We offer two delivery options during checkout:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground font-semibold">Karachi (Rs. 200):</strong> Delivered directly to your doorstep via Bykea local courier.
              </li>
              <li>
                <strong className="text-foreground font-semibold">Nationwide Pakistan (Rs. 300):</strong> Dispatched via reliable courier services across all provinces.
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
