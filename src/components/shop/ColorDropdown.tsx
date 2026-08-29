import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { COLOR_HEX_MAP } from "@/data/site";
import { cn } from "@/lib/utils";

interface ColorDropdownProps {
  availableColors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export function ColorDropdown({
  availableColors,
  selectedColor,
  onSelectColor,
}: ColorDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const activeHex = COLOR_HEX_MAP[selectedColor] || "#52525b";

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "w-full h-12 px-4 bg-surface border border-border flex items-center justify-between transition-all duration-200 cursor-pointer rounded-none hover:border-primary/60",
          open && "border-primary ring-1 ring-primary"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="w-4 h-4 rounded-full border border-white/20 shrink-0"
            style={{ backgroundColor: activeHex }}
          />
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground truncate">
            {selectedColor || "SELECT COLOR"}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200",
            open && "rotate-180 text-primary"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-surface border border-border shadow-2xl py-1 rounded-none max-h-60 overflow-y-auto scrollbar-none backdrop-blur-md">
          {availableColors.map((c) => {
            const hex = COLOR_HEX_MAP[c] || "#52525b";
            const isSelected = selectedColor === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  onSelectColor(c);
                  setOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-3 flex items-center justify-between transition-colors duration-150 cursor-pointer font-mono text-xs uppercase font-bold tracking-wider text-left",
                  isSelected
                    ? "bg-primary/20 text-primary"
                    : "text-foreground hover:bg-elevated hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: hex }}
                  />
                  <span>{c}</span>
                </div>
                {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
