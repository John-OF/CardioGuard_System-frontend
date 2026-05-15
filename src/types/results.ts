export type RiskLevel = 'bajo' | 'moderado' | 'alto';
export type Priority = 'baja' | 'media' | 'alta';
export type EvaluationType = 'regular' | 'pre_test' | 'post_test';
export type BMICategory = 'bajo_peso' | 'normal' | 'sobrepeso' | 'obesidad';
export type AgeGroup = '60-69' | '70-79' | '80+';
export type PreparednessLevel = 'baja' | 'media' | 'alta';

export interface PredictResponseData {
  evaluation_id: string;
  session_code: string;
  anonymous_user_id: string;
  evaluation_type: EvaluationType;
  ml: {
    prediction: 0 | 1;
    probability: number;
  };
  risk: {
    level: RiskLevel;
    score: number;
  };
  derived: {
    bmi: number;
    bmi_category: BMICategory;
    age_group: AgeGroup;
  };
  recommendations: string[];
  education: {
    topics: string[];
    priority_level: Priority;
  };
  preparedness: {
    score: number;          // 0..1, mayor = mejor preparado
    level: PreparednessLevel;
  };
}

export interface PredictResponse {
  status: string;
  data: PredictResponseData;
  message: string;
}

// Endpoint GET /api/last-cycle/{user_id}
// Estructura: si nunca evaluó, retorna null/vacío.
// Si tiene un pre sin post, post_test es null.
// Si está completo, ambos llenos.
export interface LastCycleEvaluation {
  evaluation_id: string;
  evaluation_type: EvaluationType;
  created_at: string;
  risk_level: RiskLevel;
  ml_probability: number;
}

export interface LastCycleResponse {
  status: string;
  data: {
    pre_test: LastCycleEvaluation | null;
    post_test: LastCycleEvaluation | null;
    is_complete: boolean;
  } | null;
  message: string;
}

// Para listar pre-tests del usuario (para selector del modo avanzado)
export interface HistoryItem {
  evaluation_id: string;
  evaluation_type: EvaluationType;
  created_at: string;
  risk_level: RiskLevel;
}

export interface HistoryResponse {
  status: string;
  data: HistoryItem[];
  message: string;
}

// Variante usada en sessionStorage: añade el timestamp del momento
// en que el resultado fue recibido del backend (el backend no envía
// created_at en /predict, así que lo capturamos en el cliente).
export interface StoredPredictResponseData extends PredictResponseData {
  _saved_at?: string;
}

// === Endpoints de Historial / Ciclos / Comparación ===

export interface CyclePreRef {
  evaluation_id: string;
  created_at: string;
}

export interface CyclePostRef {
  evaluation_id: string;
  created_at: string;
}

export interface CycleItem {
  pre_test: CyclePreRef;
  post_test: CyclePostRef | null;
  status: 'completed' | 'pending';
}

export interface CyclesResponse {
  status: string;
  data: CycleItem[];
}

// Detalle por evaluación dentro de una comparación
export interface ComparisonEvalDetail {
  evaluation_id: string;
  created_at: string;
  education_score: number;        // suma cruda 0..12 (6 vars × 0..2)
  emergency_score: number;        // suma cruda 0..8 (5 vars, una hasta 4)
  ml_probability: number;         // 0..1
  risk_level: RiskLevel;
  education_priority: Priority;
}

export type ChangeResult = 'mejoró' | 'empeoró' | 'sin cambios';

export interface ComparisonSummary {
  education_score_diff: number;
  education_result: ChangeResult;
  emergency_score_diff: number;
  emergency_result: ChangeResult;
  ml_probability_diff: number;
  risk_level_changed: boolean;
  education_priority_changed: {
    from: Priority;
    to: Priority;
  };
}

export interface ComparisonData {
  anonymous_user_id: string;
  pre_test: ComparisonEvalDetail;
  post_test: ComparisonEvalDetail;
  comparison: ComparisonSummary;
}

export interface ComparisonResponse {
  status: string;
  data: ComparisonData;
}