import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  isAdminAuthenticated,
  getOrders,
  calculateAnalytics,
  subscribe,
  type StoredOrder,
  type OrderAnalytics,
} from "@/lib/ordersStore";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar, type AdminView } from "@/components/admin/AdminSidebar";
import { DashboardView } from "@/components/admin/DashboardView";
import { OrdersView } from "@/components/admin/OrdersView";
import { AnalyticsView } from "@/components/admin/AnalyticsView";
import { TelegramView } from "@/components/admin/TelegramView";
import { SettingsView } from "@/components/admin/SettingsView";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Deez Prints" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(isAdminAuthenticated());
  const [view, setView] = useState<AdminView>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [analytics, setAnalytics] = useState<OrderAnalytics>(calculateAnalytics([]));

  const refresh = useCallback(() => {
    const o = getOrders();
    setOrders(o);
    setAnalytics(calculateAnalytics(o));
  }, []);

  // Load data + subscribe to changes
  useEffect(() => {
    if (!authed) return;
    refresh();
    const unsub = subscribe(refresh);
    return unsub;
  }, [authed, refresh]);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        active={view}
        onNavigate={setView}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <main className="flex-1 min-w-0 p-6 md:p-8 overflow-y-auto">
        {view === "dashboard" && (
          <DashboardView
            analytics={analytics}
            orders={orders}
            onNavigateOrders={() => setView("orders")}
          />
        )}
        {view === "orders" && <OrdersView orders={orders} onRefresh={refresh} />}
        {view === "analytics" && <AnalyticsView analytics={analytics} orders={orders} />}
        {view === "telegram" && <TelegramView />}
        {view === "settings" && <SettingsView />}
      </main>
    </div>
  );
}
