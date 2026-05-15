import { useNavigate } from 'react-router-dom';
import type { CycleItem, HistoryItem, RiskLevel } from '@/types/results';
import { formatEvaluationDate } from '@/utils/dateFormat';

interface CycleListItemProps {
  cycle: CycleItem;
  cycleNumber: number;
  historyById: Record<string, HistoryItem>;
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

function RiskBadge({ level }: { level: RiskLevel | undefined }) {
  if (!level) {
    return (
      <span className="inline-block px-3 py-1 rounded-full border text-sm font-semibold bg-slate-100 text-slate-600 border-slate-200">
        Sin datos
      </span>
    );
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold ${RISK_PILL[level]}`}>
      {RISK_LABEL[level]}
    </span>
  );
}

export function CycleListItem({ cycle, cycleNumber, historyById }: CycleListItemProps) {
  const navigate = useNavigate();
  const isCompleted = cycle.status === 'completed';

  const preRisk = historyById[cycle.pre_test.evaluation_id]?.risk_level;
  const postRisk = cycle.post_test
    ? historyById[cycle.post_test.evaluation_id]?.risk_level
    : undefined;

  const preDate = formatEvaluationDate(cycle.pre_test.created_at);
  const postDate = cycle.post_test
    ? formatEvaluationDate(cycle.post_test.created_at)
    : null;

  return (
    <article className="card">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-xl font-bold text-slate-900">
          Ciclo {cycleNumber}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isCompleted
              ? 'bg-primary-light text-primary'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {isCompleted ? 'Completado' : 'Sin post-test'}
        </span>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {/* Pre-test */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Evaluación inicial
          </p>
          <p className="text-base text-slate-700 mt-1">{preDate}</p>
          <div className="mt-3">
            <RiskBadge level={preRisk} />
          </div>
        </div>

        {/* Post-test o pendiente */}
        <div
          className={`rounded-xl border p-4 ${
            isCompleted
              ? 'border-slate-200 bg-slate-50'
              : 'border-dashed border-slate-300 bg-white'
          }`}
        >
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Evaluación final
          </p>
          {isCompleted ? (
            <>
              <p className="text-base text-slate-700 mt-1">{postDate}</p>
              <div className="mt-3">
                <RiskBadge level={postRisk} />
              </div>
            </>
          ) : (
            <p className="text-base text-slate-600 mt-1 italic">
              Aún no realizada
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        {isCompleted && cycle.post_test ? (
          <button
            type="button"
            onClick={() => navigate(`/historial/comparacion/${cycle.post_test!.evaluation_id}`)}
            className="btn-primary w-full sm:w-auto"
          >
            Ver comparación detallada
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              navigate(`/evaluacion?continue=${cycle.pre_test.evaluation_id}`)
            }
            className="btn-primary w-full sm:w-auto"
          >
            Realizar evaluación final
          </button>
        )}
      </div>
    </article>
  );
}