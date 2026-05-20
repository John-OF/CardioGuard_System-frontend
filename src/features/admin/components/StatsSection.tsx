import type { AdminStats } from '@/types/admin';
import { StatCard } from './StatCard';
import { DistributionBar } from './DistributionBar';
import { pct, pctRaw, deltaPts, deltaSign } from '../utils/format';

const BMI_LABEL: Record<string, string> = {
  bajo_peso: 'Bajo peso',
  normal: 'Normal',
  sobrepeso: 'Sobrepeso',
  obesidad: 'Obesidad',
};

function DeltaCell({ value }: { value: number }) {
  const sign = deltaSign(value);
  const color =
    sign === 'up'
      ? 'text-emerald-700'
      : sign === 'down'
      ? 'text-rose-700'
      : 'text-slate-500';
  return <span className={`font-semibold tabular-nums ${color}`}>{deltaPts(value)}</span>;
}

interface ImprovementRowProps {
  label: string;
  pre: number;
  post: number;
  improvedPct: number;
}

function ImprovementRow({ label, pre, post, improvedPct }: ImprovementRowProps) {
  return (
    <tr className="border-t border-slate-100">
      <td className="py-2 pr-3 text-slate-700">{label}</td>
      <td className="py-2 px-3 text-right tabular-nums text-slate-600">{pct(pre)}</td>
      <td className="py-2 px-3 text-right tabular-nums text-slate-900 font-medium">{pct(post)}</td>
      <td className="py-2 px-3 text-right">
        <DeltaCell value={post - pre} />
      </td>
      <td className="py-2 pl-3 text-right tabular-nums text-slate-600">
        {pctRaw(improvedPct, 1)}
      </td>
    </tr>
  );
}

export function StatsSection({ stats }: { stats: AdminStats }) {
  const { totals, risk_distribution, improvement, demographics, completion_rate } =
    stats;

  return (
    <div className="space-y-8">
      {/* Totales */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Totales
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Evaluaciones" value={totals.evaluations} />
          <StatCard label="Usuarios únicos" value={totals.unique_users} />
          <StatCard label="Ciclos completos" value={totals.complete_cycles} />
          <StatCard label="Regulares" value={totals.regular_evaluations} />
          <StatCard label="Pre-tests" value={totals.pre_tests} />
          <StatCard label="Post-tests" value={totals.post_tests} />
        </div>
      </section>

      {/* Riesgo + Completación */}
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <DistributionBar
          title="Distribución de riesgo"
          segments={[
            { label: 'Bajo', value: risk_distribution.bajo, colorClass: 'bg-emerald-500' },
            { label: 'Moderado', value: risk_distribution.moderado, colorClass: 'bg-amber-500' },
            { label: 'Alto', value: risk_distribution.alto, colorClass: 'bg-rose-500' },
          ]}
        />
        <div className="rounded-lg border border-slate-200 bg-white p-4 lg:col-span-2">
          <h3 className="text-sm font-semibold text-slate-700">
            Tasa de completación
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              label="Usuarios sin ciclo completo"
              value={completion_rate.users_with_pre_only}
            />
            <StatCard
              label="Usuarios con ciclo completo"
              value={completion_rate.users_with_complete_cycle}
            />
            <StatCard
              label="Usuarios solo regulares"
              value={completion_rate.users_only_regular}
            />
            <StatCard
              label="Completación"
              value={pctRaw(completion_rate.completion_pct, 1)}
              hint="usuarios que cerraron el ciclo"
            />
          </div>
        </div>
      </section>

      {/* Demografía */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Demografía
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-4">
          <StatCard
            label="Edad promedio"
            value={`${demographics.avg_age} años`}
          />
          <DistributionBar
            title="Grupos de edad"
            segments={[
              { label: '60–69', value: demographics.age_groups['60-69'], colorClass: 'bg-slate-400' },
              { label: '70–79', value: demographics.age_groups['70-79'], colorClass: 'bg-slate-500' },
              { label: '80+', value: demographics.age_groups['80+'], colorClass: 'bg-slate-600' },
            ]}
          />
          <DistributionBar
            title="Sexo"
            segments={[
              { label: 'Masculino', value: demographics.sex_distribution.Masculino, colorClass: 'bg-indigo-400' },
              { label: 'Femenino', value: demographics.sex_distribution.Femenino, colorClass: 'bg-violet-400' },
            ]}
          />
          <DistributionBar
            title="IMC"
            segments={Object.entries(demographics.bmi_distribution).map(
              ([key, value], i) => ({
                label: BMI_LABEL[key] ?? key,
                value,
                colorClass: [
                  'bg-sky-400',
                  'bg-emerald-400',
                  'bg-amber-400',
                  'bg-rose-400',
                ][i % 4],
              })
            )}
          />
        </div>
      </section>

      {/* Mejora pre -> post */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Mejora promedio pre → post
        </h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pl-4 pr-3 font-medium">Métrica</th>
                <th className="py-2 px-3 text-right font-medium">Pre</th>
                <th className="py-2 px-3 text-right font-medium">Post</th>
                <th className="py-2 px-3 text-right font-medium">Δ</th>
                <th className="py-2 pl-3 pr-4 text-right font-medium">
                  % que mejoró
                </th>
              </tr>
            </thead>
            <tbody>
              <ImprovementRow
                label="Conocimiento educativo"
                pre={improvement.avg_education_score_pre}
                post={improvement.avg_education_score_post}
                improvedPct={improvement.improved_education_pct}
              />
              <ImprovementRow
                label="Preparación ante emergencias"
                pre={improvement.avg_emergency_score_pre}
                post={improvement.avg_emergency_score_post}
                improvedPct={improvement.improved_emergency_pct}
              />
              <tr className="border-t border-slate-100">
                <td className="py-2 pl-4 pr-3 text-slate-700">
                  Probabilidad ML
                </td>
                <td className="py-2 px-3 text-right tabular-nums text-slate-600">
                  {pct(improvement.avg_ml_probability_pre)}
                </td>
                <td className="py-2 px-3 text-right tabular-nums font-medium text-slate-900">
                  {pct(improvement.avg_ml_probability_post)}
                </td>
                <td className="py-2 px-3 text-right">
                  {/* En ML, bajar la probabilidad es "mejorar": invertimos el signo */}
                  <DeltaCell
                    value={
                      -(improvement.avg_ml_probability_post -
                        improvement.avg_ml_probability_pre)
                    }
                  />
                </td>
                <td className="py-2 pl-3 pr-4 text-right tabular-nums text-slate-600">
                  {pctRaw(improvement.improved_risk_level_pct, 1)}
                  <span className="ml-1 text-xs text-slate-400">
                    (nivel de riesgo)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Conocimiento y preparación se muestran como porcentaje del máximo
          posible. Δ en puntos porcentuales sobre los ciclos completos.
        </p>
      </section>
    </div>
  );
}
