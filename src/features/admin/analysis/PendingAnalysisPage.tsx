import { useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { fetchFuzzyPending, fetchAnalysisReadiness } from '@/api/analysis';
import type { AdminOutletContext } from '@/types/admin';
import { PendingCard } from './components/PendingCard';
import { NoticeBox } from './components/NoticeBox';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

const PENDING_DESCRIPTIONS = [
  {
    title: 'Chi-cuadrado inferencial completo',
    description:
      'Pruebas de asociación entre variables categóricas del estudio (actividad física, presión arterial, tabaquismo, etc.) y la predicción ML.',
    reason: 'Requiere el bloque 5, pendiente de implementación.',
  },
  {
    title: 'Correlaciones inferenciales completas',
    description:
      'Coeficientes de correlación (Pearson / Spearman) entre variables continuas como edad, IMC, probabilidad ML y puntajes educativos.',
    reason: 'Requiere el bloque 6, pendiente de implementación.',
  },
  {
    title: 'Regresión logística',
    description:
      'Modelos de regresión logística para estimar odds ratios de factores asociados a predicción ML positiva y respuesta adecuada en emergencias.',
    reason: 'Requiere el bloque 7, pendiente de implementación.',
  },
  {
    title: 'Exportación anónima de datos',
    description:
      'Exportación de datos anonimizados en formato CSV/JSON para análisis externo por parte del equipo de investigación.',
    reason: 'Requiere el bloque 8, pendiente de implementación.',
  },
];

const FUZZY_PENDING = [
  {
    title: 'Distribución de riesgo difuso',
    description: 'Distribución de niveles bajo, moderado y alto de riesgo interpretativo usando la lógica difusa formalizada.',
    reason: 'Pendiente de formalización de lógica difusa con scikit-fuzzy.',
  },
  {
    title: 'Comparación ML vs lógica difusa',
    description: 'Comparación entre la probabilidad ML continua y el puntaje difuso para evaluar coherencia.',
    reason: 'Pendiente de formalización de lógica difusa.',
  },
  {
    title: 'Coherencia híbrida',
    description: 'Análisis de coherencia entre la etiqueta ML binaria y el nivel difuso (bajo, moderado, alto) para detectar divergencias.',
    reason: 'Pendiente de formalización de lógica difusa.',
  },
];

export function PendingAnalysisPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();

  const fuzzy = useAnalysisQuery(() => fetchFuzzyPending(token), [token]);
  const readiness = useAnalysisQuery(
    () => fetchAnalysisReadiness(token),
    [token],
  );

  if (fuzzy.status === 'error' || readiness.status === 'error') {
    const msg = fuzzy.error ?? readiness.error ?? '';
    if (msg.includes('Token') || msg.includes('401')) {
      logout();
      return null;
    }
    return (
      <ErrorState message="No se pudo cargar la información de análisis pendientes." />
    );
  }

  if (fuzzy.status === 'loading' || readiness.status === 'loading') {
    return <LoadingState />;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Análisis pendientes
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Estos análisis se implementarán en bloques posteriores del módulo.
        </p>
      </header>

      <NoticeBox variant="info">
        Los análisis que dependen de lógica difusa se implementarán después de
        formalizar el motor difuso con scikit-fuzzy. Esto no es un error, sino
        una pausa metodológica intencional.
      </NoticeBox>

      {readiness.data && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Pendientes por implementar
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {PENDING_DESCRIPTIONS.map((item) => (
              <PendingCard key={item.title} {...item} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Pendientes de formalización difusa
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FUZZY_PENDING.map((item) => (
            <PendingCard key={item.title} {...item} />
          ))}
        </div>
        {fuzzy.data && (
          <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">
              {fuzzy.data.current_implementation.description}
            </p>
            <p className="mt-2 text-xs text-slate-400 italic">
              {fuzzy.data.postponement_reason}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
