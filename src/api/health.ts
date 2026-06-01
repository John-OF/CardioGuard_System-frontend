import { apiClient } from './client';

/**
 * Hace ping al endpoint de salud del backend.
 * Devuelve true solo si responde 200 con { status: "ok" }.
 * No lanza: cualquier error (servidor caído, timeout, CORS) → false.
 */
export async function checkHealth(timeoutMs = 6000): Promise<boolean> {
  try {
    const res = await apiClient.get('/api/health', { timeout: timeoutMs });
    return res.status === 200 && res.data?.status === 'ok';
  } catch {
    return false;
  }
}
