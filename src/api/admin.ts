import { apiClient } from './client';
import type {
  AdminStats,
  AdminCyclesResponse,
  CyclesOrder,
} from '@/types/admin';

const TOKEN_HEADER = 'X-Admin-Token';

/** Error de autenticación administrativa (token ausente o inválido). */
export class AdminUnauthorizedError extends Error {
  constructor(message = 'Token administrativo inválido.') {
    super(message);
    this.name = 'AdminUnauthorizedError';
  }
}

function isUnauthorized(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    (err as { response?: { status?: number } }).response?.status === 401
  );
}

/**
 * Estadísticas generales del sistema.
 * Lanza AdminUnauthorizedError si el token es inválido (401).
 */
export async function fetchAdminStats(token: string): Promise<AdminStats> {
  try {
    const res = await apiClient.get<AdminStats>('/api/admin/stats', {
      headers: { [TOKEN_HEADER]: token },
    });
    return res.data;
  } catch (err: unknown) {
    if (isUnauthorized(err)) throw new AdminUnauthorizedError();
    throw err;
  }
}

interface FetchCyclesParams {
  token: string;
  limit?: number;
  offset?: number;
  orderBy?: CyclesOrder;
}

/**
 * Lista paginada de ciclos completos (pre + post).
 * Lanza AdminUnauthorizedError si el token es inválido (401).
 */
export async function fetchAdminCycles({
  token,
  limit = 20,
  offset = 0,
  orderBy = 'recent',
}: FetchCyclesParams): Promise<AdminCyclesResponse> {
  try {
    const res = await apiClient.get<AdminCyclesResponse>('/api/admin/cycles', {
      headers: { [TOKEN_HEADER]: token },
      params: { limit, offset, order_by: orderBy },
    });
    return res.data;
  } catch (err: unknown) {
    if (isUnauthorized(err)) throw new AdminUnauthorizedError();
    throw err;
  }
}
