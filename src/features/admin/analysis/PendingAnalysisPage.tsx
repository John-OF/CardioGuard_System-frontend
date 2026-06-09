import { useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { fetchFuzzyPending, fetchAnalysisReadiness } from '@/api/analysis';
import type { AdminOutletContext } from '@/types/admin';
import type { FuzzyPendingData } from '@/types/analysis';
import { PendingCard } from './components/PendingCard';
import { NoticeBox } from './components/NoticeBox';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

const PENDING_DESCRIPTIONS = [
  {
    title: 'Regresion logistica',
    description:
      'Modelos de regresion logistica para estimar odds ratios de factores asociados a prediccion ML positiva y respuesta adecuada en emergencias.',
    reason: 'Requiere el bloque 7, pendiente de implementacion.',
  },
  {
    title: 'Exportacion anonima de datos',
    description:
      'Exportacion de datos anonimizados en formato CSV/JSON para analisis externo por parte del equipo de investigacion.',
    reason: 'Requiere el bloque 8, pendiente de implementacion.',
  },
];

function FuzzyEngineDetails({ data }: { data: FuzzyPendingData }) {
  const engine = data.fuzzy_engine;

  if (engine) {
    return (
      <div className="mt-3 space-y-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
            ✓
          </span>
          <span className="text-sm font-semibold text-emerald-800">
            Motor de inferencia difusa Mamdani validado
          </span>
        </div>

        <div className="grid gap-2 text-xs text-emerald-700 sm:grid-cols-2">
          <div>
            <span className="font-semibold">Implementación:</span>{' '}
            {engine.implementation}
          </div>
          <div>
            <span className="font-semibold">Librería:</span> {engine.library}
            {engine.library_version ? ` ${engine.library_version}` : ''}
          </div>
          <div>
            <span className="font-semibold">Defuzzificación:</span>{' '}
            {engine.defuzzification}
          </div>
          <div>
            <span className="font-semibold">Reglas:</span>{' '}
            {engine.number_of_rules ?? '—'}
          </div>
        </div>

        {data.data_consistency_warning && (
          <div className="rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700">
            <p className="font-semibold">Advertencia de datos históricos:</p>
            <p className="mt-1">{data.data_consistency_warning.risk}</p>
            <p className="mt-1">{data.data_consistency_warning.recommendation}</p>
          </div>
        )}

        {data.historical_data_options && data.historical_data_options.length > 0 && (
          <div className="text-xs text-emerald-600">
            <span className="font-semibold">Opciones:</span>
            <ul className="mt-1 list-inside list-disc space-y-0.5">
              {data.historical_data_options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
          </div>
        )}

        {data.enabled_after_validation && data.enabled_after_validation.length > 0 && (
          <div className="text-xs text-emerald-700">
            <span className="font-semibold">Análisis habilitados condicionalmente:</span>
            <ul className="mt-1 list-inside list-disc space-y-0.5">
              {data.enabled_after_validation.map((a) => (
                <li key={a.id}>{a.description}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (data.current_implementation) {
    return (
      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          {data.current_implementation.description}
        </p>
        {data.postponement_reason && (
          <p className="mt-2 text-xs text-slate-400 italic">
            {data.postponement_reason}
          </p>
        )}
      </div>
    );
  }

  return (
    <NoticeBox variant="warning">
      La estructura de datos del análisis cambió o está incompleta.
    </NoticeBox>
  );
}

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

  const isFuzzyValidated = fuzzy.data?.fuzzy_engine?.validated === true;

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

      {isFuzzyValidated ? (
        <NoticeBox variant="info">
          La lógica difusa Mamdani (scikit-fuzzy) está validada. Los análisis
          basados en fuzzy están condicionalmente habilitados sujetos a
          verificación de consistencia de datos históricos.
        </NoticeBox>
      ) : (
        <NoticeBox variant="info">
          Los análisis que dependen de lógica difusa se implementarán después de
          formalizar el motor difuso con scikit-fuzzy. Esto no es un error, sino
          una pausa metodológica intencional.
        </NoticeBox>
      )}

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
          Análisis dependientes de lógica difusa
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Distribución de riesgo difuso',
              description:
                'Distribución de niveles bajo, moderado y alto de riesgo interpretativo.',
              reason: isFuzzyValidated
                ? 'Condicionalmente habilitado tras validación Mamdani.'
                : 'Pendiente de formalización de lógica difusa.',
            },
            {
              title: 'Coherencia híbrida',
              description:
                'Análisis de coherencia entre la etiqueta ML binaria y el nivel difuso.',
              reason: isFuzzyValidated
                ? 'Condicionalmente habilitado tras validación Mamdani.'
                : 'Pendiente de formalización de lógica difusa.',
            },
          ].map((item) => (
            <PendingCard key={item.title} {...item} />
          ))}
        </div>

        {fuzzy.data && <FuzzyEngineDetails data={fuzzy.data} />}
      </section>
    </div>
  );
}
