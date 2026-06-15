// Métricas REALES de los modelos, transcritas de:
//   backend/ml/artifacts/form_model_metrics_7vars.json
//
// Generadas por backend/ml/src/train.py sobre el dataset UCI (heart-disease-UCI.csv):
// 7 variables de formulario, split de prueba 20% (61 casos), validación cruzada 5-fold.
//
// ⚠️ Mientras no exista el endpoint GET /api/models/metrics (ver Cambio #7 del MD), esta
// es una COPIA estática. Si se reentrena el modelo, volver a copiar el JSON aquí.
// No contiene ROC/AUC ni importancia de características (no se calculan en el backend).
//
// NOTA (corrección de etiqueta): el target del UCI venía invertido (en el CSV, target=1 = sano).
// Ahora se corrige en train.py (1 - target) de modo que la clase positiva (1) = "Con Riesgo
// Cardíaco" / enfermo. El accuracy de cada modelo es idéntico al anterior (es simétrico al
// relabeling); cambian precision/recall/F1 y la matriz de confusión, que ahora describen la
// detección de riesgo (clase 1) en lugar de la clase "sano".

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  cvMeanF1: number;
  cvStdF1: number;
}

export interface ClassMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  support: number;
}

export interface ClassificationReport {
  classes: Record<string, ClassMetrics>;
  accuracy: number;
  macroAvg: ClassMetrics;
  weightedAvg: ClassMetrics;
}

export interface RealModelData {
  metrics: ModelMetrics;
  /** [[TN, FP], [FN, TP]] tal como lo entrega sklearn (filas = real, columnas = predicho). */
  confusionMatrix: number[][];
  report: ClassificationReport;
  /** Total de casos del conjunto de prueba. */
  testSupport: number;
}

/** Modelo seleccionado/productivo (el que usa /api/predict). */
export const SELECTED_MODEL = 'RandomForest';

const CLASS_0 = 'Sin Riesgo Cardíaco';
const CLASS_1 = 'Con Riesgo Cardíaco';

export const REAL_MODEL_METRICS: Record<string, RealModelData> = {
  RandomForest: {
    metrics: {
      accuracy: 0.8360655737704918,
      precision: 0.875,
      recall: 0.75,
      f1Score: 0.8076923076923077,
      cvMeanF1: 0.6802426650495611,
      cvStdF1: 0.13940996552601995,
    },
    confusionMatrix: [
      [30, 3],
      [7, 21],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.8108108108108109, recall: 0.9090909090909091, f1Score: 0.8571428571428571, support: 33 },
        [CLASS_1]: { precision: 0.875, recall: 0.75, f1Score: 0.8076923076923077, support: 28 },
      },
      accuracy: 0.8360655737704918,
      macroAvg: { precision: 0.8429054054054055, recall: 0.8295454545454546, f1Score: 0.8324175824175823, support: 61 },
      weightedAvg: { precision: 0.8402747009304387, recall: 0.8360655737704918, f1Score: 0.8344442442803099, support: 61 },
    },
    testSupport: 61,
  },
  XGBoost: {
    metrics: {
      accuracy: 0.7213114754098361,
      precision: 0.7619047619047619,
      recall: 0.5714285714285714,
      f1Score: 0.6530612244897959,
      cvMeanF1: 0.6978566149297857,
      cvStdF1: 0.11076975482179334,
    },
    confusionMatrix: [
      [28, 5],
      [12, 16],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.7, recall: 0.8484848484848485, f1Score: 0.7671232876712328, support: 33 },
        [CLASS_1]: { precision: 0.7619047619047619, recall: 0.5714285714285714, f1Score: 0.6530612244897959, support: 28 },
      },
      accuracy: 0.7213114754098361,
      macroAvg: { precision: 0.7309523809523809, recall: 0.7099567099567099, f1Score: 0.7100922560805143, support: 61 },
      weightedAvg: { precision: 0.728415300546448, recall: 0.7213114754098361, f1Score: 0.714766930801065, support: 61 },
    },
    testSupport: 61,
  },
  SVM: {
    metrics: {
      accuracy: 0.7213114754098361,
      precision: 0.72,
      recall: 0.6428571428571429,
      f1Score: 0.6792452830188679,
      cvMeanF1: 0.7098185228417787,
      cvStdF1: 0.11858272832281382,
    },
    confusionMatrix: [
      [26, 7],
      [10, 18],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.7222222222222222, recall: 0.7878787878787878, f1Score: 0.7536231884057971, support: 33 },
        [CLASS_1]: { precision: 0.72, recall: 0.6428571428571429, f1Score: 0.6792452830188679, support: 28 },
      },
      accuracy: 0.7213114754098361,
      macroAvg: { precision: 0.721111111111111, recall: 0.7153679653679654, f1Score: 0.7164342357123326, support: 61 },
      weightedAvg: { precision: 0.7212021857923497, recall: 0.7213114754098361, f1Score: 0.7194825105232723, support: 61 },
    },
    testSupport: 61,
  },
  MLPClassifier: {
    metrics: {
      accuracy: 0.7049180327868853,
      precision: 0.6785714285714286,
      recall: 0.6785714285714286,
      f1Score: 0.6785714285714286,
      cvMeanF1: 0.6835363842506699,
      cvStdF1: 0.08935210355009625,
    },
    confusionMatrix: [
      [24, 9],
      [9, 19],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.7272727272727273, recall: 0.7272727272727273, f1Score: 0.7272727272727273, support: 33 },
        [CLASS_1]: { precision: 0.6785714285714286, recall: 0.6785714285714286, f1Score: 0.6785714285714286, support: 28 },
      },
      accuracy: 0.7049180327868853,
      macroAvg: { precision: 0.702922077922078, recall: 0.702922077922078, f1Score: 0.702922077922078, support: 61 },
      weightedAvg: { precision: 0.7049180327868853, recall: 0.7049180327868853, f1Score: 0.7049180327868853, support: 61 },
    },
    testSupport: 61,
  },
};
