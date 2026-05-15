import type { Topic, TopicCategory } from '../types';

// Solo metadata. El contenido (bloques) vive en topicContents.ts
// y se inyecta al exportar TOPICS al final.
type TopicMeta = Omit<Topic, 'blocks' | 'importantNote' | 'closing'>;

export const TOPIC_METAS: TopicMeta[] = [
  {
    slug: 'reconocer-sintomas',
    backendKey: 'Reconocimiento de síntomas de alarma cardiovascular',
    category: 'enfermedad',
    icon: '⚠',
    title: 'Reconocer los síntomas de un infarto',
    shortTitle: 'Síntomas de alarma',
    subtitle: 'Saber identificar los signos de alarma puede salvar una vida — incluso la suya.',
    shortDescription:
      'Aprenda a identificar las señales que su corazón puede estar enviando y por qué cada minuto importa.',
  },
  {
    slug: 'que-es-infarto',
    backendKey: 'Conceptos básicos sobre infarto',
    category: 'enfermedad',
    icon: '🫀',
    title: 'Qué es un infarto y por qué ocurre',
    shortTitle: 'Qué es un infarto',
    subtitle: 'Entender cómo funciona su corazón es el primer paso para cuidarlo mejor.',
    shortDescription:
      'Conozca cómo trabaja su corazón, qué pasa durante un infarto y qué factores aumentan el riesgo.',
  },
  {
    slug: 'factores-riesgo',
    backendKey: 'Factores de riesgo: presión alta, diabetes y colesterol',
    category: 'enfermedad',
    icon: '🩺',
    title: 'Los enemigos silenciosos de su corazón',
    shortTitle: 'Factores de riesgo',
    subtitle:
      'La presión alta, la diabetes y el colesterol pueden estar afectándole sin que se dé cuenta.',
    shortDescription:
      'Conozca los tres factores más comunes que dañan al corazón sin avisar y cómo controlarlos.',
  },
  {
    slug: 'habitos-saludables',
    backendKey: 'Prevención cardiovascular y hábitos saludables',
    category: 'prevencion',
    icon: '🌿',
    title: 'Cuidar su corazón día a día',
    shortTitle: 'Hábitos saludables',
    subtitle: 'Pequeños cambios en su rutina pueden hacer una gran diferencia con el tiempo.',
    shortDescription:
      'Descubra hábitos sencillos y sostenibles para fortalecer su corazón sin grandes esfuerzos.',
  },
  {
    slug: 'rcp-basica',
    backendKey: 'Fundamentos básicos de RCP',
    category: 'rcp',
    icon: '🫶',
    title: 'RCP: cómo puede salvar una vida con sus manos',
    shortTitle: 'RCP básica',
    subtitle: 'La reanimación cardiopulmonar es una técnica sencilla que cualquiera puede aprender.',
    shortDescription:
      'Aprenda los pasos básicos para aplicar RCP y entender por qué cualquier persona puede hacerlo.',
  },
  {
    slug: 'capacitacion-primeros-auxilios',
    backendKey: 'Importancia de la capacitación en primeros auxilios',
    category: 'rcp',
    icon: '🎓',
    title: 'Aprender primeros auxilios: una decisión que vale la pena',
    shortTitle: 'Capacitación en primeros auxilios',
    subtitle: 'No tiene que ser médico para ayudar en una emergencia. Solo necesita saber qué hacer.',
    shortDescription:
      'Por qué tomar un curso corto puede convertirle en alguien capaz de salvar vidas.',
  },
  {
    slug: 'numero-emergencias',
    backendKey: 'Uso correcto del número de emergencias médicas',
    category: 'emergencia',
    icon: '📞',
    title: '911: el número que debe saber de memoria',
    shortTitle: 'Línea 911',
    subtitle: 'Saber cuándo y cómo llamar puede acelerar la ayuda y salvar vidas.',
    shortDescription:
      'Aprenda cuándo llamar al 911, qué información dar y qué evitar al reportar una emergencia.',
  },
  {
    slug: 'que-hacer-emergencia',
    backendKey: 'Qué hacer ante una emergencia cardiovascular',
    category: 'emergencia',
    icon: '🚨',
    title: 'Los primeros minutos: qué hacer cuando ocurre',
    shortTitle: 'Actuar en emergencia',
    subtitle: 'Saber actuar con calma en los primeros momentos puede cambiar todo.',
    shortDescription:
      'Pasos concretos para los primeros minutos de una emergencia cardiovascular.',
  },
  {
    slug: 'tiempo-reaccion',
    backendKey: 'Importancia del tiempo de reacción en emergencias',
    category: 'emergencia',
    icon: '⏱',
    title: 'Cada minuto cuenta',
    shortTitle: 'Tiempo de reacción',
    subtitle: 'En las emergencias del corazón, el tiempo es el factor más importante.',
    shortDescription:
      'Por qué actuar rápido es decisivo y cómo evitar las demoras más comunes.',
  },
  {
    slug: 'mientras-llega-ayuda',
    backendKey: 'Cómo actuar mientras llega la ayuda',
    category: 'emergencia',
    icon: '🤝',
    title: 'Mientras espera la ambulancia',
    shortTitle: 'Esperando la ayuda',
    subtitle: 'Lo que hace en esos minutos puede marcar la diferencia.',
    shortDescription:
      'Acciones simples y efectivas que puede tomar mientras llega el personal médico.',
  },
];

export const CATEGORY_LABELS: Record<TopicCategory, string> = {
  enfermedad: 'Conocer la enfermedad',
  prevencion: 'Prevención y autocuidado',
  rcp: 'RCP y primeros auxilios',
  emergencia: 'Respuesta ante emergencias',
};