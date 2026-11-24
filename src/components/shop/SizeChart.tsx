import { cn } from "@/lib/utils";
import {
  ACID_WASH_HOODIE_SIZE_CHART,
  ACID_WASH_SIZE_CHART,
  DROP_SHOULDER_SIZE_CHART,
  HOODIE_SIZE_CHART,
  REGULAR_TEE_SIZE_CHART,
} from "@/data/site";

type SizeChartProps = {
  isDropShoulder?: boolean;
  isAcidWash?: boolean;
  isAcidWashHoodie?: boolean;
  isHoodie?: boolean;
  className?: string;
};

export function SizeChart({
  isDropShoulder,
  isAcidWash,
  isAcidWashHoodie,
  isHoodie,
  className,
}: SizeChartProps) {
  const chartData = isAcidWashHoodie
    ? ACID_WASH_HOODIE_SIZE_CHART
    : isHoodie
    ? HOODIE_SIZE_CHART
    : isAcidWash
    ? ACID_WASH_SIZE_CHART
    : isDropShoulder
    ? DROP_SHOULDER_SIZE_CHART
    : REGULAR_TEE_SIZE_CHART;

  const title = isAcidWashHoodie
    ? "Acid Wash Hoodie Size Chart (S, M, L Only)"
    : isHoodie
    ? "Hoodie Size Chart"
    : isAcidWash
    ? "Acid Wash Size Chart (S, M, L Only)"
    : isDropShoulder
    ? "Drop Shoulder Size Chart"
    : "Regular Fit Size Chart";

  return (
    <div className={cn("border border-border bg-surface/60 p-3.5 sm:p-4 rounded-none", className)}>
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/80">
        <div>
          <span className="label-mono text-xs font-bold uppercase tracking-wider text-primary">
            {title}
          </span>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Measurements in inches (Armpit to Armpit)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left label-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-border/70 text-muted-foreground uppercase text-[10px] tracking-wider">
              <th className="py-2 px-2.5 font-bold">Size</th>
              <th className="py-2 px-2.5 font-bold text-center">Chest</th>
              <th className="py-2 px-2.5 font-bold text-right">Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {chartData.map((row) => (
              <tr key={row.size} className="hover:bg-elevated/50 transition-colors">
                <td className="py-2 px-2.5 font-bold text-foreground">{row.size}</td>
                <td className="py-2 px-2.5 text-center text-foreground font-mono">{row.chest}</td>
                <td className="py-2 px-2.5 text-right text-foreground font-mono">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isAcidWashHoodie || isAcidWash) && (
        <p className="mt-2.5 text-[11px] text-muted-foreground label-mono border-t border-border/40 pt-2">
          {isAcidWashHoodie
            ? "* Acid Wash hoodies are produced in S, M, and L sizes only."
            : "* Acid Wash vintage tees are produced in S, M, and L sizes only."}
        </p>
      )}
    </div>
  );
}

