import { createServerFn } from "@tanstack/react-start";
import {
  getOrdersFromDb,
  saveOrderToDb,
  updateOrderStatusInDb,
  deleteOrderFromDb,
  clearOrdersFromDb,
  getAdminSettingsFromDb,
  saveAdminSettingsToDb,
  importLocalOrdersToDb,
} from "./dbService";
import type { StoredOrder, AdminSettings, OrderStatus } from "./ordersStore";

function getAdminPinHeader(): Record<string, string> {
  return { "X-Admin-PIN": "0000" };
}

export const getOrdersFn = createServerFn({ method: "GET" }).handler(async () => {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/orders", { headers: getAdminPinHeader() });
      if (res.ok) {
        const json = await res.json();
        if (json.ok && Array.isArray(json.orders)) return json.orders;
      }
    } catch {
      /* fallback below */
    }
  }

  try {
    return await getOrdersFromDb();
  } catch (err) {
    console.error("Error fetching orders from DB:", err);
    return [];
  }
});

export const saveOrderFn = createServerFn({ method: "POST" })
  .validator((order: StoredOrder) => order)
  .handler(async ({ data }) => {
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: data }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.ok && json.order) return json.order;
        }
      } catch {
        /* fallback below */
      }
    }

    try {
      return await saveOrderToDb(data);
    } catch (err) {
      console.error("Error saving order to DB:", err);
      return data;
    }
  });

export const updateStatusFn = createServerFn({ method: "POST" })
  .validator((data: { orderId: string; status: OrderStatus; note?: string }) => data)
  .handler(async ({ data }) => {
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/orders", {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAdminPinHeader() },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.ok && json.order) return json.order;
        }
      } catch {
        /* fallback below */
      }
    }

    try {
      return await updateOrderStatusInDb(data.orderId, data.status, data.note);
    } catch (err) {
      console.error("Error updating order status in DB:", err);
      return null;
    }
  });

export const deleteOrderFn = createServerFn({ method: "POST" })
  .validator((orderId: string) => orderId)
  .handler(async ({ data }) => {
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/orders", {
          method: "DELETE",
          headers: { "Content-Type": "application/json", ...getAdminPinHeader() },
          body: JSON.stringify({ orderId: data }),
        });
        if (res.ok) return { ok: true };
      } catch {
        /* fallback below */
      }
    }

    try {
      await deleteOrderFromDb(data);
      return { ok: true };
    } catch (err) {
      console.error("Error deleting order from DB:", err);
      return { ok: false };
    }
  });

export const clearOrdersFn = createServerFn({ method: "POST" }).handler(async () => {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", ...getAdminPinHeader() },
        body: JSON.stringify({ clearAll: true }),
      });
      if (res.ok) return { ok: true };
    } catch {
      /* fallback below */
    }
  }

  try {
    await clearOrdersFromDb();
    return { ok: true };
  } catch (err) {
    console.error("Error clearing orders from DB:", err);
    return { ok: false };
  }
});

export const getSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/orders?settings=1", { headers: getAdminPinHeader() });
      if (res.ok) {
        const json = await res.json();
        if (json.ok && json.settings) return json.settings;
      }
    } catch {
      /* fallback below */
    }
  }

  try {
    return await getAdminSettingsFromDb();
  } catch (err) {
    console.error("Error getting admin settings from DB:", err);
    return null;
  }
});

export const saveSettingsFn = createServerFn({ method: "POST" })
  .validator((settings: AdminSettings) => settings)
  .handler(async ({ data }) => {
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAdminPinHeader() },
          body: JSON.stringify({ action: "settings", settings: data }),
        });
        if (res.ok) return { ok: true };
      } catch {
        /* fallback below */
      }
    }

    try {
      await saveAdminSettingsToDb(data);
      return { ok: true };
    } catch (err) {
      console.error("Error saving admin settings to DB:", err);
      return { ok: false };
    }
  });

export const importLocalOrdersFn = createServerFn({ method: "POST" })
  .validator((orders: StoredOrder[]) => orders)
  .handler(async ({ data }) => {
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAdminPinHeader() },
          body: JSON.stringify({ action: "import", orders: data }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.ok) return { imported: json.imported || 0, skipped: json.skipped || 0 };
        }
      } catch {
        /* fallback below */
      }
    }

    try {
      return await importLocalOrdersToDb(data);
    } catch (err) {
      console.error("Error importing local orders to DB:", err);
      return { imported: 0, skipped: 0 };
    }
  });

