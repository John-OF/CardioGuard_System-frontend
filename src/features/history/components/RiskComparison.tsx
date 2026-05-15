import type { ComparisonEvalDetail, ComparisonSummary, RiskLevel } from '@/types/results';
import { ChangePill } from './ChangePill';
import { RISK_THEMES } from '@/features/results/utils/riskTheme';

interface RiskComparisonProps {
  pre: ComparisonEvalDetail;
  post: ComparisonEvalDetail;
  comparison: ComparisonSummary;
}

const RISK_LABEL: Record<RiskLevel, string> = {
  bajo: 'Bajo',
  moderado: 'Moderado',
  alto: 'Alto',
};

function RiskColumn({ label, detail }: { label: string; detail: ComparisonEvalDetail }) {
  const theme = RISK_THEMES[detail.risk_level];
  return (
    <div className={`rounded-2xl border-2 ${theme.borderClass} ${theme.bgClass} p-5`}>
      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-3xl font-bold mt-1 ${theme.titleColorClass}`}>
        {RISK_LABEL[detail.risk_level]}
      </p>
      <div className="mt-4">
        <p className="text-sm text-slate-600">Probabilidad ML</p>
        <p className="text-2xl font-bold text-slate-900">
          {(detail.ml_probability * 100).toFixed(0)}%
        </p>
      </div>
    </div>
  );
}

export function RiskComparison({ pre, post, comparison }: RiskComparisonProps) {
  // Inferir mejoró/empeoró/sin cambios para el riesgo a partir del nivel y la prob ML
  const order: Record<RiskLevel, number> = { bajo: 0, moderado: 1, alto: 2 };
  let result: 'mejoró' | 'empeoró' | 'sin cambios';
  if (order[post.risk_level] < order[pre.risk_level]) result = 'mejoró';
  else if (order[post.risk_level] > order[pre.risk_level]) result = 'empeoró';
  else result = 'sin cambios';

  const probDiffPct = (comparison.ml_probability_diff * 100).toFixed(0);
  const probDiffLabel =
    comparison.ml_probability_diff === 0
      ? 'Misma probabilidad ML'
      : `Probabilidad ML ${comparison.ml_probability_diff > 0 ? '+' : ''}${probDiffPct}%`;

  return (
    <section aria-labelledby="risk-cmp-title">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 id="risk-cmp-title" className="text-xl font-semibold text-slate-900">
          Riesgo cardiovascular
        </h2>
        <ChangePill result={result} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RiskColumn label="Antes" detail={pre} />
        <RiskColumn label="Después" detail={post} />
      </div>
      <p className="text-base text-slate-600 mt-3">{probDiffLabel}</p>
    </section>
  );
}