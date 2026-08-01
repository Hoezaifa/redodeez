import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  isAdminAuthenticated,
  getOrders,
  syncFromNeon,
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
  const [orders, setOrders] = useState<StoredOrder[]>(getOrders());
  const [analytics, setAnalytics] = useState<OrderAnalytics>(calculateAnalytics(orders));

  const refresh = useCallback(async () => {
    const o = await syncFromNeon();
    setOrders([...o]);
    setAnalytics(calculateAnalytics(o));
  }, []);

  // Load data + subscribe to changes + auto-poll every 5 seconds
  useEffect(() => {
    if (!authed) return;
    refresh();
    const unsub = subscribe(refresh);
    const interval = setInterval(refresh, 5000);
    return () => {
      unsub();
      clearInterval(interval);
    };
  }, [authed, refresh]);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <AdminSidebar
        active={view}
        onNavigate={setView}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
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
