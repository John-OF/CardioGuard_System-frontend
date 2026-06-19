import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';
import { transformRiskLevelDistributionChartJs } from '../chartTransformers';
import type { ChartJsBucketData } from '../chartTransformers';
import type { DescriptiveAnalysisData } from '../../../../../../types/analysis';

interface MLPredictionDoughnutChartProps {
  data: DescriptiveAnalysisData;
}

export function MLPredictionDoughnutChart({ data }: MLPredictionDoughnutChartProps) {
  const distribution = data.ml_prediction_distribution;
  const chartData: ChartJsBucketData | null = useMemo(
    () => transformRiskLevelDistributionChartJs(data),
    [data],
  );

  if (!chartData) {
    return (
      <BaseChartJsCard
        title="Distribución de predicción ML en ciclos completos"
        subtitle="Muestra la proporción de adultos mayores con ciclo completo según la predicción ML obtenida en la evaluación inicial."
        dataAvailable={false}
        emptyMessage="No hay datos suficientes para generar este gráfico."
        methodologicalNote={distribution.methodological_note}
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
            return `${label}: ${val} ciclos completos${pctStr}`;
          },
        },
      },
    },
  };

  return (
    <BaseChartJsCard
      title="Distribución de predicción ML en ciclos completos"
      subtitle="Muestra la proporción de adultos mayores con ciclo completo según la predicción ML obtenida en la evaluación inicial."
      dataAvailable
      methodologicalNote={`${distribution.methodological_note} Unidad de análisis: ${
        distribution.deduplicated_by_anonymous_user_id
          ? 'usuario anónimo con ciclo completo'
          : 'ciclo completo'
      }. N = ${distribution.total}.`}
    >
      <div className="mx-auto flex items-center justify-center" style={{ maxWidth: 360, height: 300 }}>
        <Doughnut data={doughnutData} options={options} />
      </div>
    </BaseChartJsCard>
  );
}
