import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHARTJS_DEFAULT_OPTIONS } from './ChartJsTheme';
import { CHART_TONE_HEX } from '../chartTheme';
import { transformAdequateResponseDistribution } from '../chartTransformers';
import type { AdequateResponseData } from '@/types/analysis';
import type { CategoricalBarItem } from '../CategoricalBarChart';

interface AdequateResponseBarChartProps {
  data: AdequateResponseData | null;
}

export function AdequateResponseBarChart({
  data,
}: AdequateResponseBarChartProps) {
  const items: CategoricalBarItem[] = useMemo(
    () => transformAdequateResponseDistribution(data),
    [data],
  );

  if (items.length === 0) {
    return (
      <BaseChartJsCard
        title="Respuesta adecuada ante emergencia"
        subtitle="Compara las respuestas clasificadas como adecuadas frente a no adecuadas."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="Este gráfico resume criterios de actuación ante emergencia dentro del simulador. No representa diagnóstico clínico."
      />
    );
  }

  const labels = items.map((item) => item.label);
  const values = items.map((item) => item.value);
  const percentages = items.map((item) => item.percentage);
  const maxVal = Math.max(...values, 1);

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
        label: 'Casos',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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
        display: false,
      },
      tooltip: {
        ...CHARTJS_DEFAULT_OPTIONS.plugins.tooltip,
        callbacks: {
          label(ctx: { dataIndex: number; parsed: { x: number | null } }) {
            const val = ctx.parsed.x;
            if (val == null) return '—';
            const pct = percentages[ctx.dataIndex];
            const pctStr = pct != null ? ` (${pct.toFixed(1)}%)` : '';
            return `${val} casos${pctStr}`;
          },
        },
      },
    },
    scales: {
      ...CHARTJS_DEFAULT_OPTIONS.scales,
      x: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.x,
        beginAtZero: true,
        max: Math.ceil(maxVal * 1.25) || 5,
        ticks: {
          ...CHARTJS_DEFAULT_OPTIONS.scales.x.ticks,
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Casos',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
      y: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.y,
        title: {
          display: true,
          text: 'Clasificación de respuesta',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Respuesta adecuada ante emergencia"
      subtitle="Compara las respuestas clasificadas como adecuadas frente a no adecuadas."
      dataAvailable
      methodologicalNote="Este gráfico resume criterios de actuación ante emergencia dentro del simulador. No representa diagnóstico clínico."
    >
      <div style={{ height: 200 }}>
        <Bar data={barData} options={options} />
      </div>
    </BaseChartJsCard>
  );
}
