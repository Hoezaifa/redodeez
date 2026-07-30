import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import { LOGO_URL, site, collections, paymentMethods, whatsappLink } from "@/data/site";

export function Footer() {
  return (
    <footer className="rule-t bg-background">
      <div className="edge grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <img src={LOGO_URL} alt="Deez Prints" className="h-9 w-auto" />
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Streetwear. Custom prints. Made for misfits, built to stand out.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-primary"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-primary">
              <Mail className="h-[18px] w-[18px]" />
            </a>
            <span className="flex items-center gap-2 label-mono text-muted-foreground">
              <MapPin className="h-4 w-4" /> {site.location}
            </span>
          </div>
        </div>

        <nav>
          <p className="label-mono text-muted-foreground">Shop</p>
          <ul className="mt-5 space-y-3">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="link-underline text-sm"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <p className="label-mono text-muted-foreground">Support</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/faq" className="link-underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="link-underline">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="/returns" className="link-underline">
                Returns &amp; Exchange
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link-underline">
                Contact Us
              </Link>
            </li>
            <li>
              <a href={whatsappLink("Hi Deez Prints!")} className="link-underline">
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>

        <nav>
          <p className="label-mono text-muted-foreground">Studio</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/about" className="link-underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/custom-print" className="link-underline">
                Custom Printing
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </li>
          </ul>
          <p className="label-mono mt-8 text-muted-foreground">Payments</p>
          <p className="mt-3 text-sm text-muted-foreground">{paymentMethods.join(" · ")}</p>
        </nav>
      </div>

      {/* Trust line */}
      <div className="edge flex items-center justify-center gap-3 border-t border-border py-5">
        <span className="label-mono text-muted-foreground">Trusted by 500+ Customers</span>
        <span className="flex gap-0.5 text-primary" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M10 1l2.39 4.84L17.82 7l-3.91 3.81.92 5.38L10 13.47l-4.83 2.72.92-5.38L2.18 7l5.43-1.16z" />
            </svg>
          ))}
        </span>
      </div>

      <div className="edge flex flex-col gap-2 border-t border-border py-6 md:flex-row md:items-center md:justify-between">
        <p className="label-mono text-muted-foreground">
          © {new Date().getFullYear()} Deez Prints. All rights reserved.
        </p>
        <p className="label-mono text-primary">Designed in Karachi, Pakistan</p>
      </div>
    </footer>
  );
}
