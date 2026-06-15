import { useEffect, useState } from 'react';
import { getEvaluationComparison } from '@/api/history';
import type { ComparisonData } from '@/types/results';

export type ComparisonState =
  | { status: 'loading' }
  | { status: 'ready'; data: ComparisonData }
  | { status: 'not_found' }
  | { status: 'invalid' }      // 400: el id no es post_test o no tiene previous
  | { status: 'error' };

interface ComparisonRequestState {
  postId: string;
  result: ComparisonState;
}

export function useComparisonData(postId: string | undefined): ComparisonState {
  const [request, setRequest] = useState<ComparisonRequestState | null>(() =>
    postId ? { postId, result: { status: 'loading' } } : null
  );

  useEffect(() => {
    if (!postId) return;

    let cancelled = false;

    getEvaluationComparison(postId)
      .then((data) => {
        if (!cancelled) {
          setRequest({ postId, result: { status: 'ready', data } });
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const status =
          typeof err === 'object' &&
          err !== null &&
          'response' in err &&
          (err as { response?: { status?: number } }).response?.status;

        if (status === 404) setRequest({ postId, result: { status: 'not_found' } });
        else if (status === 400) setRequest({ postId, result: { status: 'invalid' } });
        else setRequest({ postId, result: { status: 'error' } });
      });

    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (!postId) return { status: 'not_found' };
  if (!request || request.postId !== postId) return { status: 'loading' };
  return request.result;
}
