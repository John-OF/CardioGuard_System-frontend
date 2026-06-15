import { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { fetchDescriptiveAnalysis } from '@/api/analysis';
import type { DescriptiveAnalysisData } from '@/types/analysis';
import type { AdminOutletContext } from '@/types/admin';
import { MetricCard } from './components/MetricCard';
import { NumericStatsCard } from './components/NumericStatsCard';
import { FrequencyTable } from './components/FrequencyTable';
import { DataQualityCard } from './components/DataQualityCard';
import { NoticeBox } from './components/NoticeBox';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { MLPredictionDoughnutChart } from './components/charts/chartjs/MLPredictionDoughnutChart';
import { MLProbabilityBucketsBarChart } from './components/charts/chartjs/MLProbabilityBucketsBarChart';

const GROUP_LABELS: Record<string, string> = {
  evaluations: 'Evaluaciones',
  health: 'Salud',
  habits: 'Hábitos',
  education: 'Educación',
  emergency: 'Emergencias',
  system: 'Sistema',
};

const EXCLUDED_GROUPS = ['system'];

export function DescriptiveAnalysisPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const fetchAnalysis = useCallback(() => fetchDescriptiveAnalysis(token), [token]);
  const query = useAnalysisQuery(fetchAnalysis);

  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el análisis descriptivo." />;
  }

  if (query.status === 'loading') return <LoadingState />;
  if (!query.data) return <ErrorState message="No se recibieron datos." />;

  const d = query.data;
  if (d.total_evaluations === 0) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Análisis descriptivo</h1>
        </header>
        <NoticeBox variant="warning">
          No hay evaluaciones registradas para analizar.
        </NoticeBox>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Análisis descriptivo</h1>
        <p className="mt-1 text-base text-slate-600">
          Distribuciones, frecuencias y estadísticos descriptivos del conjunto de datos.
        </p>
      </header>

      <NoticeBox variant="academic">
        CardioGuard es un prototipo académico. Los resultados no constituyen diagnóstico clínico.
      </NoticeBox>

      <SummaryCards d={d} />
      <EvaluationTypeDist rows={d.evaluation_type_distribution} />
      <CycleCounts cycles={d.cycle_counts} />
      <DescriptiveChartsSection d={d} />
      <CategoricalSection cf={d.categorical_frequencies} />
      <ContinuousSection cs={d.continuous_stats} />
      <DataQualityTab d={d} />
    </div>
  );
}

function SummaryCards({ d }: { d: DescriptiveAnalysisData }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Resumen
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Evaluaciones totales" value={d.total_evaluations} />
        <MetricCard
          label="Ciclos completos"
          value={d.cycle_counts.complete_cycles}
        />
        <MetricCard label="Pre-tests" value={d.cycle_counts.total_pre_tests} />
        <MetricCard label="Post-tests" value={d.cycle_counts.total_post_tests} />
      </div>
      {d.date_range && (
        <p className="mt-2 text-xs text-slate-500">
          Rango de fechas: {d.date_range.start} — {d.date_range.end}
        </p>
      )}
    </section>
  );
}

function EvaluationTypeDist({ rows }: { rows: { value: string; count: number }[] }) {
  const total = rows.reduce((s, r) => s + r.count, 0);
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Distribución por tipo de evaluación
      </h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2 pl-4 pr-3 font-medium">Tipo</th>
              <th className="py-2 px-3 text-right font-medium">n</th>
              <th className="py-2 pr-4 pl-3 text-right font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.value} className="border-t border-slate-100">
                <td className="py-2 pl-4 pr-3 text-slate-700">{row.value}</td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-900">{row.count}</td>
                <td className="py-2 pr-4 pl-3 text-right tabular-nums text-slate-600">
                  {total > 0 ? ((row.count / total) * 100).toFixed(1) : '0.0'}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CycleCounts({ cycles }: { cycles: DescriptiveAnalysisData['cycle_counts'] }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Ciclos
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Pre-tests" value={cycles.total_pre_tests} />
        <MetricCard label="Post-tests" value={cycles.total_post_tests} />
        <MetricCard label="Completos" value={cycles.complete_cycles} />
        <MetricCard label="Incompletos" value={cycles.incomplete_cycles} />
      </div>
    </section>
  );
}

function DescriptiveChartsSection({ d }: { d: DescriptiveAnalysisData }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Visualizaciones
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <MLPredictionDoughnutChart data={d} />
        <MLProbabilityBucketsBarChart data={d} />
      </div>
    </section>
  );
}

function CategoricalSection({
  cf,
}: {
  cf: DescriptiveAnalysisData['categorical_frequencies'];
}) {
  const groups = Object.entries(cf).filter(
    ([key]) => !EXCLUDED_GROUPS.includes(key),
  );
  if (groups.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Frecuencias por variable
      </h2>
      <div className="space-y-6">
        {groups.map(([groupKey, variables]) => (
          <div key={groupKey}>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              {GROUP_LABELS[groupKey] ?? groupKey}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(variables).map(([varName, rows]) => (
                <FrequencyTable
                  key={varName}
                  title={varName}
                  rows={rows}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContinuousSection({
  cs,
}: {
  cs: DescriptiveAnalysisData['continuous_stats'];
}) {
  if (!cs) return null;
  const entries = Object.entries(cs).filter(([, v]) => v !== null);
  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Estadísticos continuos
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([name, stats]) => (
          <NumericStatsCard key={name} title={name} stats={stats} />
        ))}
      </div>
    </section>
  );
}

function DataQualityTab({ d }: { d: DescriptiveAnalysisData }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <DataQualityCard
        entries={[
          { label: 'Evaluaciones totales', value: d.total_evaluations },
          { label: 'Ciclos completos', value: d.cycle_counts.complete_cycles },
          { label: 'Pre-tests', value: d.cycle_counts.total_pre_tests },
          { label: 'Post-tests', value: d.cycle_counts.total_post_tests },
        ]}
      />
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">
          Campos excluidos
        </h4>
        <p className="text-sm text-slate-500">
          fuzzy_risk_level y fuzzy_risk_score no se incluyen en este resumen
          descriptivo. La lógica Mamdani permanece activa como capa interpretativa
          del flujo de predicción.
        </p>
      </div>
    </section>
  );
}
