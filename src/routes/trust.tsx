import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  ShieldCheck,
  Sparkles,
  Shirt,
  Scissors,
  Headphones,
  CheckCircle2,
  Package,
  Award,
  Building2,
  Smartphone,
  Wallet,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Clock,
  Layers,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { site, whatsappLink, SITE_URL, SHIPPING_OPTIONS, commercialConfig } from "@/data/site";
import { SectionHeading } from "@/components/shop/ProductRow";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Why Trust Deez Prints — Quality, Shipping & Payment Guarantee" },
      {
        name: "description",
        content:
          "Discover why streetwear enthusiasts across Pakistan trust Deez Prints. Heavyweight 240 GSM blanks, HD industrial DTF prints, verified bank & wallet payments, and 7-day easy exchange.",
      },
      { property: "og:title", content: "Why Trust Deez Prints — Karachi Print Studio" },
      {
        property: "og:description",
        content:
          "Industrial DTF printing, premium heavyweight blanks, direct transparent payments, Karachi & nationwide delivery, and 7-day easy exchange.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/trust` },
      { property: "og:site_name", content: "Deez Prints" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Why Trust Deez Prints — Quality & Guarantees" },
      {
        name: "twitter:description",
        content:
          "Heavyweight blanks, HD industrial DTF prints, verified bank & wallet payments, and 7-day easy exchange nationwide.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/trust` }],
  }),
  component: TrustPage,
});

const stats = [
  { value: "10,000+", label: "Orders Delivered", sub: "Across Pakistan", icon: Package },
  { value: "5,000+", label: "Happy Customers", sub: "Nationwide Community", icon: CheckCircle2 },
  { value: "6+ Years", label: "Printing Expertise", sub: "Est. Karachi Studio", icon: Award },
  { value: "100%", label: "Quality Guaranteed", sub: "7-Day Easy Exchange", icon: ShieldCheck },
];

const trustSignals = [
  {
    icon: Truck,
    title: "Nationwide Shipping & Tracking",
    desc: `Orders take ${commercialConfig.prepTime} to prepare before dispatch. Karachi Rs. ${SHIPPING_OPTIONS.karachi.fee} via ${SHIPPING_OPTIONS.karachi.method} (${commercialConfig.deliveryTimeKarachi}). Nationwide Rs. ${SHIPPING_OPTIONS.nationwide.fee} via ${SHIPPING_OPTIONS.nationwide.method} (${commercialConfig.deliveryTimeNationwide}). Free delivery on orders over Rs. ${commercialConfig.freeShippingThreshold.toLocaleString()}.`,
    badge: "Tracked Delivery",
    linkText: "View Shipping Policy",
    linkHref: "/shipping",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Direct Payments",
    desc: "We accept Meezan Bank IBFT, Easypaisa, JazzCash, and Raast Instant Pay with zero checkout surcharge. Instant payment verification via screenshot or transaction reference.",
    badge: "Zero Surcharge",
    linkText: "View Payment Guide",
    linkHref: "/payments",
  },
  {
    icon: Sparkles,
    title: "Industrial DTF & Sublimation Quality",
    desc: "We use high-definition Direct-to-Film (DTF) and sublimation presses with premium Japanese inks. Razor-sharp lines, rich blacks, and vibrant colors that do not crack or peel after repeated washing.",
    badge: "50+ Washes Durability",
    linkText: "Read Print & Care Guide",
    linkHref: "/guides/streetwear-printing-and-care",
  },
  {
    icon: Shirt,
    title: "Heavyweight Custom Blanks",
    desc: "No paper-thin stock tees. We manufacture 240 GSM drop-shoulder streetwear tees, 100% combed cotton regular blanks, hand-washed acid wash pieces, and high-density satin tapestries.",
    badge: "240 GSM Cotton",
    linkText: "Explore Collections",
    linkHref: "/collections",
  },
  {
    icon: Scissors,
    title: "Made-to-Order Precision & QA",
    desc: "Every order is individually printed, cured, and inspected at our Karachi studio. Triple-checked for alignment, color fidelity, and stitching before packaging.",
    badge: "Karachi Studio Craft",
    linkText: "Start Custom Order",
    linkHref: "/custom-print",
  },
  {
    icon: RefreshCw,
    title: "7-Day Hassle-Free Exchange",
    desc: "If the size isn't right or there's any defect upon arrival, contact us within 7 days of delivery. We guide you step-by-step through our smooth nationwide replacement process.",
    badge: "7-Day Window",
    linkText: "View Returns Policy",
    linkHref: "/returns",
  },
];

const supportedGateways = [
  {
    name: "Meezan Bank",
    type: "Direct Bank Transfer / IBFT",
    desc: "Transfer via Meezan Mobile App or any bank app in Pakistan with instant reference tracking.",
    icon: Building2,
    badge: "Instant IBFT",
  },
  {
    name: "Easypaisa",
    type: "Mobile Wallet Transfer",
    desc: "Instant transfer from your Easypaisa app or nearest retailer to our verified account.",
    icon: Smartphone,
    badge: "Direct Wallet",
  },
  {
    name: "JazzCash",
    type: "Mobile Wallet Transfer",
    desc: "Quick and secure transfers from your JazzCash wallet with zero transaction delay.",
    icon: Wallet,
    badge: "Instant Pay",
  },
  {
    name: "Raast Pay",
    type: "State Bank Instant Payment",
    desc: "Instant, zero-fee interbank transfer via Raast ID linked directly to verified accounts.",
    icon: ShieldCheck,
    badge: "SBP Raast",
  },
];

const policyCards = [
  {
    title: "Shipping & Delivery",
    desc: "Rates, dispatch timelines, Bykea in Karachi, and nationwide courier coverage.",
    href: "/shipping",
    icon: Truck,
  },
  {
    title: "Payment Methods",
    desc: "Step-by-step transfer instructions, account titles, and verification guide.",
    href: "/payments",
    icon: ShieldCheck,
  },
  {
    title: "Returns & Exchanges",
    desc: "7-day exchange window, conditions, and replacement procedure.",
    href: "/returns",
    icon: RefreshCw,
  },
  {
    title: "Frequently Asked Questions",
    desc: "Sizing guides, print methods, order tracking, and custom artwork specs.",
    href: "/faq",
    icon: HelpCircle,
  },
];

function TrustPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Why Deez Prints", url: `${SITE_URL}/trust` },
  ];

  return (
    <div className="edge py-10 md:py-16 space-y-16 md:space-y-24">
      {/* Structured Data */}
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="label-mono text-[10px] md:text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-foreground/60">
            /
          </li>
          <li className="text-foreground font-semibold" aria-current="page">
            Why Deez Prints
          </li>
        </ol>
      </nav>

      {/* Header Section */}
      <div className="max-w-3xl space-y-4">
        <SectionHeading
          eyebrow="Trust & Transparency"
          title={"Why Streetwear Enthusiasts\nTrust Deez Prints"}
          sub="Founded in Karachi, shipped nationwide. Every piece is printed on industrial DTF equipment using premium heavyweight blanks, backed by clear policies and direct customer care."
        />
      </div>

      {/* Brand Credibility Stats */}
      <Reveal>
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={st.label} className={`pt-6 lg:pt-0 ${idx !== 0 ? "lg:pl-8" : ""}`}>
                  <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                    {st.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-300 mt-1">
                    {st.label}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{st.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Core Trust Signals Grid */}
      <div className="space-y-8">
        <div>
          <span className="label-mono text-primary text-xs uppercase tracking-wider">Our Commitments</span>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1">
            Built on Six Brand Promises
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((sig, i) => {
            const Icon = sig.icon;
            return (
              <Reveal key={sig.title} delay={i * 0.05}>
                <div className="h-full bg-surface/50 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                        {sig.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-primary transition-colors">
                      {sig.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
                      {sig.desc}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 mt-6">
                    <Link
                      to={sig.linkHref as any}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:underline"
                    >
                      {sig.linkText} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Synchronized Payment Transparency Section */}
      <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 sm:p-10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="label-mono text-primary text-xs uppercase tracking-wider">Direct & Transparent</span>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Accepted Payment Methods
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            We use zero-markup, direct interbank and mobile wallet transactions. Simply upload your screenshot or reference after placing your order for instant processing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportedGateways.map((gw) => {
            const Icon = gw.icon;
            return (
              <div
                key={gw.name}
                className="bg-zinc-900/60 border border-white/10 rounded-xl p-5 space-y-3 flex flex-col justify-between hover:border-primary/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                      {gw.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white uppercase">{gw.name}</h3>
                  <p className="text-[11px] font-mono text-primary mt-0.5">{gw.type}</p>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{gw.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <p className="text-xs text-zinc-400">
            Need account numbers, titles, or transfer instructions?
          </p>
          <Link
            to="/payments"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary hover:underline"
          >
            View Official Payment Account Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Blank Quality & Studio Production Deep Dive */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal className="border border-white/10 bg-surface/40 rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <span className="label-mono text-primary text-xs uppercase tracking-wider">Garment Construction</span>
          </div>
          <h3 className="text-xl font-bold uppercase text-white">Heavyweight Blanks Only</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            We do not use generic, ultra-thin promotional blanks. Our drop-shoulder tees use 240 GSM combed cotton with reinforced collars that stay flat. Our acid wash garments undergo custom mineral enzyme washing, making every single piece uniquely patterned.
          </p>
          <ul className="text-xs font-mono text-zinc-300 space-y-1.5 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Drop-shoulder: 240 GSM combed cotton
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Acid wash: Hand-dyed vintage mineral wash
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Regular tees: 180 GSM everyday premium cotton
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Tapestries: High-density satin with metal grommets
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="border border-white/10 bg-surface/40 rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="label-mono text-primary text-xs uppercase tracking-wider">Studio Technology</span>
          </div>
          <h3 className="text-xl font-bold uppercase text-white">Industrial DTF & Sublimation</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Every garment is pressed on industrial-grade Direct-to-Film (DTF) transfer equipment using premium polymer powders and eco-certified inks. The result is razor-sharp detail on both dark and light fabrics, elastic stretch without cracking, and long-term durability.
          </p>
          <ul className="text-xs font-mono text-zinc-300 space-y-1.5 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> High-definition print resolution up to 1440 DPI
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Soft-hand finish with flexible ink cure
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Individually inspected before packaging
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Zero crack guarantee when following care guide
            </li>
          </ul>
        </Reveal>
      </div>

      {/* Quick Policy Navigation Cards */}
      <div className="space-y-6">
        <div>
          <span className="label-mono text-primary text-xs uppercase tracking-wider">Information Hub</span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-white mt-1">
            Store Policies & Guidance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {policyCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.href as any}
                className="bg-surface/50 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white uppercase group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
                <div className="pt-4 flex items-center gap-1 text-xs font-mono text-primary font-semibold">
                  Read Details <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Direct Contact & Experience Quality CTAs */}
      <div className="border border-white/10 bg-surface/50 rounded-2xl p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white">Experience Deez Prints Quality</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Whether you are choosing a limited graphic drop or printing your own unique artwork on heavyweight blanks, we guarantee premium print craft and transparent service from order to door.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <MagneticButton to="/collections">Browse Collections</MagneticButton>
          <MagneticButton to="/custom-print" variant="outline">
            Custom Print Order
          </MagneticButton>
          <MagneticButton href={whatsappLink("Hi! I have a question about Deez Prints quality.")} variant="outline">
            Chat on WhatsApp
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
