/**
 * Deez Prints — Vercel Serverless Email Notification
 *
 * Self-contained email sender for the api/ directory.
 * Uses Nodemailer + Gmail SMTP. Never throws — all errors caught and logged.
 */

import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  title: string;
  size?: string;
  color?: string;
  qty: number;
  price: number;
  isCustom?: boolean;
  placement?: string;
  blankItem?: string;
}

interface OrderData {
  orderId: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  orderType?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  createdAt?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function esc(text: string | undefined | null): string {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatCurrency(amount: number): string {
  return `Rs ${amount.toLocaleString()}`;
}

function formatDate(iso?: string): { date: string; time: string } {
  const d = iso ? new Date(iso) : new Date();
  const date = d.toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-PK", { hour: "numeric", minute: "2-digit", hour12: true });
  return { date, time };
}

// ─── HTML Template ────────────────────────────────────────────────────────────

function buildHtml(order: OrderData): string {
  const isCustom = order.orderType === "custom" || order.items.some((i) => i.isCustom);
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const { date, time } = formatDate(order.createdAt);
  const HR = `<tr><td style="padding:12px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>`;

  const itemRows = order.items
    .map((item) => {
      const title = item.isCustom ? `🎨 ${esc(item.blankItem || item.title)}` : esc(item.title);
      const meta = [
        item.size ? `Size: ${esc(item.size)}` : "",
        item.color ? `Color: ${esc(item.color)}` : "",
        item.isCustom && item.placement ? `Placement: ${esc(item.placement)}` : "",
      ].filter(Boolean).join(" · ");

      return `<tr>
        <td style="padding:4px 0;font-size:14px;color:#18181b;">
          <strong>${title}</strong> ×${item.qty}
          ${meta ? `<br/><span style="font-size:12px;color:#71717a;">${meta}</span>` : ""}
        </td>
        <td style="padding:4px 0;font-size:14px;color:#18181b;text-align:right;white-space:nowrap;">
          ${formatCurrency(item.price * item.qty)}
        </td>
      </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;">
<tr><td style="background:#18181b;padding:24px 28px;">
  <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:2px;">DEEZ PRINTS</h1>
  <p style="margin:6px 0 0;font-size:13px;font-weight:700;color:#f97316;letter-spacing:1px;">${label}</p>
</td></tr>
<tr><td style="padding:20px 28px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="font-size:13px;color:#71717a;">Order</td><td style="text-align:right;font-size:13px;color:#71717a;">${date} · ${time}</td></tr>
    <tr><td colspan="2" style="font-size:18px;font-weight:800;color:#18181b;padding-top:2px;">#${esc(order.orderId)}</td></tr>
  </table>
</td></tr>
${HR}
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer</p>
  <p style="margin:0;font-size:15px;font-weight:700;color:#18181b;">${esc(order.name)}</p>
  <p style="margin:2px 0 0;font-size:13px;color:#52525b;">📱 ${esc(order.phone)}</p>
  ${order.email ? `<p style="margin:2px 0 0;font-size:13px;color:#52525b;">✉️ ${esc(order.email)}</p>` : ""}
</td></tr>
${HR}
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Products</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${itemRows}</table>
</td></tr>
${HR}
<tr><td style="padding:0 28px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Subtotal</td><td style="font-size:13px;color:#18181b;text-align:right;padding:3px 0;">${formatCurrency(order.subtotal)}</td></tr>
    <tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Shipping</td><td style="font-size:13px;color:#18181b;text-align:right;padding:3px 0;">${order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}</td></tr>
    ${order.discount ? `<tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Discount</td><td style="font-size:13px;color:#dc2626;text-align:right;padding:3px 0;">-${formatCurrency(order.discount)}</td></tr>` : ""}
    <tr><td style="font-size:16px;font-weight:800;color:#18181b;padding:8px 0 0;">Total</td><td style="font-size:16px;font-weight:800;color:#18181b;text-align:right;padding:8px 0 0;">${formatCurrency(order.total)}</td></tr>
  </table>
</td></tr>
${HR}
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Payment</p>
  <p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${esc(order.paymentMethod)}</p>
</td></tr>
${HR}
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Delivery Address</p>
  <p style="margin:0;font-size:14px;color:#18181b;">${esc(order.city)}</p>
  <p style="margin:2px 0 0;font-size:13px;color:#52525b;">${esc(order.address)}</p>
</td></tr>
${order.notes ? `${HR}<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer Notes</p>
  <p style="margin:0;font-size:14px;color:#52525b;font-style:italic;">${esc(order.notes)}</p>
</td></tr>` : ""}
${HR}
<tr><td style="padding:0 28px 24px;" align="center">
  <a href="https://deezprints.store/admin" style="display:inline-block;background:#18181b;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:8px;letter-spacing:0.5px;">Open Admin Dashboard</a>
</td></tr>
<tr><td style="background:#fafafa;padding:16px 28px;text-align:center;">
  <p style="margin:0;font-size:11px;color:#a1a1aa;">Deez Prints — Streetwear. No limits.</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Plain Text Template ──────────────────────────────────────────────────────

function buildPlainText(order: OrderData): string {
  const isCustom = order.orderType === "custom" || order.items.some((i) => i.isCustom);
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const { date, time } = formatDate(order.createdAt);
  const SEP = "────────────────────────────────";

  const itemLines = order.items
    .map((item) => {
      const title = item.isCustom ? `🎨 ${item.blankItem || item.title}` : item.title;
      return `  ${title} ×${item.qty} — ${formatCurrency(item.price * item.qty)}`;
    })
    .join("\n");

  const parts = [
    SEP, "DEEZ PRINTS", label, SEP, "",
    `Order: #${order.orderId}`,
    `Date:  ${date} · ${time}`, "",
    SEP, "Customer", SEP, "",
    order.name, `Phone: ${order.phone}`,
    order.email ? `Email: ${order.email}` : "", "",
    SEP, "Products", SEP, "", itemLines, "",
    SEP,
    `Subtotal:  ${formatCurrency(order.subtotal)}`,
    `Shipping:  ${order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}`,
    order.discount ? `Discount:  -${formatCurrency(order.discount)}` : "",
    `Total:     ${formatCurrency(order.total)}`,
    SEP, "",
    `Payment: ${order.paymentMethod}`, "",
    SEP, "Delivery Address", SEP, "",
    order.city, order.address,
  ];

  if (order.notes) parts.push("", SEP, "Customer Notes", SEP, "", order.notes);
  parts.push("", SEP, "", "Admin: https://deezprints.store/admin", "", "Deez Prints — Streetwear. No limits.");

  return parts.filter((l) => l !== undefined).join("\n");
}

// ─── SMTP ─────────────────────────────────────────────────────────────────────

let _transporter: nodemailer.Transporter | null = null;

function createTransporter(): nodemailer.Transporter {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  return nodemailer.createTransport({
    host, port, secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
}

function getTransporter(): nodemailer.Transporter {
  if (!_transporter) _transporter = createTransporter();
  return _transporter;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function sendOrderEmailNotification(order: OrderData): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!user || !pass || !adminEmail) {
    console.log(`[Email] Skipped — SMTP not configured (order ${order.orderId})`);
    return false;
  }

  const isCustom = order.orderType === "custom" || order.items.some((i) => i.isCustom);
  const prefix = isCustom ? "🎨" : "🛒";
  const subject = `${prefix} New Order #${order.orderId} — Rs ${order.total.toLocaleString()}`;
  const timestamp = new Date().toISOString();

  const mailOptions = {
    from: `"Deez Prints" <${user}>`,
    to: adminEmail,
    subject,
    text: buildPlainText(order),
    html: buildHtml(order),
  };

  // Attempt 1
  try {
    await getTransporter().sendMail(mailOptions);
    console.log(`[Email] ✅ Sent — order ${order.orderId} at ${timestamp}`);
    return true;
  } catch (err: any) {
    console.warn(`[Email] ⚠️ Attempt 1 failed — order ${order.orderId}: ${err.message || err}`);
  }

  // Retry after 3s
  await new Promise((r) => setTimeout(r, 3000));

  // Attempt 2 (fresh transporter)
  try {
    _transporter = null;
    await getTransporter().sendMail(mailOptions);
    console.log(`[Email] ✅ Sent (retry) — order ${order.orderId} at ${timestamp}`);
    return true;
  } catch (err: any) {
    console.error(`[Email] ❌ Failed — order ${order.orderId}: ${err.message || err}`);
    return false;
  }
}
