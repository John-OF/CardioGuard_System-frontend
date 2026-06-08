import { useEffect, useState } from 'react';
import { fetchModelMetrics } from '@/api/modelMetrics';
import { PREDICTIVE_MODELS } from '../data/models';
import type {
  ConfusionMatrix,
  NormalizedModelMetricsPayload,
} from '@/types/modelMetrics';

type MetricsSource = 'backend' | 'fallback';

interface UseModelMetricsState {
  metrics: NormalizedModelMetricsPayload;
  loading: boolean;
  error: Error | null;
  source: MetricsSource;
}

const DEFAULT_FEATURES = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'exang'];

function fallbackMetrics(): NormalizedModelMetricsPayload {
  return {
    selectedModel: PREDICTIVE_MODELS.find((model) => model.selected)?.backendName ?? 'RandomForest',
    features: DEFAULT_FEATURES,
    models: PREDICTIVE_MODELS.map((model) => ({
      name: model.backendName,
      slug: model.slug,
      isSelected: model.selected,
      metrics: model.metrics,
      rocAuc: model.rocAuc,
      rocCurve: model.rocCurve,
      confusionMatrix: model.confusionMatrix as ConfusionMatrix,
      report: model.report,
      testSupport: model.testSupport,
    })),
  };
}

const FALLBACK_METRICS = fallbackMetrics();

export function useModelMetrics(): UseModelMetricsState {
  const [state, setState] = useState<UseModelMetricsState>({
    metrics: FALLBACK_METRICS,
    loading: true,
    error: null,
    source: 'fallback',
  });

  useEffect(() => {
    let active = true;

    fetchModelMetrics()
      .then((metrics) => {
        if (!active) return;
        setState({
          metrics,
          loading: false,
          error: null,
          source: 'backend',
        });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setState({
          metrics: FALLBACK_METRICS,
          loading: false,
          error: error instanceof Error ? error : new Error('No se pudieron cargar las metricas del backend.'),
          source: 'fallback',
        });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
