import { useMemo } from 'react';
import { ChartCard } from './ChartCard';
import { ChartEmptyState } from './ChartEmptyState';
import type { ChartTone } from './chartTheme';
import { CHART_TONE_CLASS } from './chartTheme';

export interface HorizontalMetricItem {
  label: string;
  value: number;
  helperText?: string;
  tone?: ChartTone;
}

interface HorizontalMetricChartProps {
  title?: string;
  subtitle?: string;
  data: HorizontalMetricItem[];
  centerAtZero?: boolean;
  valueFormatter?: (value: number) => string;
  methodologicalNote?: string;
  emptyMessage?: string;
}

export function HorizontalMetricChart({
  title,
  subtitle,
  data,
  centerAtZero = false,
  valueFormatter,
  methodologicalNote,
  emptyMessage = 'No hay datos suficientes para generar este gráfico.',
}: HorizontalMetricChartProps) {
  const hasData = data.length > 0;

  const absMax = useMemo(() => {
    if (!hasData) return 1;
    if (centerAtZero) {
      return Math.max(...data.map((d) => Math.abs(d.value)), 0.01);
    }
    return Math.max(...data.map((d) => d.value), 0.01);
  }, [data, hasData, centerAtZero]);

  const fmt = valueFormatter ?? ((v: number) => v.toFixed(2));

  if (!hasData) {
    return (
      <ChartCard title={title ?? ''} subtitle={subtitle} methodologicalNote={methodologicalNote}>
        <ChartEmptyState message={emptyMessage} />
      </ChartCard>
    );
  }

  return (
    <ChartCard title={title ?? ''} subtitle={subtitle} methodologicalNote={methodologicalNote}>
      <div className="space-y-3">
        {data.map((item) => {
          const barClass = item.tone ? CHART_TONE_CLASS[item.tone] : 'bg-blue-500';

          if (centerAtZero) {
            const pct = (item.value / absMax) * 50;
            const isNegative = item.value < 0;
            const absPct = Math.abs(pct);
            const left = isNegative ? 50 - absPct : 50;

            return (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="tabular-nums text-slate-900">
                    {fmt(item.value)}
                    {item.helperText && (
                      <span className="ml-1.5 text-xs text-slate-400">{item.helperText}</span>
                    )}
                  </span>
                </div>
                <div className="relative h-5 w-full overflow-hidden rounded bg-slate-100">
                  <div
                    className={`absolute top-0 h-full rounded transition-all ${barClass}`}
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(absPct, 0.5)}%`,
                    }}
                  />
                </div>
              </div>
            );
          }

          const widthPct = (item.value / absMax) * 100;
          return (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="tabular-nums text-slate-900">
                  {fmt(item.value)}
                  {item.helperText && (
                    <span className="ml-1.5 text-xs text-slate-400">{item.helperText}</span>
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
    </ChartCard>
  );
}
