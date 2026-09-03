import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { LOGO_URL, site, collections, paymentMethods, whatsappLink } from "@/data/site";

export function Footer() {
  return (
    <footer className="rule-t bg-background">
      <div className="edge grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 md:py-20">
        {/* Column 1: Brand Info */}
        <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
          <img src={LOGO_URL} alt="Deez Prints" className="h-9 w-auto" />
          <p className="mt-5 max-w-xs text-sm text-muted-foreground leading-relaxed">
            Streetwear. Custom prints. Heavyweight blanks. Designed &amp; printed in Karachi, delivered nationwide.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-primary transition-colors">
              <Mail className="h-[18px] w-[18px]" />
            </a>
            <a
              href={whatsappLink("Hi Deez Prints!")}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="h-[18px] w-[18px]" />
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 label-mono text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {site.location}
          </p>
        </div>

        {/* Column 2: Shop */}
        <nav>
          <p className="label-mono text-muted-foreground uppercase tracking-wider text-xs">Shop</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="link-underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/custom-print" className="link-underline text-primary font-bold">
                Custom Printing
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 3: Support */}
        <nav>
          <p className="label-mono text-muted-foreground uppercase tracking-wider text-xs">Support</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link to="/support" className="link-underline font-semibold">
                Support Center
              </Link>
            </li>
            <li>
              <Link to="/faq" className="link-underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="link-underline">
                Shipping &amp; Delivery
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
          </ul>
        </nav>

        {/* Column 4: About & Trust */}
        <nav>
          <p className="label-mono text-muted-foreground uppercase tracking-wider text-xs">About</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link to="/about" className="link-underline">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/trust" className="link-underline">
                Why Deez Prints
              </Link>
            </li>
            <li>
              <Link to="/payments" className="link-underline">
                Payment Methods
              </Link>
            </li>
          </ul>
        </nav>

        {/* Column 5: Legal & Studio */}
        <nav>
          <p className="label-mono text-muted-foreground uppercase tracking-wider text-xs">Legal &amp; Studio</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link to="/privacy" className="link-underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="link-underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/returns" className="link-underline">
                Refund Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Payment methods pill strip */}
      <div className="edge border-t border-border py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="label-mono">Secure Payment Options:</span>
          <span className="text-foreground font-medium">{paymentMethods.join(" · ")} · Visa / Mastercard</span>
        </div>
        <Link to="/payments" className="label-mono text-primary hover:underline">
          View Payment Details →
        </Link>
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
