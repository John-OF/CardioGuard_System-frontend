import { useMemo } from 'react';
import { ChartCard } from './ChartCard';
import { ChartEmptyState } from './ChartEmptyState';
import type { ChartTone } from './chartTheme';
import { CHART_TONE_CLASS } from './chartTheme';
import { ChartLegend } from './ChartLegend';
import type { ChartLegendItem } from './ChartLegend';

export interface CategoricalBarItem {
  label: string;
  value: number;
  percentage?: number;
  tone?: ChartTone;
}

interface CategoricalBarChartProps {
  title?: string;
  subtitle?: string;
  data: CategoricalBarItem[];
  valueLabel?: string;
  emptyMessage?: string;
  methodologicalNote?: string;
  showPercentages?: boolean;
  maxValue?: number;
}

export function CategoricalBarChart({
  title,
  subtitle,
  data,
  valueLabel,
  emptyMessage = 'No hay datos suficientes para generar este gráfico.',
  methodologicalNote,
  showPercentages = false,
  maxValue: maxValueProp,
}: CategoricalBarChartProps) {
  const hasData = data.length > 0;

  const maxValue = useMemo(() => {
    if (maxValueProp != null) return maxValueProp;
    if (!hasData) return 1;
    return Math.max(...data.map((d) => d.value));
  }, [data, maxValueProp, hasData]);

  if (!hasData) {
    return (
      <ChartCard title={title ?? ''} subtitle={subtitle} methodologicalNote={methodologicalNote}>
        <ChartEmptyState message={emptyMessage} />
      </ChartCard>
    );
  }

  const legendItems: ChartLegendItem[] = data
    .filter((d) => d.tone)
    .map((d) => ({ label: d.label, tone: d.tone }));

  return (
    <ChartCard title={title ?? ''} subtitle={subtitle} methodologicalNote={methodologicalNote}>
      <div className="space-y-3">
        {data.map((item) => {
          const widthPct = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          const barClass = item.tone ? CHART_TONE_CLASS[item.tone] : 'bg-blue-500';

          return (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="tabular-nums text-slate-900">
                  {item.value.toFixed(1)}
                  {valueLabel && <span className="ml-0.5 text-xs text-slate-400">{valueLabel}</span>}
                  {showPercentages && item.percentage != null && (
                    <span className="ml-1.5 text-xs text-slate-400">
                      ({item.percentage.toFixed(1)}%)
                    </span>
                  )}
                </span>
              </div>
              <div className="h-5 w-full overflow-hidden rounded bg-slate-100">
                <div
                  className={`h-full rounded transition-all ${barClass}`}
                  style={{ width: `${Math.max(widthPct, 0.5)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {legendItems.length > 0 && (
        <ChartLegend items={legendItems} className="mt-4" />
      )}
    </ChartCard>
  );
}
