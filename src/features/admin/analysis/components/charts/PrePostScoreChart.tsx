import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import './chartjs/ChartJsRegistry';
import { BaseChartJsCard } from './chartjs/BaseChartJsCard';
import { CHARTJS_DEFAULT_OPTIONS } from './chartjs/ChartJsTheme';
import { transformPrePostToComparison } from './chartTransformers';
import type { PrePostAnalysisData } from '@/types/analysis';

interface PrePostScoreChartProps {
  data: PrePostAnalysisData | null;
}

export function PrePostScoreChart({ data }: PrePostScoreChartProps) {
  const items = useMemo(() => transformPrePostToComparison(data), [data]);

  if (items.length === 0) {
    return (
      <BaseChartJsCard
        title="Comparación pre-test/post-test"
        subtitle="Visualiza la variación de puntajes antes y después de la capacitación."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="Este gráfico resume resultados educativos y de respuesta ante emergencia. No representa diagnóstico clínico."
      />
    );
  }

  const labels = items.map((item) => item.label);
  const preValues = items.map((item) => item.firstValue);
  const postValues = items.map((item) => item.secondValue);
  const maxVal = Math.max(...items.flatMap((i) => [i.firstValue, i.secondValue]));

  const barData = {
    labels,
    datasets: [
      {
        label: 'Pre-test',
        data: preValues,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Post-test',
        data: postValues,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    ...CHARTJS_DEFAULT_OPTIONS,
    indexAxis: 'y' as const,
    plugins: {
      ...CHARTJS_DEFAULT_OPTIONS.plugins,
      legend: {
        ...CHARTJS_DEFAULT_OPTIONS.plugins.legend,
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        ...CHARTJS_DEFAULT_OPTIONS.plugins.tooltip,
        callbacks: {
          label(ctx: { dataset: { label?: string }; parsed: { x: number | null } }) {
            const val = ctx.parsed.x;
            return `${ctx.dataset.label ?? ''}: ${val != null ? val.toFixed(1) : '—'} pts`;
          },
        },
      },
    },
    scales: {
      ...CHARTJS_DEFAULT_OPTIONS.scales,
      x: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.x,
        beginAtZero: true,
        max: Math.ceil(maxVal * 1.15) || 10,
        title: {
          display: true,
          text: 'Puntaje promedio',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
      y: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.y,
        title: {
          display: true,
          text: 'Dimensión evaluada',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Comparación pre-test/post-test"
      subtitle="Visualiza la variación de puntajes antes y después de la capacitación."
      dataAvailable
      methodologicalNote="Este gráfico resume resultados educativos y de respuesta ante emergencia. No representa diagnóstico clínico."
    >
      <Bar data={barData} options={options} />
    </BaseChartJsCard>
  );
}
