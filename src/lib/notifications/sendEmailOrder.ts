/**
 * Deez Prints — Email Notification Service
 *
 * Sends admin order notification emails via Gmail SMTP (Nodemailer).
 * Designed for Vercel Serverless: 10s timeout, single retry with 3s delay.
 *
 * Failures are caught and logged — never thrown. Email issues must never
 * affect order creation or Telegram notifications.
 */

import dns from "node:dns";
import nodemailer from "nodemailer";

try {
  if (typeof (dns as any).setDefaultResultOrder === "function") {
    (dns as any).setDefaultResultOrder("ipv4first");
  }
} catch {
  // Ignore in environments where not supported
}
import {
  buildOrderEmailHtml,
  buildOrderEmailPlainText,
  buildOrderEmailSubject,
  buildCustomerOrderEmailHtml,
  buildCustomerOrderEmailPlainText,
} from "./emailTemplate";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  items: {
    title: string;
    size?: string;
    color?: string;
    qty: number;
    price: number;
    isCustom?: boolean;
    placement?: string;
    blankItem?: string;
  }[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  createdAt?: string;
}

// ─── SMTP Configuration ──────────────────────────────────────────────────────

const VERIFIED_FALLBACK_PASS = "beaiviolixrbzhoq";

function getSmtpConfig() {
  const user = (process.env.SMTP_USER || "deezprints69@gmail.com").trim();
  const rawEnvPass = process.env.SMTP_PASS
    ? String(process.env.SMTP_PASS).replace(/[\r\n"']/g, "").replace(/\s+/g, "").trim()
    : "";
  const pass = rawEnvPass || VERIFIED_FALLBACK_PASS;
  const adminEmail = (process.env.ADMIN_EMAIL || user || "deezprints69@gmail.com").trim();
  return { user, pass, adminEmail, rawEnvPass };
}

/**
 * Send admin order notification email directly from deezprints69 to deezprints69 inbox.
 * Uses multi-transport fallback (Port 465 SSL -> Port 587 TLS -> service gmail)
 * and credential fallback.
 */
export async function sendOrderEmailNotification(
  order: any,
): Promise<{ adminSent: boolean; error?: string; attempts?: string[] }> {
  const o = order || {};
  const orderIdStr = o.orderId || "unknown";
  const { user, pass, adminEmail, rawEnvPass } = getSmtpConfig();

  if (!user || !adminEmail) {
    console.log(`[Email] Skipped — SMTP user/adminEmail missing (order ${orderIdStr})`);
    return { adminSent: false, error: "Missing user or adminEmail" };
  }

  const adminMail = {
    from: `"Deez Prints" <${user}>`,
    to: adminEmail,
    subject: buildOrderEmailSubject(o),
    text: buildOrderEmailPlainText(o),
    html: buildOrderEmailHtml(o),
  };

  const passwordsToTest = Array.from(new Set([pass, VERIFIED_FALLBACK_PASS].filter(Boolean)));
  const configsToTry: Array<{ label: string; transport: any }> = [];

  for (const p of passwordsToTest) {
    const isFallback = p === VERIFIED_FALLBACK_PASS;
    const tag = isFallback ? "fallback-pass" : "env-pass";

    configsToTry.push({
      label: `465-SSL (${tag})`,
      transport: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user, pass: p },
        connectionTimeout: 6000,
        greetingTimeout: 6000,
        socketTimeout: 6000,
      }),
    });

    configsToTry.push({
      label: `587-TLS (${tag})`,
      transport: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user, pass: p },
        connectionTimeout: 6000,
        greetingTimeout: 6000,
        socketTimeout: 6000,
      }),
    });

    configsToTry.push({
      label: `service-gmail (${tag})`,
      transport: nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass: p },
        connectionTimeout: 6000,
        greetingTimeout: 6000,
        socketTimeout: 6000,
      }),
    });
  }

  const logAttempts: string[] = [];
  let lastError = "";

  for (const { label, transport } of configsToTry) {
    try {
      await transport.sendMail(adminMail);
      console.log(`[Email] ✅ Admin notification sent to ${adminEmail} via ${label} (order ${orderIdStr})`);
      return { adminSent: true, attempts: [...logAttempts, `${label}: SUCCESS`] };
    } catch (err: any) {
      const errStr = err?.message || String(err);
      lastError = errStr;
      console.warn(`[Email] Attempt ${label} failed for order ${orderIdStr}: ${errStr}`);
      logAttempts.push(`${label}: ${errStr}`);
    }
  }

  console.error(`[Email] ❌ All SMTP attempts failed for order ${orderIdStr}. Errors:`, logAttempts.join(" | "));
  return { adminSent: false, error: lastError, attempts: logAttempts };
}
