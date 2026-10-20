/**
 * Deez Prints — Vercel Serverless API for Orders
 *
 * Uses @neondatabase/serverless directly (no Prisma dependency)
 * so this works reliably in Vercel serverless functions.
 */
import type { IncomingMessage, ServerResponse } from "http";
import { neon } from "@neondatabase/serverless";
import nodemailer from "nodemailer";

// ─── Email Notification (inlined — Vercel bundles each api/ file as isolated lambda) ──

function escHtml(text: string | undefined | null): string {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fmtCurrency(amount: number): string {
  return `Rs ${amount.toLocaleString()}`;
}

function buildEmailHtml(order: any): string {
  const o = order || {};
  const isCustom = o.orderType === "custom" || (o.items || []).some((i: any) => i && i.isCustom);
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const d = o.createdAt ? new Date(o.createdAt) : new Date();
  const date = d.toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-PK", { hour: "numeric", minute: "2-digit", hour12: true });
  const HR = `<tr><td style="padding:12px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>`;

  const itemRows = (o.items || []).map((item: any) => {
    if (!item) return "";
    const title = item.isCustom ? `🎨 ${escHtml(item.blankItem || item.title)}` : escHtml(item.title);
    const meta = [
      item.size ? `Size: ${escHtml(item.size)}` : "",
      item.color ? `Color: ${escHtml(item.color)}` : "",
      item.isCustom && item.placement ? `Placement: ${escHtml(item.placement)}` : "",
    ].filter(Boolean).join(" · ");

    const artworkLinks: string[] = [];
    if (item.isCustom && item.frontArtworkUrl) {
      if (item.frontArtworkUrl.startsWith("http")) {
        artworkLinks.push(`<a href="${escHtml(item.frontArtworkUrl)}" style="color:#f97316;text-decoration:underline;font-weight:700;font-size:12px;">📎 Front Artwork</a>`);
      } else {
        artworkLinks.push(`<a href="https://deezprints.com/cocnballs" style="color:#f97316;text-decoration:underline;font-weight:700;font-size:12px;">📎 Front Artwork — View in Admin</a>`);
      }
    }
    if (item.isCustom && item.backArtworkUrl) {
      if (item.backArtworkUrl.startsWith("http")) {
        artworkLinks.push(`<a href="${escHtml(item.backArtworkUrl)}" style="color:#f97316;text-decoration:underline;font-weight:700;font-size:12px;">📎 Back Artwork</a>`);
      } else {
        artworkLinks.push(`<a href="https://deezprints.com/cocnballs" style="color:#f97316;text-decoration:underline;font-weight:700;font-size:12px;">📎 Back Artwork — View in Admin</a>`);
      }
    }

    return `<tr><td style="padding:4px 0;font-size:14px;color:#18181b;"><strong>${title}</strong> ×${item.qty || 1}${meta ? `<br/><span style="font-size:12px;color:#71717a;">${meta}</span>` : ""}${artworkLinks.length ? `<br/><span style="margin-top:2px;display:inline-block;">${artworkLinks.join(" &nbsp; ")}</span>` : ""}</td><td style="padding:4px 0;font-size:14px;color:#18181b;text-align:right;white-space:nowrap;">${fmtCurrency((item.price || 0) * (item.qty || 1))}</td></tr>`;
  }).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;">
<tr><td style="background:#18181b;padding:24px 28px;"><h1 style="margin:0;font-size:20px;font-weight:800;color:#fff;letter-spacing:2px;">DEEZ PRINTS</h1><p style="margin:6px 0 0;font-size:13px;font-weight:700;color:#f97316;letter-spacing:1px;">${label}</p></td></tr>
<tr><td style="padding:20px 28px 0;"><table width="100%"><tr><td style="font-size:13px;color:#71717a;">Order</td><td style="text-align:right;font-size:13px;color:#71717a;">${date} · ${time}</td></tr><tr><td colspan="2" style="font-size:18px;font-weight:800;color:#18181b;padding-top:2px;">#${escHtml(o.orderId || "N/A")}</td></tr></table></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer</p><p style="margin:0;font-size:15px;font-weight:700;color:#18181b;">${escHtml(o.name || "N/A")}</p><p style="margin:2px 0 0;font-size:13px;color:#52525b;">📱 ${escHtml(o.phone || "N/A")}</p>${o?.email ? `<p style="margin:2px 0 0;font-size:13px;color:#52525b;">✉️ ${escHtml(o.email)}</p>` : ""}</td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Products</p><table width="100%">${itemRows}</table></td></tr>
${HR}
<tr><td style="padding:0 28px;"><table width="100%"><tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Subtotal</td><td style="font-size:13px;color:#18181b;text-align:right;">${fmtCurrency(o.subtotal || 0)}</td></tr><tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Shipping</td><td style="font-size:13px;color:#18181b;text-align:right;">${(o.shipping || 0) === 0 ? "FREE" : fmtCurrency(o.shipping)}</td></tr>${o.discount ? `<tr><td style="font-size:13px;color:#71717a;">Discount</td><td style="font-size:13px;color:#dc2626;text-align:right;">-${fmtCurrency(o.discount)}</td></tr>` : ""}<tr><td style="font-size:16px;font-weight:800;color:#18181b;padding:8px 0 0;">Total</td><td style="font-size:16px;font-weight:800;color:#18181b;text-align:right;padding:8px 0 0;">${fmtCurrency(o.total || 0)}</td></tr></table></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Payment</p><p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${escHtml(o.paymentMethod || "N/A")}</p></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Delivery Address</p><p style="margin:0;font-size:14px;color:#18181b;">${escHtml(o.city || "N/A")}</p><p style="margin:2px 0 0;font-size:13px;color:#52525b;">${escHtml(o.address || "N/A")}</p></td></tr>
${o.notes ? `${HR}<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Notes</p><p style="margin:0;font-size:14px;color:#52525b;font-style:italic;">${escHtml(o.notes)}</p></td></tr>` : ""}
${HR}
<tr><td style="padding:0 28px 24px;" align="center"><a href="https://deezprints.com/admin" style="display:inline-block;background:#18181b;color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:8px;">Open Admin Dashboard</a></td></tr>
<tr><td style="background:#fafafa;padding:16px 28px;text-align:center;"><p style="margin:0;font-size:11px;color:#a1a1aa;">Deez Prints — Streetwear. No limits.</p></td></tr>
</table></td></tr></table></body></html>`;
}

function buildEmailPlainText(order: any): string {
  const o = order || {};
  const SEP = "────────────────────────────────";
  const items = (o.items || []).map((i: any) => {
    if (!i) return "";
    const title = i.isCustom ? `🎨 ${i.blankItem || i.title}` : (i.title || "Item");
    const meta = [
      i.size ? `Size: ${i.size}` : "",
      i.color ? `Color: ${i.color}` : "",
      i.isCustom && i.placement ? `Placement: ${i.placement}` : "",
    ].filter(Boolean).join(" · ");
    const artLinks: string[] = [];
    if (i.isCustom && i.frontArtworkUrl) {
      artLinks.push(i.frontArtworkUrl.startsWith("http") ? `    Front Artwork: ${i.frontArtworkUrl}` : `    Front Artwork: [Uploaded — view in Admin Dashboard]`);
    }
    if (i.isCustom && i.backArtworkUrl) {
      artLinks.push(i.backArtworkUrl.startsWith("http") ? `    Back Artwork: ${i.backArtworkUrl}` : `    Back Artwork: [Uploaded — view in Admin Dashboard]`);
    }
    return `  ${title} ×${i.qty || 1} — ${fmtCurrency((i.price || 0) * (i.qty || 1))}${meta ? `\n    ${meta}` : ""}${artLinks.length ? `\n${artLinks.join("\n")}` : ""}`;
  }).filter(Boolean).join("\n");

  return [SEP, "DEEZ PRINTS", `Order #${o.orderId || "N/A"}`, SEP, "",
    `Customer: ${o.name || "N/A"}`, `Phone: ${o.phone || "N/A"}`, o?.email ? `Email: ${o.email}` : "", "",
    SEP, "Products", SEP, "", items, "",
    SEP, `Subtotal: ${fmtCurrency(o.subtotal || 0)}`, `Shipping: ${(o.shipping || 0) === 0 ? "FREE" : fmtCurrency(o.shipping)}`,
    `Total: ${fmtCurrency(o.total || 0)}`, SEP, "",
    `Payment: ${o.paymentMethod || "N/A"}`, `City: ${o.city || "N/A"}`, `Address: ${o.address || "N/A"}`,
    o.notes ? `Notes: ${o.notes}` : "", "",
    "Admin: https://deezprints.com/admin"].filter(l => l !== undefined).join("\n");
}

function buildCustomerEmailHtml(order: any): string {
  const o = order || {};
  const isCustom = o.orderType === "custom" || (o.items || []).some((i: any) => i && i.isCustom);
  const d = o.createdAt ? new Date(o.createdAt) : new Date();
  const date = d.toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-PK", { hour: "numeric", minute: "2-digit", hour12: true });
  const HR = `<tr><td style="padding:12px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>`;

  const itemRows = (o.items || []).map((item: any) => {
    if (!item) return "";
    const title = item.isCustom ? `🎨 ${escHtml(item.blankItem || item.title)}` : escHtml(item.title);
    const meta = [
      item.size ? `Size: ${escHtml(item.size)}` : "",
      item.color ? `Color: ${escHtml(item.color)}` : "",
      item.isCustom && item.placement ? `Placement: ${escHtml(item.placement)}` : "",
    ].filter(Boolean).join(" · ");

    return `<tr><td style="padding:6px 0;font-size:14px;color:#18181b;"><strong>${title}</strong> ×${item.qty || 1}${meta ? `<br/><span style="font-size:12px;color:#71717a;">${meta}</span>` : ""}</td><td style="padding:6px 0;font-size:14px;color:#18181b;text-align:right;white-space:nowrap;font-weight:600;">${fmtCurrency((item.price || 0) * (item.qty || 1))}</td></tr>`;
  }).join("");

  const isCOD = (o.paymentMethod || "").toLowerCase().includes("cash");

  const paymentInstructions = isCOD
    ? `<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:14px;margin-top:12px;color:#9a3412;font-size:13px;line-height:1.5;"><strong>Cash on Delivery (Karachi):</strong> Please keep exact cash of <strong>${fmtCurrency(o.total || 0)}</strong> ready upon delivery. Our rider will contact you prior to arrival.</div>`
    : `<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:14px;margin-top:12px;color:#9a3412;font-size:13px;line-height:1.5;"><strong>Payment Confirmation:</strong> If you haven't sent your payment receipt yet, please share it on WhatsApp at <strong>+92 327 2487127</strong> with your Order ID (<strong>#${escHtml(o.orderId || "N/A")}</strong>) so we can dispatch your parcel immediately.</div>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
<tr><td style="background:#18181b;padding:24px 28px;"><h1 style="margin:0;font-size:22px;font-weight:900;color:#fff;letter-spacing:2px;">DEEZ PRINTS</h1><p style="margin:6px 0 0;font-size:13px;font-weight:700;color:#f97316;letter-spacing:1px;">ORDER CONFIRMATION</p></td></tr>
<tr><td style="padding:24px 28px 0;"><h2 style="margin:0 0 8px;font-size:18px;color:#18181b;">Thank you for your order, ${escHtml(o.name || "Customer")}!</h2><p style="margin:0;font-size:14px;color:#52525b;line-height:1.5;">We’ve received your order and are getting it ready. You’ll receive updates as soon as your items are produced and dispatched.</p></td></tr>
<tr><td style="padding:16px 28px 0;"><table width="100%"><tr><td style="font-size:13px;color:#71717a;">Order Number</td><td style="text-align:right;font-size:13px;color:#71717a;">${date} · ${time}</td></tr><tr><td colspan="2" style="font-size:18px;font-weight:800;color:#f97316;padding-top:2px;">#${escHtml(o.orderId || "N/A")}</td></tr></table></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Your Order</p><table width="100%">${itemRows}</table></td></tr>
${HR}
<tr><td style="padding:0 28px;"><table width="100%"><tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Subtotal</td><td style="font-size:13px;color:#18181b;text-align:right;">${fmtCurrency(o.subtotal || 0)}</td></tr><tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Shipping</td><td style="font-size:13px;color:#18181b;text-align:right;">${(o.shipping || 0) === 0 ? "FREE" : fmtCurrency(o.shipping)}</td></tr>${o.discount ? `<tr><td style="font-size:13px;color:#71717a;">Discount</td><td style="font-size:13px;color:#dc2626;text-align:right;">-${fmtCurrency(o.discount)}</td></tr>` : ""}<tr><td style="font-size:16px;font-weight:800;color:#18181b;padding:8px 0 0;">Total</td><td style="font-size:16px;font-weight:800;color:#18181b;text-align:right;padding:8px 0 0;">${fmtCurrency(o.total || 0)}</td></tr></table></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Delivery Address</p><p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${escHtml(o.name || "")} (${escHtml(o.phone || "")})</p><p style="margin:2px 0 0;font-size:14px;color:#18181b;">${escHtml(o.city || "N/A")}</p><p style="margin:2px 0 0;font-size:13px;color:#52525b;">${escHtml(o.address || "N/A")}</p></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Payment Method</p><p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${escHtml(o.paymentMethod || "N/A")}</p>${paymentInstructions}</td></tr>
${HR}
<tr><td style="padding:0 28px 24px;" align="center"><p style="margin:0 0 12px;font-size:13px;color:#71717a;">Need to modify your order or have questions?</p><a href="https://wa.me/923272487127?text=${encodeURIComponent(`Hi Deez Prints! I have a question regarding my Order #${o.orderId || ""}`)}" style="display:inline-block;background:#25D366;color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:11px 24px;border-radius:8px;">💬 Chat on WhatsApp (+92 327 2487127)</a></td></tr>
<tr><td style="background:#fafafa;padding:16px 28px;text-align:center;"><p style="margin:0;font-size:11px;color:#a1a1aa;">Deez Prints — Streetwear. No limits.<br/>Karachi, Pakistan</p></td></tr>
</table></td></tr></table></body></html>`;
}

function buildCustomerEmailPlainText(order: any): string {
  const o = order || {};
  const SEP = "────────────────────────────────";
  const items = (o.items || []).map((i: any) => {
    if (!i) return "";
    const title = i.isCustom ? `🎨 ${i.blankItem || i.title}` : (i.title || "Item");
    const meta = [
      i.size ? `Size: ${i.size}` : "",
      i.color ? `Color: ${i.color}` : "",
      i.isCustom && i.placement ? `Placement: ${i.placement}` : "",
    ].filter(Boolean).join(" · ");
    return `  ${title} ×${i.qty || 1} — ${fmtCurrency((i.price || 0) * (i.qty || 1))}${meta ? ` (${meta})` : ""}`;
  }).filter(Boolean).join("\n");

  return [
    SEP,
    "DEEZ PRINTS — ORDER CONFIRMATION",
    SEP,
    `Order #${o.orderId || "N/A"}`,
    `Thank you, ${o.name || "Customer"}! We have received your order.`,
    "",
    SEP,
    "Items Ordered",
    SEP,
    items,
    "",
    SEP,
    `Subtotal: ${fmtCurrency(o.subtotal || 0)}`,
    `Shipping: ${(o.shipping || 0) === 0 ? "FREE" : fmtCurrency(o.shipping)}`,
    o.discount ? `Discount: -${fmtCurrency(o.discount)}` : "",
    `Total:    ${fmtCurrency(o.total || 0)}`,
    SEP,
    "",
    `Delivery: ${o.city || "N/A"} — ${o.address || "N/A"}`,
    `Contact:  ${o.phone || "N/A"}`,
    `Payment:  ${o.paymentMethod || "N/A"}`,
    "",
    "Have questions? WhatsApp us at +92 327 2487127",
    "Deez Prints — Streetwear. No limits."
  ].filter(l => l !== "").join("\n");
}

let _smtpTransporter: any = null;

function getSmtpCredentials() {
  const user = (process.env.SMTP_USER || "deezprints69@gmail.com").trim();
  const rawPass = (process.env.SMTP_PASS || "beai viol ixrb zhoq").trim();
  // Strip any carriage returns/newlines from password
  const pass = rawPass.replace(/[\r\n]/g, "");
  const adminEmail = (process.env.ADMIN_EMAIL || user || "deezprints69@gmail.com").trim();
  const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false";

  return { user, pass, adminEmail, host, port, secure };
}

function createTransporter() {
  const { user, pass, host, port, secure } = getSmtpCredentials();
  if (!host || host === "smtp.gmail.com") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
      connectionTimeout: 8_000,
      greetingTimeout: 8_000,
      socketTimeout: 8_000,
    });
  }
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 8_000,
  });
}

async function sendOrderEmailNotification(order: any): Promise<{ adminSent: boolean; customerSent: boolean }> {
  const o = order || {};
  const { user, pass, adminEmail } = getSmtpCredentials();
  const customerEmail = o.email && typeof o.email === "string" && o.email.includes("@") ? o.email.trim() : null;

  if (!user || !pass) {
    console.log(`[Email] Skipped — SMTP user/pass missing (order ${o.orderId || "unknown"})`);
    return { adminSent: false, customerSent: false };
  }

  const transporter = createTransporter();
  const isCustom = o.orderType === "custom" || (o.items || []).some((i: any) => i && i.isCustom);
  let adminSent = false;
  let customerSent = false;

  const emailTasks: Promise<any>[] = [];

  // 1. Send Admin Notification Email
  if (adminEmail) {
    const adminMailOptions = {
      from: `"Deez Prints" <${user}>`,
      to: adminEmail,
      subject: `${isCustom ? "🎨" : "🛒"} New Order #${o.orderId || "N/A"} — Rs ${(o.total || 0).toLocaleString()}`,
      text: buildEmailPlainText(o),
      html: buildEmailHtml(o),
    };

    emailTasks.push(
      transporter
        .sendMail(adminMailOptions)
        .then(() => {
          console.log(`[Email] ✅ Admin notification sent — order ${o.orderId}`);
          adminSent = true;
        })
        .catch(async (err: any) => {
          console.warn(`[Email] ⚠️ Admin attempt 1 failed — ${o.orderId}: ${err.message || err}`);
          try {
            const retryTransporter = createTransporter();
            await retryTransporter.sendMail(adminMailOptions);
            console.log(`[Email] ✅ Admin notification sent (retry) — order ${o.orderId}`);
            adminSent = true;
          } catch (retryErr: any) {
            console.error(`[Email] ❌ Admin notification failed — ${o.orderId}: ${retryErr.message || retryErr}`);
          }
        })
    );
  }

  // 2. Send Customer Order Confirmation Email
  if (customerEmail) {
    const customerMailOptions = {
      from: `"Deez Prints" <${user}>`,
      to: customerEmail,
      subject: `Order Confirmed #${o.orderId || "N/A"} — Deez Prints`,
      text: buildCustomerEmailPlainText(o),
      html: buildCustomerEmailHtml(o),
    };

    emailTasks.push(
      transporter
        .sendMail(customerMailOptions)
        .then(() => {
          console.log(`[Email] ✅ Customer confirmation sent — ${customerEmail} (order ${o.orderId})`);
          customerSent = true;
        })
        .catch(async (err: any) => {
          console.warn(`[Email] ⚠️ Customer attempt 1 failed — ${customerEmail}: ${err.message || err}`);
          try {
            const retryTransporter = createTransporter();
            await retryTransporter.sendMail(customerMailOptions);
            console.log(`[Email] ✅ Customer confirmation sent (retry) — ${customerEmail}`);
            customerSent = true;
          } catch (retryErr: any) {
            console.error(`[Email] ❌ Customer confirmation failed — ${customerEmail}: ${retryErr.message || retryErr}`);
          }
        })
    );
  }

  await Promise.allSettled(emailTasks);
  return { adminSent, customerSent };
}

// ─── Database Connection ─────────────────────────────────────────────────────

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_XELBlR3dY0bZ@ep-young-night-axlldcs2-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

// Auto-migrate: add per-order customer snapshot columns if they don't exist
let _migrated = false;
async function ensureMigration() {
  if (_migrated) return;
  _migrated = true;
  try {
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerName" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerPhone" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerEmail" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerCity" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerAddress" TEXT`;
  } catch { /* columns may already exist */ }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

const VALID_PINS = new Set(["0000", "deez123"]);

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return String(hash);
}

async function isAuthorized(pin: string | undefined): Promise<boolean> {
  if (!pin) return false;
  const trimmed = pin.trim();
  if (VALID_PINS.has(trimmed)) return true;
  try {
    const rows = await sql`SELECT "passwordHash" FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
    if (rows.length > 0 && simpleHash(trimmed) === rows[0].passwordHash) return true;
  } catch { /* ignore */ }
  return false;
}

function getPin(req: IncomingMessage): string | undefined {
  return (
    (req.headers["x-admin-pin"] as string) ||
    (req.headers["authorization"] as string)?.replace("Bearer ", "")
  );
}

// ─── DB Helpers ──────────────────────────────────────────────────────────────

interface OrderRow {
  id: string;
  orderId: string;
  customerId: string;
  notes: string | null;
  paymentMethod: string;
  orderType: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: string;
  statusHistory: any;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

async function getAllOrders() {
  await ensureMigration();
  // Read per-order customer snapshot columns; fall back to joined customer data for old orders
  const orders = await sql`
    SELECT o.*, c.name AS c_name, c.email AS c_email, c.phone AS c_phone, c.city AS c_city, c.address AS c_address
    FROM orders o
    JOIN customers c ON o."customerId" = c.id
    ORDER BY o."createdAt" DESC
  `;

  const orderIds = orders.map((o: any) => o.id);
  let items: any[] = [];
  if (orderIds.length > 0) {
    items = await sql`SELECT * FROM order_items WHERE "orderId" = ANY(${orderIds})`;
  }

  const itemsByOrder = new Map<string, any[]>();
  for (const item of items) {
    const list = itemsByOrder.get(item.orderId) || [];
    list.push({
      id: item.id,
      title: item.title,
      size: item.size || undefined,
      color: item.color || undefined,
      qty: item.qty,
      price: item.price,
      isCustom: item.isCustom,
      frontArtworkUrl: item.frontArtworkUrl || undefined,
      backArtworkUrl: item.backArtworkUrl || undefined,
      placement: item.placement || undefined,
      blankItem: item.blankItem || undefined,
    });
    itemsByOrder.set(item.orderId, list);
  }

  return orders.map((o: any) => ({
    orderId: o.orderId,
    createdAt: new Date(o.createdAt).toISOString(),
    updatedAt: new Date(o.updatedAt).toISOString(),
    name: o.customerName || o.c_name,
    email: o.customerEmail || o.c_email || "",
    phone: o.customerPhone || o.c_phone,
    city: o.customerCity || o.c_city,
    address: o.customerAddress || o.c_address,
    notes: o.notes || undefined,
    paymentMethod: o.paymentMethod,
    orderType: o.orderType,
    subtotal: o.subtotal,
    shipping: o.shipping,
    discount: o.discount,
    total: o.total,
    status: o.status,
    statusHistory: o.statusHistory || [],
    trackingNumber: o.trackingNumber || undefined,
    items: itemsByOrder.get(o.id) || [],
  }));
}

async function saveOneOrder(order: any) {
  if (!order || typeof order !== "object") {
    throw new Error("Invalid order data passed to saveOneOrder");
  }

  await ensureMigration();

  const phone = order.phone || order.orderId || "00000000000";
  const name = order.name || "Guest Customer";
  const email = order.email || null;
  const city = order.city || "";
  const address = order.address || "";
  const orderId = order.orderId || `DP-${Date.now()}`;

  // Upsert customer (don't update name — each order stores its own snapshot)
  const existing = await sql`SELECT id FROM customers WHERE phone = ${phone} LIMIT 1`;
  let customerId: string;

  if (existing.length > 0) {
    customerId = existing[0].id;
    // Only update email if provided (don't overwrite name/city/address)
    if (email) {
      await sql`UPDATE customers SET email = ${email}, "updatedAt" = NOW() WHERE id = ${customerId}`;
    }
  } else {
    const newId = crypto.randomUUID();
    await sql`INSERT INTO customers (id, phone, name, email, city, address, "createdAt", "updatedAt") VALUES (${newId}, ${phone}, ${name}, ${email}, ${city}, ${address}, NOW(), NOW())`;
    customerId = newId;
  }

  const statusHistory = JSON.stringify(order.statusHistory || [{ status: order.status || "Pending", date: new Date().toISOString() }]);
  const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();

  // Check for order ID collision
  let resolvedOrderId = orderId;
  const existingOrder = await sql`SELECT id FROM orders WHERE "orderId" = ${resolvedOrderId} LIMIT 1`;

  let dbOrderId: string;
  if (existingOrder.length > 0 && !order.isUpdate) {
    // Collision detected on client-generated ID! Generate true next order ID from database
    resolvedOrderId = await getNextOrderId();
    const collisionCheck = await sql`SELECT id FROM orders WHERE "orderId" = ${resolvedOrderId} LIMIT 1`;
    if (collisionCheck.length > 0) {
      resolvedOrderId = `${resolvedOrderId}-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    dbOrderId = crypto.randomUUID();
    await sql`INSERT INTO orders (id, "orderId", "customerId", notes, "paymentMethod", "orderType", subtotal, shipping, discount, total, status, "statusHistory", "trackingNumber", "customerName", "customerPhone", "customerEmail", "customerCity", "customerAddress", "createdAt", "updatedAt") VALUES (${dbOrderId}, ${resolvedOrderId}, ${customerId}, ${order.notes || null}, ${order.paymentMethod || "COD"}, ${order.orderType || "normal"}, ${order.subtotal || 0}, ${order.shipping || 0}, ${order.discount || 0}, ${order.total || 0}, ${order.status || "Pending"}, ${statusHistory}::jsonb, ${order.trackingNumber || null}, ${name}, ${phone}, ${email}, ${city}, ${address}, ${createdAt.toISOString()}::timestamptz, NOW())`;
  } else if (existingOrder.length > 0) {
    dbOrderId = existingOrder[0].id;
    await sql`UPDATE orders SET status = ${order.status || "Pending"}, "statusHistory" = ${statusHistory}::jsonb, notes = ${order.notes || null}, "trackingNumber" = ${order.trackingNumber || null}, "paymentMethod" = ${order.paymentMethod || "COD"}, subtotal = ${order.subtotal || 0}, shipping = ${order.shipping || 0}, discount = ${order.discount || 0}, total = ${order.total || 0}, "customerName" = ${name}, "customerPhone" = ${phone}, "customerEmail" = ${email}, "customerCity" = ${city}, "customerAddress" = ${address}, "updatedAt" = NOW() WHERE id = ${dbOrderId}`;
  } else {
    dbOrderId = crypto.randomUUID();
    await sql`INSERT INTO orders (id, "orderId", "customerId", notes, "paymentMethod", "orderType", subtotal, shipping, discount, total, status, "statusHistory", "trackingNumber", "customerName", "customerPhone", "customerEmail", "customerCity", "customerAddress", "createdAt", "updatedAt") VALUES (${dbOrderId}, ${resolvedOrderId}, ${customerId}, ${order.notes || null}, ${order.paymentMethod || "COD"}, ${order.orderType || "normal"}, ${order.subtotal || 0}, ${order.shipping || 0}, ${order.discount || 0}, ${order.total || 0}, ${order.status || "Pending"}, ${statusHistory}::jsonb, ${order.trackingNumber || null}, ${name}, ${phone}, ${email}, ${city}, ${address}, ${createdAt.toISOString()}::timestamptz, NOW())`;
  }

  // Re-create items
  await sql`DELETE FROM order_items WHERE "orderId" = ${dbOrderId}`;
  for (const item of (order.items || [])) {
    if (!item) continue;
    const itemId = crypto.randomUUID();
    await sql`INSERT INTO order_items (id, "orderId", title, size, color, qty, price, "isCustom", "frontArtworkUrl", "backArtworkUrl", placement, "blankItem", "createdAt") VALUES (${itemId}, ${dbOrderId}, ${item.title || "Item"}, ${item.size || null}, ${item.color || null}, ${item.qty || 1}, ${item.price || 0}, ${item.isCustom || false}, ${item.frontArtworkUrl || null}, ${item.backArtworkUrl || null}, ${item.placement || null}, ${item.blankItem || null}, NOW())`;
  }

  return {
    ...order,
    orderId: resolvedOrderId,
    name,
    phone,
    email: email || undefined,
    city,
    address,
  };
}

async function updateOrderStatus(orderId: string, status: string, note?: string) {
  const existing = await sql`SELECT id, "statusHistory" FROM orders WHERE "orderId" = ${orderId} LIMIT 1`;
  if (existing.length === 0) return null;

  const history = Array.isArray(existing[0].statusHistory) ? existing[0].statusHistory : [];
  history.push({ status, date: new Date().toISOString(), note });

  await sql`UPDATE orders SET status = ${status}, "statusHistory" = ${JSON.stringify(history)}::jsonb, "updatedAt" = NOW() WHERE "orderId" = ${orderId}`;
  return { orderId, status };
}

async function deleteOneOrder(orderId: string) {
  const existing = await sql`SELECT id FROM orders WHERE "orderId" = ${orderId} LIMIT 1`;
  if (existing.length > 0) {
    await sql`DELETE FROM order_items WHERE "orderId" = ${existing[0].id}`;
    await sql`DELETE FROM orders WHERE id = ${existing[0].id}`;
  }
}

async function clearAllOrders() {
  await sql`DELETE FROM order_items`;
  await sql`DELETE FROM orders`;
}

async function importOrders(orders: any[]) {
  let imported = 0, skipped = 0;
  for (const order of orders) {
    const exists = await sql`SELECT 1 FROM orders WHERE "orderId" = ${order.orderId} LIMIT 1`;
    if (exists.length > 0) { skipped++; continue; }
    await saveOneOrder(order);
    imported++;
  }
  return { imported, skipped };
}

async function getNextOrderId() {
  const prefix = "DP";
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const todayPrefix = `${prefix}-${dateStr}-`;
  const rows = await sql`SELECT COUNT(*) as count FROM orders WHERE "orderId" LIKE ${todayPrefix + '%'}`;
  const nextNum = (parseInt(rows[0].count) || 0) + 1;
  return `${todayPrefix}${String(nextNum).padStart(5, "0")}`;
}

async function getSettings() {
  const rows = await sql`SELECT * FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
  if (rows.length === 0) {
    await sql`INSERT INTO admin_settings (id, "updatedAt") VALUES ('singleton', NOW()) ON CONFLICT DO NOTHING`;
    const newRows = await sql`SELECT * FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
    return newRows[0] || null;
  }
  return rows[0];
}

async function saveSettings(settings: Record<string, any>) {
  const s = await getSettings();
  if (!s) return null;
  // Only update fields that are provided
  const updates: string[] = [];
  const vals: any = { ...s, ...settings };
  await sql`UPDATE admin_settings SET
    "telegramBotToken" = ${vals.telegramBotToken},
    "telegramChatId" = ${vals.telegramChatId},
    "telegramApiBase" = ${vals.telegramApiBase},
    "enableNotifications" = ${vals.enableNotifications},
    "sendArtwork" = ${vals.sendArtwork},
    "compressImages" = ${vals.compressImages},
    "notifyStatusChanges" = ${vals.notifyStatusChanges},
    "storeName" = ${vals.storeName},
    "whatsappNumber" = ${vals.whatsappNumber},
    currency = ${vals.currency},
    "orderPrefix" = ${vals.orderPrefix},
    "passwordHash" = ${vals.passwordHash},
    "updatedAt" = NOW()
    WHERE id = 'singleton'`;
  return await getSettings();
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse
) {
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-PIN, Authorization");
    res.end(JSON.stringify(data));
  };

  if (req.method === "OPTIONS") {
    sendJson(200, {});
    return;
  }

  try {
    // Parse body for non-GET (supports both pre-parsed req.body from Vercel and raw stream)
    let body: any = req.body;
    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      if (typeof req.body === "string" && req.body.trim()) {
        try {
          body = JSON.parse(req.body);
        } catch {
          body = {};
        }
      } else if (req.method !== "GET") {
        let bodyStr = "";
        for await (const chunk of req) bodyStr += chunk;
        if (bodyStr.trim()) {
          try {
            body = JSON.parse(bodyStr);
          } catch {
            body = {};
          }
        }
      }
    }
    if (!body || typeof body !== "object") body = {};

    const pin = getPin(req);
    const action = body.action || (req.url?.includes("import") ? "import" : req.url?.includes("next-id") ? "next-id" : req.url?.includes("settings") ? "settings" : req.url?.includes("send-email") ? "send-email" : null);

    // GET
    if (req.method === "GET") {
      if (req.url?.includes("next-id")) {
        return sendJson(200, { ok: true, orderId: await getNextOrderId() });
      }
      if (req.url?.includes("settings")) {
        return sendJson(200, { ok: true, settings: await getSettings() });
      }
      if (!(await isAuthorized(pin))) {
        return sendJson(401, { ok: false, error: "Unauthorized" });
      }
      return sendJson(200, { ok: true, orders: await getAllOrders() });
    }

    // POST
    if (req.method === "POST") {
      if (action === "import") {
        if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
        const result = await importOrders(body.orders || []);
        return sendJson(200, { ok: true, ...result });
      }
      if (action === "settings") {
        if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
        const updated = await saveSettings(body.settings || {});
        return sendJson(200, { ok: true, settings: updated });
      }
      if (action === "send-email") {
        if (!body.order) return sendJson(400, { ok: false, error: "Missing order for email" });
        const emailResult = await sendOrderEmailNotification(body.order);
        return sendJson(200, { ok: true, ...emailResult });
      }
      if (!body.order) return sendJson(400, { ok: false, error: "Missing order" });
      const saved = await saveOneOrder(body.order);

      // Send email notification after successful DB insert.
      // Awaited so Vercel doesn't kill the lambda before it completes.
      // Order is already committed — email errors are caught internally.
      try {
        await sendOrderEmailNotification(saved);
      } catch (err) {
        console.error("[Orders API] Email notification error:", err);
      }

      return sendJson(200, { ok: true, order: saved });
    }

    // PUT
    if (req.method === "PUT") {
      if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
      const updated = await updateOrderStatus(body.orderId, body.status, body.note);
      return sendJson(200, { ok: true, order: updated });
    }

    // DELETE
    if (req.method === "DELETE") {
      if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
      if (body.clearAll) {
        await clearAllOrders();
        return sendJson(200, { ok: true });
      }
      await deleteOneOrder(body.orderId);
      return sendJson(200, { ok: true });
    }

    return sendJson(405, { ok: false, error: "Method not allowed" });
  } catch (err: any) {
    console.error("Orders API Error:", err);
    return sendJson(500, { ok: false, error: err.message || "Server error", stack: err.stack, name: err.name });
  }
}
