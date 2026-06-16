import type { ComponentType, SVGProps } from 'react';
import {
  IconHeart,
  IconEye,
  IconAlertTriangle,
  IconShield,
  IconStethoscope,
  IconHeartPulse,
  IconGraduationCap,
  IconPhone,
  IconAlertCircle,
  IconClock,
  IconActivity,
} from '@/components/ui/icons';
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

type ScenarioIcon = ComponentType<SVGProps<SVGSVGElement>>;

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
  Icon: ScenarioIcon;
  title: string;
  situation: string;
  question: string;
  options: { value: V; label: string }[];
}

interface MultiScenario {
  field: 'symptoms';
  kind: 'multi';
  Icon: ScenarioIcon;
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
    Icon: IconHeart,
    title: 'Me preguntan qué es un infarto',
    situation:
      'Estoy en una sala de espera y escucho que una persona comenta que su vecino tuvo un infarto. Me doy cuenta de que podría ser importante saber explicarlo con palabras sencillas.',
    question: 'Si alguien me preguntara en ese momento, ¿sabría explicar qué es un infarto?',
    options: [
      { value: 'Sí', label: 'Sí, sé explicar qué es un infarto' },
      { value: 'No estoy seguro', label: 'No estoy seguro de poder explicarlo bien' },
      { value: 'No', label: 'No, no sabría explicarlo' },
    ],
  },
  {
    field: 'symptom_self_assessment',
    kind: 'single',
    Icon: IconEye,
    title: 'Alguien empieza a sentirse mal cerca de mí',
    situation:
      'Estoy cerca de una persona que se ve pálida, incómoda y preocupada. Pienso que podría estar presentando señales de un problema del corazón.',
    question: 'En una situación como esta, ¿cree que reconocería los síntomas de un infarto si los viera?',
    options: [
      { value: 'Sí', label: 'Sí, creo que los reconocería' },
      { value: 'Algunos', label: 'Reconocería algunos, no todos' },
      { value: 'No', label: 'No, no sabría identificarlos' },
    ],
  },
  {
    field: 'symptoms',
    kind: 'multi',
    Icon: IconAlertTriangle,
    title: 'Observo las señales del cuerpo',
    situation:
      'Una persona mayor empieza a sentirse mal de repente. Antes de pedir ayuda, intento reconocer cuáles señales podrían indicar una emergencia cardíaca.',
    question: '¿Cuáles de estas señales considera que pueden indicar un posible infarto?',
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
    Icon: IconShield,
    title: 'Pienso en cómo cuidarme antes de una emergencia',
    situation:
      'Después de aprender sobre salud cardiovascular, reflexiono sobre las acciones que puedo realizar para reducir el riesgo de un problema del corazón.',
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
    Icon: IconStethoscope,
    title: 'Reconozco lo que puede aumentar el riesgo',
    situation:
      'En una conversación sobre salud, escucho que la presión alta, el colesterol alto, el tabaquismo y el sedentarismo pueden afectar al corazón.',
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
    Icon: IconHeartPulse,
    title: 'Escucho la palabra RCP durante una emergencia',
    situation:
      'Veo que una persona no responde y alguien menciona que podría necesitar RCP mientras llega la ambulancia.',
    question: '¿Sabe qué es la RCP o reanimación cardiopulmonar?',
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
    Icon: IconGraduationCap,
    title: 'Recuerdo si ya recibí preparación',
    situation:
      'Antes de actuar en una emergencia, es importante reconocer si alguna vez he recibido capacitación práctica en primeros auxilios o RCP.',
    question: '¿Ha recibido entrenamiento previo en primeros auxilios o RCP?',
    options: [
      { value: 'Sí', label: 'Sí, he recibido entrenamiento' },
      { value: 'No', label: 'No, nunca he recibido entrenamiento' },
    ],
  },
  {
    field: 'emergency_number_knowledge',
    kind: 'single',
    Icon: IconPhone,
    title: 'Tengo que pedir ayuda rápidamente',
    situation:
      'Estoy frente a una emergencia médica y tengo el teléfono en la mano. Sé que llamar al número correcto puede ahorrar tiempo valioso.',
    question: '¿Sabe a qué número llamar en caso de emergencia médica?',
    options: [
      { value: 'Sí', label: 'Sí, sé a qué número llamar' },
      { value: 'No', label: 'No, no sé a qué número llamar' },
    ],
  },
  {
    field: 'emergency_action',
    kind: 'single',
    Icon: IconAlertCircle,
    title: 'Una persona siente presión fuerte en el pecho',
    situation:
      'Estoy acompañando a una persona mayor. De pronto me dice que siente una presión fuerte en el pecho y noto que le cuesta respirar.',
    question: 'En ese momento, ¿qué haría primero?',
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
    Icon: IconClock,
    title: 'Cada minuto puede ser importante',
    situation:
      'Las señales son claras y la persona necesita ayuda. Sé que en una emergencia no conviene esperar demasiado.',
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
    Icon: IconActivity,
    title: 'La persona deja de responder',
    situation:
      'Mientras espero ayuda, la persona pierde el conocimiento y no responde cuando le hablo o intento llamar su atención.',
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
