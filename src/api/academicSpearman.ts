import { apiClient } from './client';
import { AdminUnauthorizedError } from './admin';

const TOKEN_HEADER = 'X-Admin-Token';

export interface SpearmanVariable {
  field: string;
  label: string;
  scale: string;
}

export interface SpearmanStats {
  n: number;
  mean: number | null;
  median: number | null;
  std: number | null;
  min: number | null;
  max: number | null;
  q1: number | null;
  q3: number | null;
}

export interface SpearmanRankRow {
  evaluation_id: string;
  anonymous_user_id: string;
  ml_probability: number;
  rank_ml_probability: number;
  fuzzy_risk_score: number;
  rank_fuzzy_risk_score: number;
  d: number;
  d_squared: number;
  ml_prediction: number;
  fuzzy_risk_level: string;
}

export interface AcademicSpearmanData {
  analysis_id: string;
  title: string;
  methodological_question: string;
  variables: { x: SpearmanVariable; y: SpearmanVariable };
  cohort: { unit: string; unit_label: string; total: number };
  hypotheses: { null: string; alternative: string };
  justification: string;
  alpha: number;
  can_calculate: boolean;
  calculation_blockers: string[];
  exclusions: {
    missing_system_result: number;
    null_ml_probability: number;
    null_fuzzy_risk_score: number;
    invalid_range: number;
  };
  descriptive_stats: {
    ml_probability: SpearmanStats;
    fuzzy_risk_score: SpearmanStats;
  };
  ties: { ml_probability: number; fuzzy_risk_score: number; method: string };
  rank_table: SpearmanRankRow[];
  formula: {
    display: string;
    steps: string[];
    sum_d_squared: number;
    tie_note: string;
  };
  results: {
    rho: number | null;
    p_value: number | null;
    n: number;
    decision: string;
    strength: string;
    direction: string;
  };
  interpretation: string;
  methodological_note: string;
  warnings: string[];
  scatter_points: Array<{
    x: number;
    y: number;
    evaluation_id: string;
    anonymous_user_id: string;
  }>;
}

function isUnauthorized(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'response' in error &&
    (error as { response?: { status?: number } }).response?.status === 401;
}

export async function fetchSpearmanMlFuzzy(token: string) {
  try {
    const response = await apiClient.get<{ data: AcademicSpearmanData }>(
      '/api/academic/correlation/spearman-ml-fuzzy',
      { headers: { [TOKEN_HEADER]: token } },
    );
    return response.data.data;
  } catch (error: unknown) {
    if (isUnauthorized(error)) throw new AdminUnauthorizedError();
    throw error;
  }
}
