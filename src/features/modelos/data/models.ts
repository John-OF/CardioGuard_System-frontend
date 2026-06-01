// Datos de los modelos predictivos para la página de "Modelos Predictivos".
//
// Las MÉTRICAS son reales (ver realMetrics.ts → copia de form_model_metrics_7vars.json).
// Aquí solo se añade la metadata de presentación (nombre, ícono, colores, descripción).
//
// Pendiente (Cambio #7 del MD): servir estas métricas vía endpoint GET /api/models/metrics
// en vez de la copia estática.

import type { ComponentType, SVGProps } from 'react';
import { IconTrees, IconZap, IconSpline, IconNetwork } from '@/components/ui/icons';
import { REAL_MODEL_METRICS, SELECTED_MODEL } from './realMetrics';
import type { RealModelData } from './realMetrics';

export type { ModelMetrics, ClassMetrics, ClassificationReport } from './realMetrics';

interface ModelMeta {
  slug: string;
  /** Clave del modelo en REAL_MODEL_METRICS (nombre real del backend). */
  backendName: string;
  name: string;
  subtitle: string;
  /** Ícono SVG del modelo (submenú + cabecera). */
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  menuLabel: string; // etiqueta corta para el submenú
  /** Clases Tailwind para el degradado del ícono de cabecera. */
  headerGradient: string;
  /** Clases Tailwind para la tarjeta de descripción (fondo + borde). */
  descriptionBox: string;
  /** Color de acento (texto) del modelo. */
  accentText: string;
  /** Borde de los chips informativos. */
  chipBorder: string;
  description: string;
}

export interface PredictiveModel extends ModelMeta, RealModelData {
  /** true si es el modelo seleccionado/productivo (RandomForest). */
  selected: boolean;
}

const MODEL_META: ModelMeta[] = [
  {
    slug: 'random-forest',
    backendName: 'RandomForest',
    name: 'Random Forest',
    subtitle: 'Bosque Aleatorio · modelo en producción',
    Icon: IconTrees,
    menuLabel: 'Random Forest',
    headerGradient: 'from-emerald-500 to-green-600',
    descriptionBox: 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200',
    accentText: 'text-emerald-600',
    chipBorder: 'border-emerald-200',
    description:
      'Bosque aleatorio: combina muchos árboles de decisión y promedia sus votos, lo que lo hace robusto y estable. Es el modelo seleccionado para CardioGuard por su mejor desempeño (F1 y recall). Su probabilidad alimenta luego la clasificación de riesgo por lógica difusa del sistema.',
  },
  {
    slug: 'xgboost',
    backendName: 'XGBoost',
    name: 'XGBoost',
    subtitle: 'Extreme Gradient Boosting',
    Icon: IconZap,
    menuLabel: 'XGBoost',
    headerGradient: 'from-orange-500 to-red-600',
    descriptionBox: 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200',
    accentText: 'text-orange-600',
    chipBorder: 'border-orange-200',
    description:
      'Gradient boosting: construye árboles de decisión de manera secuencial, donde cada árbol corrige los errores del anterior. Tiene gran capacidad, pero es más sensible al sobreajuste cuando el conjunto de datos es pequeño.',
  },
  {
    slug: 'svm',
    backendName: 'SVM',
    name: 'Support Vector Machine (SVM)',
    subtitle: 'Máquinas de Soporte Vectorial',
    Icon: IconSpline,
    menuLabel: 'SVM',
    headerGradient: 'from-sky-500 to-blue-600',
    descriptionBox: 'bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200',
    accentText: 'text-sky-600',
    chipBorder: 'border-sky-200',
    description:
      'Máquina de soporte vectorial con kernel RBF (sobre datos estandarizados): busca el hiperplano que mejor separa las clases y permite capturar relaciones no lineales entre las variables cardiovasculares.',
  },
  {
    slug: 'mlp',
    backendName: 'MLPClassifier',
    name: 'Redes Neuronales (MLP)',
    subtitle: 'Multi-Layer Perceptron',
    Icon: IconNetwork,
    menuLabel: 'Redes Neuronales (MLP)',
    headerGradient: 'from-purple-500 to-pink-600',
    descriptionBox: 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200',
    accentText: 'text-purple-600',
    chipBorder: 'border-purple-200',
    description:
      'Perceptrón multicapa (red neuronal): aprende patrones complejos y no lineales mediante capas ocultas con activación ReLU. Suele necesitar más datos para alcanzar su mejor desempeño.',
  },
];

export const PREDICTIVE_MODELS: PredictiveModel[] = MODEL_META.map((meta) => {
  const data = REAL_MODEL_METRICS[meta.backendName];
  if (!data) {
    throw new Error(`No hay métricas reales para el modelo: ${meta.backendName}`);
  }
  return {
    ...meta,
    ...data,
    selected: meta.backendName === SELECTED_MODEL,
  };
});

export const MODELS_BY_SLUG: Record<string, PredictiveModel> = PREDICTIVE_MODELS.reduce(
  (acc, model) => {
    acc[model.slug] = model;
    return acc;
  },
  {} as Record<string, PredictiveModel>,
);
