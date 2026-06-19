import { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  fetchCprKnowledgeConsciousnessActionChiSquare,
  fetchEmergencyNumberActionChiSquare,
  fetchPriorTrainingEducationalChangeChiSquare,
  fetchSymptomRecognitionEmergencyActionChiSquare,
  type AcademicChiSquareData,
  type ContingencyTable,
} from '@/api/academicChiSquare';
import type { AdminOutletContext } from '@/types/admin';
import { useAnalysisQuery } from '@/features/admin/analysis/hooks/useAnalysisQuery';
import { ErrorState } from '@/features/admin/analysis/components/ErrorState';
import { LoadingState } from '@/features/admin/analysis/components/LoadingState';

const FORMULAS = [
  'Eᵢⱼ = (total fila × total columna) / total general',
  'χ² = Σ (Oᵢⱼ - Eᵢⱼ)² / Eᵢⱼ',
  'gl = (filas - 1) × (columnas - 1)',
  'p = P(Χ²gl ≥ χ² calculado)',
  'V = √(χ² / (n × min(filas - 1, columnas - 1)))',
];

export function ChiSquareAcademicPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const fetchFirst = useCallback(() => fetchEmergencyNumberActionChiSquare(token), [token]);
  const fetchSecond = useCallback(() => fetchCprKnowledgeConsciousnessActionChiSquare(token), [token]);
  const fetchThird = useCallback(() => fetchSymptomRecognitionEmergencyActionChiSquare(token), [token]);
  const fetchFourth = useCallback(() => fetchPriorTrainingEducationalChangeChiSquare(token), [token]);
  const firstQuery = useAnalysisQuery(fetchFirst);
  const secondQuery = useAnalysisQuery(fetchSecond);
  const thirdQuery = useAnalysisQuery(fetchThird);
  const fourthQuery = useAnalysisQuery(fetchFourth);

  return (
    <div className="space-y-8 pb-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Módulo oculto</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Análisis académico: Chi-cuadrado</h1>
        <p className="mt-2 text-base text-slate-600">Contrastes de asociación para variables categóricas del post-test.</p>
      </header>

      <Notice>
        Este módulo es de apoyo académico y no forma parte del flujo principal del prototipo. Los datos se leen de forma anónima desde la base de datos y el análisis no modifica registros.
      </Notice>

      <AnalysisQuerySection
        title="Cruce 1: Conocimiento del número de emergencia × acción inicial ante posible infarto"
        query={firstQuery}
        logout={logout}
      />
      <AnalysisQuerySection
        title="Cruce 2: Conocimiento sobre RCP × acción ante pérdida de conocimiento"
        query={secondQuery}
        logout={logout}
      />
      <AnalysisQuerySection
        title="Cruce 3: Reconocimiento de síntomas × acción inicial ante posible infarto"
        query={thirdQuery}
        logout={logout}
      />
      <AnalysisQuerySection
        title="Cruce 4: Entrenamiento previo × mejora educativa"
        query={fourthQuery}
        logout={logout}
      />
    </div>
  );
}

function AnalysisQuerySection({
  title,
  query,
  logout,
}: {
  title: string;
  query: { status: string; data: AcademicChiSquareData | null; error: string | null };
  logout: () => void;
}) {
  if (query.status === 'loading' || query.status === 'idle') {
    return <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6"><h2 className="mb-5 text-2xl font-bold text-slate-900">{title}</h2><LoadingState /></section>;
  }
  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <section className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6"><h2 className="mb-5 text-2xl font-bold text-slate-900">{title}</h2><ErrorState message="No se pudo cargar este análisis académico." /></section>;
  }
  if (!query.data) return <ErrorState message="No se recibieron datos." />;
  return <AnalysisSection title={title} data={query.data} />;
}

function AnalysisSection({ title, data }: { title: string; data: AcademicChiSquareData }) {
  return (
    <section className="space-y-6 rounded-2xl border-2 border-slate-300 bg-slate-50 p-5 shadow-sm sm:p-7">
      <div className="border-b border-slate-300 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">Análisis independiente</p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <Methodology data={data} />
      <Card title="Hipótesis">
        <p className="text-sm leading-6 text-slate-700">{data.hypotheses.null}</p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{data.hypotheses.alternative}</p>
      </Card>
      {!data.can_calculate ? (
        <Notice warning>No existen registros suficientes para calcular este análisis.</Notice>
      ) : (
        <>
          <TableCard title="Tabla de frecuencias observadas" table={data.observed_table} />
          {data.expected_table && <TableCard title="Tabla de frecuencias esperadas" table={data.expected_table} decimals />}
          <ContributionTable rows={data.cell_calculations} />
          <FormulaSequence />
          {data.results && <Results data={data} />}
          <FisherExact data={data} />
          {data.results && data.distribution_points.length > 0 && <Distribution data={data} />}
          <Card title="Interpretación"><p className="text-sm leading-7 text-slate-700">{data.interpretation}</p></Card>
        </>
      )}
      <Assumptions data={data} />
      <DetailTable data={data} />
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function Notice({ children, warning = false }: { children: React.ReactNode; warning?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 text-sm leading-6 ${warning ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-cyan-200 bg-cyan-50 text-cyan-950'}`}>
      {children}
    </div>
  );
}

function Methodology({ data }: { data: AcademicChiSquareData }) {
  return (
    <Card title="Definición metodológica">
      <p className="font-medium leading-6 text-slate-800">{data.methodological_question}</p>
      <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <Info label="Variable X" value={data.variables.x} />
        <Info label="Variable Y" value={data.variables.y} />
        <Info label="Registros válidos (n)" value={String(data.total_valid_records)} />
        <Info label="Nivel de significancia" value={`α = ${data.alpha.toFixed(2)}`} />
        <Info label="Registros excluidos" value={String(data.excluded_records_count)} />
        <Info label="Fuente" value={data.data_source} />
      </dl>
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-600">
        <p><strong>Alcance:</strong> {data.scope_label}.</p>
        <p>{data.methodological_note}</p>
      </div>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 text-slate-800">{value}</dd></div>;
}

function TableCard({ title, table, decimals = false }: { title: string; table: ContingencyTable; decimals?: boolean }) {
  return <Card title={title}><ContingencyTableView table={table} decimals={decimals} /></Card>;
}

function ContingencyTableView({ table, decimals = false }: { table: ContingencyTable; decimals?: boolean }) {
  const format = (value: number) => decimals ? value.toFixed(2) : value.toString();
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
          <tr><th className="px-4 py-3 text-left">{table.row_variable ?? 'Categoría'}</th>{table.columns.map(column => <th key={column} className="px-4 py-3 text-right">{column}</th>)}<th className="px-4 py-3 text-right">Total</th></tr>
        </thead>
        <tbody>
          {table.rows.map(row => <tr key={row.category} className="border-t border-slate-100"><th className="px-4 py-3 text-left font-medium text-slate-800">{row.category}</th>{table.columns.map(column => <td key={column} className="px-4 py-3 text-right tabular-nums">{format(row.values[column])}</td>)}<td className="px-4 py-3 text-right font-semibold tabular-nums">{row.total}</td></tr>)}
          <tr className="border-t-2 border-slate-200 bg-slate-50 font-semibold"><th className="px-4 py-3 text-left">Total</th>{table.columns.map(column => <td key={column} className="px-4 py-3 text-right tabular-nums">{table.column_totals[column]}</td>)}<td className="px-4 py-3 text-right tabular-nums">{table.grand_total}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

function ContributionTable({ rows }: { rows: AcademicChiSquareData['cell_calculations'] }) {
  return (
    <Card title="Cálculo por celda">
      <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-600"><tr><th className="px-4 py-3 text-left">Celda</th><th className="px-4 py-3 text-right">Observado O</th><th className="px-4 py-3 text-right">Esperado E</th><th className="px-4 py-3 text-right">Fórmula</th><th className="px-4 py-3 text-right">Aporte a χ²</th></tr></thead><tbody>{rows.map(row => <tr key={`${row.row_category}-${row.column_category}`} className="border-t border-slate-100"><td className="px-4 py-3">{row.row_category} × {row.column_category}</td><td className="px-4 py-3 text-right tabular-nums">{row.observed}</td><td className="px-4 py-3 text-right tabular-nums">{row.expected.toFixed(2)}</td><td className="px-4 py-3 text-right font-mono text-xs">{row.formula_text}</td><td className="px-4 py-3 text-right font-semibold tabular-nums">{row.contribution.toFixed(4)}</td></tr>)}</tbody></table></div>
    </Card>
  );
}

function FormulaSequence() {
  return <Card title="Secuencia de cálculo"><ol className="space-y-3">{FORMULAS.map((formula, index) => <li key={formula} className="flex gap-3 rounded-lg bg-slate-50 p-3"><span className="font-semibold text-cyan-700">{index + 1}.</span><code className="text-sm text-slate-800">{formula}</code></li>)}</ol></Card>;
}

function Results({ data }: { data: AcademicChiSquareData }) {
  const result = data.results!;
  const items = [['χ² calculado', result.formatted_chi_square], ['Grados de libertad', String(result.degrees_of_freedom)], ['p-valor', result.p_value.toFixed(6)], ['α', result.alpha.toFixed(2)], ['Valor crítico', result.critical_value.toFixed(4)], ['V de Cramér', `${result.cramers_v.toFixed(4)} (${result.cramers_v_interpretation})`]];
  return <Card title="Resultados"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{items.map(([label, value]) => <div key={label} className="rounded-lg border border-slate-200 p-4"><p className="text-xs font-semibold uppercase text-slate-500">{label}</p><p className="mt-1 text-xl font-bold tabular-nums text-slate-900">{value}</p></div>)}</div><div className="mt-4 rounded-lg bg-slate-900 p-4 text-white"><span className="text-xs uppercase tracking-wide text-slate-300">Decisión</span><p className="mt-1 text-lg font-semibold">{result.decision}</p></div></Card>;
}

function FisherExact({ data }: { data: AcademicChiSquareData }) {
  const fisher = data.fisher_exact;
  if (!fisher.available) {
    return <Card title="Prueba exacta de Fisher"><div className="rounded-lg border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estado: No aplicable</p><p className="mt-2 text-sm leading-6 text-slate-700">{fisher.reason}</p></div></Card>;
  }
  return (
    <Card title="Prueba exacta de Fisher">
      <div className="mb-4 rounded-lg border border-violet-200 bg-violet-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Estado: Complementaria</p>
        <p className="mt-2 text-sm leading-6 text-violet-950">
          {data.assumptions.acceptable
            ? 'La prueba exacta de Fisher se reporta como referencia complementaria porque la tabla inferencial efectiva es 2 × 2.'
            : 'La prueba exacta de Fisher se reporta como complemento debido a que la tabla es 2 × 2 y algunas frecuencias esperadas son menores a 5. Esta prueba permite contrastar la asociación cuando el supuesto de frecuencias esperadas del chi-cuadrado no se cumple completamente.'}
        </p>
      </div>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-4">
          <dt className="text-xs font-semibold uppercase text-slate-500">Odds ratio</dt>
          <dd className="mt-1 text-xl font-bold tabular-nums text-slate-900">{fisher.odds_ratio_label ?? 'No disponible'}</dd>
        </div>
        <div className="rounded-lg border border-slate-200 p-4">
          <dt className="text-xs font-semibold uppercase text-slate-500">p-valor Fisher</dt>
          <dd className="mt-1 text-xl font-bold tabular-nums text-slate-900">{fisher.p_value_label ?? 'No disponible'}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-slate-600"><strong>Motivo:</strong> {fisher.reason}</p>
      {fisher.interpretation && <p className="mt-3 border-t border-slate-100 pt-3 text-sm font-medium leading-6 text-slate-800">{fisher.interpretation}</p>}
    </Card>
  );
}

function Distribution({ data }: { data: AcademicChiSquareData }) {
  const result = data.results!;
  const points = data.distribution_points;
  const width = 900, height = 260, pad = 35;
  const maxX = Math.max(...points.map(point => point.x));
  const maxY = Math.max(...points.map(point => point.y));
  const sx = (x: number) => pad + x / maxX * (width - pad * 2);
  const sy = (y: number) => height - pad - y / maxY * (height - pad * 2);
  const path = points.map((point, index) => `${index ? 'L' : 'M'} ${sx(point.x).toFixed(1)} ${sy(point.y).toFixed(1)}`).join(' ');
  return <Card title="Distribución chi-cuadrado"><div className="overflow-x-auto"><svg viewBox={`0 0 ${width} ${height}`} className="min-w-[650px]" role="img" aria-label="Distribución chi-cuadrado con valores calculado y crítico"><rect x={sx(result.critical_value)} y={pad} width={Math.max(0, width - pad - sx(result.critical_value))} height={height - pad * 2} fill="#fff1f2" /><path d={path} fill="none" stroke="#0891b2" strokeWidth="3" /><line x1={sx(result.chi_square)} x2={sx(result.chi_square)} y1={pad} y2={height-pad} stroke="#2563eb" strokeWidth="2" /><line x1={sx(result.critical_value)} x2={sx(result.critical_value)} y1={pad} y2={height-pad} stroke="#e11d48" strokeWidth="2" strokeDasharray="6 5" /><line x1={pad} x2={width-pad} y1={height-pad} y2={height-pad} stroke="#94a3b8" /><text x={sx(result.chi_square)} y={20} textAnchor="middle" fontSize="13" fill="#1d4ed8">χ² = {result.formatted_chi_square}</text><text x={sx(result.critical_value)} y={height-10} textAnchor="middle" fontSize="13" fill="#be123c">Crítico = {result.critical_value.toFixed(4)}</text></svg></div><p className="mt-2 text-xs text-slate-500">La región sombreada comienza en el valor crítico y representa la región de rechazo para α = 0.05.</p></Card>;
}

function Assumptions({ data }: { data: AcademicChiSquareData }) {
  return <Card title="Validación de supuestos"><div className={`rounded-lg p-4 ${data.assumptions.acceptable ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'}`}><p className="font-semibold">{data.assumptions.acceptable ? 'Supuesto de frecuencias esperadas aceptable' : 'Interpretación con cautela'}</p><p className="mt-1 text-sm">Celdas con frecuencia esperada menor a 5: {data.assumptions.cells_below_5} ({data.assumptions.percentage_below_5.toFixed(1)}%).</p>{!data.assumptions.acceptable && <p className="mt-2 text-sm">{data.fisher_exact.available ? 'Algunas frecuencias esperadas son menores a 5. Por ello, el resultado de chi-cuadrado debe interpretarse con cautela y se reporta Fisher exacto como prueba complementaria.' : data.assumptions.warning}</p>}</div></Card>;
}

function DetailTable({ data }: { data: AcademicChiSquareData }) {
  const table: ContingencyTable = { ...data.descriptive_detail, column_totals: Object.fromEntries(data.descriptive_detail.columns.map(column => [column, data.descriptive_detail.rows.reduce((sum, row) => sum + row.values[column], 0)])), grand_total: data.valid_records };
  return <Card title="Detalle descriptivo por acción original"><p className="mb-4 text-xs font-semibold uppercase tracking-wide text-amber-700">Solo descriptivo: no se usa para el cálculo principal</p><ContingencyTableView table={table} /><p className="mt-4 text-xs leading-5 text-slate-500">{data.descriptive_detail.note}</p></Card>;
}
