import { motion } from "motion/react";
import {
  DollarSign,
  Package,
  Clock,
  Palette,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import type { OrderAnalytics, StoredOrder } from "@/lib/ordersStore";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  delay,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: typeof DollarSign;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="bg-zinc-900/60 border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition-colors group"
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, color }}
        >
          <Icon className="w-[18px] h-[18px]" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
      <p className="text-2xl font-extrabold tracking-tight">{value}</p>
      <p className="text-xs text-zinc-500 mt-0.5 font-medium">{label}</p>
      {sub && <p className="text-[11px] text-zinc-600 mt-1">{sub}</p>}
    </motion.div>
  );
}

export function DashboardView({
  analytics,
  orders,
  onNavigateOrders,
}: {
  analytics: OrderAnalytics;
  orders: StoredOrder[];
  onNavigateOrders: () => void;
}) {
  const fmt = (n: number) =>
    n >= 1000 ? `Rs ${(n / 1000).toFixed(1)}k` : `Rs ${n.toLocaleString()}`;

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Welcome back to Deez Prints HQ</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Revenue"
          value={fmt(analytics.todayRevenue)}
          icon={TrendingUp}
          color="#f97316"
          delay={0}
        />
        <StatCard
          label="Monthly Revenue"
          value={fmt(analytics.monthlyRevenue)}
          icon={DollarSign}
          color="#22c55e"
          delay={0.05}
        />
        <StatCard
          label="Total Orders"
          value={String(analytics.totalOrders)}
          sub={`${analytics.pendingOrders} pending`}
          icon={Package}
          color="#3b82f6"
          delay={0.1}
        />
        <StatCard
          label="Custom Orders"
          value={`${analytics.customOrderPercent.toFixed(0)}%`}
          sub={`Avg: ${fmt(analytics.averageOrderValue)}`}
          icon={Palette}
          color="#a855f7"
          delay={0.15}
        />
      </div>

      {/* Status breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {([
          ["Pending", analytics.pendingOrders, "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"],
          ["Processing", analytics.processingOrders, "bg-blue-500/10 text-blue-500 border-blue-500/20"],
          ["Dispatched", analytics.dispatchedOrders, "bg-purple-500/10 text-purple-500 border-purple-500/20"],
          ["Delivered", analytics.deliveredOrders, "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"],
          ["Cancelled", analytics.cancelledOrders, "bg-red-500/10 text-red-400 border-red-500/20"],
        ] as const).map(([label, count, cls]) => (
          <div key={label} className={`rounded-xl border px-4 py-3 ${cls}`}>
            <p className="text-lg font-extrabold">{count}</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <button
            onClick={onNavigateOrders}
            className="text-xs text-primary font-bold hover:underline cursor-pointer"
          >
            View All →
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">No orders yet</p>
          </div>
        ) : (
          <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06] text-zinc-500">
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">
                      Order
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                      City
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr
                      key={o.orderId}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs font-bold text-white">
                        {o.orderId}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-white truncate max-w-[140px]">{o.name}</p>
                        <p className="text-[11px] text-zinc-500">{o.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">{o.city}</td>
                      <td className="px-4 py-3 font-mono font-bold text-white">
                        Rs {o.total.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={o.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Dispatched: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${map[status] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}
    >
      {status}
    </span>
  );
}
