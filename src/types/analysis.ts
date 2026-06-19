export interface AnalysisApiResponse<T> {
  status: string;
  data: T;
  message?: string;
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
  profile_cohort: {
    unit: 'unique_user_complete_cycle_pretest';
    unit_label: string;
    total: number;
    methodological_note: string;
  };
  profile_descriptive: {
    categorical_frequencies: Record<string, Record<string, FrequencyRow[]>>;
    continuous_stats: Record<string, NumericStats | null>;
    histograms: Record<string, HistogramBin[]>;
    records_analyzed: number;
    system_records_analyzed: number;
    excluded: {
      missing_health_responses: number;
      missing_habit_responses: number;
      missing_system_results: number;
    };
  };
  ml_prediction_distribution: {
    unit: 'unique_user_complete_cycle_pretest';
    unit_label: string;
    total: number;
    items: FrequencyRow[];
    excluded_evaluations: {
      total: number;
      post_tests: number;
      regular: number;
      incomplete_pre_tests: number;
      complete_cycle_pretests_without_system_result: number;
      duplicate_complete_cycle_pretests_by_anonymous_user: number;
    };
    deduplicated_by_anonymous_user_id: boolean;
    methodological_note: string;
  };
  scope_notes: {
    total_evaluations: string;
    ml_prediction_distribution: string;
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
}
