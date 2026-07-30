import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shop/ProductRow";
import { useCart } from "@/lib/cart";
import { site } from "@/data/site";
import { type OrderPayload } from "@/lib/sendTelegramOrder";
import { Eye, ExternalLink, PackageCheck, Sparkles, X } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Orders & Admin Dashboard — Deez Prints" },
      {
        name: "description",
        content:
          "Track your Deez Prints orders, review custom artwork, manage order statuses, and access studio support.",
      },
      { property: "og:title", content: "Orders & Admin Dashboard — Deez Prints" },
      { property: "og:description", content: "Order tracking and custom artwork management." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Account,
});

export function Account() {
  const { wishlist, count } = useCart();
  const [orders, setOrders] = useState<OrderPayload[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("deez-orders-v1");
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleUpdateStatus = (orderId: string, newStatus: OrderPayload["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
      try {
        localStorage.setItem("deez-orders-v1", JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  const customOrderCount = orders.filter(
    (o) => o.orderType === "custom" || o.items.some((i) => i.isCustom),
  ).length;

  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading
        eyebrow="Account & Studio Admin"
        title="Order History & Custom Prints"
        sub="Track placed orders, view high-res custom artwork submissions, and manage dispatch status."
      />

      {/* Top Stats Overview */}
      <div className="mt-12 grid gap-px bg-border sm:grid-cols-4">
        <div className="bg-background p-6">
          <p className="label-mono text-muted-foreground">Total Orders</p>
          <p className="mt-3 display-md text-foreground">{orders.length}</p>
        </div>
        <div className="bg-background p-6">
          <p className="label-mono text-amber-400 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Custom Orders
          </p>
          <p className="mt-3 display-md text-amber-400">{customOrderCount}</p>
        </div>
        <div className="bg-background p-6">
          <p className="label-mono text-primary">In your bag</p>
          <p className="mt-3 display-md">{count}</p>
        </div>
        <div className="bg-background p-6">
          <p className="label-mono text-muted-foreground">Saved Items</p>
          <p className="mt-3 display-md text-foreground">{wishlist.length}</p>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/custom-print"
          className="bg-primary px-6 py-3 label-mono text-primary-foreground"
        >
          + Create Custom Print
        </Link>
        <Link
          to="/wishlist"
          className="border border-border-strong px-6 py-3 label-mono text-foreground hover:border-primary hover:text-primary"
        >
          View Wishlist
        </Link>
      </div>

      {/* Orders List Section */}
      <div className="mt-14 space-y-8">
        <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">
          Recent Orders
        </h2>

        {orders.length === 0 ? (
          <div className="border border-dashed border-border-strong p-10 text-center rounded-lg">
            <PackageCheck className="mx-auto h-10 w-10 text-muted-foreground stroke-1" />
            <p className="mt-4 font-mono text-sm text-foreground">No orders recorded yet.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Orders placed online or via custom prints will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isCustomOrder =
                order.orderType === "custom" || order.items.some((i) => i.isCustom);

              return (
                <div
                  key={order.orderId}
                  className={`border rounded-xl p-6 transition-colors bg-background ${
                    isCustomOrder ? "border-amber-500/40" : "border-border-strong"
                  }`}
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-lg font-extrabold text-foreground">
                        #{order.orderId}
                      </span>

                      {isCustomOrder && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono text-[11px] font-bold uppercase px-3 py-1 rounded-full">
                          <Sparkles className="h-3 w-3" />
                          Custom Order
                        </span>
                      )}

                      <span className="text-xs text-muted-foreground font-mono">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-PK", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Recently Placed"}
                      </span>
                    </div>

                    {/* Order Status Badge & Admin Controls */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">Status:</span>
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) =>
                          handleUpdateStatus(
                            order.orderId,
                            e.target.value as OrderPayload["status"],
                          )
                        }
                        className="bg-zinc-900 border border-border-strong text-xs font-mono text-foreground rounded-md px-3 py-1.5 focus:outline-none focus:border-primary"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Info & Payment Grid */}
                  <div className="mt-4 grid gap-4 text-xs font-sans sm:grid-cols-2 md:grid-cols-4 bg-zinc-950/40 p-4 rounded-lg border border-border/50">
                    <div>
                      <p className="font-mono text-[11px] text-muted-foreground uppercase">
                        Customer
                      </p>
                      <p className="font-semibold text-foreground mt-0.5">{order.name}</p>
                      <p className="text-muted-foreground font-mono mt-0.5">{order.phone}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] text-muted-foreground uppercase">
                        Shipping City
                      </p>
                      <p className="font-semibold text-foreground mt-0.5">{order.city}</p>
                      <p className="text-muted-foreground truncate max-w-[180px] mt-0.5">
                        {order.address}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] text-muted-foreground uppercase">
                        Payment Method
                      </p>
                      <p className="font-semibold text-foreground mt-0.5">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] text-muted-foreground uppercase">
                        Total Amount
                      </p>
                      <p className="font-mono font-bold text-primary mt-0.5 text-sm">
                        Rs {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="mt-3 p-3 bg-zinc-900/60 rounded-md border border-zinc-800 text-xs">
                      <span className="font-mono text-[11px] text-amber-400 font-bold uppercase">
                        Order Notes:{" "}
                      </span>
                      <span className="text-zinc-300">{order.notes}</span>
                    </div>
                  )}

                  {/* Order Items Table / Cards */}
                  <div className="mt-5 space-y-4">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Ordered Items ({order.items.length})
                    </p>

                    <div className="grid gap-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={`${order.orderId}-item-${idx}`}
                          className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-zinc-900/40 border border-border"
                        >
                          <div className="flex items-center gap-4">
                            {item.frontArtworkUrl ? (
                              <div
                                onClick={() => setSelectedImage(item.frontArtworkUrl!)}
                                className="relative h-16 w-16 shrink-0 rounded-md bg-zinc-950 border border-zinc-700 overflow-hidden group cursor-pointer"
                              >
                                <img
                                  src={item.frontArtworkUrl}
                                  alt="Front Artwork"
                                  className="h-full w-full object-contain p-1"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <Eye className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            ) : null}

                            {item.backArtworkUrl ? (
                              <div
                                onClick={() => setSelectedImage(item.backArtworkUrl!)}
                                className="relative h-16 w-16 shrink-0 rounded-md bg-zinc-950 border border-zinc-700 overflow-hidden group cursor-pointer"
                              >
                                <img
                                  src={item.backArtworkUrl}
                                  alt="Back Artwork"
                                  className="h-full w-full object-contain p-1"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                  <Eye className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            ) : null}

                            <div>
                              <p className="font-bold text-foreground text-sm flex items-center gap-2">
                                {item.title}
                                {item.isCustom && (
                                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                                    Custom
                                  </span>
                                )}
                              </p>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1 font-mono">
                                {item.blankItem && <span>Blank: {item.blankItem}</span>}
                                {item.color && <span>Color: {item.color}</span>}
                                {item.size && <span>Size: {item.size}</span>}
                                {item.placement && <span>Placement: {item.placement}</span>}
                                <span>Qty: {item.qty}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-mono text-sm font-bold text-foreground">
                              Rs {item.price.toLocaleString()}
                            </p>
                            {item.frontArtworkUrl && (
                              <button
                                type="button"
                                onClick={() => setSelectedImage(item.frontArtworkUrl!)}
                                className="mt-1 inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline cursor-pointer"
                              >
                                <ExternalLink className="h-3 w-3" />
                                High-Res Artwork
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* High-Resolution Artwork Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-hidden flex flex-col items-center"
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-zinc-700 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              Full-Resolution Artwork Preview
            </p>

            <div className="max-h-[75vh] overflow-auto flex items-center justify-center p-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <img
                src={selectedImage}
                alt="Full Artwork"
                className="max-h-[70vh] object-contain rounded"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={selectedImage}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-black font-mono text-xs font-bold px-4 py-2 rounded flex items-center gap-2 hover:brightness-110"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open Original Image
              </a>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="border border-zinc-700 text-white font-mono text-xs font-bold px-4 py-2 rounded hover:border-zinc-500"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
