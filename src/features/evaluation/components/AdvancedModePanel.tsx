import { useState, useEffect } from 'react';
import { getUserHistory } from '@/api/history';
import { storage } from '@/utils/storage';
import type { EvaluationType } from '@/types/results';
import type { HistoryItem } from '@/types/results';

interface AdvancedModePanelProps {
  evaluationType: EvaluationType;
  previousEvaluationId: string | null;
  onChangeType: (t: EvaluationType) => void;
  onChangePreviousId: (id: string | null) => void;
}

export function AdvancedModePanel({
  evaluationType,
  previousEvaluationId,
  onChangeType,
  onChangePreviousId,
}: AdvancedModePanelProps) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (!open) return;
    const userId = storage.getUserId();
    if (!userId) return;
    getUserHistory(userId).then(setHistory);
  }, [open]);

  // Solo pre-tests pueden ser referenciados por un post-test
  const preTests = history.filter((h) => h.evaluation_type === 'pre_test');

  return (
    <div className="card border-dashed border-slate-300">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left text-base text-slate-600 hover:text-slate-800"
      >
        <span className="font-medium">⚙ Modo avanzado (uso interno)</span>
        <span className="text-xl">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-6 space-y-5 pt-4 border-t border-slate-200">
          <div>
            <label className="block text-base font-semibold text-slate-700 mb-2">
              Tipo de evaluación
            </label>
            <select
              value={evaluationType}
              onChange={(e) => onChangeType(e.target.value as EvaluationType)}
              className="w-full max-w-md p-3 text-base rounded-xl border-2 border-slate-300 focus:border-primary focus:outline-none"
            >
              <option value="regular">Regular (sin ciclo educativo)</option>
              <option value="pre_test">Pre-test (antes de educación)</option>
              <option value="post_test">Post-test (después de educación)</option>
            </select>
          </div>

          {evaluationType === 'post_test' && (
            <div>
              <label className="block text-base font-semibold text-slate-700 mb-2">
                Pre-test asociado
              </label>
              {preTests.length === 0 ? (
                <p className="text-base text-slate-500 italic">
                  No hay pre-tests previos para este usuario.
                </p>
              ) : (
                <select
                  value={previousEvaluationId ?? ''}
                  onChange={(e) =>
                    onChangePreviousId(e.target.value || null)
                  }
                  className="w-full max-w-md p-3 text-base rounded-xl border-2 border-slate-300 focus:border-primary focus:outline-none"
                >
                  <option value="">Seleccione un pre-test...</option>
                  {preTests.map((pt) => (
                    <option key={pt.evaluation_id} value={pt.evaluation_id}>
                      {new Date(pt.created_at).toLocaleString()} ·{' '}
                      {pt.evaluation_id.slice(0, 8)}...
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          <p className="text-sm text-slate-500 italic">
            Estas opciones permiten controlar manualmente el tipo de evaluación
            para fines de demostración. El flujo automático recomienda{' '}
            <strong>{evaluationType}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}