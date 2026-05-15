import type { EvaluationType } from './results';

// Espejo exacto del schema Pydantic del backend (evaluation.py)
// Si cambia el backend, este es el primer archivo a actualizar.

export type ResponderType =
  | 'El participante responde directamente'
  | 'El encuestador apoya al participante';

export type Sex = 'Masculino' | 'Femenino';

export type BloodPressureCategory =
  | 'Menos de 120'
  | 'Entre 120 y 129'
  | 'Entre 130 y 139'
  | 'Entre 140 y 159'
  | '160 o más';

export type CholesterolCategory =
  | 'Menos de 200 mg/dL'
  | 'De 200 a 239 mg/dL'
  | '240 mg/dL o más';

export type FastingGlucose = 'Mayor a 120 mg/dL' | 'Menor o igual a 120 mg/dL';

export type ChestPainEffort = 'Sí' | 'No';

export type ChestPainType =
  | 'Dolor fuerte o presión en el pecho'
  | 'Dolor diferente o poco claro en el pecho'
  | 'Dolor que no parece del corazón'
  | 'No he tenido dolor en el pecho';

export type YesNoSometimes = 'Sí' | 'No' | 'A veces';
export type SmokingStatus = 'Nunca' | 'Exfumador' | 'Fuma actualmente';
export type AlcoholUse = 'Sí' | 'No' | 'Ocasionalmente';
export type DietQuality = 'Saludable' | 'Regular' | 'Poco saludable';
export type FamilyHistory = 'Sí' | 'No' | 'No sabe';

export type InfarctionKnowledge = 'Sí' | 'No' | 'No estoy seguro';
export type SymptomSelfAssessment = 'Sí' | 'No' | 'Algunos';

export type Symptom =
  | 'Dolor o presión fuerte en el pecho'
  | 'Dificultad para respirar'
  | 'Dolor en el brazo izquierdo, mandíbula o espalda'
  | 'Náuseas o sudoración'
  | 'Dolor de cabeza'
  | 'No sabe';

export type PreventionKnowledge = 'Sí' | 'Poco' | 'No';
export type RiskFactorKnowledge = 'Sí' | 'No' | 'No estoy seguro';
export type RcpKnowledge = 'Sí' | 'No' | 'No está seguro';

export type YesNo = 'Sí' | 'No';

export type EmergencyAction =
  | 'Llamar inmediatamente a emergencias'
  | 'Esperar unos minutos para ver si mejora'
  | 'Darle algún remedio'
  | 'Llevarlo por cuenta propia sin llamar a emergencias'
  | 'No sabe';

export type ReactionTime =
  | 'Inmediatamente'
  | 'Después de unos minutos'
  | 'Tardaría bastante'
  | 'No sabe';

export type EmergencySupportAction =
  | 'Intentaría aplicar RCP si sé cómo hacerlo'
  | 'Buscaría ayuda de otra persona cercana'
  | 'Esperaría a que llegue la ambulancia sin intervenir'
  | 'No sabría qué hacer';

export interface EvaluationRequest {
  // Bloque 0
  responder_type: ResponderType;
  age: number;
  sex: Sex;

  // Bloque 1 - Salud
  blood_pressure_category: BloodPressureCategory;
  cholesterol_category: CholesterolCategory;
  fasting_glucose: FastingGlucose;
  chest_pain_effort: ChestPainEffort;
  chest_pain_type: ChestPainType;
  weight_kg: number;
  height_cm: number;

  // Bloque 2 - Hábitos
  activity_level: YesNoSometimes;
  smoking_status: SmokingStatus;
  alcohol_use: AlcoholUse;
  diet_quality: DietQuality;
  family_history: FamilyHistory;

  // Bloque 3 - Educación
  infarction_knowledge: InfarctionKnowledge;
  symptom_self_assessment: SymptomSelfAssessment;
  symptoms: Symptom[];
  prevention_knowledge: PreventionKnowledge;
  risk_factor_knowledge: RiskFactorKnowledge;
  rcp_knowledge: RcpKnowledge;

  // Bloque 4 - Emergencias
  prior_training: YesNo;
  emergency_number_knowledge: YesNo;
  emergency_action: EmergencyAction;
  reaction_time: ReactionTime;
  emergency_support_action: EmergencySupportAction;

  // Metadata
  evaluation_type: EvaluationType;
  previous_evaluation_id: string | null;
}

// Estado parcial del formulario mientras el usuario lo va llenando
export type EvaluationFormState = Partial<EvaluationRequest>;