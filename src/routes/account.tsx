import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";
import { useCart } from "@/lib/cart";
import { site } from "@/data/site";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — Deez Prints" },
      {
        name: "description",
        content:
          "Track a Deez Prints order, review saved pieces and find studio contact details in one place.",
      },
      { property: "og:title", content: "Your Account — Deez Prints" },
      { property: "og:description", content: "Order tracking and saved pieces." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Account,
});

function Account() {
  const { wishlist, count } = useCart();

  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading
        eyebrow="Account"
        title="Your orders"
        sub="Accounts aren't live yet — track orders with the number we send after dispatch, or message the studio."
      />

      <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
        <div className="bg-background p-6">
          <p className="label-mono text-primary">In your bag</p>
          <p className="mt-3 display-md">{count}</p>
        </div>
        <div className="bg-background p-6">
          <p className="label-mono text-primary">Saved</p>
          <p className="mt-3 display-md">{wishlist.length}</p>
        </div>
        <div className="bg-background p-6">
          <p className="label-mono text-primary">Support</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block text-sm break-all hover:text-primary"
          >
            {site.email}
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/wishlist" className="bg-primary px-6 py-4 label-mono text-primary-foreground">
          View wishlist
        </Link>
        <Link
          to="/contact"
          className="border border-border-strong px-6 py-4 label-mono hover:border-primary hover:text-primary"
        >
          Track an order
        </Link>
      </div>
    </div>
  );
}
