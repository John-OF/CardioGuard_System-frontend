import { useEffect, useState } from 'react';
import { fetchAdminStats, AdminUnauthorizedError } from '@/api/admin';
import type { AdminStats } from '@/types/admin';

type StatsState =
  | { status: 'loading' }
  | { status: 'ready'; data: AdminStats }
  | { status: 'error' };

/**
 * Carga las estadísticas generales. Si el token resulta inválido (401),
 * invoca `onUnauthorized` para que la sesión se cierre.
 *
 * El token no cambia mientras la sesión está activa, así que el efecto
 * solo corre una vez; el estado inicial ya es 'loading' y solo se
 * actualiza dentro de los callbacks asíncronos (convención del proyecto).
 */
export function useAdminStats(
  token: string,
  onUnauthorized: () => void
): StatsState {
  const [state, setState] = useState<StatsState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    fetchAdminStats(token)
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data });
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
  }, [token, onUnauthorized]);

  return state;
}
