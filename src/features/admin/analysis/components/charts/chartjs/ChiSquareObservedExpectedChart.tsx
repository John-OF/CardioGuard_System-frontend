import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHARTJS_DEFAULT_OPTIONS } from './ChartJsTheme';
import { transformChiSquareObservedExpectedChart } from '../chartTransformers';
import type { ChiSquareChartData } from '../chartTransformers';
import type { ChiSquareAnalysisData } from '@/types/analysis';

interface ChiSquareObservedExpectedChartProps {
  data: ChiSquareAnalysisData;
}

export function ChiSquareObservedExpectedChart({
  data,
}: ChiSquareObservedExpectedChartProps) {
  const chartData: ChiSquareChartData | null = useMemo(
    () => transformChiSquareObservedExpectedChart(data),
    [data],
  );

  const hasExpected =
    chartData !== null && chartData.expected.length === chartData.observed.length;

  if (!chartData) {
    return (
      <BaseChartJsCard
        title="Frecuencias observadas y esperadas"
        subtitle="Compara los conteos reales con los esperados bajo la hipótesis de independencia."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="El chi-cuadrado evalúa asociación entre variables categóricas. Este gráfico no implica causalidad."
      />
    );
  }

  const barData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Observado',
        data: chartData.observed,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#2563eb',
        borderWidth: 1,
        borderRadius: 4,
      },
      ...(hasExpected
        ? [
            {
              label: 'Esperado',
              data: chartData.expected,
              backgroundColor: 'rgba(16, 185, 129, 0.8)',
              borderColor: '#059669',
              borderWidth: 1,
              borderRadius: 4,
            },
          ]
        : []),
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
    },
    scales: {
      ...CHARTJS_DEFAULT_OPTIONS.scales,
      x: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.x,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Frecuencia',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
      y: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.y,
        title: {
          display: true,
          text: 'Combinación de categorías',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Frecuencias observadas y esperadas"
      subtitle={
        chartData.titleContext
          ? `Compara los conteos reales con los esperados bajo la hipótesis de independencia. ${chartData.titleContext}.`
          : 'Compara los conteos reales con los esperados bajo la hipótesis de independencia.'
      }
      dataAvailable
      methodologicalNote="El chi-cuadrado evalúa asociación entre variables categóricas. Este gráfico no implica causalidad."
    >
      <Bar data={barData} options={options} />
    </BaseChartJsCard>
  );
}
