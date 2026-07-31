/**
 * Deez Prints — Order Management Repository
 *
 * Architecture:
 *   UI ➜ Repository (this file) ➜ StorageProvider (LocalStorage now, Supabase later)
 *
 * To migrate storage, swap the provider — zero UI changes required.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus = "Pending" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";

export interface StatusHistoryEntry {
  status: OrderStatus;
  date: string; // ISO string
  note?: string;
}

export interface OrderItem {
  id: string;
  title: string;
  size?: string;
  color?: string;
  qty: number;
  price: number;
  isCustom?: boolean;
  frontArtworkUrl?: string;
  backArtworkUrl?: string;
  placement?: string;
  blankItem?: string;
}

export interface StoredOrder {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  orderType: "normal" | "custom";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  statusHistory: StatusHistoryEntry[];
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderAnalytics {
  totalRevenue: number;
  todayRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  dispatchedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  customOrderPercent: number;
  normalOrderPercent: number;
  paymentMethodBreakdown: Record<string, number>;
  mostOrderedProduct: string;
}

// ─── Storage Provider Interface ───────────────────────────────────────────────

interface StorageProvider {
  load(): StoredOrder[];
  save(orders: StoredOrder[]): void;
}

// ─── LocalStorage Provider ────────────────────────────────────────────────────

const LS_KEY = "deez-orders-v2";

const localStorageProvider: StorageProvider = {
  load(): StoredOrder[] {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      // Migrate old v1 orders if they exist
      if (parsed.length === 0) {
        try {
          const v1 = localStorage.getItem("deez-orders-v1");
          if (v1) {
            const v1Orders = JSON.parse(v1) as Array<Record<string, unknown>>;
            const migrated = v1Orders.map(migrateV1Order);
            localStorage.setItem(LS_KEY, JSON.stringify(migrated));
            return migrated;
          }
        } catch { /* skip migration */ }
      }
      return parsed;
    } catch {
      return [];
    }
  },
  save(orders: StoredOrder[]) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(orders));
    } catch { /* storage full */ }
  },
};

// ─── V1 Migration Helper ──────────────────────────────────────────────────────

function migrateV1Order(raw: Record<string, unknown>): StoredOrder {
  const now = new Date().toISOString();
  const status = (raw.status as OrderStatus) || "Pending";
  return {
    orderId: (raw.orderId as string) || generateOrderId(),
    name: (raw.name as string) || "",
    email: (raw.email as string) || "",
    phone: (raw.phone as string) || "",
    city: (raw.city as string) || "",
    address: (raw.address as string) || "",
    notes: (raw.notes as string) || "",
    paymentMethod: (raw.paymentMethod as string) || "",
    orderType: (raw.orderType as "normal" | "custom") || "normal",
    items: (raw.items as OrderItem[]) || [],
    subtotal: (raw.subtotal as number) || 0,
    shipping: (raw.shipping as number) || 0,
    discount: 0,
    total: (raw.total as number) || 0,
    status,
    statusHistory: [{ status, date: (raw.createdAt as string) || now }],
    createdAt: (raw.createdAt as string) || now,
    updatedAt: now,
  };
}

// ─── Order ID Generator ──────────────────────────────────────────────────────

let _counter: number | null = null;

export function generateOrderId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  if (_counter === null) {
    // Init counter from existing orders for today
    const orders = provider.load();
    const todayPrefix = `DP-${dateStr}-`;
    const todayOrders = orders.filter((o) => o.orderId.startsWith(todayPrefix));
    _counter = todayOrders.length;
  }
  _counter++;
  return `DP-${dateStr}-${String(_counter).padStart(5, "0")}`;
}

// ─── Repository ───────────────────────────────────────────────────────────────

let provider: StorageProvider = localStorageProvider;

/** Swap storage provider (e.g. to Supabase) without changing any UI code */
export function setStorageProvider(p: StorageProvider) {
  provider = p;
}

// ── Listeners (cross-tab + in-app reactivity) ────────────────────────────────

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach((fn) => fn());
}

// Cross-tab sync via storage event
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === LS_KEY) notify();
  });
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

export function getOrders(): StoredOrder[] {
  return provider.load();
}

export function findOrder(orderId: string): StoredOrder | undefined {
  return provider.load().find((o) => o.orderId === orderId);
}

export function saveOrder(order: StoredOrder): void {
  const orders = provider.load();
  const idx = orders.findIndex((o) => o.orderId === order.orderId);
  if (idx >= 0) {
    orders[idx] = { ...order, updatedAt: new Date().toISOString() };
  } else {
    orders.unshift(order);
  }
  provider.save(orders);
  notify();
}

export function updateOrder(orderId: string, patch: Partial<StoredOrder>): void {
  const orders = provider.load();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx < 0) return;
  orders[idx] = { ...orders[idx], ...patch, updatedAt: new Date().toISOString() };
  provider.save(orders);
  notify();
}

export function updateStatus(orderId: string, status: OrderStatus, note?: string): void {
  const orders = provider.load();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx < 0) return;
  const order = orders[idx];
  const entry: StatusHistoryEntry = { status, date: new Date().toISOString(), note };
  orders[idx] = {
    ...order,
    status,
    statusHistory: [...order.statusHistory, entry],
    updatedAt: new Date().toISOString(),
  };
  provider.save(orders);
  notify();
}

export function deleteOrder(orderId: string): void {
  const orders = provider.load().filter((o) => o.orderId !== orderId);
  provider.save(orders);
  notify();
}

export function clearOrders(): void {
  provider.save([]);
  _counter = null;
  notify();
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export function calculateAnalytics(orders?: StoredOrder[]): OrderAnalytics {
  const all = orders ?? provider.load();
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const monthStr = now.toISOString().slice(0, 7);

  const nonCancelled = all.filter((o) => o.status !== "Cancelled");
  const totalRevenue = nonCancelled.reduce((s, o) => s + o.total, 0);
  const todayRevenue = nonCancelled
    .filter((o) => o.createdAt.startsWith(todayStr))
    .reduce((s, o) => s + o.total, 0);
  const monthlyRevenue = nonCancelled
    .filter((o) => o.createdAt.startsWith(monthStr))
    .reduce((s, o) => s + o.total, 0);

  const byStatus = (s: OrderStatus) => all.filter((o) => o.status === s).length;
  const customCount = all.filter((o) => o.orderType === "custom").length;

  // Payment method breakdown
  const paymentMethodBreakdown: Record<string, number> = {};
  for (const o of all) {
    const key = o.paymentMethod || "Unknown";
    paymentMethodBreakdown[key] = (paymentMethodBreakdown[key] || 0) + 1;
  }

  // Most ordered product
  const productCounts: Record<string, number> = {};
  for (const o of all) {
    for (const item of o.items) {
      productCounts[item.title] = (productCounts[item.title] || 0) + item.qty;
    }
  }
  const mostOrderedProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return {
    totalRevenue,
    todayRevenue,
    monthlyRevenue,
    totalOrders: all.length,
    pendingOrders: byStatus("Pending"),
    processingOrders: byStatus("Processing"),
    dispatchedOrders: byStatus("Dispatched"),
    deliveredOrders: byStatus("Delivered"),
    cancelledOrders: byStatus("Cancelled"),
    averageOrderValue: all.length ? totalRevenue / nonCancelled.length : 0,
    customOrderPercent: all.length ? (customCount / all.length) * 100 : 0,
    normalOrderPercent: all.length ? ((all.length - customCount) / all.length) * 100 : 0,
    paymentMethodBreakdown,
    mostOrderedProduct,
  };
}

// ── Export ─────────────────────────────────────────────────────────────────────

export function exportJSON(): string {
  return JSON.stringify(provider.load(), null, 2);
}

export function exportCSV(): string {
  const orders = provider.load();
  if (!orders.length) return "";

  const headers = [
    "Order ID", "Date", "Name", "Email", "Phone", "City", "Address",
    "Payment Method", "Order Type", "Status", "Items", "Subtotal",
    "Shipping", "Discount", "Total", "Tracking", "Notes",
  ];

  const escapeCSV = (v: string) => {
    if (v.includes(",") || v.includes('"') || v.includes("\n")) {
      return `"${v.replace(/"/g, '""')}"`;
    }
    return v;
  };

  const rows = orders.map((o) => [
    o.orderId,
    new Date(o.createdAt).toLocaleString("en-PK"),
    o.name,
    o.email,
    o.phone,
    o.city,
    o.address,
    o.paymentMethod,
    o.orderType,
    o.status,
    o.items.map((i) => `${i.title} x${i.qty}`).join("; "),
    String(o.subtotal),
    String(o.shipping),
    String(o.discount),
    String(o.total),
    o.trackingNumber || "",
    o.notes || "",
  ].map(escapeCSV).join(","));

  return [headers.join(","), ...rows].join("\n");
}

export function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Admin Settings ────────────────────────────────────────────────────────────

const SETTINGS_KEY = "deez-admin-settings-v1";

export interface AdminSettings {
  telegramBotToken: string;
  telegramChatId: string;
  telegramApiBase: string; // Default: https://api.telegram.org
  enableNotifications: boolean;
  sendArtwork: boolean;
  compressImages: boolean;
  notifyStatusChanges: boolean;
  storeName: string;
  whatsappNumber: string;
  currency: string;
  orderPrefix: string;
  passwordHash: string; // simple hash — not crypto-grade, just admin convenience
}

const DEFAULT_SETTINGS: AdminSettings = {
  telegramBotToken: "8851777111:AAHEWoRMMes229DTTljUDT5SiDFV-fU-iwM",
  telegramChatId: "6105402097",
  telegramApiBase: "https://api.telegram.org",
  enableNotifications: true,
  sendArtwork: true,
  compressImages: false,
  notifyStatusChanges: true,
  storeName: "Deez Prints",
  whatsappNumber: "923272487127",
  currency: "PKR",
  orderPrefix: "DP",
  passwordHash: simpleHash("deez123"),
};

export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return String(hash);
}

export function getAdminSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_SETTINGS };
}

export function saveAdminSettings(settings: Partial<AdminSettings>): void {
  const current = getAdminSettings();
  const merged = { ...current, ...settings };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
  } catch { /* ignore */ }
  notify();
}

// ── Session Auth ──────────────────────────────────────────────────────────────

const SESSION_KEY = "deez-admin-session";

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function authenticateAdmin(pin: string): boolean {
  const settings = getAdminSettings();
  if (simpleHash(pin) === settings.passwordHash) {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* */ }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* */ }
}
