/**
 * Deez Prints — Vercel Serverless API for Contact Form
 *
 * Sends contact inquiry emails to deezprints69@gmail.com via Nodemailer (Gmail SMTP).
 * Also sends a Telegram notification if Telegram bot credentials are configured.
 */
import type { IncomingMessage, ServerResponse } from "http";
import nodemailer from "nodemailer";

function escHtml(text: string | undefined | null): string {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmailHtml(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}): string {
  const d = new Date();
  const date = d.toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString("en-PK", { hour: "numeric", minute: "2-digit", hour12: true });
  const HR = `<tr><td style="padding:12px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;">
<tr><td style="background:#18181b;padding:24px 28px;"><h1 style="margin:0;font-size:20px;font-weight:800;color:#fff;letter-spacing:2px;">DEEZ PRINTS</h1><p style="margin:6px 0 0;font-size:13px;font-weight:700;color:#f97316;letter-spacing:1px;">NEW CONTACT INQUIRY</p></td></tr>
<tr><td style="padding:20px 28px 0;"><table width="100%"><tr><td style="font-size:13px;color:#71717a;">Received</td><td style="text-align:right;font-size:13px;color:#71717a;">${date} · ${time}</td></tr></table></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer Details</p><p style="margin:0;font-size:15px;font-weight:700;color:#18181b;">${escHtml(data.name)}</p><p style="margin:2px 0 0;font-size:13px;color:#52525b;">✉️ <a href="mailto:${escHtml(data.email)}" style="color:#f97316;text-decoration:none;">${escHtml(data.email)}</a></p>${data.phone ? `<p style="margin:2px 0 0;font-size:13px;color:#52525b;">📱 ${escHtml(data.phone)}</p>` : ""}</td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Subject</p><p style="margin:0;font-size:15px;font-weight:700;color:#18181b;">${escHtml(data.subject)}</p></td></tr>
${HR}
<tr><td style="padding:0 28px;"><p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Message</p><div style="margin:0;font-size:14px;line-height:1.6;color:#27272a;background:#fafafa;padding:16px;border-radius:8px;border-left:4px solid #f97316;white-space:pre-wrap;">${escHtml(data.message)}</div></td></tr>
${HR}
<tr><td style="padding:0 28px 24px;" align="center"><a href="mailto:${escHtml(data.email)}?subject=${encodeURIComponent("Re: " + data.subject)}" style="display:inline-block;background:#18181b;color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:8px;">Reply to Customer</a></td></tr>
<tr><td style="background:#fafafa;padding:16px 28px;text-align:center;"><p style="margin:0;font-size:11px;color:#a1a1aa;">Deez Prints — Streetwear. No limits.</p></td></tr>
</table></td></tr></table></body></html>`;
}

function buildContactEmailText(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}): string {
  const SEP = "────────────────────────────────";
  return [
    SEP,
    "DEEZ PRINTS — CONTACT INQUIRY",
    SEP,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    `Subject: ${data.subject}`,
    "",
    SEP,
    "Message:",
    SEP,
    data.message,
    "",
    SEP,
    `Reply to: ${data.email}`,
  ]
    .filter((l) => l !== "")
    .join("\n");
}

let _smtpTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (_smtpTransporter) return _smtpTransporter;

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER || "deezprints69@gmail.com";
  const pass = process.env.SMTP_PASS || "xali erne qyqm khjv";

  _smtpTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  return _smtpTransporter;
}

async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}): Promise<boolean> {
  const user = process.env.SMTP_USER || "deezprints69@gmail.com";
  const pass = process.env.SMTP_PASS || "xali erne qyqm khjv";
  const adminEmail = process.env.ADMIN_EMAIL || "deezprints69@gmail.com";

  if (!user || !pass || !adminEmail) {
    console.log("[Contact Email] Skipped — SMTP not configured");
    return false;
  }

  const mailOptions = {
    from: `"Deez Prints Contact" <${user}>`,
    to: adminEmail,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: `📩 Contact Form: ${data.subject} — ${data.name}`,
    text: buildContactEmailText(data),
    html: buildContactEmailHtml(data),
  };

  const transporter = getTransporter();

  // Attempt 1
  try {
    await transporter.sendMail(mailOptions);
    console.log(`[Contact Email] ✅ Sent from ${data.email}`);
    return true;
  } catch (err: any) {
    console.warn(`[Contact Email] ⚠️ Attempt 1 failed: ${err.message || err}`);
  }

  // Retry after 3s
  await new Promise((r) => setTimeout(r, 3000));
  try {
    _smtpTransporter = null;
    const retryTransporter = getTransporter();
    await retryTransporter.sendMail(mailOptions);
    console.log(`[Contact Email] ✅ Sent (retry) from ${data.email}`);
    return true;
  } catch (err: any) {
    console.error(`[Contact Email] ❌ Failed to send: ${err.message || err}`);
    return false;
  }
}

// Telegram notification helper
async function sendContactTelegram(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN || "8851777111:AAHEWoRMMes229DTTljUDT5SiDFV-fU-iwM";
  const chatId = process.env.TELEGRAM_CHAT_ID || "6105402097";
  if (!token || !chatId) return;

  const msg = `📩 <b>NEW CONTACT INQUIRY</b>
━━━━━━━━━━━━━━
<b>Name:</b> ${escHtml(data.name)}
<b>Email:</b> ${escHtml(data.email)}
${data.phone ? `<b>Phone:</b> ${escHtml(data.phone)}\n` : ""}<b>Subject:</b> ${escHtml(data.subject)}
━━━━━━━━━━━━━━
<b>Message:</b>
${escHtml(data.message)}
━━━━━━━━━━━━━━
💬 <a href="mailto:${escHtml(data.email)}">Reply via Email ↗</a>`;

  try {
    const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg,
        parse_mode: "HTML",
      }),
    });
  } catch {
    /* ignore telegram errors */
  }
}

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse
) {
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end(JSON.stringify(data));
  };

  if (req.method === "OPTIONS") {
    sendJson(200, {});
    return;
  }

  if (req.method !== "POST") {
    return sendJson(405, { ok: false, error: "Method not allowed" });
  }

  try {
    let body: any = {};
    let bodyStr = "";
    for await (const chunk of req) bodyStr += chunk;
    if (bodyStr) body = JSON.parse(bodyStr);

    const { name, email, subject, message, phone } = body;

    if (!name || !email || !subject || !message) {
      return sendJson(400, {
        ok: false,
        error: "Missing required fields: name, email, subject, and message are required.",
      });
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      phone: phone ? String(phone).trim() : undefined,
    };

    // Send email and telegram in parallel
    const [emailSuccess] = await Promise.all([
      sendContactEmail(payload),
      sendContactTelegram(payload),
    ]);

    return sendJson(200, {
      ok: true,
      emailSent: emailSuccess,
      message: "Contact message received successfully",
    });
  } catch (err: any) {
    console.error("Contact API Error:", err);
    return sendJson(500, {
      ok: false,
      error: err.message || "Failed to process contact inquiry",
    });
  }
}
