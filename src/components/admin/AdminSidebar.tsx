import { LayoutDashboard, Package, BarChart3, Send, Settings, LogOut, Lock } from "lucide-react";
import { logoutAdmin } from "@/lib/ordersStore";

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
  return (
    <aside
      className={`h-screen sticky top-0 flex flex-col bg-zinc-950 border-r border-white/[0.06] transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[220px]"}`}
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
  );
}
