import { apiClient } from './client';
import type {
  HistoryResponse,
  LastCycleResponse,
  HistoryItem,
  LastCycleResponse as _LastCycleResponse,
} from '@/types/results';

/**
 * Obtiene el último ciclo (pre + post si existe) del usuario.
 * Retorna null si nunca ha evaluado.
 */
export async function getLastCycle(
  userId: string
): Promise<LastCycleResponse['data']> {
  try {
    const res = await apiClient.get<LastCycleResponse>(
      `/api/last-cycle/${userId}`
    );
    return res.data.data;
  } catch (err: unknown) {
    // Si es 404, asumimos que no hay ciclo previo (no es un error real).
    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      (err as { response?: { status?: number } }).response?.status === 404
    ) {
      return null;
    }
    // Para otros errores, no rompemos el flujo: el formulario funciona igual.
    console.warn('No se pudo obtener el último ciclo:', err);
    return null;
  }
}

/**
 * Obtiene el historial completo del usuario (todos los pre-tests, post-tests, regulares).
 * Útil para el selector de pre-test en el modo avanzado.
 */
export async function getUserHistory(userId: string): Promise<HistoryItem[]> {
  try {
    const res = await apiClient.get<HistoryResponse | HistoryItem[]>(
      `/api/history/${userId}`
    );

    // El backend podría devolver el array directo o envuelto en { data: [...] }
    if (Array.isArray(res.data)) {
      return res.data;
    }
    return res.data.data ?? [];
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      (err as { response?: { status?: number } }).response?.status === 404
    ) {
      return [];
    }
    console.warn('No se pudo obtener el historial:', err);
    return [];
  }
}


import type {
  CyclesResponse,
  CycleItem,
  ComparisonResponse,
  ComparisonData,
} from '@/types/results';

// ... funciones existentes (getLastCycle, getUserHistory) ...

/**
 * Lista todos los ciclos del usuario (cada ciclo es un par pre/post).
 * Si no hay evaluaciones retorna [] (manejo de 404).
 */
export async function getUserCycles(userId: string): Promise<CycleItem[]> {
  try {
    const res = await apiClient.get<CyclesResponse>(`/api/cycles/${userId}`);
    return res.data.data ?? [];
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'response' in err &&
      (err as { response?: { status?: number } }).response?.status === 404
    ) {
      return [];
    }
    console.warn('No se pudo obtener los ciclos:', err);
    return [];
  }
}

/**
 * Comparación detallada pre vs post.
 * Lanza error si el backend responde con 404/400 — la página la maneja.
 */
export async function getEvaluationComparison(
  postEvaluationId: string
): Promise<ComparisonData> {
  const res = await apiClient.get<ComparisonResponse>(
    `/api/comparison/${postEvaluationId}`
  );
  return res.data.data;
}