import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import doomsdayLogo from "@/assets/doomsday-logo.png";

// Avengers: Doomsday theatrical release date: December 18, 2026
const DOOMSDAY_RELEASE_MS = new Date("2026-12-18T00:00:00Z").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, DOOMSDAY_RELEASE_MS - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function useDoomsdayCountdown(): TimeLeft | null {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

export function DoomsdayHeroWidget() {
  const timeLeft = useDoomsdayCountdown();

  const units = [
    { label: "DAYS", value: timeLeft ? pad(timeLeft.days) : "--" },
    { label: "HOURS", value: timeLeft ? pad(timeLeft.hours) : "--" },
    { label: "MINUTES", value: timeLeft ? pad(timeLeft.minutes) : "--" },
    { label: "SECONDS", value: timeLeft ? pad(timeLeft.seconds) : "--" },
  ];

  return (
    <div className="w-full max-w-[330px] lg:max-w-[276px] xl:max-w-[308px] 2xl:max-w-[324px] flex flex-col items-center text-center">
      {/* Avengers: Doomsday Logo */}
      <img
        src={doomsdayLogo}
        alt="Avengers: Doomsday"
        width={450}
        height={250}
        className="w-[185px] sm:w-[230px] lg:w-[236px] xl:w-[272px] 2xl:w-[290px] h-auto object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] select-none"
      />

      <p className="-mt-2.5 lg:-mt-2.5 xl:-mt-3 mb-2.5 lg:mb-3 xl:mb-4 text-[9.5px] lg:text-[10px] xl:text-[11px] font-black uppercase tracking-[0.42em] text-white/75">
        Collection
      </p>

      {/* Corner-bracketed timer + CTA panel */}
      <div className="relative w-full px-3.5 py-3 lg:px-3.5 lg:py-3.5 xl:px-4 xl:py-4 bg-black/70 backdrop-blur-sm">
        {/* Corner brackets */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-3 w-3 lg:h-3.5 lg:w-3.5 border-l-2 border-t-2 border-[color:var(--accent)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-3 w-3 lg:h-3.5 lg:w-3.5 border-r-2 border-t-2 border-[color:var(--accent)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 lg:h-3.5 lg:w-3.5 border-b-2 border-l-2 border-[color:var(--accent)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 lg:h-3.5 lg:w-3.5 border-b-2 border-r-2 border-[color:var(--accent)]"
        />

        <p className="mb-2 lg:mb-2.5 xl:mb-3 text-[8.5px] lg:text-[9.5px] xl:text-[10px] font-black uppercase tracking-[0.34em] text-white/70">
          Doomsday Arrives In
        </p>

        {/* 4 countdown boxes */}
        <div className="grid grid-cols-4 gap-1.5 xl:gap-2">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center">
              <div className="flex h-[42px] lg:h-[46px] xl:h-[52px] w-full items-center justify-center rounded border border-white/25 bg-black/80 font-display text-[19px] lg:text-[22px] xl:text-[25px] font-black tracking-wider text-white tabular-nums shadow-inner">
                {u.value}
              </div>
              <span className="mt-1 lg:mt-1.5 text-[7px] xl:text-[8px] font-bold uppercase tracking-[0.2em] text-white/55">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons: full-width Doom Drop + 2 smaller side-by-side (Shop All + Custom) on mobile/tablet; single full-width on desktop */}
        <div className="mt-3 flex flex-col gap-2 lg:hidden">
          <Link
            to="/doomsday"
            className="doomsday-cta group flex h-[44px] w-full items-center justify-center gap-2 rounded px-4 text-[11px] font-black uppercase tracking-[0.2em]"
          >
            <span className="relative z-10">Doom Drop</span>
            <ArrowRight className="relative z-10 h-3.5 w-3.5 shrink-0 stroke-[2.75] text-[#4ade80] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#86efac]" />
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/collections"
              className="group flex h-[38px] items-center justify-center gap-1.5 rounded border border-white/25 bg-white/[0.08] px-2.5 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.98]"
            >
              <span>Shop All</span>
              <ArrowRight className="h-3 w-3 shrink-0 stroke-[3] transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/custom-print"
              className="group flex h-[38px] items-center justify-center gap-1.5 rounded border border-white/25 bg-white/[0.06] px-2.5 text-[10px] font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.98]"
            >
              <span>Custom</span>
              <ArrowRight className="h-3 w-3 shrink-0 stroke-[3] transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <Link
          to="/doomsday"
          className="doomsday-cta group mt-3.5 xl:mt-4 hidden lg:flex h-[44px] w-full items-center justify-center gap-2.5 rounded px-4 xl:px-5 text-[10.5px] xl:text-[11px] font-black uppercase tracking-[0.2em]"
        >
          <span className="relative z-10">Explore the Collection</span>
          <ArrowRight className="relative z-10 h-3.5 w-3.5 shrink-0 stroke-[2.75] text-[#4ade80] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#86efac]" />
        </Link>
      </div>
    </div>
  );
}
