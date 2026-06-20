import type {
  ClassificationReport as ViewClassificationReport,
  ModelMetrics as ViewModelMetrics,
} from '@/features/modelos/data/realMetrics';

export type ConfusionMatrix = [[number, number], [number, number]];

export interface RocCurveData {
  fpr: number[];
  tpr: number[];
  thresholds: Array<number | null>;
}

export interface ClassificationReportClass {
  precision: number;
  recall: number;
  'f1-score': number;
  support: number;
}

export interface ClassificationReport {
  '0'?: ClassificationReportClass;
  '1'?: ClassificationReportClass;
  'macro avg'?: ClassificationReportClass;
  'weighted avg'?: ClassificationReportClass;
  accuracy?: number;
  [key: string]: ClassificationReportClass | number | undefined;
}

export interface ModelMetricItem {
  name: string;
  display_name: string;
  slug: string;
  is_selected: boolean;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  cv_mean_f1: number;
  cv_std_f1: number;
  roc_auc: number;
  confusion_matrix: ConfusionMatrix;
  classification_report: ClassificationReport;
  roc_curve: RocCurveData;
}

export interface EvaluationProtocol {
  dataset: string;
  test_size: number;
  random_state: number;
  stratify: string;
  positive_class: string;
  source: string;
}

export interface ModelMetricsPayload {
  selected_model: string;
  features: string[];
  evaluation_protocol?: EvaluationProtocol;
  models: ModelMetricItem[];
}

export interface ModelMetricsResponse {
  status: string;
  data: ModelMetricsPayload;
}

export interface NormalizedModelMetricItem {
  name: string;
  displayName: string;
  slug: string;
  isSelected: boolean;
  metrics: ViewModelMetrics;
  rocAuc: number | null;
  rocCurve: RocCurveData | null;
  confusionMatrix: ConfusionMatrix;
  report: ViewClassificationReport;
  testSupport: number;
}

export interface NormalizedModelMetricsPayload {
  selectedModel: string;
  features: string[];
  evaluationProtocol: EvaluationProtocol | null;
  models: NormalizedModelMetricItem[];
}
