import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import {
  IconBrain,
  IconBarChart,
  IconGrid,
  IconClipboardCheck,
} from '@/components/ui/icons';
import { MODEL_META_BY_BACKEND_NAME, PREDICTIVE_MODELS } from './data/models';
import { useModelMetrics } from './hooks/useModelMetrics';

// Qué se muestra en la sección (placeholder editable).
const WHAT_YOU_FIND: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
}[] = [
  {
    Icon: IconBarChart,
    title: 'Métricas de desempeño',
    text: 'Exactitud, precisión, sensibilidad (recall) y F1 de cada modelo, con su validación cruzada.',
  },
  {
    Icon: IconGrid,
    title: 'Matriz de confusión',
    text: 'Aciertos y errores por clase (con riesgo / sin riesgo) sobre el conjunto de prueba.',
  },
  {
    Icon: IconClipboardCheck,
    title: 'Reporte de clasificación',
    text: 'Precisión, recall, F1 y soporte por clase, además de promedios macro y ponderado.',
  },
];

export function ModelosHomePage() {
  const { metrics, loading, source } = useModelMetrics();
  const selectedMetric =
    metrics.models.find((model) => model.isSelected || model.name === metrics.selectedModel) ??
    metrics.models[0];
  const selectedModel =
    (selectedMetric && MODEL_META_BY_BACKEND_NAME[selectedMetric.name]) ??
    PREDICTIVE_MODELS.find((model) => model.selected) ??
    PREDICTIVE_MODELS[0];

  return (
    <div className="space-y-6">
      {source === 'fallback' && !loading && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-base text-amber-900">
          Mostrando metricas locales de respaldo porque el backend de metricas no respondio.
        </div>
      )}

      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Modelos Predictivos
        </h1>
        <p className="text-base text-slate-600 mt-2 max-w-3xl">
          Compare el desempeño real de los modelos de aprendizaje automático
          entrenados para estimar el riesgo cardiovascular. Las métricas
          provienen del entrenamiento real del sistema, no de valores simulados.
        </p>
      </header>

      <div className="space-y-8">
        <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <span
              className="inline-flex w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center text-white"
              aria-hidden="true"
            >
              <IconBrain className="w-6 h-6" />
            </span>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                ¿Cómo predice el sistema el riesgo?
              </h2>
              <p className="text-base text-slate-600 mt-1">
                CardioGuard combina un modelo de <strong>Random Forest</strong> con una{' '}
                <strong>lógica difusa</strong> de reglas clínicas. Conozca el flujo paso a
                paso, las reglas de puntaje y cómo se decide el nivel de riesgo.
              </p>
              <Link
                to="/modelos/sistema-hibrido"
                className="btn-secondary inline-flex items-center gap-2 mt-4"
              >
                Ver cómo funciona el sistema híbrido
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <section className="card space-y-3">
          <h2 className="text-xl font-bold text-slate-900">¿Qué encontrará aquí?</h2>
          <p className="text-base text-slate-600">
            Se entrenaron y compararon <strong>cuatro modelos</strong> sobre el
            mismo conjunto de datos. Para cada uno podrá revisar:
          </p>
          <ul className="space-y-3 mt-2">
            {WHAT_YOU_FIND.map(({ Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span
                  className="inline-flex w-10 h-10 shrink-0 rounded-xl bg-primary-light items-center justify-center text-primary"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-base">
                  <span className="font-semibold text-slate-900">{title}.</span>{' '}
                  <span className="text-slate-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-primary-light border border-primary/20 p-6 text-center">
          <p className="text-lg text-slate-800">
            El modelo seleccionado para CardioGuard es{' '}
            <strong>{selectedModel.name}</strong>, por su mejor desempeño general.
          </p>
          <Link
            to={`/modelos/${selectedModel.slug}`}
            className="btn-primary inline-flex items-center gap-2 mt-4"
          >
            Ver el modelo seleccionado
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <p className="text-sm text-slate-500 mt-3">
            También puede revisar cada modelo desde el menú lateral.
          </p>
        </section>
      </div>
    </div>
  );
}
