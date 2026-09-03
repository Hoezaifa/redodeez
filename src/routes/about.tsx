import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Award,
  Truck,
  ShieldCheck,
  RefreshCw,
  Scissors,
  ShoppingCart,
  Printer,
  CheckCircle2,
  Package,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site, whatsappLink, SITE_URL } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Deez Prints — A Karachi Print Studio" },
      {
        name: "description",
        content:
          "Deez Prints is a Karachi-based print studio making premium streetwear and custom prints for people who'd rather wear their own ideas.",
      },
      { property: "og:title", content: "About Deez Prints" },
      { property: "og:description", content: "A Karachi print studio for bold, wearable ideas." },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/about` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Permanent+Marker&display=swap",
      },
    ],
  }),
  component: About,
});

/* ─── Benefits strip data ───────────────────────────────── */
const benefits = [
  { icon: Award, label: "PREMIUM QUALITY", desc: "Top-notch fabric & long-lasting prints." },
  { icon: Truck, label: "FAST DELIVERY", desc: "Nationwide delivery in 3–5 working days." },
  { icon: ShieldCheck, label: "SECURE PAYMENTS", desc: "Meezan, Easypaisa & JazzCash accepted." },
  { icon: RefreshCw, label: "EASY RETURNS", desc: "7-day exchange policy." },
  { icon: Scissors, label: "MADE TO ORDER", desc: "Every piece is printed just for you." },
];

/* ─── Process steps ─────────────────────────────────────── */
const steps = [
  { num: "01", title: "YOU ORDER", desc: "Place your order with your size and design.", icon: ShoppingCart },
  { num: "02", title: "WE PRINT", desc: "We print your piece using the best method for the design.", icon: Printer },
  { num: "03", title: "QUALITY CHECK", desc: "Every piece is checked for quality before packing.", icon: CheckCircle2 },
  { num: "04", title: "PACK & SHIP", desc: "Packed with care and shipped securely to you.", icon: Package },
  { num: "05", title: "YOU WEAR", desc: "Unbox, wear, and represent Deez Prints.", icon: Heart },
];

/* ─── Inline styles for editorial display fonts ─────────── */
const condensedFont: React.CSSProperties = {
  fontFamily: "'Bebas Neue', 'Plus Jakarta Sans Variable', sans-serif",
  fontWeight: 400, /* Bebas Neue only has 400 but it looks ultra bold */
};

const brushFont: React.CSSProperties = {
  fontFamily: "'Permanent Marker', 'Plus Jakarta Sans Variable', cursive",
  fontWeight: 400,
};

function About() {
  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          HERO — 43/57 grid, tight, editorial
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#080808" }}>
        {/* Grain */}
        <div className="grain pointer-events-none absolute inset-0 z-10" />

        <div
          className="edge relative z-20"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
            paddingTop: "80px",
            paddingBottom: "24px",
          }}
        >
          {/* Desktop grid override */}
          <style>{`
            @media (min-width: 1024px) {
              .about-hero-grid {
                grid-template-columns: 43% 54% !important;
                gap: 3% !important;
                padding-top: 116px !important;
                padding-bottom: 0 !important;
                align-items: start !important;
              }
            }
          `}</style>
          <div
            className="about-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* LEFT — Copy block */}
            <Reveal className="flex flex-col" y={20}>
              {/* Eyebrow */}
              <p
                className="text-primary uppercase tracking-[0.18em] mb-4"
                style={{ fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
              >
                ABOUT DEEZ PRINTS
              </p>

              {/* PRINTED IN — condensed display */}
              <h1
                className="text-foreground uppercase leading-[0.92] tracking-[0.01em]"
                style={{
                  ...condensedFont,
                  fontSize: "clamp(4.5rem, 12vw, 8.5rem)",
                  marginBottom: "-4px",
                }}
              >
                PRINTED IN
              </h1>

              {/* KARACHI — brush/handwritten in orange */}
              <span
                className="text-primary block leading-[0.95]"
                style={{
                  ...brushFont,
                  fontSize: "clamp(4rem, 11vw, 7.5rem)",
                  letterSpacing: "0.02em",
                  marginBottom: "16px",
                }}
              >
                KARACHI
              </span>

              {/* Tagline */}
              <p
                className="text-muted-foreground italic mb-5"
                style={{ fontSize: "14px", letterSpacing: "0.03em" }}
              >
                {site.tagline}
              </p>

              {/* Story copy */}
              <div
                className="space-y-3 text-muted-foreground mb-6"
                style={{ fontSize: "13px", lineHeight: 1.65, maxWidth: "420px" }}
              >
                <p>
                  Deez Prints started with one idea: the clothes people actually want rarely exist on a
                  shelf. So we built a studio around making them — heavyweight blanks, oversized cuts, and
                  prints loud enough to carry a whole outfit.
                </p>
                <p>
                  Everything is printed to order from our workshop in {site.location}. Drop shoulder tees,
                  acid wash one-of-ones, hoodies, jerseys, tapestries and accessories — plus fully custom
                  work where you send us the artwork and we handle the rest.
                </p>
                <p>
                  We ship nationwide via {site.couriers}, usually within {site.deliveryTime}, with secure
                  payment options via Meezan Bank, Easypaisa, and JazzCash. If something isn&apos;t right,
                  our 7-day exchange policy has you covered.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/collections"
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground uppercase tracking-wider transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "11px 22px",
                    letterSpacing: "0.08em",
                  }}
                >
                  SHOP THE CATALOGUE
                </Link>
                <a
                  href={whatsappLink("Hi Deez Prints!")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center border border-primary text-primary uppercase tracking-wider transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.97]"
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "10px 22px",
                    letterSpacing: "0.08em",
                    background: "transparent",
                  }}
                >
                  TALK TO US
                </a>
              </div>
            </Reveal>

            {/* RIGHT — Large editorial model photograph */}
            <Reveal delay={0.1} y={16}>
              <div className="relative w-full">
                <img
                  src="/assets/about/hero-model.png"
                  alt="Deez Prints oversized streetwear T-shirt — editorial campaign"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "700px", objectPosition: "top center" }}
                  loading="eager"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BENEFITS STRIP
          ═══════════════════════════════════════════════════════ */}
      <section
        className="border-t border-b border-white/[0.08]"
        style={{ background: "#080808" }}
      >
        <div className="edge">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {benefits.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.04}>
                <div
                  className="flex flex-col items-center gap-2 text-center"
                  style={{
                    padding: "20px 8px",
                    borderRight: i < benefits.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <b.icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.4} />
                  <p
                    className="text-foreground uppercase"
                    style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em" }}
                  >
                    {b.label}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "10px", lineHeight: 1.45 }}>
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHAT WE DO — Printing methods
          ═══════════════════════════════════════════════════════ */}
      <section className="edge" style={{ paddingTop: "48px", paddingBottom: "48px", background: "#0a0a0a" }}>
        <style>{`
          @media (min-width: 1024px) {
            .about-methods-grid {
              grid-template-columns: 260px 1fr !important;
              gap: 28px !important;
            }
          }
        `}</style>
        <div
          className="about-methods-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "28px", alignItems: "start" }}
        >
          {/* Left — Headline */}
          <Reveal className="flex flex-col">
            <p
              className="text-primary uppercase tracking-[0.18em] mb-3"
              style={{ fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            >
              WHAT WE DO
            </p>
            <h2
              className="text-foreground uppercase leading-[0.92]"
              style={{
                ...condensedFont,
                fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                marginBottom: "4px",
              }}
            >
              PRINTED TO
              <br />
              PERFECTION.
            </h2>
            <p
              className="text-primary uppercase italic leading-[1]"
              style={{
                ...brushFont,
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                marginBottom: "14px",
              }}
            >
              ONLY THE BEST METHODS.
            </p>
            <p
              className="text-muted-foreground mb-5"
              style={{ fontSize: "12px", lineHeight: 1.6, maxWidth: "240px" }}
            >
              We currently use two high quality printing methods to deliver vibrant, durable and detailed
              prints on every piece you order.
            </p>
            <Link
              to="/custom-print"
              className="inline-flex items-center gap-1.5 border border-primary text-primary uppercase tracking-wider transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.97] self-start"
              style={{
                fontSize: "9px",
                fontWeight: 800,
                padding: "9px 14px",
                letterSpacing: "0.08em",
              }}
            >
              LEARN MORE ABOUT PRINTING <ArrowRight className="h-3 w-3" />
            </Link>
          </Reveal>

          {/* Right — Two cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Sublimation */}
            <Reveal delay={0.06}>
              <div className="group relative overflow-hidden border border-white/[0.08] bg-[#0d0d0d] h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/assets/about/sublimation.png"
                    alt="Sublimation printing close-up"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div
                  className="absolute top-3 left-3 bg-primary text-primary-foreground uppercase tracking-[0.12em]"
                  style={{ fontSize: "9px", fontWeight: 800, padding: "4px 8px" }}
                >
                  S
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <h3
                    className="text-foreground uppercase"
                    style={{ ...condensedFont, fontSize: "16px", letterSpacing: "0.04em", marginBottom: "6px" }}
                  >
                    SUBLIMATION PRINTING
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: "11px", lineHeight: 1.55 }}>
                    Vibrant, all-over prints that become part of the fabric. Perfect for bold designs and
                    long lasting color that won&apos;t crack or fade.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* DTF */}
            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden border border-white/[0.08] bg-[#0d0d0d] h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/assets/about/dtf.png"
                    alt="DTF printing close-up"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div
                  className="absolute top-3 left-3 bg-primary text-primary-foreground uppercase tracking-[0.12em]"
                  style={{ fontSize: "9px", fontWeight: 800, padding: "4px 8px" }}
                >
                  DTF
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <h3
                    className="text-foreground uppercase"
                    style={{ ...condensedFont, fontSize: "16px", letterSpacing: "0.04em", marginBottom: "6px" }}
                  >
                    DTF PRINTING
                  </h3>
                  <p className="text-muted-foreground" style={{ fontSize: "11px", lineHeight: 1.55 }}>
                    High detail printing with strong durability and flexibility. Ideal for any fabric and
                    built to last through every wash.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR PROCESS — Horizontal 5 steps
          ═══════════════════════════════════════════════════════ */}
      <section
        className="border-t border-white/[0.08]"
        style={{ paddingTop: "40px", paddingBottom: "48px", background: "#080808" }}
      >
        <div className="edge">
          {/* Section heading */}
          <Reveal className="text-center mb-10">
            <p
              className="text-primary uppercase tracking-[0.2em] mb-3"
              style={{ fontSize: "10px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            >
              OUR PROCESS
            </p>
            <h2
              className="text-foreground uppercase leading-[0.92]"
              style={{ ...condensedFont, fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            >
              SIMPLE. TRANSPARENT. MADE FOR YOU.
            </h2>
          </Reveal>

          {/* Steps row */}
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-2">
            {/* Connecting line */}
            <div
              className="hidden lg:block absolute z-0"
              style={{
                top: "28px",
                left: "10%",
                right: "10%",
                height: "1px",
                background: "rgba(255,255,255,0.08)",
              }}
            />

            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06}>
                <div className="relative z-10 flex flex-col items-center text-center gap-2">
                  {/* Icon circle */}
                  <div
                    className="flex items-center justify-center rounded-full border border-white/[0.12]"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "#0a0a0a",
                      marginBottom: "4px",
                    }}
                  >
                    <s.icon className="text-primary" style={{ width: "18px", height: "18px" }} strokeWidth={1.4} />
                  </div>

                  {/* Number */}
                  <span
                    className="text-primary"
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {s.num}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-foreground uppercase"
                    style={{ ...condensedFont, fontSize: "13px", letterSpacing: "0.06em" }}
                  >
                    {s.title}
                  </h3>

                  {/* Desc */}
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "10px", lineHeight: 1.45, maxWidth: "120px" }}
                  >
                    {s.desc}
                  </p>

                  {/* Arrow to next */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute" style={{ top: "24px", right: "-8px", transform: "translateX(100%)" }}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.35 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                      >
                        <ArrowRight className="text-primary" style={{ width: "10px", height: "10px" }} />
                      </motion.div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
