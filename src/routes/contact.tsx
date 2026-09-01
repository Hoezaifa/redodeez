import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock, Instagram, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/shop/ProductRow";
import { site, whatsappLink, SITE_URL } from "@/data/site";
import { useState } from "react";
import { sendContactMessageFn } from "@/lib/contactFunctions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Deez Prints — Karachi Print Studio" },
      {
        name: "description",
        content:
          "Questions about an order, sizing or a custom print? Email deezprints69@gmail.com or message the studio on Instagram.",
      },
      { property: "og:title", content: "Contact — Deez Prints" },
      { property: "og:description", content: "Reach the Deez Prints studio in Karachi." },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [senderName, setSenderName] = useState("");

  const field =
    "mt-2 w-full border border-border bg-surface p-3.5 text-sm text-foreground outline-hidden focus:border-primary transition-colors disabled:opacity-50";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    setSenderName(name);

    const payload = { name, email, subject, message, phone: phone || undefined };

    try {
      // 1. Try Vercel Serverless Endpoint /api/contact directly
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.ok) {
          setSent(true);
          setIsSubmitting(false);
          return;
        }
      }

      // 2. Fallback to TanStack Server Function
      const result = await sendContactMessageFn({ data: payload });
      if (result.ok) {
        setSent(true);
      } else {
        setError(result.error || "Failed to send email. Please try again or reach out on WhatsApp.");
      }
    } catch (err: any) {
      console.warn("Contact API endpoint unreachable, attempting server function fallback...", err);
      try {
        const result = await sendContactMessageFn({ data: payload });
        if (result.ok) {
          setSent(true);
          setIsSubmitting(false);
          return;
        }
      } catch (fallbackErr) {
        console.error("Server function fallback failed:", fallbackErr);
      }
      setError("Failed to send message. Please verify your connection or message us on WhatsApp!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading
        eyebrow="Contact"
        title={"Say\nhello"}
        sub="We reply within one working day."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
        {sent ? (
          <div className="border border-primary/40 bg-surface/60 p-8 md:p-12 text-foreground">
            <div className="flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              <span className="label-mono uppercase tracking-wider text-primary">Message Sent</span>
            </div>
            <p className="display-md mt-4">Thanks, {senderName || "friend"}!</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Your inquiry has been emailed directly to the Deez Prints studio inbox (<span className="text-foreground font-medium">deezprints69@gmail.com</span>).
              We&apos;ll get back to you within one working day.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setError(null);
              }}
              className="mt-8 inline-flex items-center gap-2 border border-border bg-background px-6 py-3 label-mono text-xs hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-6">
            {error && (
              <div className="flex items-start gap-3 border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <div>
                  <p className="font-semibold">Unable to send message</p>
                  <p className="mt-0.5 text-xs text-red-300">{error}</p>
                </div>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="label-mono">Name *</span>
                <input
                  required
                  name="name"
                  placeholder="Your full name"
                  disabled={isSubmitting}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="label-mono">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="your.email@gmail.com"
                  disabled={isSubmitting}
                  className={field}
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="label-mono">Subject *</span>
                <input
                  required
                  name="subject"
                  placeholder="e.g. Order Inquiry / Custom Design"
                  disabled={isSubmitting}
                  className={field}
                />
              </label>
              <label className="block">
                <span className="label-mono">Phone (Optional)</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="03xx xxxxxxx"
                  disabled={isSubmitting}
                  className={field}
                />
              </label>
            </div>

            <label className="block">
              <span className="label-mono">Message *</span>
              <textarea
                required
                name="message"
                rows={6}
                placeholder="How can we help you?"
                disabled={isSubmitting}
                className={field}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="justify-self-start inline-flex items-center gap-2.5 bg-primary px-7 py-4 label-mono text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending email...</span>
                </>
              ) : (
                <span>Send message</span>
              )}
            </button>
          </form>
        )}

        <aside className="grid gap-px self-start bg-border">
          <a
            href={whatsappLink("Hi Deez Prints! I have a query.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 bg-background p-5 hover:text-primary transition-colors"
          >
            <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary/20 text-primary">
              <span className="text-[11px] font-bold">WA</span>
            </div>
            <div>
              <p className="label-mono text-primary">WhatsApp (Fastest response)</p>
              <p className="text-sm text-muted-foreground mt-0.5 underline underline-offset-4 decoration-primary">
                Click to Chat (+92 327 2487127)
              </p>
            </div>
          </a>
          <div className="flex items-start gap-3 bg-background p-5">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="label-mono">Email</p>
              <a href={`mailto:${site.email}`} className="text-sm break-all hover:text-primary">
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-background p-5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="label-mono">Studio Location</p>
              <p className="text-sm text-muted-foreground">{site.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-background p-5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="label-mono">Hours</p>
              <p className="text-sm text-muted-foreground">{site.hours}</p>
            </div>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 bg-background p-5 hover:text-primary"
          >
            <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="label-mono">Instagram</p>
              <p className="text-sm text-muted-foreground">@deez_prints</p>
            </div>
          </a>
        </aside>
      </div>
    </div>
  );
}
