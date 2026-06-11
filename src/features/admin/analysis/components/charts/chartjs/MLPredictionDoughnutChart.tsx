import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { transformRiskLevelDistributionChartJs } from '../chartTransformers';
import type { ChartJsBucketData } from '../chartTransformers';

interface MLPredictionDoughnutChartProps {
  data: unknown;
}

export function MLPredictionDoughnutChart({ data }: MLPredictionDoughnutChartProps) {
  const chartData: ChartJsBucketData | null = useMemo(
    () => transformRiskLevelDistributionChartJs(data),
    [data],
  );

  if (!chartData) {
    return (
      <BaseChartJsCard
        title="Distribución de predicción ML"
        subtitle="Muestra la proporción de evaluaciones clasificadas por el modelo ML."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="La predicción ML es un apoyo preventivo del sistema. No representa diagnóstico clínico."
      />
    );
  }

  const bgColors = chartData.colors?.map((c) => `${c}CC`) ?? [];
  const borderColors = chartData.colors ?? [];

  const doughnutData = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.values,
        backgroundColor: bgColors,
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
            const val = ctx.dataset.data[ctx.dataIndex] as number | undefined;
            const pct = chartData.percentages?.[ctx.dataIndex];
            const label = ctx.label ?? '';
            if (val == null) return `${label}: —`;
            const pctStr = pct != null ? ` (${pct.toFixed(1)}%)` : '';
            return `${label}: ${val} evaluaciones${pctStr}`;
          },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Distribución de predicción ML"
      subtitle="Muestra la proporción de evaluaciones clasificadas por el modelo ML."
      dataAvailable
      methodologicalNote="La predicción ML es un apoyo preventivo del sistema. No representa diagnóstico clínico."
    >
      <div className="mx-auto flex items-center justify-center" style={{ maxWidth: 360, height: 300 }}>
        <Doughnut data={doughnutData} options={options} />
      </div>
    </BaseChartJsCard>
  );
}
