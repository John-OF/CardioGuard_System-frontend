import type {
  ResponderType,
  Sex,
  BloodPressureCategory,
  CholesterolCategory,
  FastingGlucose,
  ChestPainEffort,
  ChestPainType,
  YesNoSometimes,
  SmokingStatus,
  AlcoholUse,
  DietQuality,
  FamilyHistory,
  InfarctionKnowledge,
  SymptomSelfAssessment,
  Symptom,
  PreventionKnowledge,
  RiskFactorKnowledge,
  RcpKnowledge,
  YesNo,
  EmergencyAction,
  ReactionTime,
  EmergencySupportAction,
} from '@/types/evaluation';

export interface Option<T extends string> {
  value: T;
  label: string;
  hint?: string; // texto auxiliar opcional
}

export const RESPONDER_TYPE_OPTIONS: Option<ResponderType>[] = [
  {
    value: 'El participante responde directamente',
    label: 'Yo responderé directamente',
  },
  {
    value: 'El encuestador apoya al participante',
    label: 'Un encuestador me está ayudando a responder',
  },
];

export const SEX_OPTIONS: Option<Sex>[] = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Femenino', label: 'Femenino' },
];

export const BLOOD_PRESSURE_OPTIONS: Option<BloodPressureCategory>[] = [
  { value: 'Menos de 120', label: 'Menos de 120', hint: 'Presión normal' },
  { value: 'Entre 120 y 129', label: 'Entre 120 y 129' },
  { value: 'Entre 130 y 139', label: 'Entre 130 y 139' },
  { value: 'Entre 140 y 159', label: 'Entre 140 y 159' },
  { value: '160 o más', label: '160 o más', hint: 'Presión muy alta' },
];

export const CHOLESTEROL_OPTIONS: Option<CholesterolCategory>[] = [
  { value: 'Menos de 200 mg/dL', label: 'Menos de 200 mg/dL', hint: 'Deseable' },
  { value: 'De 200 a 239 mg/dL', label: 'De 200 a 239 mg/dL', hint: 'Límite alto' },
  { value: '240 mg/dL o más', label: '240 mg/dL o más', hint: 'Alto' },
];

export const FASTING_GLUCOSE_OPTIONS: Option<FastingGlucose>[] = [
  { value: 'Menor o igual a 120 mg/dL', label: 'Menor o igual a 120 mg/dL' },
  { value: 'Mayor a 120 mg/dL', label: 'Mayor a 120 mg/dL' },
];

export const CHEST_PAIN_EFFORT_OPTIONS: Option<ChestPainEffort>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No', label: 'No' },
];

export const CHEST_PAIN_TYPE_OPTIONS: Option<ChestPainType>[] = [
  { value: 'Dolor fuerte o presión en el pecho', label: 'Dolor fuerte o presión en el pecho' },
  { value: 'Dolor diferente o poco claro en el pecho', label: 'Dolor diferente o poco claro en el pecho' },
  { value: 'Dolor que no parece del corazón', label: 'Dolor que no parece del corazón' },
  { value: 'No he tenido dolor en el pecho', label: 'No he tenido dolor en el pecho' },
];

export const YES_NO_SOMETIMES_OPTIONS: Option<YesNoSometimes>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'A veces', label: 'A veces' },
  { value: 'No', label: 'No' },
];

export const SMOKING_OPTIONS: Option<SmokingStatus>[] = [
  { value: 'Nunca', label: 'Nunca he fumado' },
  { value: 'Exfumador', label: 'Soy exfumador' },
  { value: 'Fuma actualmente', label: 'Fumo actualmente' },
];

export const ALCOHOL_OPTIONS: Option<AlcoholUse>[] = [
  { value: 'No', label: 'No' },
  { value: 'Ocasionalmente', label: 'Ocasionalmente' },
  { value: 'Sí', label: 'Sí, regularmente' },
];

export const DIET_OPTIONS: Option<DietQuality>[] = [
  { value: 'Saludable', label: 'Saludable' },
  { value: 'Regular', label: 'Regular' },
  { value: 'Poco saludable', label: 'Poco saludable' },
];

export const FAMILY_HISTORY_OPTIONS: Option<FamilyHistory>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No', label: 'No' },
  { value: 'No sabe', label: 'No sé' },
];

export const INFARCTION_KNOWLEDGE_OPTIONS: Option<InfarctionKnowledge>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No estoy seguro', label: 'No estoy seguro' },
  { value: 'No', label: 'No' },
];

export const SYMPTOM_SELF_OPTIONS: Option<SymptomSelfAssessment>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'Algunos', label: 'Algunos' },
  { value: 'No', label: 'No' },
];

export const SYMPTOMS_OPTIONS: Option<Symptom>[] = [
  { value: 'Dolor o presión fuerte en el pecho', label: 'Dolor o presión fuerte en el pecho' },
  { value: 'Dificultad para respirar', label: 'Dificultad para respirar' },
  { value: 'Dolor en el brazo izquierdo, mandíbula o espalda', label: 'Dolor en el brazo izquierdo, mandíbula o espalda' },
  { value: 'Náuseas o sudoración', label: 'Náuseas o sudoración' },
  { value: 'Dolor de cabeza', label: 'Dolor de cabeza' },
  { value: 'No sabe', label: 'No sé' },
];

export const PREVENTION_OPTIONS: Option<PreventionKnowledge>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'Poco', label: 'Poco' },
  { value: 'No', label: 'No' },
];

export const RISK_FACTOR_OPTIONS: Option<RiskFactorKnowledge>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No estoy seguro', label: 'No estoy seguro' },
  { value: 'No', label: 'No' },
];

export const RCP_KNOWLEDGE_OPTIONS: Option<RcpKnowledge>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No está seguro', label: 'No estoy seguro' },
  { value: 'No', label: 'No' },
];

export const YES_NO_OPTIONS: Option<YesNo>[] = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No', label: 'No' },
];

export const EMERGENCY_ACTION_OPTIONS: Option<EmergencyAction>[] = [
  { value: 'Llamar inmediatamente a emergencias', label: 'Llamar inmediatamente a emergencias' },
  { value: 'Esperar unos minutos para ver si mejora', label: 'Esperar unos minutos para ver si mejora' },
  { value: 'Darle algún remedio', label: 'Darle algún remedio' },
  { value: 'Llevarlo por cuenta propia sin llamar a emergencias', label: 'Llevarlo por cuenta propia sin llamar a emergencias' },
  { value: 'No sabe', label: 'No sé qué haría' },
];

export const REACTION_TIME_OPTIONS: Option<ReactionTime>[] = [
  { value: 'Inmediatamente', label: 'Inmediatamente' },
  { value: 'Después de unos minutos', label: 'Después de unos minutos' },
  { value: 'Tardaría bastante', label: 'Tardaría bastante' },
  { value: 'No sabe', label: 'No sé' },
];

export const EMERGENCY_SUPPORT_OPTIONS: Option<EmergencySupportAction>[] = [
  { value: 'Intentaría aplicar RCP si sé cómo hacerlo', label: 'Intentaría aplicar RCP si sé cómo hacerlo' },
  { value: 'Buscaría ayuda de otra persona cercana', label: 'Buscaría ayuda de otra persona cercana' },
  { value: 'Esperaría a que llegue la ambulancia sin intervenir', label: 'Esperaría a que llegue la ambulancia sin intervenir' },
  { value: 'No sabría qué hacer', label: 'No sabría qué hacer' },
];