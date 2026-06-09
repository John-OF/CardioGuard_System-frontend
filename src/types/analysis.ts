export interface AnalysisApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface AnalysisOverviewData {
  module: string;
  non_diagnostic_notice: string;
  available_blocks: AnalysisBlock[];
  fuzzy_blocked_count?: number;
  fuzzy_conditionally_ready_count?: number;
  fuzzy_validation_note?: string;
  ml_metrics_endpoint: string;
  ml_metrics_note: string;
}

export interface AnalysisBlock {
  id: string;
  title?: string;
  description?: string;
  depends_on_fuzzy?: boolean;
  implementation_block?: number;
  block?: number;
  endpoint?: string;
  status?: string;
}

export interface AnalysisReadinessData {
  ready_for_implementation: string[];
  blocked_by_fuzzy_logic?: string[];
  conditionally_ready_after_fuzzy_validation?: string[];
  unavailable_due_to_missing_data?: string[];
  fuzzy_postponement_reason?: string;
  fuzzy_validation_summary?: {
    status: string;
    implementation: string;
    contract: Record<string, unknown>;
    data_consistency_warning: string;
  };
  unavailable_data_detail?: Record<string, unknown>;
}

export interface NumericStats {
  count: number;
  mean: number | null;
  median: number | null;
  std: number | null;
  min: number | null;
  max: number | null;
  q1: number | null;
  q3: number | null;
}

export interface FrequencyRow {
  value: string | number;
  count: number;
  percentage: number;
  label?: string;
}

export interface HistogramBin {
  bin_start: number;
  bin_end: number;
  count: number;
}

export interface DescriptiveAnalysisData {
  total_evaluations: number;
  date_range: { start: string; end: string } | null;
  evaluation_type_distribution: { value: string; count: number }[];
  cycle_counts: {
    total_pre_tests: number;
    total_post_tests: number;
    complete_cycles: number;
    incomplete_cycles: number;
  };
  categorical_frequencies: Record<string, Record<string, FrequencyRow[]>>;
  continuous_stats: Record<string, NumericStats | null>;
  histograms: Record<string, HistogramBin[]>;
}

export interface PrePostAnalysisData {
  summary: {
    complete_cycles: number;
    total_pre_tests: number;
    total_post_tests: number;
    education_pairs_analyzed: number;
    emergency_pairs_analyzed: number;
    warnings: string[];
    non_diagnostic_notice: string;
  };
  cycle_counts: {
    total_pre_tests: number;
    total_post_tests: number;
    complete_cycles: number;
    incomplete_pre_tests: number;
    orphan_post_tests: number;
    completion_rate_percentage: number;
  };
  education: ScoreSectionData | null;
  emergency: ScoreSectionData | null;
  combined: CombinedSectionData | null;
  question_level_changes: {
    education: QuestionChange[];
    emergency: QuestionChange[];
  };
  statistical_tests: Record<string, StatisticalTestResult | null>;
  data_quality: DataQualitySummary;
  limitations: string[];
  excluded_fuzzy_fields: FuzzyExclusion;
  non_diagnostic_notice: string;
}

export interface ScoreSectionData {
  max_score: number;
  n_pairs: number;
  pre_score_stats: NumericStats;
  post_score_stats: NumericStats;
  difference_stats: NumericStats;
  mean_absolute_difference: number;
  mean_percentage_difference: number;
  improved_count: number;
  unchanged_count: number;
  worsened_count: number;
  improved_percentage: number;
}

export interface CombinedSectionData {
  max_score: number;
  n_pairs: number;
  pre_score_stats: NumericStats;
  post_score_stats: NumericStats;
  difference_stats: NumericStats;
  improved_count: number;
  unchanged_count: number;
  worsened_count: number;
}

export interface QuestionChange {
  field: string;
  n: number;
  pre_mean: number;
  post_mean: number;
  mean_difference: number;
  improved_count: number;
  unchanged_count: number;
  worsened_count: number;
}

export interface StatisticalTestResult {
  test_available: boolean;
  test_name?: string;
  statistic?: number | null;
  p_value?: number | null;
  alpha?: number;
  decision?: string;
  interpretation?: string;
  normality_test?: NormalityTestResult | null;
  sample_size?: number;
  hypothesis_h0?: string;
  hypothesis_h1?: string;
  reason?: string;
}

export interface NormalityTestResult {
  test_name: string;
  statistic: number | null;
  p_value: number | null;
  is_normal: boolean | null;
  interpretation: string;
}

export interface DataQualitySummary {
  complete_cycles_with_education: number;
  complete_cycles_with_emergency: number;
  complete_cycles_missing_education: number;
  complete_cycles_missing_emergency: number;
  incomplete_pre_tests: number;
  orphan_post_tests: number;
}

export interface EmergencyAnalysisData {
  summary: {
    total_evaluations: number;
    total_emergency_responses: number;
    non_diagnostic_notice: string;
  };
  score_distribution: {
    max_score: number;
    numeric_stats: NumericStats;
    percentage_stats: NumericStats;
  } | null;
  field_frequencies: Record<string, FrequencyRow[]>;
  adequate_response: AdequateResponseData | null;
  preparedness_levels: PreparednessLevel[];
  by_evaluation_type: Record<string, EvalTypeBreakdown>;
  training_relation_descriptive: {
    rows: TrainingRelationRow[];
    note: string;
  } | null;
  emergency_action_profile: EmergencyActionProfile | null;
  data_quality: {
    total_evaluations: number;
    total_emergency_responses: number;
    evaluations_without_emergency_response: number;
    complete_emergency_records: number;
  };
  limitations: string[];
  excluded_fuzzy_fields: FuzzyExclusion;
  non_diagnostic_notice: string;
}

export interface AdequateResponseData {
  adequate_count: number;
  non_adequate_count: number;
  adequate_percentage: number;
  non_adequate_percentage: number;
  definition: string;
  fields_used: string[];
  interpretation: string;
}

export interface PreparednessLevel {
  level: string;
  count: number;
  percentage: number;
  score_range: string;
}

export interface EvalTypeBreakdown {
  count: number;
  score_stats: NumericStats | null;
  adequate_count: number;
  adequate_percentage: number;
}

export interface TrainingRelationRow {
  prior_training: number;
  label: string;
  count: number;
  adequate_count: number;
  non_adequate_count: number;
  adequate_percentage: number;
  non_adequate_percentage: number;
}

export interface EmergencyActionProfile {
  knows_emergency_number_percentage: number;
  calls_immediately_percentage: number;
  acts_immediately_percentage: number;
  adequate_support_action_percentage: number;
  has_prior_training_percentage: number;
}

export interface FuzzyExclusion {
  excluded: string[];
  reason: string;
  future_block: string;
}

export interface FuzzyEngineInfo {
  implementation: string;
  library: string;
  library_version?: string;
  validated: boolean;
  validation_date?: string;
  defuzzification: string;
  membership_functions?: string[];
  number_of_rules?: number;
  contract: {
    function: string;
    file: string;
    input: string;
    output: {
      level: string[];
      score_range: number[];
    };
  };
}

export interface FuzzyInputInfo {
  name: string;
  source: string;
  type: string;
  range: number[];
}

export interface FuzzyOutputInfo {
  name: string;
  type: string;
  values?: string[];
  range?: number[];
  db_column?: string;
}

export interface FuzzyEnabledAnalysis {
  id: string;
  description: string;
}

export interface FuzzyDataConsistencyWarning {
  risk: string;
  recommendation: string;
}

export interface FuzzyPendingData {
  depends_on?: string[];
  current_implementation?: {
    description: string;
    file: string;
    function: string;
    score_range: string;
    levels: Record<string, string>;
  };
  postponement_reason?: string;
  planned_block?: number;
  pending_analyses?: { id: string; description: string }[];
  fuzzy_engine?: FuzzyEngineInfo;
  inputs?: FuzzyInputInfo[];
  outputs?: FuzzyOutputInfo[];
  enabled_after_validation?: FuzzyEnabledAnalysis[];
  data_consistency_warning?: FuzzyDataConsistencyWarning;
  historical_data_options?: string[];
  non_diagnostic_notice?: string;
}
