import { motion } from "motion/react";
import { DollarSign, Package, TrendingUp, Palette, CreditCard, BarChart3 } from "lucide-react";
import type { OrderAnalytics, StoredOrder } from "@/lib/ordersStore";

export function AnalyticsView({
  analytics,
  orders,
}: {
  analytics: OrderAnalytics;
  orders: StoredOrder[];
}) {
  const fmt = (n: number) => `Rs ${n.toLocaleString()}`;

  // Revenue by day (last 14 days)
  const revenueByDay = (() => {
    const days: Record<string, number> = {};
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days[d.toISOString().slice(5, 10)] = 0;
    }
    for (const o of orders) {
      if (o.status === "Cancelled") continue;
      const key = o.createdAt.slice(5, 10);
      if (key in days) days[key] += o.total;
    }
    return Object.entries(days);
  })();

  const maxRevenue = Math.max(...revenueByDay.map(([, v]) => v), 1);

  // Payment method breakdown
  const paymentEntries = Object.entries(analytics.paymentMethodBreakdown).sort(
    (a, b) => b[1] - a[1],
  );
  const totalPayments = paymentEntries.reduce((s, [, v]) => s + v, 0) || 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight">Analytics</h1>
        <p className="text-sm text-zinc-500 mt-1">Performance insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: fmt(analytics.totalRevenue), icon: DollarSign, color: "#22c55e" },
          { label: "Monthly Revenue", value: fmt(analytics.monthlyRevenue), icon: TrendingUp, color: "#f97316" },
          { label: "Avg Order Value", value: fmt(Math.round(analytics.averageOrderValue)), icon: BarChart3, color: "#3b82f6" },
          { label: "Most Ordered", value: analytics.mostOrderedProduct, icon: Package, color: "#a855f7" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-zinc-900/60 border border-white/[0.06] rounded-2xl p-5"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${item.color}15`, color: item.color }}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-lg font-extrabold truncate">{item.value}</p>
              <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{item.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Chart (bar chart) */}
      <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6">
        <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Revenue — Last 14 Days
        </h2>
        <div className="flex items-end gap-1.5 h-40">
          {revenueByDay.map(([day, rev]) => {
            const pct = (rev / maxRevenue) * 100;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full relative flex-1 flex items-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(pct, 2)}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full rounded-t-md bg-primary/30 group-hover:bg-primary/60 transition-colors"
                  />
                  {rev > 0 && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {(rev / 1000).toFixed(1)}k
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-zinc-600 font-mono">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Type Split */}
        <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-400" /> Order Type
          </h2>
          <div className="space-y-3">
            <ProgressBar
              label="Normal Orders"
              pct={analytics.normalOrderPercent}
              color="bg-blue-500"
            />
            <ProgressBar
              label="Custom Prints"
              pct={analytics.customOrderPercent}
              color="bg-orange-500"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-400" /> Payment Methods
          </h2>
          <div className="space-y-3">
            {paymentEntries.map(([method, count]) => (
              <ProgressBar
                key={method}
                label={method}
                pct={(count / totalPayments) * 100}
                color="bg-emerald-500"
              />
            ))}
            {paymentEntries.length === 0 && (
              <p className="text-sm text-zinc-600">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-zinc-400 truncate max-w-[180px]">{label}</span>
        <span className="text-zinc-500 font-mono">{pct.toFixed(0)}%</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}
