import { useEffect, useState } from 'react';
import { storage } from '@/utils/storage';
import { getUserCycles, getUserHistory } from '@/api/history';
import type { CycleItem, HistoryItem } from '@/types/results';

export type HistoryDataState =
  | { status: 'loading' }
  | { status: 'no_user' }
  | { status: 'empty' }
  | {
      status: 'ready';
      cycles: CycleItem[];          // ya ordenado desc por fecha de pre_test
      regularEvaluations: HistoryItem[]; // evaluaciones tipo 'regular' desc
      historyById: Record<string, HistoryItem>; // lookup para enriquecer ciclos
    }
  | { status: 'error' };

export function useHistoryData(): HistoryDataState {
  const [state, setState] = useState<HistoryDataState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    const userId = storage.getUserId();

    if (!userId) {
      setState({ status: 'no_user' });
      return;
    }

    Promise.all([getUserCycles(userId), getUserHistory(userId)])
      .then(([cycles, history]) => {
        if (cancelled) return;

        if (cycles.length === 0 && history.length === 0) {
          setState({ status: 'empty' });
          return;
        }

        // Ordenar ciclos: más reciente primero, basado en fecha del pre_test
        const sortedCycles = [...cycles].sort(
          (a, b) =>
            new Date(b.pre_test.created_at).getTime() -
            new Date(a.pre_test.created_at).getTime()
        );

        const regulars = history
          .filter((h) => h.evaluation_type === 'regular')
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        const historyById: Record<string, HistoryItem> = {};
        for (const h of history) {
          historyById[h.evaluation_id] = h;
        }

        setState({
          status: 'ready',
          cycles: sortedCycles,
          regularEvaluations: regulars,
          historyById,
        });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}