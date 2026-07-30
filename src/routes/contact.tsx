import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Clock, Instagram } from "lucide-react";
import { SectionHeading } from "@/components/shop/ProductRow";
import { site, whatsappLink } from "@/data/site";
import { useState } from "react";

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
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field =
    "mt-2 w-full border border-border bg-surface p-3.5 text-sm outline-hidden focus:border-primary";

  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading
        eyebrow="Contact"
        title={"Say\nhello"}
        sub="We reply within one working day."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
        {sent ? (
          <div className="border border-border p-12">
            <p className="display-md">Message sent</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Thanks for reaching out — we&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="label-mono">Name</span>
                <input required name="name" className={field} />
              </label>
              <label className="block">
                <span className="label-mono">Email</span>
                <input required name="email" type="email" className={field} />
              </label>
            </div>
            <label className="block">
              <span className="label-mono">Subject</span>
              <input required name="subject" className={field} />
            </label>
            <label className="block">
              <span className="label-mono">Message</span>
              <textarea required name="message" rows={6} className={field} />
            </label>
            <button
              type="submit"
              className="justify-self-start bg-primary px-7 py-4 label-mono text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Send message
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
              <p className="text-sm text-muted-foreground mt-0.5 underline underline-offset-4 decoration-primary">Click to Chat (+92 327 2487127)</p>
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
