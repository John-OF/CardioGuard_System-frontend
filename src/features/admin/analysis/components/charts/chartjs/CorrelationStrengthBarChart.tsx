import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHART_TONE_HEX } from '../chartTheme';
import { transformCorrelationStrengths } from '../chartTransformers';
import type { HorizontalMetricItem } from '../HorizontalMetricChart';

interface CorrelationStrengthBarChartProps {
  data: unknown;
}

export function CorrelationStrengthBarChart({ data }: CorrelationStrengthBarChartProps) {
  const items: HorizontalMetricItem[] = useMemo(
    () => transformCorrelationStrengths(data),
    [data],
  );

  if (items.length === 0) {
    return (
      <BaseChartJsCard
        title="Fuerza de correlación entre variables"
        subtitle="Muestra la magnitud y dirección de las relaciones estadísticas calculadas."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="Las correlaciones describen asociación estadística, no causalidad."
      />
    );
  }

  const labels = items.map((item) => item.label);
  const values = items.map((item) => item.value);
  const helperTexts = items.map((item) => item.helperText);

  const backgroundColors = items.map((item) => {
    const hex = item.tone ? CHART_TONE_HEX[item.tone] : undefined;
    return hex ? `${hex}CC` : '#94a3b8CC';
  });
  const borderColors = items.map((item) => {
    return item.tone ? CHART_TONE_HEX[item.tone] : '#94a3b8';
  });

  const barData = {
    labels,
    datasets: [
      {
        label: 'Coeficiente',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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
            const helper = helperTexts[ctx.dataIndex];
            let text = `r = ${val.toFixed(2)}`;
            if (helper) text += ` · ${helper}`;
            return text;
          },
        },
      },
    },
    scales: {
      x: {
        min: -1,
        max: 1,
        ticks: {
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif' },
          stepSize: 0.5,
          callback(value) {
            return Number(value).toFixed(1);
          },
        },
        grid: { color: '#f1f5f9' },
        title: {
          display: true,
          text: 'Coeficiente de correlación',
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
          text: 'Relación entre variables',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Fuerza de correlación entre variables"
      subtitle="Muestra la magnitud y dirección de las relaciones estadísticas calculadas."
      dataAvailable
      methodologicalNote="Las correlaciones describen asociación estadística, no causalidad."
    >
      <Bar data={barData} options={options} />
    </BaseChartJsCard>
  );
}
