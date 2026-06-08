import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconCircleCheck } from '@/components/ui/icons';
import { MODEL_META_BY_SLUG, MODELS_BY_SLUG } from './data/models';
import { useModelMetrics } from './hooks/useModelMetrics';
import { MetricsCards } from './components/MetricsCards';
import { ConfusionMatrix } from './components/ConfusionMatrix';
import { ClassificationReport } from './components/ClassificationReport';
import { RocCurveChart } from './components/RocCurveChart';

export function ModelPage() {
  const { modelSlug } = useParams<{ modelSlug: string }>();
  const navigate = useNavigate();
  const { metrics, loading, source } = useModelMetrics();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [modelSlug]);

  const meta = modelSlug ? MODEL_META_BY_SLUG[modelSlug] : undefined;
  const dynamicModel = modelSlug
    ? metrics.models.find((item) => item.slug === modelSlug)
    : undefined;
  const fallbackModel = modelSlug ? MODELS_BY_SLUG[modelSlug] : undefined;
  const modelData = dynamicModel ?? fallbackModel;
  const model =
    meta && modelData
      ? {
          ...meta,
          metrics: modelData.metrics,
          confusionMatrix: modelData.confusionMatrix,
          report: modelData.report,
          rocAuc: modelData.rocAuc,
          rocCurve: modelData.rocCurve,
          testSupport: modelData.testSupport,
          selected: dynamicModel?.isSelected ?? fallbackModel?.selected ?? false,
        }
      : undefined;
  const featuresCount = metrics.features.length || 7;

  if (!model) {
    return (
      <div className="card text-center">
        <h1 className="text-2xl font-bold text-slate-900">Modelo no encontrado</h1>
        <p className="text-base text-slate-600 mt-2">
          El modelo que busca no existe o el enlace puede ser incorrecto.
        </p>
        <button
          type="button"
          onClick={() => navigate('/modelos/random-forest')}
          className="btn-primary mt-6"
        >
          Ver modelos predictivos
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {source === 'fallback' && !loading && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-base text-amber-900">
          Mostrando metricas locales de respaldo porque el backend de metricas no respondio.
        </div>
      )}

      {/* Cabecera */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-16 h-16 rounded-lg bg-gradient-to-br ${model.headerGradient} flex items-center justify-center text-white`}
            aria-hidden
          >
            <model.Icon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{model.name}</h1>
            <p className="text-lg text-slate-600 mt-1">{model.subtitle}</p>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 ${model.descriptionBox}`}>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Descripción del modelo</h3>
          <p className="text-base text-slate-700 leading-relaxed">{model.description}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {model.selected && (
              <div className="bg-white px-4 py-2 rounded-lg border border-emerald-300">
                <span className="text-sm font-semibold text-emerald-700 inline-flex items-center gap-1.5">
                  <IconCircleCheck aria-hidden className="w-4 h-4" />
                  Modelo seleccionado (en producción)
                </span>
              </div>
            )}
            <div className={`bg-white px-4 py-2 rounded-lg border ${model.chipBorder}`}>
              <span className="text-sm font-semibold text-slate-700">Casos de prueba:</span>{' '}
              <span className="text-sm text-slate-900">{model.testSupport}</span>
            </div>
            <div className={`bg-white px-4 py-2 rounded-lg border ${model.chipBorder}`}>
              <span className="text-sm font-semibold text-slate-700">Variables:</span>{' '}
              <span className="text-sm text-slate-900">{featuresCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Métricas de rendimiento</h2>
        <MetricsCards metrics={model.metrics} />
      </div>

      <RocCurveChart
        modelName={model.name}
        rocAuc={model.rocAuc}
        rocCurve={model.rocCurve}
      />

      {/* Matriz de confusión */}
      <ConfusionMatrix
        matrix={model.confusionMatrix}
        labels={['Sin Riesgo', 'Con Riesgo']}
      />

      {/* Reporte de clasificación */}
      <ClassificationReport {...model.report} />
    </div>
  );
}
