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

export type AdminExportKind = 'joined' | 'tables';

const EXPORT_PATHS: Record<AdminExportKind, string> = {
  joined: '/api/admin/export/joined.csv',
  tables: '/api/admin/export/tables.zip',
};

const EXPORT_FALLBACK_NAMES: Record<AdminExportKind, string> = {
  joined: 'cardioguard_dataset.csv',
  tables: 'cardioguard_tablas.zip',
};

function filenameFromDisposition(header: unknown): string | null {
  if (typeof header !== 'string') return null;
  const match = header.match(/filename="?([^"]+)"?/i);
  return match ? match[1] : null;
}

/**
 * Descarga un export de datos (CSV unido o ZIP de tablas) como Blob.
 * Lanza AdminUnauthorizedError si el token es inválido (401).
 */
export async function downloadAdminExport(
  token: string,
  kind: AdminExportKind
): Promise<{ blob: Blob; filename: string }> {
  try {
    const res = await apiClient.get(EXPORT_PATHS[kind], {
      headers: { [TOKEN_HEADER]: token },
      responseType: 'blob',
    });
    const filename =
      filenameFromDisposition(res.headers['content-disposition']) ??
      EXPORT_FALLBACK_NAMES[kind];
    return { blob: res.data as Blob, filename };
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
