import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-3 px-7 py-4 font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 rounded active:scale-95 disabled:opacity-40 disabled:pointer-events-none shadow-md";

const variants = {
  solid: "bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
  outline: "border-2 border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
  ghost: "text-foreground hover:text-primary",
};

export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = "solid",
  className,
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });
  const inner = { x: useTransform(x, (v) => v * 0.4), y: useTransform(y, (v) => v * 0.4) };

  function move(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const content = (
    <motion.span style={inner} className="inline-flex items-center gap-3">
      {children}
    </motion.span>
  );

  const cls = cn(base, variants[variant], className);

  return (
    <motion.span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-flex"
    >
      {to ? (
        <Link to={to} className={cls}>
          {content}
        </Link>
      ) : href ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {content}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>
          {content}
        </button>
      )}
    </motion.span>
  );
}
