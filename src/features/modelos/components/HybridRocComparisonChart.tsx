import type { NormalizedHybridModelMetric } from '@/types/modelMetrics';
import { RocComparisonChart } from './RocComparisonChart';

interface HybridRocComparisonChartProps {
  models: NormalizedHybridModelMetric[];
  selectedModel: string;
}

export function HybridRocComparisonChart({
  models,
  selectedModel,
}: HybridRocComparisonChartProps) {
  return (
    <RocComparisonChart
      models={models.map((model) => ({
        name: model.name,
        displayName: model.displayName,
        rocAuc: model.rocAuc,
        rocCurve: model.rocCurve,
        selected: model.baseModel === selectedModel,
      }))}
      title="Curvas ROC/AUC de modelos ML + postprocesamiento difuso"
      description="Cada curva usa el score fuzzy offline calculado sobre el mismo conjunto de prueba UCI."
      ariaLabel="Curvas ROC comparativas de modelos ML con postprocesamiento difuso offline"
    />
  );
}
