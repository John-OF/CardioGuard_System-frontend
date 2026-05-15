import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUserHistory } from '@/api/history';
import { storage } from '@/utils/storage';
import type { EvaluationType } from '@/types/results';

export type DetectedFlow =
  | { type: 'first_time' }
  | { type: 'continue_post_test'; preEvaluationId: string }
  | { type: 'cycle_complete'; lastPostId: string }
  | { type: 'loading' }
  | { type: 'error' };

export interface AutoDetectResult {
  flow: DetectedFlow;
  recommendedType: EvaluationType;
  recommendedPreviousId: string | null;
}

export function useAutoDetectEvaluationType(): AutoDetectResult {
  const [flow, setFlow] = useState<DetectedFlow>({ type: 'loading' });
  const [searchParams] = useSearchParams();
  const continueId = searchParams.get('continue');

  useEffect(() => {
    let cancelled = false;
    const userId = storage.getUserId();

    if (!userId) {
      setFlow({ type: 'first_time' });
      return;
    }

    getUserHistory(userId)
      .then((history) => {
        if (cancelled) return;

        const cycleHistory = history.filter(
          (h) =>
            h.evaluation_type === 'pre_test' ||
            h.evaluation_type === 'post_test'
        );

        // Si la URL trae ?continue=<preId>, intentamos resolver ese pre
        // específicamente. Esto se usa cuando el usuario llega desde el
        // Historial haciendo click en "Realizar evaluación final" sobre
        // un ciclo pendiente concreto (puede no ser el más reciente).
        if (continueId) {
          const targetPre = cycleHistory.find(
            (h) =>
              h.evaluation_id === continueId &&
              h.evaluation_type === 'pre_test'
          );
          if (targetPre) {
            setFlow({
              type: 'continue_post_test',
              preEvaluationId: targetPre.evaluation_id,
            });
            return;
          }
          // Si el id no se encuentra (URL manipulada o pre ya cerrado),
          // caemos al flujo de detección automática normal.
        }

        if (cycleHistory.length === 0) {
          setFlow({ type: 'first_time' });
          return;
        }

        const sorted = [...cycleHistory].sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
        const last = sorted[0];

        if (last.evaluation_type === 'pre_test') {
          setFlow({
            type: 'continue_post_test',
            preEvaluationId: last.evaluation_id,
          });
          return;
        }

        if (last.evaluation_type === 'post_test') {
          setFlow({
            type: 'cycle_complete',
            lastPostId: last.evaluation_id,
          });
          return;
        }

        setFlow({ type: 'first_time' });
      })
      .catch(() => {
        if (!cancelled) setFlow({ type: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [continueId]);

  let recommendedType: EvaluationType = 'pre_test';
  let recommendedPreviousId: string | null = null;

  if (flow.type === 'continue_post_test') {
    recommendedType = 'post_test';
    recommendedPreviousId = flow.preEvaluationId;
  } else if (flow.type === 'cycle_complete') {
    recommendedType = 'pre_test';
  } else if (flow.type === 'error') {
    recommendedType = 'regular';
  }

  return { flow, recommendedType, recommendedPreviousId };
}