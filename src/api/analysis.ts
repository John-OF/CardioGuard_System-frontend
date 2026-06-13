import { apiClient } from './client';
import type {
  AnalysisApiResponse,
  DescriptiveAnalysisData,
  PrePostAnalysisData,
  EmergencyAnalysisData,
} from '@/types/analysis';
import { AdminUnauthorizedError } from './admin';

const TOKEN_HEADER = 'X-Admin-Token';

function isUnauthorized(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    (err as { response?: { status?: number } }).response?.status === 401
  );
}

async function getWithToken<T>(url: string, token: string): Promise<T> {
  try {
    const res = await apiClient.get<AnalysisApiResponse<T>>(url, {
      headers: { [TOKEN_HEADER]: token },
    });
    return res.data.data;
  } catch (err: unknown) {
    if (isUnauthorized(err)) throw new AdminUnauthorizedError();
    throw err;
  }
}

export function fetchDescriptiveAnalysis(token: string) {
  return getWithToken<DescriptiveAnalysisData>('/api/admin/analysis/descriptive', token);
}

export function fetchPrePostAnalysis(token: string) {
  return getWithToken<PrePostAnalysisData>('/api/admin/analysis/pre-post-test', token);
}

export function fetchEmergencyAnalysis(token: string) {
  return getWithToken<EmergencyAnalysisData>('/api/admin/analysis/emergency', token);
}
