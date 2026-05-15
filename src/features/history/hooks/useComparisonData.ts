import { useEffect, useState } from 'react';
import { getEvaluationComparison } from '@/api/history';
import type { ComparisonData } from '@/types/results';

export type ComparisonState =
  | { status: 'loading' }
  | { status: 'ready'; data: ComparisonData }
  | { status: 'not_found' }
  | { status: 'invalid' }      // 400: el id no es post_test o no tiene previous
  | { status: 'error' };

export function useComparisonData(postId: string | undefined): ComparisonState {
  const [state, setState] = useState<ComparisonState>({ status: 'loading' });

  useEffect(() => {
    if (!postId) {
      setState({ status: 'not_found' });
      return;
    }

    let cancelled = false;
    setState({ status: 'loading' });

    getEvaluationComparison(postId)
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const status =
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          (err as { response?: { status?: number } }).response?.status;

        if (status === 404) setState({ status: 'not_found' });
        else if (status === 400) setState({ status: 'invalid' });
        else setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [postId]);

  return state;
}