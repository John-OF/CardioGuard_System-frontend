import { useMemo } from 'react';
import { ComparisonBarChart } from './ComparisonBarChart';
import { transformPrePostToComparison } from './chartTransformers';
import type { PrePostAnalysisData } from '@/types/analysis';

interface PrePostScoreChartProps {
  data: PrePostAnalysisData | null;
}

export function PrePostScoreChart({ data }: PrePostScoreChartProps) {
  const chartData = useMemo(() => transformPrePostToComparison(data), [data]);

  return (
    <ComparisonBarChart
      title="Comparación pre-test/post-test"
      subtitle="Visualiza la variación de puntajes antes y después de la capacitación."
      data={chartData}
      valueSuffix=" pts"
      emptyMessage="No hay datos suficientes para generar este gráfico."
      methodologicalNote="Este gráfico resume resultados educativos y de respuesta ante emergencia. No representa diagnóstico clínico."
    />
  );
}
