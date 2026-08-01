import { useState } from "react";
import { LayoutDashboard, Package, BarChart3, Send, Settings, LogOut, Lock, Menu, X } from "lucide-react";
import { logoutAdmin } from "@/lib/ordersStore";
import { motion, AnimatePresence } from "motion/react";

export type AdminView = "dashboard" | "orders" | "analytics" | "telegram" | "settings";

const nav: { id: AdminView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: Package },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "telegram", label: "Telegram", icon: Send },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({
  active,
  onNavigate,
  collapsed,
  onToggle,
}: {
  active: AdminView;
  onNavigate: (v: AdminView) => void;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNav = (v: AdminView) => {
    onNavigate(v);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Header Top Bar (< md) */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-zinc-950 border-b border-white/[0.06] text-white">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white cursor-pointer"
            aria-label="Open Admin Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-extrabold uppercase tracking-wider text-primary">
            Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-400 capitalize">{active}</span>
          <button
            onClick={() => {
              logoutAdmin();
              window.location.reload();
            }}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="fixed top-0 left-0 h-full w-[260px] bg-zinc-950 border-r border-white/[0.06] p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Lock className="w-4 h-4" />
                    <span className="font-extrabold uppercase text-sm tracking-wider">
                      Deez Admin
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {nav.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMobileNav(item.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <Icon className="w-[18px] h-[18px] shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={() => {
                  logoutAdmin();
                  window.location.reload();
                }}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer border-t border-white/[0.06] pt-4"
              >
                <LogOut className="w-[18px] h-[18px] shrink-0" />
                <span>Logout</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Sidebar (>= md) */}
      <aside
        className={`hidden md:flex h-screen sticky top-0 flex-col bg-zinc-950 border-r border-white/[0.06] transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-[220px]"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] shrink-0">
          <button
            onClick={onToggle}
            className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>
          {!collapsed && (
            <span className="text-sm font-extrabold tracking-wider uppercase truncate">
              Admin
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 space-y-1 px-2">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={item.label}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-zinc-500 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-2 pb-4">
          <button
            onClick={() => {
              logoutAdmin();
              window.location.reload();
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
