import { cn } from "@/lib/utils";

type SizeChartProps = {
  isDropShoulder: boolean;
  className?: string;
};

export function SizeChart({ isDropShoulder, className }: SizeChartProps) {
  const chartData = isDropShoulder
    ? [
        { size: "Small", chest: '21"', length: '27"' },
        { size: "Medium", chest: '22"', length: '28"' },
        { size: "Large", chest: '23"', length: '29"' },
        { size: "XL", chest: '24"', length: '30"' },
      ]
    : [
        { size: "Small", chest: '19"', length: '26"' },
        { size: "Medium", chest: '20"', length: '27"' },
        { size: "Large", chest: '21"', length: '28"' },
        { size: "XL", chest: '22"', length: '29"' },
        { size: "XXL", chest: '23"', length: '30"' },
      ];

  return (
    <div className={cn("border border-border bg-surface/60 p-3.5 sm:p-4 rounded-none", className)}>
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/80">
        <div>
          <span className="label-mono text-xs font-bold uppercase tracking-wider text-primary">
            {isDropShoulder ? "Drop Shoulder Size Chart" : "Regular Fit Size Chart"}
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
    </div>
  );
}
