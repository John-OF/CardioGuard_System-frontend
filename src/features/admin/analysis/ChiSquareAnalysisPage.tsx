import { useOutletContext } from 'react-router-dom';
import { fetchChiSquareAnalysis } from '@/api/analysis';
import type { AdminOutletContext } from '@/types/admin';
import type {
  ChiSquareAnalysisData,
  ChiSquareObservedTable,
  ChiSquareTestResult,
} from '@/types/analysis';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { ErrorState } from './components/ErrorState';
import { LoadingState } from './components/LoadingState';
import { MetricCard } from './components/MetricCard';
import { NoticeBox } from './components/NoticeBox';
import { StatusBadge } from './components/StatusBadge';
import { ChiSquareObservedExpectedChart } from './components/charts/chartjs/ChiSquareObservedExpectedChart';

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

function hasLowExpectedFrequencies(test: ChiSquareTestResult): boolean {
  return (test.assumptions?.expected_frequency_cells_below_5 ?? 0) > 0;
}

export function ChiSquareAnalysisPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const query = useAnalysisQuery(() => fetchChiSquareAnalysis(token), [token]);

  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el análisis chi-cuadrado." />;
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
        <h1 className="text-2xl font-bold text-slate-900">Chi-cuadrado</h1>
        <p className="mt-1 text-base text-slate-600">
          Pruebas de asociación entre variables categóricas del prototipo.
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

      <ChiSquareObservedExpectedChart data={data} />

      {validTests.length === 0 && (
        <NoticeBox variant="warning">
          No existen datos suficientes para ejecutar pruebas chi-cuadrado.
        </NoticeBox>
      )}

      <TestSection
        title="Análisis independientes de lógica difusa"
        tests={independent}
      />

      <TestSection
        title="Análisis con riesgo difuso Mamdani"
        tests={fuzzyDependent}
      />

      <Limitations limitations={data.limitations} />
    </div>
  );
}

function MethodologyCard({ data }: { data: ChiSquareAnalysisData }) {
  const methodology = data.methodology;
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Metodología estadística
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {methodology?.test ?? 'Chi-cuadrado de independencia'} con alpha ={' '}
            {methodology?.alpha ?? 0.05}.
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
      <p className="mt-3 text-sm text-slate-500">
        Tamaño de efecto: {methodology?.effect_size ?? "Cramér's V"}. Los
        umbrales se reportan como guías interpretativas.
      </p>
    </section>
  );
}

function SummaryCards({ data }: { data: ChiSquareAnalysisData }) {
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
          label="Asociaciones significativas"
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

function TestSection({
  title,
  tests,
}: {
  title: string;
  tests: ChiSquareTestResult[];
}) {
  if (tests.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h2>
      <div className="space-y-4">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </section>
  );
}

function TestCard({ test }: { test: ChiSquareTestResult }) {
  const pValue = test.p_value;
  const significant =
    test.valid === true &&
    typeof pValue === 'number' &&
    pValue <= (test.alpha ?? 0.05);
  const warnings = asArray(test.warnings).map(warningText).filter(Boolean);
  const caution = hasLowExpectedFrequencies(test);

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
        <div className="flex flex-wrap gap-2">
          {test.valid ? (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                significant
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              {significant
                ? 'Asociación significativa'
                : 'Sin asociación estadísticamente significativa'}
            </span>
          ) : (
            <StatusBadge status="insufficient_data" />
          )}
          {caution && (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
              Interpretar con cautela
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <Stat label="n" value={test.sample_size ?? test.grand_total ?? 0} />
        <Stat
          label="Chi-cuadrado"
          value={formatNumber(test.chi_square_statistic)}
        />
        <Stat label="gl" value={test.degrees_of_freedom ?? '—'} />
        <Stat label="p-valor" value={formatNumber(test.p_value, 6)} />
        <Stat label="Cramér's V" value={formatNumber(test.cramer_v)} />
        <Stat
          label="Efecto"
          value={test.effect_size_interpretation ?? '—'}
        />
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

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ChiSquareTable
          title="Tabla de contingencia observada"
          table={test.observed_table}
          rowTotals={test.row_totals}
          columnTotals={test.column_totals}
          grandTotal={test.grand_total}
          digits={0}
        />
        <ChiSquareTable
          title="Frecuencias esperadas"
          table={test.expected_table}
          digits={4}
        />
      </div>
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

function ChiSquareTable({
  title,
  table,
  rowTotals,
  columnTotals,
  grandTotal,
  digits,
}: {
  title: string;
  table?: ChiSquareObservedTable;
  rowTotals?: { value: string | number; label: string; total: number }[];
  columnTotals?: { value: string | number; label: string; total: number }[];
  grandTotal?: number;
  digits: number;
}) {
  const columns = asArray(table?.column_headers);
  const rows = asArray(table?.rows);
  const rowTotalMap = new Map(
    asArray(rowTotals).map((item) => [String(item.value), item.total]),
  );
  const hasTotals = rowTotals != null && columnTotals != null;

  if (columns.length === 0 || rows.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
        <p className="mt-2 text-sm text-slate-500">
          No hay tabla disponible para esta prueba.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full min-w-[520px] text-sm">
        <caption className="border-b border-slate-200 px-4 py-2 text-left text-sm font-semibold text-slate-700">
          {title}
        </caption>
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="py-2 pl-4 pr-3 font-medium">Categoría</th>
            {columns.map((column) => (
              <th
                key={String(column.value)}
                className="px-3 py-2 text-right font-medium"
              >
                {column.label}
              </th>
            ))}
            {hasTotals && (
              <th className="py-2 pl-3 pr-4 text-right font-medium">Total</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row.value)} className="border-t border-slate-100">
              <td className="py-2 pl-4 pr-3 text-slate-700">{row.label}</td>
              {row.cells.map((cell, index) => (
                <td
                  key={`${row.value}-${index}`}
                  className="px-3 py-2 text-right tabular-nums text-slate-900"
                >
                  {digits === 0 ? cell : formatNumber(cell, digits)}
                </td>
              ))}
              {hasTotals && (
                <td className="py-2 pl-3 pr-4 text-right tabular-nums font-medium text-slate-900">
                  {rowTotalMap.get(String(row.value)) ?? '—'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
        {hasTotals && (
          <tfoot>
            <tr className="border-t border-slate-200 bg-slate-50 font-medium">
              <td className="py-2 pl-4 pr-3 text-slate-700">Total</td>
              {asArray(columnTotals).map((column) => (
                <td
                  key={String(column.value)}
                  className="px-3 py-2 text-right tabular-nums text-slate-900"
                >
                  {column.total}
                </td>
              ))}
              <td className="py-2 pl-3 pr-4 text-right tabular-nums text-slate-900">
                {grandTotal ?? '—'}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
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
