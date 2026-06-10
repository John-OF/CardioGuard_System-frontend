import { useMemo } from 'react';
import { ChartCard } from './ChartCard';
import { ChartEmptyState } from './ChartEmptyState';
import { transformPrePostScores } from './chartTransformers';
import type { PrePostAnalysisData } from '@/types/analysis';

const PRE_COLOR = '#3b82f6';
const POST_COLOR = '#22c55e';

interface PrePostScoreChartProps {
  data: PrePostAnalysisData | null;
}

interface BarRowProps {
  label: string;
  value: number;
  color: string;
  maxValue: number;
}

function BarRow({ label, value, color, maxValue }: BarRowProps) {
  const percent = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 text-xs text-slate-500">{label}</span>
      <div className="flex-1">
        <div className="h-5 w-full overflow-hidden rounded bg-slate-100">
          <div
            className="h-full rounded transition-all"
            style={{ width: `${percent}%`, backgroundColor: color }}
          />
        </div>
      </div>
      <span className="w-14 shrink-0 text-right text-sm font-medium tabular-nums text-slate-900">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export function PrePostScoreChart({ data }: PrePostScoreChartProps) {
  const seriesData = useMemo(() => transformPrePostScores(data), [data]);
  const dataAvailable = seriesData.length > 0;

  if (!dataAvailable) {
    return (
      <ChartCard
        title="Comparación pre-test/post-test"
        subtitle="Visualiza la variación de puntajes antes y después de la capacitación."
        methodologicalNote="Este gráfico resume resultados educativos y de respuesta ante emergencia. No representa diagnóstico clínico."
      >
        <ChartEmptyState reason="no_data" />
      </ChartCard>
    );
  }

  const maxValue = Math.max(
    ...seriesData.flatMap((s) => [s.preMean, s.postMean]),
  );

  return (
    <ChartCard
      title="Comparación pre-test/post-test"
      subtitle="Visualiza la variación de puntajes antes y después de la capacitación."
      methodologicalNote="Este gráfico resume resultados educativos y de respuesta ante emergencia. No representa diagnóstico clínico."
      footer={
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: PRE_COLOR }} />
            Pre-test
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: POST_COLOR }} />
            Post-test
          </span>
        </div>
      }
    >
      <div className="space-y-5">
        {seriesData.map((item) => (
          <div key={item.category}>
            <h4 className="mb-2 text-sm font-semibold text-slate-700">
              {item.category}
            </h4>
            <div className="space-y-1.5">
              <BarRow
                label="Pre-test"
                value={item.preMean}
                color={PRE_COLOR}
                maxValue={maxValue}
              />
              <BarRow
                label="Post-test"
                value={item.postMean}
                color={POST_COLOR}
                maxValue={maxValue}
              />
            </div>
          </div>
        ))}
        <p className="pt-1 text-right text-xs text-slate-400">
          Escala proporcional al valor máximo ({maxValue.toFixed(1)} pts)
        </p>
      </div>
    </ChartCard>
  );
}
