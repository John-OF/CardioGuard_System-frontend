import { Link, useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import {
  fetchAnalysisOverview,
  fetchAnalysisReadiness,
  fetchDescriptiveAnalysis,
  fetchPrePostAnalysis,
  fetchFuzzyPending,
} from '@/api/analysis';
import { fetchModelMetrics } from '@/api/modelMetrics';
import { MetricCard } from './components/MetricCard';
import { StatusBadge } from './components/StatusBadge';
import { NoticeBox } from './components/NoticeBox';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import type { AdminOutletContext } from '@/types/admin';

function toArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

const MODULE_CARDS = [
  {
    title: 'Descriptivo general',
    route: '/admin/analisis/descriptivo',
    description:
      'Resume las características generales de las evaluaciones, variables clínicas, hábitos, educación, emergencia y salidas ML.',
    status: 'implemented' as const,
  },
  {
    title: 'Pre-test / Post-test',
    route: '/admin/analisis/pre-post',
    description:
      'Compara los puntajes educativos y de emergencia antes y después de la capacitación.',
    status: 'implemented' as const,
  },
  {
    title: 'Emergencias / Simulador',
    route: '/admin/analisis/emergencias',
    description:
      'Analiza preparación ante emergencias, respuesta adecuada y limitaciones del simulador.',
    status: 'implemented' as const,
  },
  {
    title: 'Chi-cuadrado',
    route: '/admin/analisis/chi-cuadrado',
    description:
      'Evalúa asociaciones entre variables categóricas, incluyendo riesgo difuso Mamdani.',
    status: 'implemented' as const,
  },
  {
    title: 'Correlaciones',
    route: '/admin/analisis/correlaciones',
    description:
      'Evalúa relaciones entre variables numéricas u ordinales, incluyendo fuzzy_risk_score.',
    status: 'implemented' as const,
  },
  {
    title: 'Regresión logística',
    route: '/admin/analisis/regresion-logistica',
    description:
      'Modela desenlaces binarios exploratorios mediante odds ratios y advertencias de muestra.',
    status: 'implemented' as const,
  },
  {
    title: 'Modelos ML',
    route: '/admin/analisis/modelos',
    description:
      'Enlaza con métricas de modelos, matriz de confusión, ROC/AUC y comparación del sistema híbrido.',
    status: 'implemented' as const,
  },
  {
    title: 'Pendientes / futuras mejoras',
    route: '/admin/analisis/pendientes',
    description:
      'Lista elementos futuros o no prioritarios como exportación anónima de datos.',
    status: 'planned' as const,
  },
];

const THESIS_ALIGNMENT = [
  'ML (Redes Neuronales) estima la probabilidad de riesgo cardiovascular a partir de variables clínicas y conductuales.',
  'Mamdani (scikit-fuzzy) interpreta la salida ML junto con edad, IMC, actividad física, presión arterial y colesterol en niveles bajo, moderado y alto de riesgo interpretativo.',
  'La estadística descriptiva resume la muestra y los registros del sistema.',
  'El análisis pre-test / post-test sustenta el impacto educativo de la capacitación en SVB.',
  'El análisis de emergencias respalda la preparación ante eventos cardiovasculares.',
  'Chi-cuadrado, correlaciones y regresión logística conforman el análisis inferencial solicitado por el tutor.',
  'Todos los resultados son académicos y no constituyen diagnóstico clínico.',
];

const LIMITATIONS = [
  'Los datos son anónimos y de uso exclusivamente académico.',
  'Los resultados no constituyen diagnóstico clínico ni reemplazan la evaluación médica.',
  'El tiempo de reacción del simulador es ordinal auto-reportado, no en segundos medidos.',
  'La regresión logística puede estar limitada por el tamaño de muestra y eventos por variable.',
  'Los análisis dependientes de lógica difusa requieren verificación de consistencia de datos históricos.',
  'La asociación estadística no implica causalidad.',
];

export function AnalysisOverviewPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();

  const overview = useAnalysisQuery(
    () => fetchAnalysisOverview(token),
    [token],
  );
  const readiness = useAnalysisQuery(
    () => fetchAnalysisReadiness(token),
    [token],
  );
  const descriptive = useAnalysisQuery(
    () => fetchDescriptiveAnalysis(token),
    [token],
  );
  const prepost = useAnalysisQuery(
    () => fetchPrePostAnalysis(token),
    [token],
  );
  const fuzzy = useAnalysisQuery(
    () => fetchFuzzyPending(token),
    [token],
  );
  const modelMetrics = useAnalysisQuery(
    () => fetchModelMetrics(),
    [],
  );

  if (overview.status === 'error' || readiness.status === 'error') {
    const msg = overview.error ?? readiness.error ?? '';
    if (msg.includes('Token') || msg.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el módulo de análisis. Verifique que el backend esté activo." />;
  }

  if (overview.status === 'loading' || readiness.status === 'loading') {
    return <LoadingState />;
  }

  const ov = overview.data;
  const rd = readiness.data;

  if (!ov || !rd) {
    return <ErrorState message="No se recibieron datos del servidor." />;
  }

  const totalEval =
    descriptive.status === 'ready'
      ? descriptive.data?.total_evaluations
      : null;
  const completeCycles =
    prepost.status === 'ready' && prepost.data
      ? prepost.data.cycle_counts?.complete_cycles
      : null;
  const implementedCount = toArray(ov.available_blocks).filter(
    (b) => b.status === 'implemented',
  ).length;
  const fuzzyValidated =
    fuzzy.status === 'ready'
      ? fuzzy.data?.fuzzy_engine?.validated === true
      : null;
  const modelCount =
    modelMetrics.status === 'ready'
      ? toArray(modelMetrics.data?.models).length
      : null;
  const fuzzyInputs = fuzzy.data?.inputs ?? null;
  const fuzzyOutputs = fuzzy.data?.outputs ?? null;
  const fuzzyEngine = fuzzy.data?.fuzzy_engine ?? null;
  const fuzzyWarning = fuzzy.data?.data_consistency_warning ?? null;
  const fuzzyReadyBlocks = toArray(
    rd.conditionally_ready_after_fuzzy_validation ?? rd.blocked_by_fuzzy_logic,
  );
  const unavailableBlocks = toArray(rd.unavailable_due_to_missing_data);
  const fuzzyValidation = rd.fuzzy_validation_summary;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Análisis estadístico
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Panel académico para revisar resultados anónimos del prototipo CardioGuard.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Este módulo consolida el análisis descriptivo, educativo, inferencial,
          Machine Learning y lógica difusa Mamdani usados para sustentar la tesis.
        </p>
      </header>

      <NoticeBox variant="academic">{ov.non_diagnostic_notice}</NoticeBox>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Resumen global
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <MetricCard
            label="Total de evaluaciones"
            value={totalEval != null ? totalEval : 'No disponible'}
            hint={descriptive.status === 'loading' ? 'Cargando...' : undefined}
          />
          <MetricCard
            label="Ciclos completos"
            value={completeCycles != null ? completeCycles : 'No disponible'}
            hint={prepost.status === 'loading' ? 'Cargando...' : undefined}
          />
          <MetricCard
            label="Módulos implementados"
            value={implementedCount}
          />
          <MetricCard
            label="Modelos ML evaluados"
            value={modelCount != null ? modelCount : '—'}
            hint={modelMetrics.status === 'loading' ? 'Cargando...' : undefined}
          />
          <MetricCard
            label="Estado lógica difusa"
            value={
              fuzzyValidated === true
                ? 'Mamdani OK'
                : fuzzyValidated === false
                  ? 'Pendiente'
                  : '—'
            }
            hint={
              fuzzy.status === 'loading'
                ? 'Cargando...'
                : fuzzyValidated === true
                  ? 'Validado con scikit-fuzzy'
                  : undefined
            }
          />
          <MetricCard
            label="Análisis inferenciales"
            value="6 disponibles"
            hint="Chi², correlaciones, regresión logística"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Módulos de análisis
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MODULE_CARDS.map((mod) => (
            <Link
              key={mod.route}
              to={mod.route}
              className="group rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                  {mod.title}
                </h3>
                <StatusBadge status={mod.status} />
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {mod.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Alineación con la tesis
        </h2>
        <ul className="mt-3 space-y-2">
          {THESIS_ALIGNMENT.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {fuzzy.status === 'ready' && fuzzy.data && (fuzzyEngine || fuzzyInputs) && (
        <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Estado de lógica difusa Mamdani
          </h2>

          {fuzzyEngine && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white">
                ✓ Validado
              </span>
              <span className="text-xs text-emerald-700">
                {fuzzyEngine.library}
                {fuzzyEngine.library_version
                  ? ` ${fuzzyEngine.library_version}`
                  : ''}
              </span>
              <span className="text-xs text-emerald-700">
                Defuzzificación: {fuzzyEngine.defuzzification}
              </span>
              {fuzzyEngine.number_of_rules != null && (
                <span className="text-xs text-emerald-700">
                  {fuzzyEngine.number_of_rules} reglas
                </span>
              )}
            </div>
          )}

          {fuzzyInputs && fuzzyInputs.length > 0 && (
            <div className="mt-3 grid gap-2 text-xs text-emerald-700 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <span className="font-semibold">Entradas:</span>
                <ul className="mt-1 list-inside list-disc space-y-0.5">
                  {fuzzyInputs.map((inp) => (
                    <li key={inp.name}>
                      {inp.name}
                      {inp.range
                        ? ` [${inp.range[0]}–${inp.range[1]}]`
                        : ''}
                    </li>
                  ))}
                </ul>
              </div>
              {fuzzyOutputs && fuzzyOutputs.length > 0 && (
                <div>
                  <span className="font-semibold">Salidas:</span>
                  <ul className="mt-1 list-inside list-disc space-y-0.5">
                    {fuzzyOutputs.map((out) => (
                      <li key={out.name}>
                        {out.name}
                        {out.values
                          ? ` (${out.values.join(', ')})`
                          : out.range
                            ? ` [${out.range[0]}–${out.range[1]}]`
                            : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {fuzzyWarning && (
            <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-2 text-xs text-amber-700">
              <p className="font-semibold">Advertencia de datos históricos:</p>
              <p className="mt-1">{fuzzyWarning.risk}</p>
              <p className="mt-1">{fuzzyWarning.recommendation}</p>
            </div>
          )}

          <NoticeBox variant="info">
            Para análisis definitivo de tesis se recomienda usar datos
            recolectados después de la validación Mamdani o recalcular registros
            históricos.
          </NoticeBox>
        </section>
      )}

      {fuzzyReadyBlocks.length > 0 && (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-semibold text-amber-800">
            Análisis difuso habilitado condicionalmente
            {ov.fuzzy_conditionally_ready_count != null
              ? ` (${ov.fuzzy_conditionally_ready_count})`
              : ` (${fuzzyReadyBlocks.length})`}
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-amber-700">
            {fuzzyReadyBlocks.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                />
                {item}
              </li>
            ))}
          </ul>
          {fuzzyValidation && (
            <p className="mt-2 text-xs text-amber-600 italic">
              {fuzzyValidation.implementation}.{' '}
              {fuzzyValidation.data_consistency_warning}
            </p>
          )}
          {!fuzzyValidation && rd.fuzzy_postponement_reason && (
            <p className="mt-2 text-xs text-amber-600 italic">
              {rd.fuzzy_postponement_reason}
            </p>
          )}
        </section>
      )}

      {unavailableBlocks.length > 0 && (
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-500">
            No disponibles por datos faltantes
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-500">
            {unavailableBlocks.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Limitaciones metodológicas
        </h2>
        <ul className="mt-3 space-y-2">
          {LIMITATIONS.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <span
                aria-hidden
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-3">
        {MODULE_CARDS.filter((m) => m.status === 'implemented').map(
          (mod) => (
            <Link
              key={mod.route}
              to={mod.route}
              className="btn-secondary min-h-0 px-5 py-2.5 text-sm"
            >
              Ver {mod.title.toLowerCase()}
            </Link>
          ),
        )}
      </section>
    </div>
  );
}
