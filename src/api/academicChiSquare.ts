import { apiClient } from './client';
import { AdminUnauthorizedError } from './admin';

const TOKEN_HEADER = 'X-Admin-Token';

export interface ContingencyRow {
  category: string;
  values: Record<string, number>;
  total: number;
}

export interface ContingencyTable {
  row_variable?: string;
  column_variable?: string;
  columns: string[];
  rows: ContingencyRow[];
  column_totals: Record<string, number>;
  grand_total: number;
}

export interface AcademicChiSquareData {
  methodological_question: string;
  variables: { x: string; y: string };
  hypotheses: { null: string; alternative: string };
  scope: string;
  scope_label: string;
  methodological_note: string;
  data_source: string;
  total_valid_records: number;
  excluded_records_count: number;
  valid_records: number;
  excluded_records: number;
  alpha: number;
  can_calculate: boolean;
  observed_table: ContingencyTable;
  expected_table: ContingencyTable | null;
  descriptive_detail: {
    columns: string[];
    rows: ContingencyRow[];
    note: string;
  };
  cell_calculations: Array<{
    row_category: string;
    column_category: string;
    observed: number;
    expected: number;
    formula_text: string;
    contribution: number;
  }>;
  results: {
    chi_square: number;
    formatted_chi_square: string;
    degrees_of_freedom: number;
    degrees_of_freedom_formula: string;
    p_value: number;
    critical_value: number;
    alpha: number;
    decision: string;
    cramers_v: number;
    cramers_v_interpretation: string;
  } | null;
  fisher_exact: {
    available: boolean;
    used_as_complement: boolean;
    reason: string;
    odds_ratio: number | null;
    odds_ratio_label: string | null;
    p_value: number | null;
    p_value_label: string | null;
    interpretation: string | null;
  };
  assumptions: {
    cells_below_5: number;
    percentage_below_5: number;
    acceptable: boolean;
    warning: string | null;
  };
  interpretation: string;
  distribution_points: Array<{ x: number; y: number }>;
}

function isUnauthorized(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'response' in error &&
    (error as { response?: { status?: number } }).response?.status === 401;
}

export async function fetchEmergencyNumberActionChiSquare(token: string) {
  try {
    const response = await apiClient.get<{ data: AcademicChiSquareData }>(
      '/api/academic/chi-square/emergency-number-action',
      {
        params: { scope: 'post_test' },
        headers: { [TOKEN_HEADER]: token },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    if (isUnauthorized(error)) throw new AdminUnauthorizedError();
    throw error;
  }
}

export async function fetchCprKnowledgeConsciousnessActionChiSquare(token: string) {
  try {
    const response = await apiClient.get<{ data: AcademicChiSquareData }>(
      '/api/academic/chi-square/cpr-knowledge-consciousness-action',
      {
        params: { scope: 'post_test' },
        headers: { [TOKEN_HEADER]: token },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    if (isUnauthorized(error)) throw new AdminUnauthorizedError();
    throw error;
  }
}

export async function fetchSymptomRecognitionEmergencyActionChiSquare(token: string) {
  try {
    const response = await apiClient.get<{ data: AcademicChiSquareData }>(
      '/api/academic/chi-square/symptom-recognition-emergency-action',
      {
        params: { scope: 'post_test' },
        headers: { [TOKEN_HEADER]: token },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    if (isUnauthorized(error)) throw new AdminUnauthorizedError();
    throw error;
  }
}

export async function fetchPriorTrainingEducationalChangeChiSquare(token: string) {
  try {
    const response = await apiClient.get<{ data: AcademicChiSquareData }>(
      '/api/academic/chi-square/prior-training-educational-change',
      {
        params: { scope: 'post_test' },
        headers: { [TOKEN_HEADER]: token },
      },
    );
    return response.data.data;
  } catch (error: unknown) {
    if (isUnauthorized(error)) throw new AdminUnauthorizedError();
    throw error;
  }
}
