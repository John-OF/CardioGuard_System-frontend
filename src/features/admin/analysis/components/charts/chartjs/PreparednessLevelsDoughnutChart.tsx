import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHART_TONE_HEX } from '../chartTheme';
import { transformPreparednessLevels } from '../chartTransformers';
import type { PreparednessLevel } from '@/types/analysis';
import type { CategoricalBarItem } from '../CategoricalBarChart';

interface PreparednessLevelsDoughnutChartProps {
  levels: PreparednessLevel[];
}

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

  const backgroundColors = items.map((item) => {
    const hex = item.tone ? CHART_TONE_HEX[item.tone] : undefined;
    return hex ? `${hex}CC` : '#94a3b8CC';
  });

  const borderColors = items.map((item) => {
    return item.tone ? CHART_TONE_HEX[item.tone] : '#94a3b8';
  });

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

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#475569',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
      tooltip: {
        titleFont: { family: 'Inter, system-ui, sans-serif' },
        bodyFont: { family: 'Inter, system-ui, sans-serif' },
        callbacks: {
          label(ctx) {
            const val = ctx.dataset.data?.[ctx.dataIndex] as number | undefined;
            const pct = percentages[ctx.dataIndex];
            const label = ctx.label ?? '';
            if (val == null) return `${label}: —`;
            const pctStr = pct != null ? ` (${pct.toFixed(1)}%)` : '';
            return `${label}: ${val} casos${pctStr}`;
          },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Distribución de niveles de preparación"
      subtitle="Muestra la proporción de evaluaciones agrupadas por nivel global de preparación ante emergencias."
      dataAvailable
      methodologicalNote="Este gráfico resume niveles de preparación educativa y de simulación. No representa diagnóstico clínico."
    >
      <div className="mx-auto flex items-center justify-center" style={{ maxWidth: 360, height: 300 }}>
        <Doughnut data={doughnutData} options={options} />
      </div>
    </BaseChartJsCard>
  );
}
