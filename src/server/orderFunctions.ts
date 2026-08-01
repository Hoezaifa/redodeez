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
import type { StoredOrder, AdminSettings, OrderStatus } from "@/lib/ordersStore";

export const getOrdersFn = createServerFn({ method: "GET" }).handler(async () => {
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
    try {
      await deleteOrderFromDb(data);
      return { ok: true };
    } catch (err) {
      console.error("Error deleting order from DB:", err);
      return { ok: false };
    }
  });

export const clearOrdersFn = createServerFn({ method: "POST" }).handler(async () => {
  try {
    await clearOrdersFromDb();
    return { ok: true };
  } catch (err) {
    console.error("Error clearing orders from DB:", err);
    return { ok: false };
  }
});

export const getSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
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
    try {
      return await importLocalOrdersToDb(data);
    } catch (err) {
      console.error("Error importing local orders to DB:", err);
      return { imported: 0, skipped: 0 };
    }
  });
