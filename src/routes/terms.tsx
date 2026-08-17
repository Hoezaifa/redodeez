import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { SectionHeading } from "@/components/shop/ProductRow";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Deez Prints" },
      { name: "description", content: "Terms of service and store rules for Deez Prints." },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading eyebrow="Legal" title="Terms of Service" />
      <div className="mt-12 max-w-3xl space-y-6 text-sm text-muted-foreground leading-relaxed">
        <p>
          Welcome to Deez Prints. By browsing our website or placing an order, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <h3 className="text-lg font-bold text-foreground uppercase pt-4">Orders &amp; Pricing</h3>
        <p>
          All prices listed are in Pakistani Rupees (PKR). Orders are confirmed once payment verification is completed via direct bank transfer or mobile wallet receipt matching.
        </p>
        <h3 className="text-lg font-bold text-foreground uppercase pt-4">Custom Orders</h3>
        <p>
          Custom print orders require user-uploaded artwork. You confirm that you hold the rights to any submitted designs. Custom items are non-refundable unless defective upon arrival.
        </p>
        <h3 className="text-lg font-bold text-foreground uppercase pt-4">Intellectual Property</h3>
        <p>
          All Deez Prints branding, logos, graphic design typography, and web content belong exclusively to Deez Prints Karachi Studio.
        </p>
      </div>
    </div>
  );
}
