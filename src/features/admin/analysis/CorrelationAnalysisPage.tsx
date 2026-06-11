import { useOutletContext } from 'react-router-dom';
import { fetchCorrelationAnalysis } from '@/api/analysis';
import type { AdminOutletContext } from '@/types/admin';
import type {
  CorrelationAnalysisData,
  CorrelationTestResult,
} from '@/types/analysis';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { ErrorState } from './components/ErrorState';
import { LoadingState } from './components/LoadingState';
import { MetricCard } from './components/MetricCard';
import { NoticeBox } from './components/NoticeBox';
import { StatusBadge } from './components/StatusBadge';
import { CorrelationStrengthBarChart } from './components/charts/chartjs/CorrelationStrengthBarChart';

function asArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function formatNumber(value: number | null | undefined, digits = 4): string {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return value.toFixed(digits);
}

function warningText(warning: string | { message?: string }): string {
  return typeof warning === 'string' ? warning : warning.message ?? '';
}

function methodLabel(method?: string): string {
  if (method === 'pearson') return 'Pearson';
  if (method === 'spearman') return 'Spearman';
  return method ?? '—';
}

function coefficientLabel(method?: string): string {
  return method === 'spearman' ? 'rho' : 'r';
}

export function CorrelationAnalysisPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const query = useAnalysisQuery(() => fetchCorrelationAnalysis(token), [token]);

  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el análisis de correlaciones." />;
  }

  if (query.status === 'loading') return <LoadingState />;
  if (!query.data) return <ErrorState message="No se recibieron datos." />;

  const data = query.data;
  const independent = asArray(data.groups?.fuzzy_independent);
  const fuzzyDependent = asArray(data.groups?.fuzzy_dependent);
  const tests = asArray(data.tests);
  const validTests = tests.filter((test) => test.valid);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Correlaciones</h1>
        <p className="mt-1 text-base text-slate-600">
          Análisis de relación entre variables numéricas u ordinales del prototipo.
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

      <CorrelationStrengthSection data={data} />

      {validTests.length === 0 && (
        <NoticeBox variant="warning">
          No existen datos suficientes para ejecutar análisis de correlación.
        </NoticeBox>
      )}

      <TestSection
        title="Correlaciones independientes de lógica difusa"
        tests={independent}
      />

      <TestSection
        title="Correlaciones con riesgo difuso Mamdani"
        tests={fuzzyDependent}
      />

      <Limitations limitations={data.limitations} />
    </div>
  );
}

function MethodologyCard({ data }: { data: CorrelationAnalysisData }) {
  const methodology = data.methodology;
  const guidelines = methodology?.interpretation_guidelines ?? {};
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Metodología estadística
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Pearson para asociación lineal y Spearman para asociación monótonica
            u ordinal. Alpha = {methodology?.alpha ?? 0.05}.
          </p>
        </div>
        <StatusBadge status="implemented" />
      </div>

      <div className="mt-3 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="font-semibold text-slate-700">H0</p>
          <p className="mt-1">{methodology?.hypotheses?.h0 ?? ''}</p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="font-semibold text-slate-700">H1</p>
          <p className="mt-1">{methodology?.hypotheses?.h1 ?? ''}</p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Guía de fuerza
        </p>
        <div className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-5">
          {['0.00-0.19', '0.20-0.39', '0.40-0.59', '0.60-0.79', '0.80-1.00'].map((key) => (
            <div key={key}>
              <span className="font-medium text-slate-800">{key}</span>
              <span className="block">{guidelines[key] ?? '—'}</span>
            </div>
          ))}
        </div>
        {guidelines.note && (
          <p className="mt-2 text-xs text-slate-500">{guidelines.note}</p>
        )}
      </div>
    </section>
  );
}

function SummaryCards({ data }: { data: CorrelationAnalysisData }) {
  const summary = data.summary ?? {};
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Resumen
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Pruebas totales" value={summary.total_tests ?? 0} />
        <MetricCard label="Pruebas válidas" value={summary.valid_tests ?? 0} />
        <MetricCard
          label="Correlaciones significativas"
          value={summary.significant_tests ?? 0}
        />
        <MetricCard
          label="Con riesgo difuso"
          value={summary.fuzzy_dependent_tests ?? 0}
        />
      </div>
    </section>
  );
}

function CorrelationStrengthSection({ data }: { data: CorrelationAnalysisData }) {
  return (
    <CorrelationStrengthBarChart data={data} />
  );
}

function TestSection({
  title,
  tests,
}: {
  title: string;
  tests: CorrelationTestResult[];
}) {
  if (tests.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {tests.map((test) => (
          <CorrelationCard key={test.id} test={test} />
        ))}
      </div>
    </section>
  );
}

function CorrelationCard({ test }: { test: CorrelationTestResult }) {
  const pValue = test.p_value;
  const significant =
    test.valid === true &&
    typeof pValue === 'number' &&
    pValue <= (test.alpha ?? 0.05);
  const warnings = asArray(test.warnings).map(warningText).filter(Boolean);
  const preview = asArray(test.data_points_preview);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {test.title}
          </h3>
          {test.description && (
            <p className="mt-1 text-sm text-slate-600">{test.description}</p>
          )}
        </div>
        {test.valid ? (
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              significant
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            {significant
              ? 'Correlación significativa'
              : 'Sin correlación significativa'}
          </span>
        ) : (
          <StatusBadge status="insufficient_data" />
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Método" value={methodLabel(test.method)} />
        <Stat label="n" value={test.sample_size ?? 0} />
        <Stat
          label={coefficientLabel(test.method)}
          value={formatNumber(test.coefficient)}
        />
        <Stat label="p-valor" value={formatNumber(test.p_value, 6)} />
        <Stat label="Dirección" value={test.direction ?? '—'} />
        <Stat label="Fuerza" value={test.strength ?? '—'} />
      </div>

      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Decisión
          </p>
          <p className="mt-1 font-medium text-slate-800">
            {test.decision ?? '—'}
          </p>
          {test.interpretation && (
            <p className="mt-1 text-slate-600">{test.interpretation}</p>
          )}
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Variables
          </p>
          <p className="mt-1 text-slate-700">
            {test.variables?.x?.label ?? test.variables?.x?.name ?? 'Variable X'}{' '}
            vs.{' '}
            {test.variables?.y?.label ?? test.variables?.y?.name ?? 'Variable Y'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            H0: {test.hypotheses?.h0 ?? ''}
          </p>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {warnings.map((warning, index) => (
            <div
              key={`${test.id}-warning-${index}`}
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
            >
              {warning}
            </div>
          ))}
        </div>
      )}

      {preview.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <caption className="border-b border-slate-200 px-4 py-2 text-left text-sm font-semibold text-slate-700">
              Vista previa de pares numéricos
            </caption>
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-2 font-medium">#</th>
                <th className="px-3 py-2 text-right font-medium">X</th>
                <th className="px-4 py-2 text-right font-medium">Y</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((point, index) => (
                <tr key={`${test.id}-point-${index}`} className="border-t border-slate-100">
                  <td className="px-4 py-2 text-slate-500">{index + 1}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-slate-900">
                    {formatNumber(point.x, 4)}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-slate-900">
                    {formatNumber(point.y, 4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
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
