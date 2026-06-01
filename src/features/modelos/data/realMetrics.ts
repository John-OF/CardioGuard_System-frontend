// Métricas REALES de los modelos, transcritas de:
//   backend/ml/artifacts/form_model_metrics_7vars.json
//
// Generadas por backend/ml/src/train.py sobre el dataset UCI (heart-disease-UCI.csv):
// 7 variables de formulario, split de prueba 20% (61 casos), validación cruzada 5-fold.
//
// ⚠️ Mientras no exista el endpoint GET /api/models/metrics (ver Cambio #7 del MD), esta
// es una COPIA estática. Si se reentrena el modelo, volver a copiar el JSON aquí.
// No contiene ROC/AUC ni importancia de características (no se calculan en el backend).

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
      precision: 0.8108108108108109,
      recall: 0.9090909090909091,
      f1Score: 0.8571428571428571,
      cvMeanF1: 0.7560111896463318,
      cvStdF1: 0.07421795328949184,
    },
    confusionMatrix: [
      [21, 7],
      [3, 30],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.875, recall: 0.75, f1Score: 0.8076923076923077, support: 28 },
        [CLASS_1]: { precision: 0.8108108108108109, recall: 0.9090909090909091, f1Score: 0.8571428571428571, support: 33 },
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
      precision: 0.7,
      recall: 0.8484848484848485,
      f1Score: 0.7671232876712328,
      cvMeanF1: 0.7641613871802552,
      cvStdF1: 0.0741803685499916,
    },
    confusionMatrix: [
      [16, 12],
      [5, 28],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.7619047619047619, recall: 0.5714285714285714, f1Score: 0.6530612244897959, support: 28 },
        [CLASS_1]: { precision: 0.7, recall: 0.8484848484848485, f1Score: 0.7671232876712328, support: 33 },
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
      precision: 0.7222222222222222,
      recall: 0.7878787878787878,
      f1Score: 0.7536231884057971,
      cvMeanF1: 0.7810475415757682,
      cvStdF1: 0.06193931913239499,
    },
    confusionMatrix: [
      [18, 10],
      [7, 26],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.72, recall: 0.6428571428571429, f1Score: 0.6792452830188679, support: 28 },
        [CLASS_1]: { precision: 0.7222222222222222, recall: 0.7878787878787878, f1Score: 0.7536231884057971, support: 33 },
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
      precision: 0.7419354838709677,
      recall: 0.696969696969697,
      f1Score: 0.71875,
      cvMeanF1: 0.730917748917749,
      cvStdF1: 0.03656567661050144,
    },
    confusionMatrix: [
      [20, 8],
      [10, 23],
    ],
    report: {
      classes: {
        [CLASS_0]: { precision: 0.6666666666666666, recall: 0.7142857142857143, f1Score: 0.6896551724137931, support: 28 },
        [CLASS_1]: { precision: 0.7419354838709677, recall: 0.696969696969697, f1Score: 0.71875, support: 33 },
      },
      accuracy: 0.7049180327868853,
      macroAvg: { precision: 0.7043010752688172, recall: 0.7056277056277056, f1Score: 0.7042025862068966, support: 61 },
      weightedAvg: { precision: 0.7073858628591574, recall: 0.7049180327868853, f1Score: 0.7053949971735444, support: 61 },
    },
    testSupport: 61,
  },
};
