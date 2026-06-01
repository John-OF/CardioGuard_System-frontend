import type { ComparisonEvalDetail, ComparisonSummary, RiskLevel } from '@/types/results';
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

function RiskCard({ detail }: { detail: ComparisonEvalDetail }) {
  const theme = RISK_THEMES[detail.risk_level];
  return (
    <div className={`rounded-2xl border-2 ${theme.borderClass} ${theme.bgClass} p-5`}>
      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
        Nivel de riesgo
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

export function RiskComparison({ pre, post }: RiskComparisonProps) {
  // El riesgo se calcula con los datos clínicos (pasos 0-2), que el ciclo no vuelve
  // a pedir, por lo que pre y post son idénticos. Se muestra un único resultado.
  const detail = post ?? pre;

  return (
    <section aria-labelledby="risk-cmp-title">
      <h2 id="risk-cmp-title" className="text-xl font-semibold text-slate-900 mb-4">
        Riesgo cardiovascular
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RiskCard detail={detail} />
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2 mb-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-slate-500 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="16" y2="12" />
              <line x1="12" x2="12.01" y1="8" y2="8" />
            </svg>
            <p className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
              Sobre este resultado
            </p>
          </div>
          <p className="text-base text-slate-600 leading-relaxed">
            El riesgo cardiovascular se calcula a partir de sus datos clínicos, que
            no cambian dentro de un ciclo de aprendizaje. Por eso se muestra un
            único resultado. Lo que evoluciona con la capacitación es su{' '}
            <span className="font-semibold text-slate-700">conocimiento</span>, que
            puede comparar más abajo.
          </p>
        </div>
      </div>
    </section>
  );
}
