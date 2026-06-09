import { apiClient } from './client';
import type {
  AnalysisApiResponse,
  AnalysisOverviewData,
  AnalysisReadinessData,
  DescriptiveAnalysisData,
  PrePostAnalysisData,
  EmergencyAnalysisData,
  ChiSquareAnalysisData,
  FuzzyPendingData,
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

export function fetchAnalysisOverview(token: string) {
  return getWithToken<AnalysisOverviewData>('/api/admin/analysis/overview', token);
}

export function fetchAnalysisReadiness(token: string) {
  return getWithToken<AnalysisReadinessData>('/api/admin/analysis/readiness', token);
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

export function fetchChiSquareAnalysis(token: string) {
  return getWithToken<ChiSquareAnalysisData>('/api/admin/analysis/chi-square', token);
}

export function fetchFuzzyPending(token: string) {
  return getWithToken<FuzzyPendingData>('/api/admin/analysis/fuzzy-pending', token);
}
