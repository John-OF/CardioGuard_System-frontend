import { useCallback, useEffect, useState } from 'react';
import { fetchAdminCycles, AdminUnauthorizedError } from '@/api/admin';
import type { AdminCyclesResponse, CyclesOrder } from '@/types/admin';

export const CYCLES_PAGE_SIZE = 20;

type CyclesState =
  | { status: 'loading' }
  | { status: 'ready'; data: AdminCyclesResponse }
  | { status: 'error' };

interface UseAdminCycles {
  state: CyclesState;
  page: number;        // 0-based
  pageCount: number;   // total de páginas conocidas
  order: CyclesOrder;
  setOrder: (order: CyclesOrder) => void;
  goToPage: (page: number) => void;
}

/**
 * Lista paginada de ciclos (20 por página) con orden configurable.
 * Un 401 dispara `onUnauthorized` y cierra la sesión.
 *
 * El estado 'loading' se fija en el estado inicial (primer fetch) y en
 * los handlers de paginación/orden, nunca de forma síncrona dentro del
 * efecto: el efecto solo escribe en sus callbacks asíncronos (convención
 * del proyecto, evita re-renders en cascada).
 */
export function useAdminCycles(
  token: string,
  onUnauthorized: () => void
): UseAdminCycles {
  const [state, setState] = useState<CyclesState>({ status: 'loading' });
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [order, setOrderState] = useState<CyclesOrder>('recent');

  useEffect(() => {
    let cancelled = false;

    fetchAdminCycles({
      token,
      limit: CYCLES_PAGE_SIZE,
      offset: page * CYCLES_PAGE_SIZE,
      orderBy: order,
    })
      .then((data) => {
        if (cancelled) return;
        setTotal(data.total);
        setState({ status: 'ready', data });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof AdminUnauthorizedError) {
          onUnauthorized();
          return;
        }
        setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [token, page, order, onUnauthorized]);

  const pageCount = Math.max(1, Math.ceil(total / CYCLES_PAGE_SIZE));

  const setOrder = useCallback(
    (next: CyclesOrder) => {
      if (next === order) return;
      setState({ status: 'loading' });
      setOrderState(next);
      setPage(0);
    },
    [order]
  );

  const goToPage = useCallback(
    (next: number) => {
      const target = Math.min(Math.max(0, next), Math.max(0, pageCount - 1));
      if (target === page) return;
      setState({ status: 'loading' });
      setPage(target);
    },
    [page, pageCount]
  );

  return { state, page, pageCount, order, setOrder, goToPage };
}
