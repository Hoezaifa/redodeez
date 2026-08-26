import { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

/**
 * Reusable accordion row with accessible expand/collapse behavior.
 * Uses native <button> for keyboard support + ARIA attributes
 * for screen readers. Smooth height animation via motion/react.
 */
export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="accordion-item border-b border-border/60">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={contentId}
        className={cn(
          "flex w-full items-center justify-between py-4 md:py-5 text-left transition-colors duration-200 group cursor-pointer",
          "hover:text-primary focus-visible:text-primary",
        )}
      >
        <span
          className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.1em] uppercase text-foreground group-hover:text-primary transition-colors duration-200"
        >
          {title}
        </span>

        {/* +/− indicator */}
        <span
          className={cn(
            "shrink-0 ml-4 w-6 h-6 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all duration-300",
            open && "text-primary",
          )}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="transition-transform duration-300"
          >
            {/* Horizontal line (always visible) */}
            <line x1="1" y1="7" x2="13" y2="7" />
            {/* Vertical line (hidden when open) */}
            <line
              x1="7"
              y1="1"
              x2="7"
              y2="13"
              className={cn(
                "origin-center transition-all duration-300",
                open ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100",
              )}
              style={{
                transformOrigin: "center",
                transform: open ? "scaleY(0)" : "scaleY(1)",
                opacity: open ? 0 : 1,
                transition: "transform 0.3s ease, opacity 0.3s ease",
              }}
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-[13px] md:text-sm text-muted-foreground leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
