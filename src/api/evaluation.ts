import { apiClient } from './client';
import type { EvaluationRequest } from '@/types/evaluation';
import type { PredictResponse } from '@/types/results';

/**
 * Envía la evaluación al backend para predicción + clasificación de riesgo.
 * Lanza error con mensaje legible si la request falla.
 */
export async function predictEvaluation(
  payload: EvaluationRequest
): Promise<PredictResponse['data']> {
  try {
    const response = await apiClient.post<PredictResponse>('/api/predict', payload);
    return response.data.data;
  } catch (err: unknown) {
    throw normalizeApiError(err, 'No se pudo procesar la evaluación.');
  }
}

// Helper para extraer mensajes de error consistentes.
// Lo movemos a un archivo propio en el siguiente paso.
function normalizeApiError(err: unknown, fallback: string): Error {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const response = (err as { response?: { data?: { detail?: unknown; message?: unknown } } }).response;
    const detail = response?.data?.detail ?? response?.data?.message;
    if (typeof detail === 'string') return new Error(detail);
  }
  return new Error(fallback);
}