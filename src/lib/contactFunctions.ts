import { createServerFn } from "@tanstack/react-start";
import { sendContactEmailNotification, type ContactFormData } from "./notifications/sendContactEmail";

export const sendContactMessageFn = createServerFn({ method: "POST" })
  .validator((data: ContactFormData) => data)
  .handler(async ({ data }) => {
    // 1. Try Vercel Serverless Endpoint /api/contact if in browser environment
    if (typeof window !== "undefined") {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.ok) return { ok: true, emailSent: json.emailSent !== false };
        }
      } catch {
        /* fallback to server side function below */
      }
    }

    // 2. Direct server execution (when called on server side or fallback)
    try {
      const emailSent = await sendContactEmailNotification(data);
      return { ok: true, emailSent };
    } catch (err) {
      console.error("Error sending contact message:", err);
      return { ok: false, error: String(err) };
    }
  });
