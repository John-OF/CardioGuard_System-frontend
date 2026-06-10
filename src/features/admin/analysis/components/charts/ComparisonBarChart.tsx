import { useMemo } from 'react';
import { ChartCard } from './ChartCard';
import { ChartEmptyState } from './ChartEmptyState';
import type { ChartTone } from './chartTheme';
import { CHART_TONE_HEX } from './chartTheme';
import { ChartLegend } from './ChartLegend';
import type { ChartLegendItem } from './ChartLegend';

export interface ComparisonBarItem {
  label: string;
  firstLabel: string;
  firstValue: number;
  secondLabel: string;
  secondValue: number;
}

interface ComparisonBarChartProps {
  title?: string;
  subtitle?: string;
  data: ComparisonBarItem[];
  methodologicalNote?: string;
  emptyMessage?: string;
  valueSuffix?: string;
  firstTone?: ChartTone;
  secondTone?: ChartTone;
}

export function ComparisonBarChart({
  title,
  subtitle,
  data,
  methodologicalNote,
  emptyMessage = 'No hay datos suficientes para generar este gráfico.',
  valueSuffix = '',
  firstTone = 'preTest',
  secondTone = 'postTest',
}: ComparisonBarChartProps) {
  const hasData = data.length > 0;

  const maxValue = useMemo(() => {
    if (!hasData) return 1;
    return Math.max(...data.flatMap((d) => [d.firstValue, d.secondValue]));
  }, [data, hasData]);

  const firstColor = CHART_TONE_HEX[firstTone];
  const secondColor = CHART_TONE_HEX[secondTone];

  if (!hasData) {
    return (
      <ChartCard title={title ?? ''} subtitle={subtitle} methodologicalNote={methodologicalNote}>
        <ChartEmptyState message={emptyMessage} />
      </ChartCard>
    );
  }

  const legendItems: ChartLegendItem[] = [
    { label: data[0]?.firstLabel ?? 'Primero', tone: firstTone },
    { label: data[0]?.secondLabel ?? 'Segundo', tone: secondTone },
  ];

  function renderBar(value: number, color: string, label: string) {
    const widthPct = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
      <div className="flex items-center gap-2">
        <span className="w-14 shrink-0 text-xs text-slate-500">{label}</span>
        <div className="flex-1">
          <div className="h-5 w-full overflow-hidden rounded bg-slate-100">
            <div
              className="h-full rounded transition-all"
              style={{ width: `${Math.max(widthPct, 0.5)}%`, backgroundColor: color }}
            />
          </div>
        </div>
        <span className="w-14 shrink-0 text-right text-sm font-medium tabular-nums text-slate-900">
          {value.toFixed(1)}{valueSuffix}
        </span>
      </div>
    );
  }

  return (
    <ChartCard
      title={title ?? ''}
      subtitle={subtitle}
      methodologicalNote={methodologicalNote}
      footer={<ChartLegend items={legendItems} />}
    >
      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.label}>
            <h4 className="mb-2 text-sm font-semibold text-slate-700">
              {item.label}
            </h4>
            <div className="space-y-1.5">
              {renderBar(item.firstValue, firstColor, item.firstLabel)}
              {renderBar(item.secondValue, secondColor, item.secondLabel)}
            </div>
          </div>
        ))}
        <p className="pt-1 text-right text-xs text-slate-400">
          Escala proporcional al valor máximo ({maxValue.toFixed(1)}{valueSuffix})
        </p>
      </div>
    </ChartCard>
  );
}
