import { useEffect, useState, useRef } from 'react';

export type QueryStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface QueryResult<T> {
  status: QueryStatus;
  data: T | null;
  error: string | null;
}

export function useAnalysisQuery<T>(
  fetcher: () => Promise<T>,
  deps: unknown[],
): QueryResult<T> {
  const [status, setStatus] = useState<QueryStatus>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);
      try {
        const result = await fetcher();
        if (!cancelled && mounted.current) {
          setData(result);
          setStatus('ready');
        }
      } catch (err: unknown) {
        if (!cancelled && mounted.current) {
          const message =
            err instanceof Error ? err.message : 'Error desconocido';
          setError(message);
          setStatus('error');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, deps);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  return { status, data, error };
}
