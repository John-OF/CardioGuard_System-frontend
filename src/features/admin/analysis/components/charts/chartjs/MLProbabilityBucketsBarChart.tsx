import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHART_TONE_HEX } from '../chartTheme';
import { transformMLProbabilityBucketsChartJs } from '../chartTransformers';
import type { ChartJsBucketData } from '../chartTransformers';

interface MLProbabilityBucketsBarChartProps {
  data: unknown;
}

export function MLProbabilityBucketsBarChart({ data }: MLProbabilityBucketsBarChartProps) {
  const chartData: ChartJsBucketData | null = useMemo(
    () => transformMLProbabilityBucketsChartJs(data),
    [data],
  );

  if (!chartData) {
    return (
      <BaseChartJsCard
        title="Distribución de probabilidad ML"
        subtitle="Agrupa la probabilidad ML del perfil inicial de la cohorte metodológica."
        dataAvailable={false}
        emptyMessage="No existen resultados del sistema suficientes para calcular esta métrica en la cohorte metodológica."
        methodologicalNote="La probabilidad ML usa el primer pre-test con ciclo completo por usuario anónimo."
      />
    );
  }

  const maxVal = Math.max(...chartData.values, 1);
  const bgColor = `${CHART_TONE_HEX.ml}CC`;
  const borderColor = CHART_TONE_HEX.ml;

  const barData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Usuarios con ciclo completo',
        data: chartData.values,
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: { family: 'Inter, system-ui, sans-serif' },
        bodyFont: { family: 'Inter, system-ui, sans-serif' },
        callbacks: {
          label(ctx) {
            const val = ctx.parsed.x;
            if (val == null) return '—';
            const pct = chartData.percentages?.[ctx.dataIndex];
            const pctStr = pct != null ? ` (${pct.toFixed(1)}%)` : '';
            return `${val} usuarios con ciclo completo${pctStr}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: Math.ceil(maxVal * 1.25) || 5,
        ticks: {
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif' },
          stepSize: 1,
        },
        grid: { color: '#f1f5f9' },
        title: {
          display: true,
          text: 'Usuarios con ciclo completo',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
      y: {
        ticks: {
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif' },
        },
        grid: { color: '#f1f5f9' },
        title: {
          display: true,
          text: 'Intervalo de probabilidad',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Distribución de probabilidad ML"
      subtitle="Agrupa la probabilidad ML del perfil inicial de la cohorte metodológica."
      dataAvailable
      methodologicalNote="La probabilidad ML usa el primer pre-test con ciclo completo por usuario anónimo."
    >
      <div style={{ height: 280 }}>
        <Bar data={barData} options={options} />
      </div>
    </BaseChartJsCard>
  );
}
