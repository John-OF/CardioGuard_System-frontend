import { useState } from 'react';
import type { ComparisonEvalDetail, ComparisonSummary, RiskLevel } from '@/types/results';
import { RISK_THEMES } from '@/features/results/utils/riskTheme';
import { IconFileText, IconChevronDown } from '@/components/ui/icons';
import { EvaluationDetailsPanel } from './EvaluationDetailsPanel';

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

function RiskCard({
  detail,
  expanded,
  onToggle,
  canToggle,
}: {
  detail: ComparisonEvalDetail;
  expanded: boolean;
  onToggle: () => void;
  canToggle: boolean;
}) {
  const theme = RISK_THEMES[detail.risk_level];
  return (
    <div className={`rounded-2xl border-2 ${theme.borderClass} ${theme.bgClass} p-5 sm:p-6`}>
      {/* Línea 1: etiqueta */}
      <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
        Nivel de riesgo
      </p>

      {/* Línea 2: nivel (izquierda) + botón "Ver detalles" (derecha, centrado vertical) */}
      <div className="flex items-center justify-between gap-4 mt-1">
        <p className={`text-3xl sm:text-4xl font-bold ${theme.titleColorClass}`}>
          {RISK_LABEL[detail.risk_level]}
        </p>

        {canToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <IconFileText className="w-5 h-5" />
            Ver detalles
            <IconChevronDown
              className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {/* Línea 3: probabilidad ML como una sola línea de texto */}
      <p className="text-base text-slate-700 mt-3">
        Probabilidad ML:{' '}
        <span className="font-bold text-slate-900">
          {(detail.ml_probability * 100).toFixed(0)}%
        </span>
      </p>
    </div>
  );
}

export function RiskComparison({ pre, post }: RiskComparisonProps) {
  const [expanded, setExpanded] = useState(false);

  // El riesgo se calcula con los datos clínicos (pasos 0-2), que el ciclo no vuelve
  // a pedir, por lo que pre y post son idénticos. Se muestra un único resultado.
  const detail = post ?? pre;
  const details = pre.details;

  return (
    <section aria-labelledby="risk-cmp-title" className="space-y-4">
      <h2 id="risk-cmp-title" className="text-xl font-semibold text-slate-900">
        Riesgo cardiovascular
      </h2>

      <RiskCard
        detail={detail}
        expanded={expanded}
        onToggle={() => setExpanded((v) => !v)}
        canToggle={Boolean(details)}
      />

      {expanded && details && <EvaluationDetailsPanel details={details} />}
    </section>
  );
}
