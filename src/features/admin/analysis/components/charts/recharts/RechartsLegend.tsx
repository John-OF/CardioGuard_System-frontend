interface LegendPayloadEntry {
  color?: string;
  value?: string;
  id?: string;
  type?: string;
}

interface RechartsLegendProps {
  payload?: LegendPayloadEntry[];
}

export function RechartsLegend({ payload }: RechartsLegendProps) {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
      {payload.map((entry, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600"
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </span>
      ))}
    </div>
  );
}
