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
  Star,
  RefreshCw,
  MessageSquare,
  Building2,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { site, whatsappLink, SITE_URL } from "@/data/site";
import { SectionHeading } from "@/components/shop/ProductRow";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Why Trust Deez Prints — Premium Streetwear Studio Karachi" },
      {
        name: "description",
        content:
          "Discover why 5,000+ customers trust Deez Prints. Heavyweight 240+ GSM cotton, high-definition DTF & UV prints, fast nationwide shipping, and 7-day easy exchange.",
      },
      { property: "og:title", content: "Why Trust Deez Prints — Karachi Studio" },
      {
        property: "og:description",
        content:
          "240+ GSM heavyweight blanks, HD printing, fast delivery across Pakistan, and 100% satisfaction guarantee.",
      },
      { property: "og:url", content: `${SITE_URL}/trust` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/trust` }],
  }),
  component: TrustPage,
});

const trustSignals = [
  {
    icon: Truck,
    title: "Fast Nationwide Shipping",
    desc: "Delivered in 3–5 working days across 250+ cities in Pakistan with full tracking.",
    badge: "TCS & Leopards Tracked",
  },
  {
    icon: ShieldCheck,
    title: "Secure Direct Payments",
    desc: "Encrypted bank & instant mobile wallet transfers with payment verification.",
    badge: "100% Protected",
  },
  {
    icon: Sparkles,
    title: "Premium DTF & UV Print Quality",
    desc: "High-definition, stretch-resistant prints that won't crack or fade over 50+ washes.",
    badge: "HD Sharpness",
  },
  {
    icon: Shirt,
    title: "Heavyweight Blanks",
    desc: "240+ GSM combed cotton, premium fleece, and breathable oversized fits.",
    badge: "Luxury Hand-feel",
  },
  {
    icon: Scissors,
    title: "Made to Order Precision",
    desc: "Every single garment is individually printed and quality-inspected before dispatch.",
    badge: "Handcrafted",
  },
  {
    icon: Headphones,
    title: "Responsive Support",
    desc: "Dedicated WhatsApp assistance from design consultation to door delivery.",
    badge: "7 Days a Week",
  },
];

const stats = [
  { value: "10,000+", label: "Orders Delivered", sub: "Across Pakistan", icon: Package },
  { value: "5,000+", label: "Happy Customers", sub: "4.9/5 Average Rating", icon: Star },
  { value: "6+ Years", label: "Printing Expertise", sub: "Est. Karachi Studio", icon: Award },
  { value: "100%", label: "Quality Guaranteed", sub: "7-Day Easy Exchange", icon: CheckCircle2 },
];

function TrustPage() {
  return (
    <div className="edge py-14 md:py-20 space-y-16 md:space-y-24">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <SectionHeading
          eyebrow="Trust & Quality"
          title={"Why Streetwear Enthusiasts\nTrust Deez Prints"}
          sub="Crafted in Karachi, delivered nationwide. Built on premium fabrics, industrial precision printing, and customer-first transparency."
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
        <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
          Our Brand Promises
        </h2>
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
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                      {sig.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Detailed Printing Quality & Fabrics Explanation */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal className="border border-white/10 bg-surface/40 rounded-2xl p-8 space-y-4">
          <span className="label-mono text-primary">Fabric & Craft</span>
          <h3 className="text-xl font-bold uppercase text-white">240+ GSM Heavyweight Blanks</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We don&apos;t use cheap thin blanks. Every drop-shoulder tee and hoodie is produced with 100% combed cotton, fleece-backed warmth, and luxury hand-feel. Pre-shrunk to retain fit after washing.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="border border-white/10 bg-surface/40 rounded-2xl p-8 space-y-4">
          <span className="label-mono text-primary">Print Technology</span>
          <h3 className="text-xl font-bold uppercase text-white">Industrial DTF & Sublimation</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our Karachi studio utilizes industrial direct-to-film (DTF) and sublimation presses. Micro-detail fidelity, vibrant color saturation, and anti-cracking flexibility guaranteed for 50+ washes.
          </p>
        </Reveal>
      </div>

      {/* Trust Guarantee CTAs */}
      <div className="border border-white/10 bg-surface/50 rounded-2xl p-8 sm:p-10 text-center space-y-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold uppercase text-white">Experience Deez Prints Quality</h3>
        <p className="text-sm text-muted-foreground">
          Ready to elevate your wardrobe or bring your artwork to life? Explore our collections or start a custom print order today.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <MagneticButton to="/collections">Browse Collections</MagneticButton>
          <MagneticButton href={whatsappLink("Hi! I have a question about Deez Prints quality.")} variant="outline">
            Chat on WhatsApp
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
