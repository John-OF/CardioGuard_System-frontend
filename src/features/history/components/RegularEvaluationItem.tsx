import { useNavigate } from 'react-router-dom';
import type { HistoryItem, RiskLevel } from '@/types/results';
import { formatEvaluationDate } from '@/utils/dateFormat';

interface RegularEvaluationItemProps {
  item: HistoryItem;
}

const RISK_PILL: Record<RiskLevel, string> = {
  bajo: 'bg-green-100 text-green-800 border-green-200',
  moderado: 'bg-amber-100 text-amber-800 border-amber-200',
  alto: 'bg-red-100 text-red-800 border-red-200',
};

const RISK_LABEL: Record<RiskLevel, string> = {
  bajo: 'Riesgo bajo',
  moderado: 'Riesgo moderado',
  alto: 'Riesgo alto',
};

export function RegularEvaluationItem({ item }: RegularEvaluationItemProps) {
  const navigate = useNavigate();
  return (
    <article className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <p className="text-base font-semibold text-slate-900">
          {formatEvaluationDate(item.created_at)}
        </p>
        <div className="mt-2">
          <span className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold ${RISK_PILL[item.risk_level]}`}>
            {RISK_LABEL[item.risk_level]}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => navigate('/evaluacion')}
        className="btn-secondary w-full sm:w-auto"
      >
        Nueva evaluación
      </button>
    </article>
  );
}