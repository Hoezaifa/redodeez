import { prisma } from "../lib/db";
import type { StoredOrder, OrderStatus, AdminSettings, StatusHistoryEntry } from "../lib/ordersStore";

export async function getOrdersFromDb(): Promise<StoredOrder[]> {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        customer: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return orders.map((o) => ({
      orderId: o.orderId,
      createdAt: o.createdAt.toISOString(),
      updatedAt: o.updatedAt.toISOString(),
      name: o.customer?.name || "",
      email: o.customer?.email || "",
      phone: o.customer?.phone || "",
      city: o.customer?.city || "",
      address: o.customer?.address || "",
      notes: o.notes || undefined,
      paymentMethod: o.paymentMethod,
      orderType: o.orderType as "normal" | "custom",
      subtotal: o.subtotal,
      shipping: o.shipping,
      discount: o.discount,
      total: o.total,
      status: o.status as OrderStatus,
      statusHistory: (o.statusHistory as unknown as StatusHistoryEntry[]) || [],
      trackingNumber: o.trackingNumber || undefined,
      items: o.items.map((i) => ({
        id: i.id,
        title: i.title,
        size: i.size || undefined,
        color: i.color || undefined,
        qty: i.qty,
        price: i.price,
        isCustom: i.isCustom,
        frontArtworkUrl: i.frontArtworkUrl || undefined,
        backArtworkUrl: i.backArtworkUrl || undefined,
        placement: i.placement || undefined,
        blankItem: i.blankItem || undefined,
      })),
    }));
  } catch (err) {
    console.error("Error fetching orders from Neon DB:", err);
    return [];
  }
}

export async function saveOrderToDb(order: StoredOrder): Promise<StoredOrder> {
  if (!order || typeof order !== "object") {
    console.error("Invalid order object passed to saveOrderToDb:", order);
    throw new Error("Invalid order data");
  }

  const phone = order.phone || order.orderId || "00000000000";
  const name = order.name || "Guest Customer";
  const email = order.email || null;
  const city = order.city || "";
  const address = order.address || "";
  const orderId = order.orderId || `DP-${Date.now()}`;

  const customer = await prisma.customer.upsert({
    where: { phone },
    update: {
      name,
      email,
      city,
      address,
    },
    create: {
      name,
      phone,
      email,
      city,
      address,
    },
  });

  const statusHistory = order.statusHistory || [
    { status: order.status || "Pending", date: new Date().toISOString() },
  ];

  const dbOrder = await prisma.order.upsert({
    where: { orderId },
    update: {
      status: order.status || "Pending",
      statusHistory: JSON.parse(JSON.stringify(statusHistory)),
      notes: order.notes || null,
      trackingNumber: order.trackingNumber || null,
      paymentMethod: order.paymentMethod || "COD",
      subtotal: order.subtotal || 0,
      shipping: order.shipping || 0,
      discount: order.discount || 0,
      total: order.total || 0,
    },
    create: {
      orderId,
      customerId: customer.id,
      notes: order.notes || null,
      paymentMethod: order.paymentMethod || "COD",
      orderType: order.orderType || "normal",
      subtotal: order.subtotal || 0,
      shipping: order.shipping || 0,
      discount: order.discount || 0,
      total: order.total || 0,
      status: order.status || "Pending",
      statusHistory: JSON.parse(JSON.stringify(statusHistory)),
      trackingNumber: order.trackingNumber || null,
      createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
    },
  });

  // Re-create items if modified
  await prisma.orderItem.deleteMany({ where: { orderId: dbOrder.id } });
  await prisma.orderItem.createMany({
    data: order.items.map((i) => ({
      orderId: dbOrder.id,
      title: i.title,
      size: i.size || null,
      color: i.color || null,
      qty: i.qty,
      price: i.price,
      isCustom: i.isCustom ?? false,
      frontArtworkUrl: i.frontArtworkUrl || null,
      backArtworkUrl: i.backArtworkUrl || null,
      placement: i.placement || null,
      blankItem: i.blankItem || null,
    })),
  });

  await prisma.activityLog.create({
    data: {
      action: "ORDER_PERSISTED",
      orderId: order.orderId,
      details: { total: order.total, itemsCount: order.items.length },
    },
  });

  return order;
}

export async function updateOrderStatusInDb(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<StoredOrder | null> {
  const existing = await prisma.order.findUnique({
    where: { orderId },
    include: { items: true, customer: true },
  });

  if (!existing) return null;

  const history = (Array.isArray(existing.statusHistory) ? existing.statusHistory : []) as unknown as StatusHistoryEntry[];
  const newEntry: StatusHistoryEntry = {
    status,
    date: new Date().toISOString(),
    note,
  };
  const updatedHistory = [...history, newEntry];

  await prisma.order.update({
    where: { orderId },
    data: {
      status,
      statusHistory: JSON.parse(JSON.stringify(updatedHistory)),
    },
  });

  await prisma.activityLog.create({
    data: {
      action: "STATUS_UPDATED",
      orderId,
      details: { newStatus: status, note },
    },
  });

  const updated = await prisma.order.findUnique({
    where: { orderId },
    include: { items: true, customer: true },
  });

  if (!updated) return null;

  return {
    orderId: updated.orderId,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
    name: updated.customer?.name || "",
    email: updated.customer?.email || "",
    phone: updated.customer?.phone || "",
    city: updated.customer?.city || "",
    address: updated.customer?.address || "",
    notes: updated.notes || undefined,
    paymentMethod: updated.paymentMethod,
    orderType: updated.orderType as "normal" | "custom",
    subtotal: updated.subtotal,
    shipping: updated.shipping,
    discount: updated.discount,
    total: updated.total,
    status: updated.status as OrderStatus,
    statusHistory: (updated.statusHistory as unknown as StatusHistoryEntry[]) || [],
    trackingNumber: updated.trackingNumber || undefined,
    items: updated.items.map((i) => ({
      id: i.id,
      title: i.title,
      size: i.size || undefined,
      color: i.color || undefined,
      qty: i.qty,
      price: i.price,
      isCustom: i.isCustom,
      frontArtworkUrl: i.frontArtworkUrl || undefined,
      backArtworkUrl: i.backArtworkUrl || undefined,
      placement: i.placement || undefined,
      blankItem: i.blankItem || undefined,
    })),
  };
}

export async function deleteOrderFromDb(orderId: string): Promise<boolean> {
  try {
    await prisma.order.delete({ where: { orderId } });
    await prisma.activityLog.create({
      data: { action: "ORDER_DELETED", orderId },
    });
    return true;
  } catch (err) {
    console.error("Error deleting order from Neon DB:", err);
    return false;
  }
}

export async function clearOrdersFromDb(): Promise<boolean> {
  try {
    await prisma.order.deleteMany({});
    await prisma.activityLog.create({
      data: { action: "ALL_ORDERS_CLEARED" },
    });
    return true;
  } catch (err) {
    console.error("Error clearing orders from Neon DB:", err);
    return false;
  }
}

export async function getAdminSettingsFromDb(): Promise<AdminSettings> {
  try {
    const settings = await prisma.adminSettings.findUnique({
      where: { id: "singleton" },
    });

    if (!settings) {
      const created = await prisma.adminSettings.create({
        data: { id: "singleton" },
      });
      return {
        telegramBotToken: created.telegramBotToken,
        telegramChatId: created.telegramChatId,
        telegramApiBase: created.telegramApiBase,
        enableNotifications: created.enableNotifications,
        sendArtwork: created.sendArtwork,
        compressImages: created.compressImages,
        notifyStatusChanges: created.notifyStatusChanges,
        storeName: created.storeName,
        whatsappNumber: created.whatsappNumber,
        currency: created.currency,
        orderPrefix: created.orderPrefix,
        passwordHash: created.passwordHash,
      };
    }

    return {
      telegramBotToken: settings.telegramBotToken,
      telegramChatId: settings.telegramChatId,
      telegramApiBase: settings.telegramApiBase,
      enableNotifications: settings.enableNotifications,
      sendArtwork: settings.sendArtwork,
      compressImages: settings.compressImages,
      notifyStatusChanges: settings.notifyStatusChanges,
      storeName: settings.storeName,
      whatsappNumber: settings.whatsappNumber,
      currency: settings.currency,
      orderPrefix: settings.orderPrefix,
      passwordHash: settings.passwordHash,
    };
  } catch (err) {
    console.error("Error fetching settings from Neon DB:", err);
    return {
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
  }
}

export async function saveAdminSettingsToDb(settings: Partial<AdminSettings>): Promise<AdminSettings> {
  const updated = await prisma.adminSettings.upsert({
    where: { id: "singleton" },
    update: settings,
    create: { id: "singleton", ...settings },
  });

  return {
    telegramBotToken: updated.telegramBotToken,
    telegramChatId: updated.telegramChatId,
    telegramApiBase: updated.telegramApiBase,
    enableNotifications: updated.enableNotifications,
    sendArtwork: updated.sendArtwork,
    compressImages: updated.compressImages,
    notifyStatusChanges: updated.notifyStatusChanges,
    storeName: updated.storeName,
    whatsappNumber: updated.whatsappNumber,
    currency: updated.currency,
    orderPrefix: updated.orderPrefix,
    passwordHash: updated.passwordHash,
  };
}

export async function importLocalOrdersToDb(orders: StoredOrder[]): Promise<{ imported: number; skipped: number }> {
  let imported = 0;
  let skipped = 0;

  for (const order of orders) {
    const existing = await prisma.order.findUnique({
      where: { orderId: order.orderId },
    });
    if (existing) {
      skipped++;
      continue;
    }
    await saveOrderToDb(order);
    imported++;
  }

  return { imported, skipped };
}

export async function generateNextOrderIdFromDb(): Promise<string> {
  const settings = await getAdminSettingsFromDb();
  const prefix = settings.orderPrefix || "DP";
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const todayPrefix = `${prefix}-${dateStr}-`;

  const countToday = await prisma.order.count({
    where: {
      orderId: { startsWith: todayPrefix },
    },
  });

  const nextNum = countToday + 1;
  return `${todayPrefix}${String(nextNum).padStart(5, "0")}`;
}
