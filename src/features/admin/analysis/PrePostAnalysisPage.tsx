import { useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { fetchPrePostAnalysis } from '@/api/analysis';
import type { PrePostAnalysisData } from '@/types/analysis';
import type { AdminOutletContext } from '@/types/admin';
import { MetricCard } from './components/MetricCard';
import { NumericStatsCard } from './components/NumericStatsCard';
import { NoticeBox } from './components/NoticeBox';
import { DataQualityCard } from './components/DataQualityCard';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

export function PrePostAnalysisPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const query = useAnalysisQuery(
    () => fetchPrePostAnalysis(token),
    [token],
  );

  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el análisis pre-test/post-test." />;
  }

  if (query.status === 'loading') return <LoadingState />;
  if (!query.data) return <ErrorState message="No se recibieron datos." />;

  const d = query.data;

  if (d.cycle_counts.complete_cycles === 0) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            Análisis pre-test / post-test
          </h1>
        </header>
        <NoticeBox variant="warning">
          No existen ciclos completos suficientes para realizar comparación
          pre-test/post-test.
        </NoticeBox>
        <QualitySection d={d} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Análisis pre-test / post-test
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Comparación pareada de puntajes educativos y de emergencia entre
          evaluaciones pre-test y post-test enlazadas.
        </p>
      </header>

      <NoticeBox variant="academic">
        {d.non_diagnostic_notice}
      </NoticeBox>

      {d.summary.warnings.length > 0 && (
        <div className="space-y-1">
          {d.summary.warnings.map((w, i) => (
            <NoticeBox key={i} variant="warning">{w}</NoticeBox>
          ))}
        </div>
      )}

      <CycleCountCards cycles={d.cycle_counts} />

      {d.education && <ScoreSection title="Educación" data={d.education} />}
      {d.emergency && <ScoreSection title="Emergencia" data={d.emergency} />}
      {d.combined && <CombinedSection data={d.combined} />}

      <QuestionLevelSection changes={d.question_level_changes} />
      <StatisticalTestsSection tests={d.statistical_tests} />
      <QualitySection d={d} />

      <LimitationsSection limitations={d.limitations} />

      <FuzzyExclusionSection exclusion={d.excluded_fuzzy_fields} />
    </div>
  );
}

function CycleCountCards({
  cycles,
}: {
  cycles: PrePostAnalysisData['cycle_counts'];
}) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Ciclos
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Pre-tests totales" value={cycles.total_pre_tests} />
        <MetricCard label="Post-tests totales" value={cycles.total_post_tests} />
        <MetricCard label="Ciclos completos" value={cycles.complete_cycles} />
        <MetricCard
          label="Tasa de completación"
          value={`${cycles.completion_rate_percentage.toFixed(1)}%`}
        />
      </div>
    </section>
  );
}

function ScoreSection({
  title,
  data,
}: {
  title: string;
  data: PrePostAnalysisData['education'] & NonNullable<unknown>;
}) {
  if (!data) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Puntaje de {title.toLowerCase()} (máx. {data.max_score})
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <NumericStatsCard title="Pre-test" stats={data.pre_score_stats} />
        <NumericStatsCard title="Post-test" stats={data.post_score_stats} />
        <NumericStatsCard title="Diferencia" stats={data.difference_stats} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard
          label="Mejoraron"
          value={data.improved_count}
          hint={
            data.n_pairs > 0
              ? `${data.improved_percentage.toFixed(1)}% del total`
              : undefined
          }
        />
        <MetricCard label="Sin cambio" value={data.unchanged_count} />
        <MetricCard label="Empeoraron" value={data.worsened_count} />
        <MetricCard
          label="Diferencia media absoluta"
          value={data.mean_absolute_difference.toFixed(2)}
        />
      </div>
    </section>
  );
}

function CombinedSection({
  data,
}: {
  data: PrePostAnalysisData['combined'] & NonNullable<unknown>;
}) {
  if (!data) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Puntaje combinado (educación + emergencia, máx. {data.max_score})
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <NumericStatsCard title="Pre-test combinado" stats={data.pre_score_stats} />
        <NumericStatsCard title="Post-test combinado" stats={data.post_score_stats} />
        <NumericStatsCard title="Diferencia combinada" stats={data.difference_stats} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:w-1/2">
        <MetricCard label="Mejoraron" value={data.improved_count} />
        <MetricCard label="Sin cambio" value={data.unchanged_count} />
        <MetricCard label="Empeoraron" value={data.worsened_count} />
      </div>
    </section>
  );
}

function QuestionLevelSection({
  changes,
}: {
  changes: PrePostAnalysisData['question_level_changes'];
}) {
  const allEmpty =
    changes.education.length === 0 && changes.emergency.length === 0;
  if (allEmpty) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Cambios por pregunta
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {changes.education.length > 0 && (
          <QuestionTable title="Educación" rows={changes.education} />
        )}
        {changes.emergency.length > 0 && (
          <QuestionTable title="Emergencia" rows={changes.emergency} />
        )}
      </div>
    </section>
  );
}

function QuestionTable({
  title,
  rows,
}: {
  title: string;
  rows: { field: string; n: number; pre_mean: number; post_mean: number; mean_difference: number; improved_count: number; unchanged_count: number; worsened_count: number }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <caption className="border-b border-slate-200 px-4 py-2 text-left text-sm font-semibold text-slate-700">
          {title}
        </caption>
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-3 py-1.5 font-medium">Campo</th>
            <th className="px-3 py-1.5 text-right font-medium">Pre</th>
            <th className="px-3 py-1.5 text-right font-medium">Post</th>
            <th className="px-3 py-1.5 text-right font-medium">Δ</th>
            <th className="px-3 py-1.5 text-right font-medium">Mej</th>
            <th className="px-3 py-1.5 text-right font-medium">Sin c.</th>
            <th className="px-3 py-1.5 text-right font-medium">Empeoró</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.field} className="border-t border-slate-100">
              <td className="px-3 py-1.5 text-slate-700">{r.field}</td>
              <td className="px-3 py-1.5 text-right tabular-nums text-slate-600">{r.pre_mean.toFixed(2)}</td>
              <td className="px-3 py-1.5 text-right tabular-nums text-slate-900">{r.post_mean.toFixed(2)}</td>
              <td className={`px-3 py-1.5 text-right tabular-nums font-medium ${r.mean_difference > 0 ? 'text-emerald-600' : r.mean_difference < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                {r.mean_difference > 0 ? '+' : ''}{r.mean_difference.toFixed(2)}
              </td>
              <td className="px-3 py-1.5 text-right tabular-nums text-emerald-700">{r.improved_count}</td>
              <td className="px-3 py-1.5 text-right tabular-nums text-slate-500">{r.unchanged_count}</td>
              <td className="px-3 py-1.5 text-right tabular-nums text-rose-700">{r.worsened_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatisticalTestsSection({
  tests,
}: {
  tests: PrePostAnalysisData['statistical_tests'];
}) {
  const entries = Object.entries(tests).filter(
    ([, v]) => v !== null,
  ) as [string, NonNullable<PrePostAnalysisData['statistical_tests'][string]>][];
  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Pruebas estadísticas
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([key, test]) => (
          <TestCard key={key} label={key} test={test} />
        ))}
      </div>
    </section>
  );
}

function TestCard({
  label,
  test,
}: {
  label: string;
  test: NonNullable<PrePostAnalysisData['statistical_tests'][string]>;
}) {
  const labels: Record<string, string> = {
    education: 'Educación',
    emergency: 'Emergencia',
    combined: 'Combinado',
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-slate-700">
        {labels[label] ?? label}
      </h4>
      {test.test_available === false ? (
        <p className="mt-1 text-sm text-slate-500">{test.reason}</p>
      ) : (
        <dl className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500">Prueba</dt>
            <dd className="tabular-nums text-slate-900">{test.test_name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Estadístico</dt>
            <dd className="tabular-nums text-slate-900">
              {test.statistic?.toFixed(4) ?? '—'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">p-valor</dt>
            <dd className="tabular-nums text-slate-900">
              {test.p_value?.toFixed(4) ?? '—'}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">n</dt>
            <dd className="tabular-nums text-slate-900">{test.sample_size}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">Decisión</dt>
            <dd
              className={`tabular-nums font-medium ${test.decision?.includes('rechaza') ? 'text-emerald-700' : 'text-slate-500'}`}
            >
              {test.decision}
            </dd>
          </div>
          {test.interpretation && (
            <p className="mt-1 text-xs text-slate-500 italic">
              {test.interpretation}
            </p>
          )}
          {test.normality_test && (
            <div className="mt-2 border-t border-slate-100 pt-2">
              <p className="text-xs font-medium text-slate-600">
                Normalidad (Shapiro-Wilk)
              </p>
              <div className="flex justify-between text-xs text-slate-500">
                <span>W = {test.normality_test.statistic?.toFixed(4) ?? '—'}</span>
                <span>
                  p = {test.normality_test.p_value?.toFixed(4) ?? '—'}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic">
                {test.normality_test.interpretation}
              </p>
            </div>
          )}
          {test.hypothesis_h0 && (
            <div className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-500">
              <p>
                <strong>H₀:</strong> {test.hypothesis_h0}
              </p>
              <p>
                <strong>H₁:</strong> {test.hypothesis_h1}
              </p>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}

function QualitySection({ d }: { d: PrePostAnalysisData }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <DataQualityCard
        entries={[
          { label: 'Ciclos con educación', value: d.data_quality.complete_cycles_with_education },
          { label: 'Ciclos con emergencia', value: d.data_quality.complete_cycles_with_emergency },
          { label: 'Sin educación', value: d.data_quality.complete_cycles_missing_education },
          { label: 'Sin emergencia', value: d.data_quality.complete_cycles_missing_emergency },
        ]}
      />
      <DataQualityCard
        entries={[
          { label: 'Pre-tests incompletos', value: d.data_quality.incomplete_pre_tests },
          { label: 'Post-tests huérfanos', value: d.data_quality.orphan_post_tests },
        ]}
      />
    </section>
  );
}

function LimitationsSection({
  limitations,
}: {
  limitations: string[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-700">Limitaciones</h3>
      <ul className="mt-2 space-y-1">
        {limitations.map((lim, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
            {lim}
          </li>
        ))}
      </ul>
    </section>
  );
}

function FuzzyExclusionSection({
  exclusion,
}: {
  exclusion: PrePostAnalysisData['excluded_fuzzy_fields'];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-700">
        Campos excluidos
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        {exclusion.excluded.join(', ')} — {exclusion.reason}
      </p>
      <p className="mt-0.5 text-xs text-slate-400 italic">
        {exclusion.future_block}
      </p>
    </section>
  );
}
