import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Download,
  Trash2,
  Eye,
  Send,
  Copy,
  MessageCircle,
  ChevronDown,
  X,
  ExternalLink,
  Package,
  Clock,
} from "lucide-react";
import {
  type StoredOrder,
  type OrderStatus,
  updateStatus,
  deleteOrder,
  exportCSV,
  exportJSON,
  downloadFile,
  clearOrders,
} from "@/lib/ordersStore";
import { resendOrderTelegramNotification } from "@/lib/sendTelegramOrder";
import { StatusBadge } from "./DashboardView";

const STATUS_OPTIONS: OrderStatus[] = ["Pending", "Processing", "Dispatched", "Delivered", "Cancelled"];
const FILTER_TABS = ["All", "Pending", "Processing", "Dispatched", "Delivered", "Cancelled", "Custom", "Normal"] as const;

export function OrdersView({
  orders,
  onRefresh,
}: {
  orders: StoredOrder[];
  onRefresh: () => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [drawerOrder, setDrawerOrder] = useState<StoredOrder | null>(null);
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = useMemo(() => {
    let result = [...orders];

    // Filter
    if (filter === "Custom") result = result.filter((o) => o.orderType === "custom");
    else if (filter === "Normal") result = result.filter((o) => o.orderType === "normal");
    else if (filter !== "All") result = result.filter((o) => o.status === filter);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderId.toLowerCase().includes(q) ||
          o.name.toLowerCase().includes(q) ||
          o.phone.includes(q) ||
          o.email.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q) ||
          o.items.some((i) => i.title.toLowerCase().includes(q)) ||
          (o.trackingNumber || "").toLowerCase().includes(q) ||
          (o.notes || "").toLowerCase().includes(q),
      );
    }

    return result;
  }, [orders, filter, search]);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateStatus(orderId, status);
    setStatusDropdown(null);
    showToast(`✓ Status → ${status}`);
    onRefresh();
  };

  const handleDelete = (orderId: string) => {
    if (!confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
    deleteOrder(orderId);
    showToast("✓ Order Deleted");
    onRefresh();
  };

  const handleResendTelegram = async (order: StoredOrder) => {
    showToast("Sending...");
    const ok = await resendOrderTelegramNotification(order);
    showToast(ok ? "✓ Telegram Sent" : "✗ Send Failed");
  };

  const handleExport = (type: "csv" | "json") => {
    const content = type === "csv" ? exportCSV() : exportJSON();
    const ext = type === "csv" ? "csv" : "json";
    const mime = type === "csv" ? "text/csv" : "application/json";
    downloadFile(content, `deez-orders-${new Date().toISOString().slice(0, 10)}.${ext}`, mime);
    showToast(`✓ ${ext.toUpperCase()} Exported`);
  };

  const handleClearAll = () => {
    if (!confirm("Clear ALL orders? This cannot be undone.")) return;
    clearOrders();
    showToast("✓ All Orders Cleared");
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight">Orders</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{orders.length} total orders</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleExport("csv")} className="admin-btn-sm" title="Export CSV">
            <Download className="w-4 h-4" /> CSV
          </button>
          <button onClick={() => handleExport("json")} className="admin-btn-sm" title="Export JSON">
            <Download className="w-4 h-4" /> JSON
          </button>
          <button
            onClick={handleClearAll}
            className="admin-btn-sm !text-red-400 !border-red-500/20 hover:!bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, customers, products..."
            className="w-full bg-zinc-900/60 border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                filter === tab
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-transparent text-zinc-500 border-white/[0.06] hover:text-white hover:border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No orders found</p>
        </div>
      ) : (
        <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-zinc-500">
                  {["Order", "Customer", "Phone", "City", "Items", "Payment", "Total", "Status", "Date", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 font-semibold text-[11px] uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr
                    key={o.orderId}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs font-bold text-white">{o.orderId}</span>
                      {o.orderType === "custom" && (
                        <span className="ml-1.5 text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded px-1.5 py-0.5 font-bold uppercase">
                          Custom
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white truncate max-w-[120px]">{o.name}</p>
                      <p className="text-[11px] text-zinc-600 truncate max-w-[120px]">{o.email}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{o.phone}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{o.city}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs">{o.items.length}</td>
                    <td className="px-4 py-3 text-zinc-400 text-xs truncate max-w-[100px]">
                      {o.paymentMethod}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-white text-xs">
                      Rs {o.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() =>
                          setStatusDropdown(statusDropdown === o.orderId ? null : o.orderId)
                        }
                        className="cursor-pointer flex items-center gap-1"
                      >
                        <StatusBadge status={o.status} />
                        <ChevronDown className="w-3 h-3 text-zinc-500" />
                      </button>
                      {statusDropdown === o.orderId && (
                        <div className="absolute top-full left-0 mt-1 z-20 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl py-1 min-w-[140px]">
                          {STATUS_OPTIONS.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleStatusChange(o.orderId, s)}
                              className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer ${o.status === s ? "text-primary" : "text-zinc-400"}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-[11px] whitespace-nowrap">
                      {new Date(o.createdAt).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setDrawerOrder(o)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleResendTelegram(o)}
                          className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-blue-400 transition-colors cursor-pointer"
                          title="Resend Telegram"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(o.orderId)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Drawer */}
      <AnimatePresence>
        {drawerOrder && (
          <OrderDrawer
            order={drawerOrder}
            onClose={() => setDrawerOrder(null)}
            onStatusChange={(s) => {
              handleStatusChange(drawerOrder.orderId, s);
              setDrawerOrder({ ...drawerOrder, status: s });
            }}
            onResend={() => handleResendTelegram(drawerOrder)}
            showToast={showToast}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderDrawer({
  order,
  onClose,
  onStatusChange,
  onResend,
  showToast,
}: {
  order: StoredOrder;
  onClose: () => void;
  onStatusChange: (s: OrderStatus) => void;
  onResend: () => void;
  showToast: (msg: string) => void;
}) {
  const cleanPhone = order.phone.replace(/[^0-9]/g, "");

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-zinc-950 border-l border-white/[0.06] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-zinc-950/95 backdrop-blur-lg border-b border-white/[0.06] px-5 py-4 flex items-center justify-between z-10">
          <div>
            <p className="font-mono text-xs text-zinc-500">{order.orderId}</p>
            <p className="text-sm font-bold text-white mt-0.5">{order.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Status */}
          <div>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    order.status === s
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "text-zinc-500 border-white/[0.06] hover:text-white hover:border-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Customer</p>
            <div className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-4 space-y-2 text-sm">
              <Row label="Name" value={order.name} />
              <Row label="Email" value={order.email} />
              <Row label="Phone" value={order.phone} />
              <Row label="City" value={order.city} />
              <Row label="Address" value={order.address} />
              {order.trackingNumber && <Row label="Tracking" value={order.trackingNumber} />}
            </div>

            <div className="flex gap-2 mt-3">
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noreferrer"
                className="admin-btn-sm !bg-emerald-500/10 !text-emerald-400 !border-emerald-500/20"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${order.name}\n${order.phone}\n${order.address}, ${order.city}`);
                  showToast("✓ Address Copied");
                }}
                className="admin-btn-sm"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Address
              </button>
            </div>
          </div>

          {/* Items */}
          <div>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              Items ({order.items.length})
            </p>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {[item.size, item.color].filter(Boolean).join(" · ")} × {item.qty}
                      </p>
                      {item.isCustom && (
                        <span className="inline-block mt-1 text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded px-1.5 py-0.5 font-bold uppercase">
                          Custom Print
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm font-bold text-white">
                      Rs {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>

                  {/* Artwork links */}
                  {item.frontArtworkUrl?.startsWith("http") && (
                    <a
                      href={item.frontArtworkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 flex items-center gap-1.5 text-[11px] text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" /> Front Artwork
                    </a>
                  )}
                  {item.backArtworkUrl?.startsWith("http") && (
                    <a
                      href={item.backArtworkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 flex items-center gap-1.5 text-[11px] text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" /> Back Artwork
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-zinc-900/60 border border-white/[0.06] rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-white font-mono">Rs {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-white font-mono">Rs {order.shipping.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Discount</span>
                <span className="text-emerald-400 font-mono">-Rs {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-white/[0.06] font-bold">
              <span>Total</span>
              <span className="text-primary font-mono text-base">Rs {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Notes</p>
              <p className="text-sm text-zinc-400 bg-zinc-900/60 border border-white/[0.06] rounded-xl p-3">
                {order.notes}
              </p>
            </div>
          )}

          {/* Status History */}
          {(order.statusHistory?.length ?? 0) > 0 && (
            <div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Status History
              </p>
              <div className="space-y-2">
                {(order.statusHistory || []).map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-xs"
                  >
                    <Clock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    <StatusBadge status={entry.status} />
                    <span className="text-zinc-600">
                      {new Date(entry.date).toLocaleString("en-PK", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button onClick={onResend} className="admin-btn-sm">
              <Send className="w-3.5 h-3.5" /> Resend Telegram
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className="text-white font-medium text-right max-w-[200px] truncate">{value || "—"}</span>
    </div>
  );
}
