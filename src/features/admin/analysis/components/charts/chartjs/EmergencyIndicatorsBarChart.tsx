import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { CHARTJS_DEFAULT_OPTIONS } from './ChartJsTheme';
import { CHART_TONE_HEX } from '../chartTheme';
import { transformEmergencyPreparedness } from '../chartTransformers';
import type { EmergencyActionProfile } from '@/types/analysis';
import type { CategoricalBarItem } from '../CategoricalBarChart';

interface EmergencyIndicatorsBarChartProps {
  profile: EmergencyActionProfile | null;
}

export function EmergencyIndicatorsBarChart({
  profile,
}: EmergencyIndicatorsBarChartProps) {
  const items: CategoricalBarItem[] = useMemo(
    () => transformEmergencyPreparedness(profile),
    [profile],
  );

  if (items.length === 0) {
    return (
      <BaseChartJsCard
        title="Indicadores de preparación ante emergencias"
        subtitle="Resume respuestas clave relacionadas con el reconocimiento y actuación ante una emergencia."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote="Este gráfico resume respuestas educativas y de simulación. No representa diagnóstico clínico."
      />
    );
  }

  const labels = items.map((item) => item.label);
  const values = items.map((item) => item.value);
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
        label: 'Porcentaje',
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
          label(ctx: { parsed: { x: number | null } }) {
            const val = ctx.parsed.x;
            return val != null ? `${val.toFixed(1)}%` : '—';
          },
        },
      },
    },
    scales: {
      ...CHARTJS_DEFAULT_OPTIONS.scales,
      x: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.x,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Porcentaje',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
      y: {
        ...CHARTJS_DEFAULT_OPTIONS.scales.y,
        title: {
          display: true,
          text: 'Indicador',
          color: '#64748b',
          font: { family: 'Inter, system-ui, sans-serif', size: 12 },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Indicadores de preparación ante emergencias"
      subtitle="Resume respuestas clave relacionadas con el reconocimiento y actuación ante una emergencia."
      dataAvailable
      methodologicalNote="Este gráfico resume respuestas educativas y de simulación. No representa diagnóstico clínico."
    >
      <Bar data={barData} options={options} />
    </BaseChartJsCard>
  );
}
