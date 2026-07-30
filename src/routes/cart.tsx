import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/shop/ProductRow";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Deez Prints" },
      {
        name: "description",
        content:
          "Review the pieces in your Deez Prints bag, adjust sizes and quantities, then check out with COD or bank transfer.",
      },
      { property: "og:title", content: "Your Bag — Deez Prints" },
      { property: "og:description", content: "Review your Deez Prints order before checkout." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  const shippingCost = subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;
  const total = lines.length ? subtotal + shippingCost : 0;

  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading eyebrow={`${lines.length} items`} title="Your bag" />

      {lines.length === 0 ? (
        <div className="mt-16 border border-border p-16 text-center">
          <p className="display-md">Nothing in here yet</p>
          <Link
            to="/collections"
            className="mt-8 inline-block bg-primary px-7 py-4 label-mono text-primary-foreground"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="border-t border-border">
            {lines.map((l) => (
              <div key={l.id} className="flex gap-5 border-b border-border py-6">
                <div className="h-36 w-28 shrink-0 overflow-hidden bg-surface">
                  {l.image && <img src={l.image} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-extrabold uppercase">{l.title}</p>
                      <p className="label-mono mt-1 text-muted-foreground">
                        {[l.size, l.color].filter(Boolean).join(" / ") || "One size"}
                      </p>
                      {l.note && <p className="mt-1 text-xs text-muted-foreground">{l.note}</p>}
                    </div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => remove(l.id)}
                      className="self-start text-muted-foreground hover:text-primary"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l.id, l.qty - 1)}
                        className="px-3 py-2 hover:text-primary"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-xs">{l.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(l.id, l.qty + 1)}
                        className="px-3 py-2 hover:text-primary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-display text-lg font-extrabold">
                      {formatPrice(l.price * l.qty)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="border border-border bg-surface p-6 lg:sticky lg:top-32 lg:self-start">
            <p className="label-mono">Summary</p>
            <dl className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <span className="label-mono">Total</span>
              <span className="font-display text-2xl font-extrabold">{formatPrice(total)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 block bg-primary py-4 text-center label-mono text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Checkout
            </Link>
            <p className="label-mono mt-4 text-muted-foreground">
              {site.deliveryTime} · {site.couriers}
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
