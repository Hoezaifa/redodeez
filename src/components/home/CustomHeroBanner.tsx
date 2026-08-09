import { Link } from "@tanstack/react-router";
import { ArrowRight, Upload, Printer, Shirt, Globe } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { LOGO_URL } from "@/data/site";

const MOCKUP_IMG = "/assets/custom_print_mockup.webp";

export function CustomHeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] border-y border-zinc-800/60">
      {/* ── Paint splatter decorative elements ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-right orange splatter */}
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] opacity-[0.08] blur-sm"
          style={{
            background: "radial-gradient(ellipse at center, #f97316 0%, transparent 70%)",
          }}
        />
        {/* Bottom-left subtle glow */}
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-[0.05]"
          style={{
            background: "radial-gradient(ellipse at center, #f97316 0%, transparent 70%)",
          }}
        />
        {/* Scattered paint dots */}
        <div className="absolute top-8 right-[30%] w-1 h-1 rounded-full bg-primary/40" />
        <div className="absolute top-16 right-[25%] w-1.5 h-1.5 rounded-full bg-primary/25" />
        <div className="absolute bottom-12 left-[15%] w-1 h-1 rounded-full bg-primary/30" />
        <div className="absolute top-[40%] right-[10%] w-2 h-2 rounded-full bg-primary/15" />
      </div>

      {/* ── Scan lines overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* ── Corner crosshair decorations ── */}
      <div className="absolute top-4 left-4 z-[2] hidden lg:block">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary/40">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-4 right-4 z-[2] hidden lg:block">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary/40">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 z-[2] hidden lg:block">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary/40">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 z-[2] hidden lg:block">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-primary/40">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Outer frame border ── */}
      <div className="absolute inset-2 border border-zinc-700/30 pointer-events-none z-[2] hidden lg:block" />

      <div className="relative z-10 edge">
        {/* ═══════════ MOBILE LAYOUT ═══════════ */}
        <div className="flex flex-col items-center text-center py-10 md:hidden">
          <Reveal>
            {/* Logo + badge */}
            <div className="flex items-center gap-3 mb-5">
              <img src={LOGO_URL} alt="Deez Prints" className="h-5 w-auto" />
              <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">
                <Globe className="w-3 h-3 text-zinc-500" />
                Printed in Pakistan
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-[40px] sm:text-5xl font-black uppercase tracking-tight text-white leading-[0.92]">
              YOUR DESIGN.
              <br />
              <span className="text-primary">NO LIMITS.</span>
            </h2>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-3 max-w-[260px] mx-auto">
              From concept to fabric.
              <br />
              We print it <span className="text-primary font-semibold italic">your way</span>.
            </p>
          </Reveal>

          {/* Mockup with print area frame */}
          <Reveal delay={0.1}>
            <div className="relative w-full max-w-[300px] aspect-[4/5] my-6 mx-auto">
              <div className="relative w-full h-full overflow-hidden bg-zinc-950 border border-zinc-800/60">
                <img
                  src={MOCKUP_IMG}
                  alt="Custom Print T-Shirt"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Print area corners */}
                <div className="absolute top-[15%] left-[18%] w-3 h-3 border-l-2 border-t-2 border-primary" />
                <div className="absolute top-[15%] right-[18%] w-3 h-3 border-r-2 border-t-2 border-primary" />
                <div className="absolute bottom-[25%] left-[18%] w-3 h-3 border-l-2 border-b-2 border-primary" />
                <div className="absolute bottom-[25%] right-[18%] w-3 h-3 border-r-2 border-b-2 border-primary" />
                {/* "PRINT AREA" label */}
                <div className="absolute top-[12%] left-1/2 -translate-x-1/2 bg-primary/90 px-2 py-0.5 text-[8px] font-mono font-black text-black uppercase tracking-widest">
                  Print Area
                </div>
                {/* "YOUR DESIGN HERE" overlay */}
                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                  <p className="font-display text-2xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    YOUR
                    <br />
                    DESIGN
                    <br />
                    HERE
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Steps row */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-3 gap-2 w-full mb-5">
              <div className="flex flex-col items-center gap-1.5 py-3 px-2 bg-zinc-900/60 border border-zinc-800/50">
                <Upload className="w-4 h-4 text-primary" />
                <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">Upload</p>
                <p className="text-[9px] text-zinc-500 font-sans">Your design</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 py-3 px-2 bg-zinc-900/60 border border-zinc-800/50">
                <Printer className="w-4 h-4 text-primary" />
                <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">We Print</p>
                <p className="text-[9px] text-zinc-500 font-sans">Premium quality</p>
              </div>
              <div className="flex flex-col items-center gap-1.5 py-3 px-2 bg-zinc-900/60 border border-zinc-800/50">
                <Shirt className="w-4 h-4 text-primary" />
                <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">You Wear</p>
                <p className="text-[9px] text-zinc-500 font-sans">Delivered to you</p>
              </div>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Link
                to="/custom-print"
                className="w-full sm:flex-1 py-3.5 bg-primary text-black font-mono font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2.5 hover:bg-primary/90 transition-colors active:scale-[0.98]"
              >
                Start Customizing <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
              <Link
                to="/collections/$slug"
                params={{ slug: "graphic" }}
                className="w-full sm:flex-1 py-3.5 bg-transparent border border-zinc-600 text-white font-mono font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2.5 hover:border-primary hover:text-primary transition-colors active:scale-[0.98]"
              >
                See Examples <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ═══════════ DESKTOP LAYOUT ═══════════ */}
        <div className="hidden md:grid grid-cols-12 gap-0 items-stretch py-10 lg:py-14 min-h-[380px]">
          {/* ── Left Column: Branding + Heading + Steps + CTAs ── */}
          <div className="col-span-5 flex flex-col justify-center pr-8 lg:pr-12 pl-4 lg:pl-8">
            <Reveal>
              {/* Logo + "Printed in Pakistan" */}
              <div className="flex items-center gap-3 mb-6">
                <img src={LOGO_URL} alt="Deez Prints" className="h-6 w-auto" />
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">
                  <Globe className="w-3 h-3 text-zinc-600" />
                  Printed in Pakistan
                </span>
              </div>

              {/* Main heading */}
              <h2 className="font-display text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[0.92]">
                YOUR DESIGN.
                <br />
                <span className="text-primary">NO LIMITS.</span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-zinc-400 font-sans leading-relaxed mt-4 max-w-sm">
                From concept to fabric.
                <br />
                We print it <span className="text-primary font-semibold italic">your way</span>.
              </p>
            </Reveal>

            {/* 3 Steps — horizontal */}
            <Reveal delay={0.1}>
              <div className="flex items-start gap-6 mt-7 pt-5 border-t border-zinc-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center border border-zinc-700 text-primary">
                    <Upload className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">Upload</p>
                    <p className="text-[9px] text-zinc-500 font-sans">Your design</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center border border-zinc-700 text-primary">
                    <Printer className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">We Print</p>
                    <p className="text-[9px] text-zinc-500 font-sans">Premium quality</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center border border-zinc-700 text-primary">
                    <Shirt className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">You Wear</p>
                    <p className="text-[9px] text-zinc-500 font-sans">Delivered to you</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={0.15}>
              <div className="flex items-center gap-3 mt-7">
                <Link
                  to="/custom-print"
                  className="py-3.5 px-7 bg-primary text-black font-mono font-black uppercase text-[11px] tracking-[0.15em] flex items-center gap-2.5 hover:bg-primary/90 transition-colors active:scale-[0.98] shadow-lg shadow-primary/20"
                >
                  Start Customizing <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
                <Link
                  to="/collections/$slug"
                  params={{ slug: "graphic" }}
                  className="py-3.5 px-7 bg-transparent border border-zinc-600 text-white font-mono font-black uppercase text-[11px] tracking-[0.15em] flex items-center gap-2.5 hover:border-primary hover:text-primary transition-colors active:scale-[0.98]"
                >
                  See Examples <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ── Center Column: T-Shirt mockup with print area markers ── */}
          <div className="col-span-5 relative flex items-center justify-center">
            <Reveal delay={0.15}>
              <div className="relative w-full max-w-[420px] mx-auto">
                {/* Orange paint splatter behind mockup */}
                <div
                  className="absolute -inset-8 z-0 opacity-20"
                  style={{
                    background: "radial-gradient(ellipse at 60% 50%, #f97316 0%, transparent 60%)",
                    filter: "blur(30px)",
                  }}
                />

                {/* Mockup image */}
                <div className="relative z-10 w-full aspect-[4/5] overflow-hidden">
                  <img
                    src={MOCKUP_IMG}
                    alt="Custom Print T-Shirt Mockup"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  {/* Print area corner brackets — large prominent */}
                  <div className="absolute top-[12%] left-[15%] w-5 h-5 border-l-[2.5px] border-t-[2.5px] border-primary" />
                  <div className="absolute top-[12%] right-[15%] w-5 h-5 border-r-[2.5px] border-t-[2.5px] border-primary" />
                  <div className="absolute bottom-[22%] left-[15%] w-5 h-5 border-l-[2.5px] border-b-[2.5px] border-primary" />
                  <div className="absolute bottom-[22%] right-[15%] w-5 h-5 border-r-[2.5px] border-b-[2.5px] border-primary" />

                  {/* "PRINT AREA" tag */}
                  <div className="absolute top-[9%] left-1/2 -translate-x-1/2 bg-primary px-3 py-1 text-[9px] font-mono font-black text-black uppercase tracking-[0.2em]">
                    Print Area
                  </div>

                  {/* "YOUR DESIGN HERE" text */}
                  <div className="absolute top-[28%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                    <p className="font-display text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      YOUR
                      <br />
                      DESIGN
                      <br />
                      HERE
                    </p>
                  </div>

                  {/* Deez Prints circular badge */}
                  <div className="absolute bottom-[8%] left-[8%] w-14 h-14 rounded-full border-2 border-primary/60 flex items-center justify-center opacity-60">
                    <span className="text-[6px] font-mono font-black text-primary uppercase leading-tight text-center">
                      Deez
                      <br />
                      Prints
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: "MAKE IT YOURS" sidebar ── */}
          <div className="col-span-2 flex flex-col justify-center pl-4 border-l border-zinc-800/40">
            <Reveal delay={0.25}>
              <div className="space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <p className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.2em]">
                    Make It Yours
                  </p>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-primary/60">
                    <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Step list */}
                {[
                  { icon: Shirt, label: "Pick your tee" },
                  { icon: Upload, label: "Upload your design" },
                  { icon: Printer, label: "We print it" },
                  { icon: Shirt, label: "You wear it" },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 flex items-center justify-center border border-zinc-700/60 text-primary/70 group-hover:border-primary/50 transition-colors shrink-0">
                      <step.icon className="w-3 h-3" />
                    </div>
                    <p className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
