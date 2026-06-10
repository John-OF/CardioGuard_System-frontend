import { useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { fetchEmergencyAnalysis } from '@/api/analysis';
import type { EmergencyAnalysisData } from '@/types/analysis';
import type { AdminOutletContext } from '@/types/admin';
import { MetricCard } from './components/MetricCard';
import { NumericStatsCard } from './components/NumericStatsCard';
import { FrequencyTable } from './components/FrequencyTable';
import { DataQualityCard } from './components/DataQualityCard';
import { NoticeBox } from './components/NoticeBox';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { CategoricalBarChart } from './components/charts/CategoricalBarChart';
import { transformEmergencyPreparedness } from './components/charts/chartTransformers';

export function EmergencyAnalysisPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const query = useAnalysisQuery(
    () => fetchEmergencyAnalysis(token),
    [token],
  );

  if (query.status === 'error') {
    if (query.error?.includes('Token') || query.error?.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el análisis de emergencias." />;
  }

  if (query.status === 'loading') return <LoadingState />;
  if (!query.data) return <ErrorState message="No se recibieron datos." />;

  const d = query.data;

  if (d.summary.total_emergency_responses === 0) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            Análisis de preparación ante emergencias
          </h1>
        </header>
        <NoticeBox variant="warning">
          No existen registros suficientes para generar el análisis de emergencias.
        </NoticeBox>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Análisis de preparación ante emergencias
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Distribución de respuestas en el módulo de simulación de emergencias.
        </p>
      </header>

      <NoticeBox variant="warning">
        El tiempo de reacción (reaction_time) corresponde a una respuesta
        autodeclarada, no a un tiempo medido en segundos.
      </NoticeBox>

      <NoticeBox variant="academic">
        {d.non_diagnostic_notice}
      </NoticeBox>

      <SummarySection d={d} />
      <ScoreSection d={d} />
      <EmergencyIndicatorsSection profile={d.emergency_action_profile} />
      <PreparednessLevelsSection levels={d.preparedness_levels} />
      <AdequateResponseSection ar={d.adequate_response} />
      <FieldFrequenciesSection ff={d.field_frequencies} />
      <ByEvalTypeSection byType={d.by_evaluation_type} />
      <TrainingRelationSection tr={d.training_relation_descriptive} />
      <ProfileSection profile={d.emergency_action_profile} />
      <QualitySection dq={d.data_quality} />
      <LimitationsSection limitations={d.limitations} />
    </div>
  );
}

function SummarySection({ d }: { d: EmergencyAnalysisData }) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Resumen
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <MetricCard label="Evaluaciones totales" value={d.summary.total_evaluations} />
        <MetricCard label="Respuestas de emergencia" value={d.summary.total_emergency_responses} />
        <MetricCard label="Evaluaciones sin respuesta" value={d.data_quality.evaluations_without_emergency_response} />
      </div>
    </section>
  );
}

function ScoreSection({ d }: { d: EmergencyAnalysisData }) {
  if (!d.score_distribution) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Puntaje total de emergencia (máx. {d.score_distribution.max_score})
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <NumericStatsCard
          title="Puntaje"
          stats={d.score_distribution.numeric_stats}
        />
        <NumericStatsCard
          title="Porcentaje"
          stats={d.score_distribution.percentage_stats}
        />
      </div>
    </section>
  );
}

function EmergencyIndicatorsSection({
  profile,
}: {
  profile: EmergencyAnalysisData['emergency_action_profile'];
}) {
  const chartData = transformEmergencyPreparedness(profile);
  return (
    <CategoricalBarChart
      title="Indicadores de preparación ante emergencias"
      subtitle="Resume respuestas clave relacionadas con el reconocimiento y actuación ante una emergencia."
      data={chartData}
      valueLabel="%"
      emptyMessage="No hay datos suficientes para generar este gráfico."
      methodologicalNote="Este gráfico resume respuestas educativas y de simulación. No representa diagnóstico clínico."
    />
  );
}

function PreparednessLevelsSection({
  levels,
}: {
  levels: EmergencyAnalysisData['preparedness_levels'];
}) {
  if (levels.length === 0) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Niveles de preparación
      </h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2 pl-4 pr-3 font-medium">Nivel</th>
              <th className="py-2 px-3 text-right font-medium">Rango</th>
              <th className="py-2 px-3 text-right font-medium">n</th>
              <th className="py-2 pr-4 pl-3 text-right font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((lvl) => (
              <tr key={lvl.level} className="border-t border-slate-100">
                <td className="py-2 pl-4 pr-3 capitalize text-slate-700">{lvl.level}</td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-500">{lvl.score_range}</td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-900">{lvl.count}</td>
                <td className="py-2 pr-4 pl-3 text-right tabular-nums text-slate-600">{lvl.percentage.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdequateResponseSection({
  ar,
}: {
  ar: EmergencyAnalysisData['adequate_response'];
}) {
  if (!ar) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Respuesta adecuada
      </h2>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-600">
          {ar.interpretation}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Definición: {ar.definition}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:w-1/2">
          <MetricCard
            label="Respuesta adecuada"
            value={ar.adequate_count}
            hint={`${ar.adequate_percentage.toFixed(1)}%`}
          />
          <MetricCard
            label="Respuesta no adecuada"
            value={ar.non_adequate_count}
            hint={`${ar.non_adequate_percentage.toFixed(1)}%`}
          />
        </div>
      </div>
    </section>
  );
}

function FieldFrequenciesSection({
  ff,
}: {
  ff: EmergencyAnalysisData['field_frequencies'];
}) {
  const entries = Object.entries(ff).filter(([, rows]) => rows.length > 0);
  if (entries.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Frecuencias por campo
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([field, rows]) => (
          <FrequencyTable key={field} title={field} rows={rows} />
        ))}
      </div>
    </section>
  );
}

function ByEvalTypeSection({
  byType,
}: {
  byType: EmergencyAnalysisData['by_evaluation_type'];
}) {
  const types = Object.entries(byType).filter(
    ([, bt]) => bt.count > 0,
  );
  if (types.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Por tipo de evaluación
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {types.map(([type, bt]) => (
          <div
            key={type}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <h4 className="text-sm font-semibold text-slate-700">{type}</h4>
            <p className="mt-1 text-sm text-slate-500">n = {bt.count}</p>
            {bt.score_stats && (
              <dl className="mt-2 space-y-0.5 text-xs">
                <div className="flex justify-between">
                  <dt className="text-slate-400">Media</dt>
                  <dd className="tabular-nums text-slate-900">
                    {bt.score_stats.mean?.toFixed(2) ?? '—'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">Respuesta adecuada</dt>
                  <dd className="tabular-nums text-emerald-700">
                    {bt.adequate_count} ({bt.adequate_percentage.toFixed(1)}%)
                  </dd>
                </div>
              </dl>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function TrainingRelationSection({
  tr,
}: {
  tr: EmergencyAnalysisData['training_relation_descriptive'];
}) {
  if (!tr) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Capacitación previa vs. respuesta adecuada
      </h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2 pl-4 pr-3 font-medium">Capacitación</th>
              <th className="py-2 px-3 text-right font-medium">Total</th>
              <th className="py-2 px-3 text-right font-medium">Adecuada</th>
              <th className="py-2 px-3 text-right font-medium">No adecuada</th>
              <th className="py-2 pr-4 pl-3 text-right font-medium">% adecuada</th>
            </tr>
          </thead>
          <tbody>
            {tr.rows.map((row) => (
              <tr key={row.prior_training} className="border-t border-slate-100">
                <td className="py-2 pl-4 pr-3 text-slate-700">{row.label}</td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-900">{row.count}</td>
                <td className="py-2 px-3 text-right tabular-nums text-emerald-700">{row.adequate_count}</td>
                <td className="py-2 px-3 text-right tabular-nums text-rose-700">{row.non_adequate_count}</td>
                <td className="py-2 pr-4 pl-3 text-right tabular-nums text-slate-600">{row.adequate_percentage.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1 text-xs text-slate-400 italic">{tr.note}</p>
    </section>
  );
}

function ProfileSection({
  profile,
}: {
  profile: EmergencyAnalysisData['emergency_action_profile'];
}) {
  if (!profile) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Perfil de acción ante emergencias
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <MetricCard
          label="Conoce número emergencia"
          value={`${profile.knows_emergency_number_percentage.toFixed(1)}%`}
        />
        <MetricCard
          label="Llama inmediatamente"
          value={`${profile.calls_immediately_percentage.toFixed(1)}%`}
        />
        <MetricCard
          label="Actúa inmediatamente"
          value={`${profile.acts_immediately_percentage.toFixed(1)}%`}
        />
        <MetricCard
          label="Apoyo adecuado"
          value={`${profile.adequate_support_action_percentage.toFixed(1)}%`}
        />
        <MetricCard
          label="Capacitación previa"
          value={`${profile.has_prior_training_percentage.toFixed(1)}%`}
        />
      </div>
    </section>
  );
}

function QualitySection({
  dq,
}: {
  dq: EmergencyAnalysisData['data_quality'];
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <DataQualityCard
        entries={[
          { label: 'Evaluaciones totales', value: dq.total_evaluations },
          { label: 'Respuestas de emergencia', value: dq.total_emergency_responses },
          { label: 'Evaluaciones sin respuesta', value: dq.evaluations_without_emergency_response },
          { label: 'Registros completos', value: dq.complete_emergency_records },
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
