import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";
import { site, whatsappLink, SITE_URL } from "@/data/site";
import { AlertCircle, RefreshCw, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchange Policy — Deez Prints" },
      {
        name: "description",
        content:
          "7-day exchange policy across Pakistan for size issues or defective items. Simple WhatsApp support to initiate exchanges.",
      },
      { property: "og:title", content: "Returns & Exchange Policy — Deez Prints" },
      { property: "og:description", content: "7-day exchange policy on size issues and defects." },
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
      <SectionHeading eyebrow="Policies" title="Returns & Exchange" />

      <div className="mt-12 max-w-3xl space-y-8">
        <div className="rounded-xl border border-white/10 bg-surface/50 p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7-Day Exchange Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We offer a{" "}
              <strong className="text-foreground font-semibold">7-day exchange policy</strong> from
              the date of delivery. If you have received a defective item or the wrong size, please
              contact us immediately.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
              <li>Item must be unworn, unwashed, and in original condition.</li>
              <li>Tags and packaging must be intact.</li>
              <li>Exchange depends on stock availability.</li>
            </ul>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Returns & Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              We generally do not offer cash refunds. However, if a product is out of stock or
              faulty upon arrival, we may process a refund via Bank Transfer within{" "}
              <strong className="text-foreground font-semibold">7 working days</strong>.
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-4 items-start">
            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/90">
              <strong className="font-semibold">Note:</strong> Custom or personalized items are not
              eligible for return or exchange unless defective or printed incorrectly.
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
