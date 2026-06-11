import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHART_TONE_HEX } from '../chartTheme';
import { transformLogisticOddsRatios } from '../chartTransformers';
import type { HorizontalMetricItem } from '../HorizontalMetricChart';

interface LogisticOddsRatioBarChartProps {
  data: unknown;
}

export function LogisticOddsRatioBarChart({ data }: LogisticOddsRatioBarChartProps) {
  const items: HorizontalMetricItem[] = useMemo(
    () => transformLogisticOddsRatios(data),
    [data],
  );

  if (items.length === 0) {
    return (
      <BaseChartJsCard
        title="Razón de momios por variable"
        subtitle="Muestra qué variables aumentan o reducen la probabilidad del evento modelado."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="Los odds ratio describen asociación dentro del modelo ajustado. No representan causalidad ni diagnóstico clínico. La escala está centrada en OR=1 mediante log(OR)."
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

  const maxAbs = Math.max(...values.map((v) => Math.abs(v)), 0.5);

  const barData = {
    labels,
    datasets: [
      {
        label: 'log(OR)',
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
            let text = `log(OR) = ${val.toFixed(2)}`;
            if (helper) text += ` · ${helper}`;
            return text;
          },
        },
      },
    },
    scales: {
      x: {
        min: -maxAbs,
        max: maxAbs,
        ticks: {
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif' },
          callback(value) {
            return Number(value).toFixed(1);
          },
        },
        grid: { color: '#f1f5f9' },
        title: {
          display: true,
          text: 'log(OR)',
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
          text: 'Variable',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Razón de momios por variable"
      subtitle="Muestra qué variables aumentan o reducen la probabilidad del evento modelado."
      dataAvailable
      methodologicalNote="Los odds ratio describen asociación dentro del modelo ajustado. No representan causalidad ni diagnóstico clínico. La escala está centrada en OR=1 mediante log(OR)."
    >
      <Bar data={barData} options={options} />
    </BaseChartJsCard>
  );
}
