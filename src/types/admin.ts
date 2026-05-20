import type { RiskLevel, AgeGroup, BMICategory } from '@/types/results';

// Respuesta de GET /api/admin/stats
export interface AdminStats {
  totals: {
    evaluations: number;
    unique_users: number;
    regular_evaluations: number;
    pre_tests: number;
    post_tests: number;
    complete_cycles: number;
  };
  risk_distribution: Record<RiskLevel, number>;
  improvement: {
    avg_education_score_pre: number;   // 0..1 (normalizado)
    avg_education_score_post: number;
    avg_emergency_score_pre: number;
    avg_emergency_score_post: number;
    avg_ml_probability_pre: number;
    avg_ml_probability_post: number;
    improved_education_pct: number;
    improved_emergency_pct: number;
    improved_risk_level_pct: number;
  };
  demographics: {
    avg_age: number;
    age_groups: Record<AgeGroup, number>;
    sex_distribution: { Masculino: number; Femenino: number };
    bmi_distribution: Record<BMICategory, number>;
  };
  completion_rate: {
    users_with_pre_only: number;
    users_with_complete_cycle: number;
    users_only_regular: number;
    completion_pct: number;
  };
}

// Una evaluación (pre o post) dentro de un ciclo administrativo
export interface AdminCyclePoint {
  evaluation_id: string;
  created_at: string;
  risk_level: RiskLevel;
  ml_probability: number;   // 0..1
  education_score: number;  // 0..1 (normalizado)
  emergency_score: number;  // 0..1 (normalizado)
}

export interface AdminCycleItem {
  anonymous_user_id: string; // ya anonimizado por el backend ("abcd1234...")
  pre_test: AdminCyclePoint;
  post_test: AdminCyclePoint;
  delta: {
    education_change: number;
    emergency_change: number;
    ml_probability_change: number;
    risk_level_changed: boolean;
    improved: boolean;
  };
}

export interface AdminCyclesResponse {
  total: number;
  limit: number;
  offset: number;
  items: AdminCycleItem[];
}

export type CyclesOrder = 'recent' | 'oldest';
