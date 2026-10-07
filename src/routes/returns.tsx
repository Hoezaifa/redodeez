import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";
import { site, whatsappLink, SITE_URL } from "@/data/site";
import { AlertCircle, RefreshCw, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "7-Day Exchange Policy — Deez Prints" },
      {
        name: "description",
        content:
          "7-Day Exchange is available only if you receive a defective item, incorrect product, or different size than ordered. Deez Prints does not offer change-of-mind returns.",
      },
      { property: "og:title", content: "7-Day Exchange Policy — Deez Prints" },
      {
        property: "og:description",
        content:
          "Exchange is available within 7 days only if you receive a defective item, incorrect product, or different size than ordered.",
      },
      { property: "og:url", content: `${SITE_URL}/returns` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/returns` }],
  }),
  component: Returns,
});

function Returns() {
  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading eyebrow="Policies" title="7-Day Exchange" />

      <div className="mt-12 max-w-3xl space-y-8">
        <div className="rounded-xl border border-white/10 bg-surface/50 p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7-Day Exchange</h2>
            <p className="text-foreground/90 font-medium leading-relaxed">
              Exchange is available within 7 days only if you receive a defective item, incorrect product, or a different size than the one you ordered.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please check the size chart, fit and order details carefully before confirming your order. Incorrect size selection or change of mind is not eligible for exchange.
            </p>
            <div className="space-y-2 pt-2">
              <p className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                Item Condition Requirements:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1.5 ml-2 text-sm">
                <li>unworn</li>
                <li>unwashed</li>
                <li>unused</li>
                <li>in original condition</li>
                <li>with original tags/packaging where applicable</li>
              </ul>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed bg-white/5 border border-white/10 rounded-lg p-3.5">
              If Deez Prints sends the wrong size/product or the item has a genuine printing/fabric defect, Deez Prints will resolve the issue.
            </p>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Refunds &amp; Cancellations</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Deez Prints does not offer general change-of-mind returns or cash refunds. If an ordered item is out of stock or confirmed defective and replacement is unavailable, we process a direct bank refund within{" "}
              <strong className="text-foreground font-semibold">7 working days</strong>.
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-4 items-start">
            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/90">
              <strong className="font-semibold">Note:</strong> Custom or personalized items are produced specifically for your order and are strictly non-exchangeable unless defective or printed incorrectly by Deez Prints.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-surface/50 p-8 text-center space-y-5">
          <h3 className="text-xl font-bold text-foreground">How to Request an Exchange?</h3>
          <p className="text-muted-foreground">
            Simply message us on WhatsApp with your Order ID and pictures of the item.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink("Hi! I'd like to request an exchange for my order.")}
              target="_blank"
              rel="noreferrer"
              aria-label="Contact support on WhatsApp"
              className="inline-flex items-center justify-center bg-primary px-8 py-3.5 rounded-full font-bold text-primary-foreground hover:opacity-95 transition-opacity"
            >
              Contact Support on WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center border border-border-strong px-8 py-3.5 rounded-full font-bold hover:border-primary hover:text-primary transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
