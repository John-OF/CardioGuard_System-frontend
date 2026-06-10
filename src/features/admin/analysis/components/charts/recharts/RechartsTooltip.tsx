interface TooltipPayloadEntry {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string;
}

interface RechartsTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  suffix?: string;
}

export function RechartsTooltip({ active, payload, label, suffix = '' }: RechartsTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
      {label && (
        <p className="mb-1 text-xs font-medium text-slate-600">{label}</p>
      )}
      {payload.map((entry, i) => (
        <p key={i} className="text-xs text-slate-700">
          <span
            className="mr-1 inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}:{' '}
          <span className="tabular-nums font-medium">
            {entry.value != null ? `${entry.value}${suffix}` : '—'}
          </span>
        </p>
      ))}
    </div>
  );
}
