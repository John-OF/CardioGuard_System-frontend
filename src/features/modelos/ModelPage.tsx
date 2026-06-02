import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconCircleCheck } from '@/components/ui/icons';
import { MODELS_BY_SLUG } from './data/models';
import { MetricsCards } from './components/MetricsCards';
import { ConfusionMatrix } from './components/ConfusionMatrix';
import { ClassificationReport } from './components/ClassificationReport';

export function ModelPage() {
  const { modelSlug } = useParams<{ modelSlug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [modelSlug]);

  const model = modelSlug ? MODELS_BY_SLUG[modelSlug] : undefined;

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
              <span className="text-sm text-slate-900">7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Métricas de rendimiento</h2>
        <MetricsCards metrics={model.metrics} />
      </div>

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
