import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHARTJS_DEFAULT_OPTIONS } from './ChartJsTheme';
import { CHART_TONE_HEX } from '../chartTheme';
import { transformPreparednessLevels } from '../chartTransformers';
import type { PreparednessLevel } from '@/types/analysis';
import type { CategoricalBarItem } from '../CategoricalBarChart';

interface PreparednessLevelsDoughnutChartProps {
  levels: PreparednessLevel[];
}

const TONE_MAP: Record<string, keyof typeof CHART_TONE_HEX> = {
  baja: 'highRisk',
  bajo: 'highRisk',
  media: 'moderateRisk',
  moderada: 'moderateRisk',
  alta: 'lowRisk',
  alto: 'lowRisk',
};

export function PreparednessLevelsDoughnutChart({
  levels,
}: PreparednessLevelsDoughnutChartProps) {
  const items: CategoricalBarItem[] = useMemo(
    () => transformPreparednessLevels(levels),
    [levels],
  );

  if (items.length === 0) {
    return (
      <BaseChartJsCard
        title="Distribución de niveles de preparación"
        subtitle="Muestra la proporción de evaluaciones agrupadas por nivel global de preparación ante emergencias."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="Este gráfico resume niveles de preparación educativa y de simulación. No representa diagnóstico clínico."
      />
    );
  }

  const labels = items.map((item) => item.label);
  const values = items.map((item) => item.value);
  const percentages = items.map((item) => item.percentage);

  const toneKeys = items.map((item) => {
    const lower = item.label.toLowerCase();
    return TONE_MAP[lower] ?? 'neutral';
  });

  const backgroundColors = toneKeys.map((k) => {
    const hex = CHART_TONE_HEX[k];
    return hex ? `${hex}CC` : '#94a3b8CC';
  });

  const borderColors = toneKeys.map((k) => CHART_TONE_HEX[k] ?? '#94a3b8');

  const doughnutData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...CHARTJS_DEFAULT_OPTIONS,
    plugins: {
      ...CHARTJS_DEFAULT_OPTIONS.plugins,
      legend: {
        ...CHARTJS_DEFAULT_OPTIONS.plugins.legend,
        display: true,
        position: 'bottom' as const,
      },
      tooltip: {
        ...CHARTJS_DEFAULT_OPTIONS.plugins.tooltip,
        callbacks: {
          label(ctx: { dataset: { data?: number[] }; dataIndex: number; label?: string }) {
            const val = ctx.dataset.data?.[ctx.dataIndex];
            const pct = percentages[ctx.dataIndex];
            const label = ctx.label ?? '';
            if (val == null) return `${label}: —`;
            const pctStr = pct != null ? ` (${pct.toFixed(1)}%)` : '';
            return `${label}: ${val} casos${pctStr}`;
          },
        },
      },
    },
    cutout: '55%',
  };

  return (
    <BaseChartJsCard
      title="Distribución de niveles de preparación"
      subtitle="Muestra la proporción de evaluaciones agrupadas por nivel global de preparación ante emergencias."
      dataAvailable
      methodologicalNote="Este gráfico resume niveles de preparación educativa y de simulación. No representa diagnóstico clínico."
    >
      <div className="mx-auto" style={{ maxWidth: 360, height: 300 }}>
        <Doughnut data={doughnutData} options={options} />
      </div>
    </BaseChartJsCard>
  );
}
