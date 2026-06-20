import { apiClient } from './client';
import type {
  ClassificationReport,
  ClassificationReportClass,
  ConfusionMatrix,
  EvaluationProtocol,
  ModelMetricsResponse,
  NormalizedHybridComparison,
  NormalizedHybridModelMetric,
  NormalizedModelMetricItem,
  NormalizedModelMetricsPayload,
  RocCurveData,
} from '@/types/modelMetrics';

const CLASS_LABELS: Record<'0' | '1', string> = {
  '0': 'Sin Riesgo Cardiaco',
  '1': 'Con Riesgo Cardiaco',
};

const KNOWN_MODEL_SLUGS: Record<string, string> = {
  RandomForest: 'random-forest',
  XGBoost: 'xgboost',
  SVM: 'svm',
  MLPClassifier: 'mlp',
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asNumber(value: unknown, field: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Campo numerico invalido: ${field}`);
  }
  return value;
}

function asString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Campo de texto invalido: ${field}`);
  }
  return value;
}

function asNumberArray(value: unknown, field: string): number[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'number' && Number.isFinite(item))) {
    throw new Error(`Arreglo numerico invalido: ${field}`);
  }
  return value;
}

function normalizeConfusionMatrix(value: unknown): ConfusionMatrix {
  if (
    !Array.isArray(value) ||
    value.length !== 2 ||
    !value.every(
      (row) =>
        Array.isArray(row) &&
        row.length === 2 &&
        row.every((item) => typeof item === 'number' && Number.isFinite(item)),
    )
  ) {
    throw new Error('Matriz de confusion invalida');
  }

  return [
    [value[0][0], value[0][1]],
    [value[1][0], value[1][1]],
  ];
}

function normalizeRocCurve(value: unknown): RocCurveData {
  if (!isObject(value)) {
    throw new Error('Curva ROC invalida');
  }

  const fpr = asNumberArray(value.fpr, 'roc_curve.fpr');
  const tpr = asNumberArray(value.tpr, 'roc_curve.tpr');
  const thresholds = Array.isArray(value.thresholds)
    ? value.thresholds.map((item) => (item === null ? null : asNumber(item, 'roc_curve.thresholds')))
    : [];

  if (fpr.length !== tpr.length || (thresholds.length > 0 && thresholds.length !== fpr.length)) {
    throw new Error('Curva ROC con longitudes inconsistentes');
  }

  return { fpr, tpr, thresholds };
}

function normalizeReportRow(value: unknown, field: string): ClassificationReportClass {
  if (!isObject(value)) {
    throw new Error(`Fila de reporte invalida: ${field}`);
  }

  return {
    precision: asNumber(value.precision, `${field}.precision`),
    recall: asNumber(value.recall, `${field}.recall`),
    'f1-score': asNumber(value['f1-score'], `${field}.f1-score`),
    support: asNumber(value.support, `${field}.support`),
  };
}

function normalizeClassificationReport(value: unknown): ClassificationReport {
  if (!isObject(value)) {
    throw new Error('Reporte de clasificacion invalido');
  }

  return {
    '0': normalizeReportRow(value['0'], 'classification_report.0'),
    '1': normalizeReportRow(value['1'], 'classification_report.1'),
    accuracy: asNumber(value.accuracy, 'classification_report.accuracy'),
    'macro avg': normalizeReportRow(value['macro avg'], 'classification_report.macro avg'),
    'weighted avg': normalizeReportRow(value['weighted avg'], 'classification_report.weighted avg'),
  };
}

function toViewReport(report: ClassificationReport) {
  const class0 = report['0'];
  const class1 = report['1'];
  const macroAvg = report['macro avg'];
  const weightedAvg = report['weighted avg'];

  if (!class0 || !class1 || !macroAvg || !weightedAvg || typeof report.accuracy !== 'number') {
    throw new Error('Reporte de clasificacion incompleto');
  }

  return {
    classes: {
      [CLASS_LABELS['0']]: {
        precision: class0.precision,
        recall: class0.recall,
        f1Score: class0['f1-score'],
        support: class0.support,
      },
      [CLASS_LABELS['1']]: {
        precision: class1.precision,
        recall: class1.recall,
        f1Score: class1['f1-score'],
        support: class1.support,
      },
    },
    accuracy: report.accuracy,
    macroAvg: {
      precision: macroAvg.precision,
      recall: macroAvg.recall,
      f1Score: macroAvg['f1-score'],
      support: macroAvg.support,
    },
    weightedAvg: {
      precision: weightedAvg.precision,
      recall: weightedAvg.recall,
      f1Score: weightedAvg['f1-score'],
      support: weightedAvg.support,
    },
  };
}

function normalizeModel(value: unknown): NormalizedModelMetricItem {
  if (!isObject(value)) {
    throw new Error('Modelo invalido');
  }

  const name = asString(value.name, 'models[].name');
  const report = normalizeClassificationReport(value.classification_report);
  const viewReport = toViewReport(report);
  const slug =
    typeof value.slug === 'string' && value.slug.trim() !== ''
      ? value.slug
      : KNOWN_MODEL_SLUGS[name] ?? name.toLowerCase().replaceAll(' ', '-');

  return {
    name,
    displayName:
      typeof value.display_name === 'string' && value.display_name.trim() !== ''
        ? value.display_name
        : name,
    slug,
    isSelected: value.is_selected === true,
    metrics: {
      accuracy: asNumber(value.accuracy, `${name}.accuracy`),
      precision: asNumber(value.precision, `${name}.precision`),
      recall: asNumber(value.recall, `${name}.recall`),
      f1Score: asNumber(value.f1_score, `${name}.f1_score`),
      cvMeanF1: asNumber(value.cv_mean_f1, `${name}.cv_mean_f1`),
      cvStdF1: asNumber(value.cv_std_f1, `${name}.cv_std_f1`),
    },
    rocAuc: asNumber(value.roc_auc, `${name}.roc_auc`),
    rocCurve: normalizeRocCurve(value.roc_curve),
    confusionMatrix: normalizeConfusionMatrix(value.confusion_matrix),
    report: viewReport,
    testSupport: viewReport.macroAvg.support,
  };
}

function normalizeEvaluationProtocol(value: unknown): EvaluationProtocol | null {
  if (!isObject(value)) return null;

  if (
    typeof value.dataset !== 'string' ||
    typeof value.test_size !== 'number' ||
    !Number.isFinite(value.test_size) ||
    typeof value.random_state !== 'number' ||
    !Number.isFinite(value.random_state) ||
    typeof value.stratify !== 'string' ||
    typeof value.positive_class !== 'string' ||
    typeof value.source !== 'string'
  ) {
    return null;
  }

  return {
    dataset: value.dataset,
    features:
      Array.isArray(value.features) && value.features.every((item) => typeof item === 'string')
        ? value.features
        : undefined,
    test_size: value.test_size,
    random_state: value.random_state,
    stratify: value.stratify,
    positive_class: value.positive_class,
    source: value.source,
    hybrid_source: typeof value.hybrid_source === 'string' ? value.hybrid_source : undefined,
    hybrid_variables:
      Array.isArray(value.hybrid_variables) &&
      value.hybrid_variables.every((item) => typeof item === 'string')
        ? value.hybrid_variables
        : undefined,
  };
}

function normalizeHybridModel(value: unknown): NormalizedHybridModelMetric {
  if (!isObject(value)) throw new Error('Modelo hibrido invalido');

  return {
    name: asString(value.name, 'hybrid_models[].name'),
    displayName: asString(value.display_name, 'hybrid_models[].display_name'),
    baseModel: asString(value.base_model, 'hybrid_models[].base_model'),
    rocAuc: asNumber(value.auc, 'hybrid_models[].auc'),
    rocCurve: normalizeRocCurve(value.roc_curve),
  };
}

function normalizeHybridComparison(value: unknown): NormalizedHybridComparison {
  if (!isObject(value)) throw new Error('Comparacion hibrida invalida');

  return {
    model: asString(value.model, 'hybrid_comparison[].model'),
    displayName: asString(value.display_name, 'hybrid_comparison[].display_name'),
    aucMl: asNumber(value.auc_ml, 'hybrid_comparison[].auc_ml'),
    aucFuzzy: asNumber(value.auc_fuzzy, 'hybrid_comparison[].auc_fuzzy'),
    deltaAuc: asNumber(value.delta_auc, 'hybrid_comparison[].delta_auc'),
    interpretation: asString(value.interpretation, 'hybrid_comparison[].interpretation'),
  };
}

function normalizeOptionalArray<T>(value: unknown, normalizer: (item: unknown) => T): T[] {
  if (!Array.isArray(value)) return [];
  try {
    return value.map(normalizer);
  } catch {
    return [];
  }
}

export function normalizeModelMetricsPayload(payload: unknown): NormalizedModelMetricsPayload {
  if (!isObject(payload)) {
    throw new Error('Payload de metricas invalido');
  }

  const selectedModel = asString(payload.selected_model, 'selected_model');
  const features = Array.isArray(payload.features) && payload.features.every((item) => typeof item === 'string')
    ? payload.features
    : [];
  const models = Array.isArray(payload.models) ? payload.models.map(normalizeModel) : [];
  const hybridModels = normalizeOptionalArray(payload.hybrid_models, normalizeHybridModel);
  const hybridComparison = normalizeOptionalArray(
    payload.hybrid_comparison,
    normalizeHybridComparison,
  );

  if (models.length === 0) {
    throw new Error('Payload de metricas sin modelos validos');
  }

  return {
    selectedModel,
    features,
    evaluationProtocol: normalizeEvaluationProtocol(payload.evaluation_protocol),
    models: models.map((model) => ({
      ...model,
      isSelected: model.name === selectedModel || model.isSelected,
    })),
    hybridModels,
    hybridComparison,
    methodologicalNote:
      typeof payload.methodological_note === 'string' && payload.methodological_note.trim() !== ''
        ? payload.methodological_note
        : null,
  };
}

export async function fetchModelMetrics(): Promise<NormalizedModelMetricsPayload> {
  const response = await apiClient.get<ModelMetricsResponse>('/api/models/metrics');
  const body = response.data;

  if (!body || body.status !== 'success') {
    throw new Error('Respuesta de metricas sin estado success');
  }

  return normalizeModelMetricsPayload(body.data);
}
