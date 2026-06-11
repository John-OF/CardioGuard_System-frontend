import { useOutletContext } from 'react-router-dom';
import { fetchLogisticRegressionAnalysis } from '@/api/analysis';
import type { AdminOutletContext } from '@/types/admin';
import type {
  LogisticRegressionAnalysisData,
  LogisticRegressionModelResult,
  LogisticRegressionPredictorResult,
} from '@/types/analysis';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { ErrorState } from './components/ErrorState';
import { LoadingState } from './components/LoadingState';
import { MetricCard } from './components/MetricCard';
import { NoticeBox } from './components/NoticeBox';
import { StatusBadge } from './components/StatusBadge';
import { LogisticOddsRatioBarChart } from './components/charts/chartjs/LogisticOddsRatioBarChart';

function asArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function formatNumber(value: number | null | undefined, digits = 4): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return value.toFixed(digits);
}

function formatOptional(value: number | null | undefined, digits = 4): string {
  return typeof value === 'number' && !Number.isNaN(value)
    ? value.toFixed(digits)
    : 'No disponible';
}

export function LogisticRegressionAnalysisPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const query = useAnalysisQuery(
    () => fetchLogisticRegressionAnalysis(token),
    [token],
  );

  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el análisis de regresión logística." />;
  }

  if (query.status === 'loading') return <LoadingState />;
  if (!query.data) return <ErrorState message="No se recibieron datos." />;

  const data = query.data;
  const independent = asArray(data.groups?.fuzzy_independent);
  const fuzzyDependent = asArray(data.groups?.fuzzy_dependent);
  const models = asArray(data.models);
  const validModels = models.filter((model) => model.model_valid === true);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Regresión logística</h1>
        <p className="mt-1 text-base text-slate-600">
          Modelos exploratorios para desenlaces binarios del prototipo.
        </p>
      </header>

      {data.non_diagnostic_notice && (
        <NoticeBox variant="academic">{data.non_diagnostic_notice}</NoticeBox>
      )}

      <MethodologyCard data={data} />

      {data.data_consistency_warning?.message && (
        <NoticeBox variant="warning">
          {data.data_consistency_warning.message}
        </NoticeBox>
      )}

      <SummaryCards data={data} />

      <OddsRatioChartSection data={data} />

      {validModels.length === 0 && (
        <NoticeBox variant="warning">
          No existen datos suficientes para ajustar modelos de regresión logística.
        </NoticeBox>
      )}

      <ModelSection
        title="Modelos independientes de lógica difusa"
        models={independent}
      />

      <ModelSection
        title="Modelos con riesgo difuso Mamdani"
        models={fuzzyDependent}
      />

      <Limitations limitations={data.limitations} />
    </div>
  );
}

function MethodologyCard({ data }: { data: LogisticRegressionAnalysisData }) {
  const methodology = data.methodology;
  const notes = asArray(methodology?.notes);
  const rules = asArray(methodology?.safety_rules);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Metodología estadística
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {methodology?.test ?? 'Regresión logística binaria'} para estimar
            coeficientes y odds ratios en desenlaces binarios.
          </p>
        </div>
        <StatusBadge status="implemented" />
      </div>

      <div className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="font-semibold text-slate-700">H0</p>
          <p className="mt-1">{methodology?.hypotheses?.h0 ?? '—'}</p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="font-semibold text-slate-700">H1</p>
          <p className="mt-1">{methodology?.hypotheses?.h1 ?? '—'}</p>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <InfoList title="Notas" items={notes} />
        <InfoList title="Reglas de seguridad muestral" items={rules} />
      </div>
    </section>
  );
}

function SummaryCards({ data }: { data: LogisticRegressionAnalysisData }) {
  const summary = data.summary ?? {};
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Resumen
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Modelos totales" value={summary.total_models ?? 0} />
        <MetricCard label="Modelos válidos" value={summary.valid_models ?? 0} />
        <MetricCard label="Modelos no válidos" value={summary.invalid_models ?? 0} />
        <MetricCard
          label="Con riesgo difuso"
          value={summary.fuzzy_dependent_models ?? 0}
        />
      </div>
    </section>
  );
}

function OddsRatioChartSection({ data }: { data: LogisticRegressionAnalysisData }) {
  return <LogisticOddsRatioBarChart data={data} />;
}

function ModelSection({
  title,
  models,
}: {
  title: string;
  models: LogisticRegressionModelResult[];
}) {
  if (models.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h2>
      <div className="space-y-4">
        {models.map((model) => (
          <LogisticModelCard key={model.id} model={model} />
        ))}
      </div>
    </section>
  );
}

function LogisticModelCard({ model }: { model: LogisticRegressionModelResult }) {
  const predictors = asArray(model.predictors);
  const warnings = asArray(model.warnings).filter(Boolean);
  const notes = asArray(model.methodology_notes).filter(Boolean);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {model.title ?? model.id}
          </h3>
          {model.description && (
            <p className="mt-1 text-sm text-slate-600">{model.description}</p>
          )}
        </div>
        {model.model_valid ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Modelo ajustado
          </span>
        ) : (
          <StatusBadge status="insufficient_data" />
        )}
      </div>

      <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Desenlace positivo
        </p>
        <p className="mt-1 font-medium text-slate-800">
          {model.outcome?.label ?? model.outcome?.name ?? '—'}
        </p>
        <p className="mt-1 text-slate-600">
          {model.outcome?.definition ?? 'Definición no disponible.'}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-6">
        <Stat label="n" value={model.sample_size ?? 0} />
        <Stat label="Excluidos" value={model.excluded_rows ?? 0} />
        <Stat label="Positivos" value={model.positive_cases ?? 0} />
        <Stat label="Negativos" value={model.negative_cases ?? 0} />
        <Stat label="EPV" value={formatNumber(model.events_per_variable, 2)} />
        <Stat label="Exactitud" value={formatOptional(model.accuracy, 4)} />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Stat label="Intercepto" value={formatOptional(model.intercept, 6)} />
        <Stat
          label="Clase positiva"
          value={model.outcome?.positive_class ?? '—'}
        />
      </div>

      {warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {warnings.map((warning, index) => (
            <div
              key={`${model.id}-warning-${index}`}
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
            >
              {warning}
            </div>
          ))}
        </div>
      )}

      <PredictorTable predictors={predictors} />

      {notes.length > 0 && (
        <div className="mt-4">
          <InfoList title="Notas metodológicas" items={notes} />
        </div>
      )}
    </article>
  );
}

function PredictorTable({
  predictors,
}: {
  predictors: LogisticRegressionPredictorResult[];
}) {
  if (predictors.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
        No hay predictores disponibles para este modelo.
      </div>
    );
  }

  const showPValue = predictors.some((predictor) => predictor.p_value != null);
  const showCi = predictors.some((predictor) => predictor.confidence_interval != null);

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <caption className="border-b border-slate-200 px-4 py-2 text-left text-sm font-semibold text-slate-700">
          Predictores
        </caption>
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-2 font-medium">Predictor</th>
            <th className="px-3 py-2 text-right font-medium">Coef.</th>
            <th className="px-3 py-2 text-right font-medium">OR</th>
            {showPValue && (
              <th className="px-3 py-2 text-right font-medium">p-valor</th>
            )}
            {showCi && (
              <th className="px-3 py-2 text-right font-medium">IC</th>
            )}
            <th className="px-4 py-2 font-medium">Interpretación</th>
          </tr>
        </thead>
        <tbody>
          {predictors.map((predictor, index) => (
            <tr
              key={`${predictor.name ?? 'predictor'}-${index}`}
              className="border-t border-slate-100 align-top"
            >
              <td className="px-4 py-2 font-medium text-slate-800">
                {predictor.label ?? predictor.name ?? '—'}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-slate-700">
                {formatNumber(predictor.coefficient, 6)}
              </td>
              <td className="px-3 py-2 text-right tabular-nums text-slate-700">
                {formatNumber(predictor.odds_ratio, 4)}
              </td>
              {showPValue && (
                <td className="px-3 py-2 text-right tabular-nums text-slate-700">
                  {formatNumber(predictor.p_value, 6)}
                </td>
              )}
              {showCi && (
                <td className="px-3 py-2 text-right tabular-nums text-slate-700">
                  {formatConfidenceInterval(predictor.confidence_interval)}
                </td>
              )}
              <td className="min-w-64 px-4 py-2 text-slate-600">
                {predictor.interpretation ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatConfidenceInterval(value?: [number, number] | null): string {
  if (!value || value.length !== 2) return '—';
  return `[${formatNumber(value[0], 4)}, ${formatNumber(value[1], 4)}]`;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
            <span
              aria-hidden
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Limitations({ limitations }: { limitations?: string[] }) {
  const rows = asArray(limitations);
  if (rows.length === 0) return null;
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-700">Limitaciones</h2>
      <ul className="mt-2 space-y-1">
        {rows.map((limitation, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
            <span
              aria-hidden
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400"
            />
            {limitation}
          </li>
        ))}
      </ul>
    </section>
  );
}
