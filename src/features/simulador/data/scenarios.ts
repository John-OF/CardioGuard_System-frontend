import type {
  EvaluationRequest,
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

// Claves de EvaluationRequest que el simulador recoge (pasos 3 y 4).
export type ScenarioField =
  | 'infarction_knowledge'
  | 'symptom_self_assessment'
  | 'symptoms'
  | 'prevention_knowledge'
  | 'risk_factor_knowledge'
  | 'rcp_knowledge'
  | 'prior_training'
  | 'emergency_number_knowledge'
  | 'emergency_action'
  | 'reaction_time'
  | 'emergency_support_action';

// El value es la unión EXACTA del backend (un typo rompe el build).
// Solo el label se reescribe en tono de escenario aplicado.
interface SingleScenario<V extends string> {
  field: ScenarioField;
  kind: 'single';
  icon: string;
  title: string;
  situation: string;
  question: string;
  options: { value: V; label: string }[];
}

interface MultiScenario {
  field: 'symptoms';
  kind: 'multi';
  icon: string;
  title: string;
  situation: string;
  question: string;
  options: { value: Symptom; label: string }[];
}

export type Scenario =
  | SingleScenario<InfarctionKnowledge>
  | SingleScenario<SymptomSelfAssessment>
  | MultiScenario
  | SingleScenario<PreventionKnowledge>
  | SingleScenario<RiskFactorKnowledge>
  | SingleScenario<RcpKnowledge>
  | SingleScenario<YesNo>
  | SingleScenario<EmergencyAction>
  | SingleScenario<ReactionTime>
  | SingleScenario<EmergencySupportAction>;

// Verificación de tipo: cada field es una clave real de EvaluationRequest.
type _AssertFields = ScenarioField extends keyof EvaluationRequest ? true : never;
const _assertFields: _AssertFields = true;
void _assertFields;

export const SCENARIOS: Scenario[] = [
  // ===== Paso 3 — Educación =====
  {
    field: 'infarction_knowledge',
    kind: 'single',
    icon: '🫀',
    title: 'Una conversación en la sala de espera',
    situation:
      'En la sala de espera del centro de salud, una señora comenta: "Dicen que a mi vecino le dio un infarto, pero la verdad yo no sé bien qué es eso".',
    question: 'Y usted, ¿sabría explicar qué es un infarto?',
    options: [
      { value: 'Sí', label: 'Sí, sé explicar qué es un infarto' },
      { value: 'No estoy seguro', label: 'No estoy seguro de poder explicarlo bien' },
      { value: 'No', label: 'No, no sabría explicarlo' },
    ],
  },
  {
    field: 'symptom_self_assessment',
    kind: 'single',
    icon: '👀',
    title: 'Si pasara frente a usted',
    situation:
      'Imagine que alguien cerca de usted empieza a sentirse mal y podría estar sufriendo un infarto en ese momento.',
    question: '¿Cree que reconocería los síntomas de un infarto si los viera?',
    options: [
      { value: 'Sí', label: 'Sí, creo que los reconocería' },
      { value: 'Algunos', label: 'Reconocería algunos, no todos' },
      { value: 'No', label: 'No, no sabría identificarlos' },
    ],
  },
  {
    field: 'symptoms',
    kind: 'multi',
    icon: '⚠',
    title: 'Las señales del cuerpo',
    situation:
      'Una persona mayor comienza a sentirse mal de repente. Usted observa con atención para decidir si pedir ayuda.',
    question: '¿Cuáles de estas señales considera que indican un posible infarto?',
    options: [
      { value: 'Dolor o presión fuerte en el pecho', label: 'Dolor o presión fuerte en el pecho' },
      { value: 'Dificultad para respirar', label: 'Dificultad para respirar' },
      {
        value: 'Dolor en el brazo izquierdo, mandíbula o espalda',
        label: 'Dolor en el brazo izquierdo, mandíbula o espalda',
      },
      { value: 'Náuseas o sudoración', label: 'Náuseas o sudoración fría' },
      { value: 'Dolor de cabeza', label: 'Dolor de cabeza' },
      { value: 'No sabe', label: 'No sabría cuáles son' },
    ],
  },
  {
    field: 'prevention_knowledge',
    kind: 'single',
    icon: '🛡',
    title: 'Cuidarse antes de que pase',
    situation:
      'En una charla del barrio se habla de cómo evitar problemas del corazón antes de que ocurran.',
    question: '¿Sabe cómo se puede prevenir un infarto?',
    options: [
      { value: 'Sí', label: 'Sí, sé cómo prevenirlo' },
      { value: 'Poco', label: 'Sé poco sobre cómo prevenirlo' },
      { value: 'No', label: 'No, no sé cómo prevenirlo' },
    ],
  },
  {
    field: 'risk_factor_knowledge',
    kind: 'single',
    icon: '🩺',
    title: 'Lo que aumenta el riesgo',
    situation:
      'El médico menciona que ciertos factores —presión alta, colesterol alto, tabaquismo, sedentarismo— hacen más probable un problema del corazón.',
    question: '¿Conoce los factores de riesgo de las enfermedades del corazón?',
    options: [
      { value: 'Sí', label: 'Sí, los conozco' },
      { value: 'No estoy seguro', label: 'No estoy seguro de cuáles son' },
      { value: 'No', label: 'No, no los conozco' },
    ],
  },
  {
    field: 'rcp_knowledge',
    kind: 'single',
    icon: '🫶',
    title: 'Esa palabra: RCP',
    situation:
      'En la televisión muestran cómo alguien salva a una persona haciendo "RCP" mientras llega la ambulancia.',
    question: '¿Sabe qué es la RCP (reanimación cardiopulmonar)?',
    options: [
      { value: 'Sí', label: 'Sí, sé qué es la RCP' },
      { value: 'No está seguro', label: 'No estoy seguro de qué es' },
      { value: 'No', label: 'No, no sé qué es' },
    ],
  },

  // ===== Paso 4 — Emergencias =====
  {
    field: 'prior_training',
    kind: 'single',
    icon: '🎓',
    title: 'Su preparación previa',
    situation:
      'Antes de practicar con los escenarios, conviene saber con qué preparación cuenta usted.',
    question: '¿Ha recibido entrenamiento previo en primeros auxilios o RCP?',
    options: [
      { value: 'Sí', label: 'Sí, he recibido entrenamiento' },
      { value: 'No', label: 'No, nunca he recibido entrenamiento' },
    ],
  },
  {
    field: 'emergency_number_knowledge',
    kind: 'single',
    icon: '📞',
    title: 'El teléfono en la mano',
    situation:
      'Hay una emergencia y usted tiene el teléfono en la mano. Debe pedir ayuda de inmediato.',
    question: '¿Sabe a qué número llamar en caso de emergencia médica?',
    options: [
      { value: 'Sí', label: 'Sí, sé a qué número llamar' },
      { value: 'No', label: 'No, no sé a qué número llamar' },
    ],
  },
  {
    field: 'emergency_action',
    kind: 'single',
    icon: '🚨',
    title: 'Dolor fuerte en el pecho',
    situation:
      'Está acompañando a una persona mayor. De pronto dice que siente presión fuerte en el pecho y le cuesta respirar.',
    question: '¿Qué haría primero?',
    options: [
      { value: 'Llamar inmediatamente a emergencias', label: 'Llamar inmediatamente a emergencias' },
      {
        value: 'Esperar unos minutos para ver si mejora',
        label: 'Esperar unos minutos para ver si mejora',
      },
      { value: 'Darle algún remedio', label: 'Darle algún remedio casero' },
      {
        value: 'Llevarlo por cuenta propia sin llamar a emergencias',
        label: 'Llevarlo por cuenta propia sin llamar a emergencias',
      },
      { value: 'No sabe', label: 'No sabría qué hacer' },
    ],
  },
  {
    field: 'reaction_time',
    kind: 'single',
    icon: '⏱',
    title: 'El tiempo que tardaría',
    situation:
      'Las señales son claras y graves. Cada minuto cuenta para la persona afectada.',
    question: '¿Qué tan rápido cree que reaccionaría ante esta emergencia?',
    options: [
      { value: 'Inmediatamente', label: 'Reaccionaría inmediatamente' },
      { value: 'Después de unos minutos', label: 'Reaccionaría después de unos minutos' },
      { value: 'Tardaría bastante', label: 'Tardaría bastante en reaccionar' },
      { value: 'No sabe', label: 'No sé cuánto tardaría' },
    ],
  },
  {
    field: 'emergency_support_action',
    kind: 'single',
    icon: '🫁',
    title: 'La persona pierde el conocimiento',
    situation:
      'La persona deja de responder y pierde el conocimiento mientras espera la ayuda.',
    question: '¿Qué haría usted en ese momento?',
    options: [
      {
        value: 'Intentaría aplicar RCP si sé cómo hacerlo',
        label: 'Intentaría aplicar RCP si sé cómo hacerlo',
      },
      {
        value: 'Buscaría ayuda de otra persona cercana',
        label: 'Buscaría ayuda de otra persona cercana',
      },
      {
        value: 'Esperaría a que llegue la ambulancia sin intervenir',
        label: 'Esperaría a que llegue la ambulancia sin intervenir',
      },
      { value: 'No sabría qué hacer', label: 'No sabría qué hacer' },
    ],
  },
];
