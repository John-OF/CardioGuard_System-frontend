import { useCallback, useMemo, type ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Scatter } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import {
  fetchSpearmanMlFuzzy,
  type AcademicSpearmanData,
  type SpearmanStats,
} from '@/api/academicSpearman';
import type { AdminOutletContext } from '@/types/admin';
import { useAnalysisQuery } from '@/features/admin/analysis/hooks/useAnalysisQuery';
import { ErrorState } from '@/features/admin/analysis/components/ErrorState';
import { LoadingState } from '@/features/admin/analysis/components/LoadingState';
import '../../analysis/components/charts/chartjs/ChartJsRegistry';

export function SpearmanAcademicPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const fetchAnalysis = useCallback(() => fetchSpearmanMlFuzzy(token), [token]);
  const query = useAnalysisQuery(fetchAnalysis);

  if (query.status === 'loading' || query.status === 'idle') return <LoadingState />;
  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el análisis académico de Spearman." />;
  }
  if (!query.data) return <ErrorState message="No se recibieron datos." />;

  const data = query.data;
  const noSystemResults =
    data.cohort.total > 0 &&
    data.results.n === 0 &&
    data.exclusions.missing_system_result === data.cohort.total;

  return (
    <div className="space-y-6 pb-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Módulo oculto</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">{data.title}</h1>
        <p className="mt-2 text-base text-slate-600">Análisis académico de coherencia interna entre ML y lógica difusa.</p>
      </header>

      <Notice>{data.methodological_note}</Notice>
      <Methodology data={data} />
      <Hypotheses data={data} />

      {noSystemResults && (
        <Notice warning>
          La cohorte metodológica existe, pero no hay resultados del sistema asociados.
          Importe correctamente system_results para calcular este análisis.
        </Notice>
      )}
      {!data.can_calculate && !noSystemResults && (
        <Notice warning>
          No existen pares válidos suficientes para calcular la correlación de Spearman en la cohorte metodológica.
          {data.calculation_blockers.length > 0 && ` ${data.calculation_blockers.join(' ')}`}
        </Notice>
      )}
      {data.warnings.map((warning) => <Notice key={warning} warning>{warning}</Notice>)}

      <DescriptiveStats data={data} />
      <Formula data={data} />
      <Results data={data} />
      <ScatterPlot data={data} />
      <RankTable data={data} />
      <Card title="Interpretación"><p className="text-sm leading-7 text-slate-700">{data.interpretation}</p></Card>
      <Notice warning>
        La correlación no implica causalidad. Debido a que la probabilidad ML es una entrada de la lógica difusa,
        este resultado describe coherencia interna y no una validación clínica independiente.
      </Notice>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>{children}</section>;
}

function Notice({ children, warning = false }: { children: ReactNode; warning?: boolean }) {
  return <div className={`rounded-xl border p-4 text-sm leading-6 ${warning ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-cyan-200 bg-cyan-50 text-cyan-950'}`}>{children}</div>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 text-slate-800">{value}</dd></div>;
}

function Methodology({ data }: { data: AcademicSpearmanData }) {
  return (
    <Card title="Definición metodológica">
      <p className="font-medium leading-6 text-slate-800">{data.methodological_question}</p>
      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <Info label="Variable X" value={`${data.variables.x.label} (${data.variables.x.scale})`} />
        <Info label="Variable Y" value={`${data.variables.y.label} (${data.variables.y.scale})`} />
        <Info label="Unidad" value={data.cohort.unit_label} />
        <Info label="Cohorte total" value={String(data.cohort.total)} />
        <Info label="Pares válidos" value={String(data.results.n)} />
        <Info label="Significancia" value={`α = ${data.alpha.toFixed(2)}`} />
      </dl>
      <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">{data.justification}</p>
    </Card>
  );
}

function Hypotheses({ data }: { data: AcademicSpearmanData }) {
  return <Card title="Hipótesis"><p className="text-sm leading-6 text-slate-700">{data.hypotheses.null}</p><p className="mt-3 text-sm leading-6 text-slate-700">{data.hypotheses.alternative}</p></Card>;
}

function format(value: number | null, decimals = 4) {
  return value == null ? 'No disponible' : value.toFixed(decimals);
}

function formatPValue(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return 'No calculable';
  if (value < 0.001) return 'p < 0.001';
  return `p = ${value.toFixed(6)}`;
}

function formatExactPValue(value: number | null | undefined): string | null {
  if (value == null || Number.isNaN(value) || value >= 0.001) return null;
  if (value === 0) {
    return 'Valor exacto: menor que la precisión numérica disponible';
  }
  return `Valor exacto: ${value.toExponential(3)}`;
}

function StatsBlock({ title, stats }: { title: string; stats: SpearmanStats }) {
  const items = [['n', String(stats.n)], ['Media', format(stats.mean)], ['Mediana', format(stats.median)], ['DE', format(stats.std)], ['Mínimo', format(stats.min)], ['Máximo', format(stats.max)], ['Q1', format(stats.q1)], ['Q3', format(stats.q3)]];
  return <div className="rounded-lg border border-slate-200 p-4"><h3 className="font-semibold text-slate-800">{title}</h3><dl className="mt-3 grid grid-cols-2 gap-2 text-sm">{items.map(([label, value]) => <div key={label} className="contents"><dt className="text-slate-500">{label}</dt><dd className="text-right tabular-nums text-slate-900">{value}</dd></div>)}</dl></div>;
}

function DescriptiveStats({ data }: { data: AcademicSpearmanData }) {
  return <Card title="Estadística descriptiva"><div className="grid gap-4 md:grid-cols-2"><StatsBlock title="Probabilidad ML" stats={data.descriptive_stats.ml_probability} /><StatsBlock title="Puntaje difuso" stats={data.descriptive_stats.fuzzy_risk_score} /></div><p className="mt-4 text-xs text-slate-500">Exclusiones: sin SystemResult {data.exclusions.missing_system_result}; ML nulo {data.exclusions.null_ml_probability}; fuzzy nulo {data.exclusions.null_fuzzy_risk_score}; fuera de rango {data.exclusions.invalid_range}.</p></Card>;
}

function Formula({ data }: { data: AcademicSpearmanData }) {
  return <Card title="Fórmula y secuencia de cálculo"><p className="rounded-lg bg-slate-900 p-4 text-center font-mono text-xl text-white">{data.formula.display}</p><ol className="mt-4 space-y-2">{data.formula.steps.map((step, index) => <li key={step} className="flex gap-3 rounded-lg bg-slate-50 p-3 text-sm"><span className="font-semibold text-cyan-700">{index + 1}.</span>{step}</li>)}</ol><p className="mt-4 text-sm text-slate-700">Σd² = <strong>{data.formula.sum_d_squared.toFixed(4)}</strong></p><p className="mt-2 text-xs leading-5 text-slate-500">{data.formula.tie_note}</p></Card>;
}

function Results({ data }: { data: AcademicSpearmanData }) {
  const result = data.results;
  const pValueDisplay = result.p_value_display?.trim() || formatPValue(result.p_value);
  const pValueExactDisplay =
    result.p_value_exact_display?.trim() || formatExactPValue(result.p_value);
  const items = [
    { label: 'ρ DE SPEARMAN', value: format(result.rho, 6) },
    { label: 'P-VALOR', value: pValueDisplay || 'No calculable', secondary: pValueExactDisplay },
    { label: 'N', value: String(result.n) },
    { label: 'FUERZA', value: result.strength },
    { label: 'DIRECCIÓN', value: result.direction },
    {
      label: 'VALORES REPETIDOS',
      value: `ML: ${data.ties.ml_probability} · Difuso: ${data.ties.fuzzy_risk_score}`,
      secondary: 'Los valores repetidos se manejaron mediante rangos promedio.',
    },
  ];
  return <Card title="Resultados"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <div key={item.label} className="rounded-lg border border-slate-200 p-4"><p className="text-xs font-semibold text-slate-500">{item.label}</p><p className="mt-1 text-lg font-bold tabular-nums text-slate-900">{item.value}</p>{item.secondary && <p className="mt-2 text-xs leading-5 text-slate-500">{item.secondary}</p>}</div>)}</div><div className="mt-4 rounded-lg bg-slate-900 p-4 text-white"><p className="text-xs uppercase tracking-wide text-slate-300">Decisión</p><p className="mt-1 text-lg font-semibold">{result.decision}</p></div></Card>;
}

function ScatterPlot({ data }: { data: AcademicSpearmanData }) {
  const chartData = useMemo(() => ({ datasets: [{ label: 'Usuario de la cohorte', data: data.scatter_points, backgroundColor: '#0891b2', borderColor: '#0e7490', pointRadius: 5, pointHoverRadius: 7 }] }), [data.scatter_points]);
  const options: ChartOptions<'scatter'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label(context) { const point = data.scatter_points[context.dataIndex]; return `ML ${point.x.toFixed(4)} · Difuso ${point.y.toFixed(4)} · ${point.anonymous_user_id.slice(0, 8)}…`; } } } }, scales: { x: { min: 0, max: 1, title: { display: true, text: 'Probabilidad ML' } }, y: { min: 0, max: 1, title: { display: true, text: 'Puntaje de riesgo difuso' } } } };
  return <Card title="Diagrama de dispersión">{data.scatter_points.length === 0 ? <p className="text-sm text-slate-500">No hay pares válidos para representar.</p> : <div className="h-[360px]"><Scatter data={chartData} options={options} /></div>}</Card>;
}

function RankTable({ data }: { data: AcademicSpearmanData }) {
  return <Card title="Tabla didáctica de rangos"><div className="max-h-[520px] overflow-auto"><table className="w-full min-w-[1050px] text-sm"><thead className="sticky top-0 bg-slate-50 text-xs uppercase text-slate-600"><tr><th className="px-3 py-3 text-left">Usuario</th><th className="px-3 py-3 text-right">ML</th><th className="px-3 py-3 text-right">Rango ML</th><th className="px-3 py-3 text-right">Difuso</th><th className="px-3 py-3 text-right">Rango difuso</th><th className="px-3 py-3 text-right">d</th><th className="px-3 py-3 text-right">d²</th><th className="px-3 py-3 text-right">Predicción</th><th className="px-3 py-3 text-left">Nivel fuzzy</th></tr></thead><tbody>{data.rank_table.length === 0 ? <tr><td colSpan={9} className="px-3 py-8 text-center text-slate-500">No hay pares válidos.</td></tr> : data.rank_table.map(row => <tr key={row.evaluation_id} className="border-t border-slate-100"><td className="px-3 py-2 font-mono text-xs">{row.anonymous_user_id.slice(0, 8)}…</td><td className="px-3 py-2 text-right tabular-nums">{row.ml_probability.toFixed(4)}</td><td className="px-3 py-2 text-right">{row.rank_ml_probability.toFixed(2)}</td><td className="px-3 py-2 text-right tabular-nums">{row.fuzzy_risk_score.toFixed(4)}</td><td className="px-3 py-2 text-right">{row.rank_fuzzy_risk_score.toFixed(2)}</td><td className="px-3 py-2 text-right">{row.d.toFixed(2)}</td><td className="px-3 py-2 text-right">{row.d_squared.toFixed(2)}</td><td className="px-3 py-2 text-right">{row.ml_prediction}</td><td className="px-3 py-2">{row.fuzzy_risk_level}</td></tr>)}</tbody></table></div></Card>;
}
