import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Truck,
  ShieldCheck,
  Sparkles,
  Shirt,
  Scissors,
  Headphones,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  Package,
  Award,
  RefreshCw,
  MapPin,
  Building2,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site, whatsappLink } from "@/data/site";
import { Link } from "@tanstack/react-router";

/* ─── Data Arrays ────────────────────────────────────────────── */

const trustSignals = [
  {
    icon: Truck,
    title: "Fast Nationwide Shipping",
    desc: "Delivered in 3–5 working days across 250+ cities in Pakistan.",
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
  { value: "5,000+", label: "Happy Customers", sub: "Delivered Nationwide", icon: CheckCircle2 },
  { value: "6+ Years", label: "Printing Expertise", sub: "Est. Karachi Studio", icon: Award },
  { value: "100%", label: "Quality Guaranteed", sub: "7-Day Easy Exchange", icon: CheckCircle2 },
];

const faqs = [
  {
    q: "What payment methods are supported?",
    a: "We support direct transfers via Meezan Bank, Easypaisa, and JazzCash. After transferring, simply upload your transaction reference or screenshot at checkout or via WhatsApp for instant order confirmation.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard nationwide delivery takes 3 to 5 working days across Pakistan via TCS, Leopards, and M&P. Orders placed before 1 PM are processed the same day.",
  },
  {
    q: "What is your return & exchange policy?",
    a: "We offer a 7-day hassle-free exchange policy for any sizing issues, defective items, or printing discrepancies. Simply reach out on WhatsApp with your order ID.",
  },
  {
    q: "How does Custom Printing work?",
    a: "You can upload your own design on our Custom Print page or send your high-resolution artwork to us on WhatsApp. Our design team will send you a digital preview before printing.",
  },
  {
    q: "Where are Deez Prints items manufactured?",
    a: "All our blanks and custom prints are proudly designed, manufactured, and printed in our main Karachi studio using industrial DTF and UV machinery.",
  },
];

/* ─── Trust Section Component ────────────────────────────────── */

export function TrustSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-background py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="edge relative z-10 space-y-20 lg:space-y-28">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Reveal>
            <p className="label-mono text-primary uppercase tracking-widest">
              Uncompromising Quality & Service
            </p>
            <h2 className="display-md mt-2 font-extrabold uppercase tracking-tight text-white">
              Why Streetwear Enthusiasts Trust Deez Prints
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3">
              Crafted in Karachi, delivered nationwide. Built on premium fabrics, industrial precision printing, and customer-first transparency.
            </p>
          </Reveal>
        </div>

        {/* 1. Core Trust Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((sig, i) => {
            const Icon = sig.icon;
            return (
              <Reveal key={sig.title} delay={i * 0.05}>
                <div className="h-full bg-zinc-950/60 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between shadow-lg">
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

        {/* 2. Brand Credibility Stats Banner */}
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


        {/* 4. Supported Payment Methods (Meezan, Easypaisa, JazzCash) */}
        <Reveal>
          <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 text-center space-y-6">
            <div className="max-w-xl mx-auto space-y-2">
              <p className="label-mono text-primary">Direct & Transparent</p>
              <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                Supported Payment Gateways
              </h3>
              <p className="text-xs text-zinc-400">
                Pay securely via direct bank transfer or your preferred mobile wallet. Every transaction is verified with instant reference matching.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {/* Meezan Bank */}
              <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 flex items-center gap-3.5 text-left hover:border-orange-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Meezan Bank</p>
                  <p className="text-[11px] text-zinc-500">Direct IBAN & App</p>
                </div>
              </div>

              {/* Easypaisa */}
              <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 flex items-center gap-3.5 text-left hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Easypaisa</p>
                  <p className="text-[11px] text-zinc-500">Mobile Wallet</p>
                </div>
              </div>

              {/* JazzCash */}
              <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 flex items-center gap-3.5 text-left hover:border-red-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">JazzCash</p>
                  <p className="text-[11px] text-zinc-500">Instant Wallet</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 5. Policy Badges & Instant Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exchange & Shipping Policy */}
          <Reveal>
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <RefreshCw className="w-6 h-6" />
                <h3 className="text-lg font-bold uppercase text-white tracking-wide">
                  7-Day Hassle-Free Exchange
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                If your fit isn't right or you receive a defective print, our exchange process is smooth and quick. Return shipping assistance is provided nationwide.
              </p>
              <div className="pt-2 flex gap-4 text-xs font-bold">
                <Link to="/returns" className="text-primary hover:underline">
                  Read Return Policy →
                </Link>
                <Link to="/shipping" className="text-zinc-400 hover:text-white hover:underline">
                  Shipping Policy →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Customer & WhatsApp Support */}
          <Reveal delay={0.1}>
            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <MessageSquare className="w-6 h-6" />
                <h3 className="text-lg font-bold uppercase text-white tracking-wide">
                  Need Help or Custom Orders?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Have questions about sizing, custom artwork specs, or order status? Chat directly with our Karachi studio team on WhatsApp.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={whatsappLink("Hi! I have a question about my Deez Prints order.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Us Now
                </a>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  Contact Page
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 6. Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="label-mono text-primary">Got Questions?</p>
            <h3 className="text-2xl font-bold uppercase text-white tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-white hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-400 border-t border-white/5 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
