import type { ChartTone } from './chartTheme';
import { CHART_TONE_CLASS } from './chartTheme';

export interface ChartLegendItem {
  label: string;
  tone?: ChartTone;
  colorClassName?: string;
}

interface ChartLegendProps {
  items: ChartLegendItem[];
  className?: string;
}

export function ChartLegend({ items, className = '' }: ChartLegendProps) {
  if (items.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {items.map((item, i) => {
        const colorClass = item.colorClassName ?? (item.tone ? CHART_TONE_CLASS[item.tone] : 'bg-slate-300');
        return (
          <span key={i} className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <span className={`inline-block h-2.5 w-2.5 rounded-sm ${colorClass}`} />
            {item.label}
          </span>
        );
      })}
    </div>
  );
}
