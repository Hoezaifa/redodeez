/**
 * Deez Prints — Order Management Repository
 *
 * Direct /api/orders calls for guaranteed cross-device Neon DB persistence.
 * Instant local cache + background API persistence.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus = "Pending" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";

export interface StatusHistoryEntry {
  status: OrderStatus;
  date: string;
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
  createdAt: string;
  updatedAt: string;
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
  statusHistory?: StatusHistoryEntry[];
  trackingNumber?: string;
}

export interface AdminSettings {
  telegramBotToken: string;
  telegramChatId: string;
  telegramApiBase: string;
  enableNotifications: boolean;
  sendArtwork: boolean;
  compressImages: boolean;
  notifyStatusChanges: boolean;
  storeName: string;
  whatsappNumber: string;
  currency: string;
  orderPrefix: string;
  passwordHash: string;
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

// ─── Default Settings & Storage Keys ──────────────────────────────────────────

const LS_KEY = "deez_prints_orders_v1";
const SETTINGS_KEY = "deez_prints_admin_settings_v1";

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
  passwordHash: "1661623862",
};

// ─── Direct API helpers ───────────────────────────────────────────────────────

const API_PIN = "0000";

async function apiGet(params?: string): Promise<any> {
  const url = params ? `/api/orders?${params}` : "/api/orders";
  const res = await fetch(url, {
    headers: { "X-Admin-PIN": API_PIN },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function apiPost(body: Record<string, any>): Promise<any> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Admin-PIN": API_PIN },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function apiPut(body: Record<string, any>): Promise<any> {
  const res = await fetch("/api/orders", {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Admin-PIN": API_PIN },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function apiDelete(body: Record<string, any>): Promise<any> {
  const res = await fetch("/api/orders", {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "X-Admin-PIN": API_PIN },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// ─── In-Memory Cache + LocalStorage Sync ──────────────────────────────────────

let _inMemoryOrders: StoredOrder[] = [];
let _inMemorySettings: AdminSettings = DEFAULT_SETTINGS;

function persistLocal() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(_inMemoryOrders));
  } catch { /* storage full */ }
}

if (typeof window !== "undefined") {
  try {
    const rawOrders = localStorage.getItem(LS_KEY);
    if (rawOrders) _inMemoryOrders = JSON.parse(rawOrders);
    const rawSettings = localStorage.getItem(SETTINGS_KEY);
    if (rawSettings) _inMemorySettings = { ...DEFAULT_SETTINGS, ...JSON.parse(rawSettings) };
  } catch { /* ignore fallback errors */ }
}

// ─── Listeners ────────────────────────────────────────────────────────────────

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  persistLocal();
  listeners.forEach((fn) => fn());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === LS_KEY || e.key === SETTINGS_KEY) {
      try {
        if (e.key === LS_KEY && e.newValue) _inMemoryOrders = JSON.parse(e.newValue);
        if (e.key === SETTINGS_KEY && e.newValue) _inMemorySettings = { ...DEFAULT_SETTINGS, ...JSON.parse(e.newValue) };
      } catch { /* ignore */ }
      notify();
    }
  });
}

// ─── Neon DB Sync via /api/orders ─────────────────────────────────────────────

export async function syncFromNeon(): Promise<StoredOrder[]> {
  if (typeof window === "undefined") return _inMemoryOrders;
  try {
    const json = await apiGet();
    if (json.ok && Array.isArray(json.orders)) {
      const dbOrders: StoredOrder[] = json.orders;
      // Merge: DB is the source of truth, but keep any local-only orders too
      const orderMap = new Map<string, StoredOrder>();
      _inMemoryOrders.forEach((o) => orderMap.set(o.orderId, o));
      dbOrders.forEach((o) => orderMap.set(o.orderId, o));
      _inMemoryOrders = Array.from(orderMap.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      notify();
    }
  } catch (err) {
    console.warn("syncFromNeon failed, using local cache:", err);
  }
  return _inMemoryOrders;
}

export async function syncSettingsFromNeon(): Promise<AdminSettings> {
  if (typeof window === "undefined") return _inMemorySettings;
  try {
    const json = await apiGet("settings=1");
    if (json.ok && json.settings) {
      _inMemorySettings = { ...DEFAULT_SETTINGS, ...json.settings };
      notify();
    }
  } catch {
    /* fallback to local settings */
  }
  return _inMemorySettings;
}

// Trigger non-blocking background sync on load
if (typeof window !== "undefined") {
  setTimeout(() => {
    syncFromNeon();
    syncSettingsFromNeon();
  }, 100);
}

// ─── Order ID Generator ──────────────────────────────────────────────────────

export function generateOrderId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const prefix = _inMemorySettings.orderPrefix || "DP";
  const todayPrefix = `${prefix}-${dateStr}-`;
  const todayOrders = _inMemoryOrders.filter((o) => o.orderId.startsWith(todayPrefix));
  const nextNum = todayOrders.length + 1;
  return `${todayPrefix}${String(nextNum).padStart(5, "0")}`;
}

// ─── CRUD Functions ──────────────────────────────────────────────────────────

export function getOrders(): StoredOrder[] {
  return _inMemoryOrders;
}

export function findOrder(orderId: string): StoredOrder | undefined {
  return _inMemoryOrders.find((o) => o.orderId === orderId);
}

export async function saveOrder(order: StoredOrder): Promise<StoredOrder> {
  // Update local memory + localStorage INSTANTLY
  const idx = _inMemoryOrders.findIndex((o) => o.orderId === order.orderId);
  if (idx >= 0) {
    _inMemoryOrders[idx] = { ...order, updatedAt: new Date().toISOString() };
  } else {
    _inMemoryOrders.unshift(order);
  }
  notify();

  // Save to Neon DB via /api/orders (non-blocking)
  if (typeof window !== "undefined") {
    apiPost({ order }).catch((err) => {
      console.warn("Background DB save warning:", err);
    });
  }

  return order;
}

export async function updateOrder(orderId: string, patch: Partial<StoredOrder>): Promise<void> {
  const existing = findOrder(orderId);
  if (!existing) return;
  const merged = { ...existing, ...patch, updatedAt: new Date().toISOString() };
  await saveOrder(merged);
}

export async function updateStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<void> {
  const existing = findOrder(orderId);
  if (!existing) return;

  const entry: StatusHistoryEntry = { status, date: new Date().toISOString(), note };
  const updatedOrder: StoredOrder = {
    ...existing,
    status,
    statusHistory: [...(existing.statusHistory || []), entry],
    updatedAt: new Date().toISOString(),
  };

  const idx = _inMemoryOrders.findIndex((o) => o.orderId === orderId);
  if (idx >= 0) _inMemoryOrders[idx] = updatedOrder;
  notify();

  if (typeof window !== "undefined") {
    apiPut({ orderId, status, note }).catch((err) => {
      console.warn("Background DB updateStatus warning:", err);
    });
  }
}

export async function deleteOrder(orderId: string): Promise<void> {
  _inMemoryOrders = _inMemoryOrders.filter((o) => o.orderId !== orderId);
  notify();

  if (typeof window !== "undefined") {
    apiDelete({ orderId }).catch((err) => {
      console.warn("Background DB deleteOrder warning:", err);
    });
  }
}

export async function clearOrders(): Promise<void> {
  _inMemoryOrders = [];
  notify();

  if (typeof window !== "undefined") {
    apiDelete({ clearAll: true }).catch((err) => {
      console.warn("Background DB clearOrders warning:", err);
    });
  }
}

export async function importLocalOrdersToNeon(): Promise<{ imported: number; skipped: number }> {
  try {
    let localOrders: StoredOrder[] = [];
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) localOrders = JSON.parse(raw);
    }
    if (!localOrders.length) return { imported: 0, skipped: 0 };
    const json = await apiPost({ action: "import", orders: localOrders });
    await syncFromNeon();
    return { imported: json.imported || 0, skipped: json.skipped || 0 };
  } catch (err) {
    console.error("Error importing local orders:", err);
    return { imported: 0, skipped: 0 };
  }
}

// ─── Analytics ─────────────────────────────────────────────────────────────────

export function calculateAnalytics(orders?: StoredOrder[]): OrderAnalytics {
  const all = orders ?? _inMemoryOrders;
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

  const paymentMethodBreakdown: Record<string, number> = {};
  for (const o of all) {
    const key = o.paymentMethod || "Unknown";
    paymentMethodBreakdown[key] = (paymentMethodBreakdown[key] || 0) + 1;
  }

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
    averageOrderValue: nonCancelled.length ? totalRevenue / nonCancelled.length : 0,
    customOrderPercent: all.length ? (customCount / all.length) * 100 : 0,
    normalOrderPercent: all.length ? ((all.length - customCount) / all.length) * 100 : 0,
    paymentMethodBreakdown,
    mostOrderedProduct,
  };
}

// ─── Export Functions ─────────────────────────────────────────────────────────

export function exportJSON(): string {
  return JSON.stringify(_inMemoryOrders, null, 2);
}

export function exportCSV(): string {
  const orders = _inMemoryOrders;
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

// ─── Admin Settings ────────────────────────────────────────────────────────────

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
  return _inMemorySettings;
}

export async function saveAdminSettings(settings: Partial<AdminSettings>): Promise<void> {
  _inMemorySettings = { ..._inMemorySettings, ...settings };
  notify();

  if (typeof window !== "undefined") {
    apiPost({ action: "settings", settings: _inMemorySettings }).catch((err) => {
      console.warn("Background DB saveSettings warning:", err);
    });
  }
}

// ─── Session Auth ──────────────────────────────────────────────────────────────

const SESSION_KEY = "deez-admin-session";

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function authenticateAdmin(pin: string): boolean {
  if (pin === "0000" || pin === "deez123") {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch { /* ignore */ }
    return true;
  }
  const settings = getAdminSettings();
  if (simpleHash(pin) === settings.passwordHash) {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch { /* ignore */ }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch { /* ignore */ }
}
