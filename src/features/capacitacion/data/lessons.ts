export type LessonBlock =
  | { type: 'content-grid'; items: { title: string; text: string }[] }
  | { type: 'signal-list'; items: string[] }
  | { type: 'step-list'; items: string[] }
  | { type: 'danger-list'; items: string[] }
  | { type: 'summary-list'; items: string[] }
  | { type: 'warning'; text: string }
  | { type: 'example'; text: string }
  | { type: 'notice'; text: string };

export interface Lesson {
  icon: string;
  title: string;
  text: string;
  keyMessage: string;
  blocks: LessonBlock[];
}

export const LESSONS: Lesson[] = [
  {
    icon: '👋',
    title: 'Antes de practicar, vamos a aprender',
    text: 'Esta capacitación no es un examen. Es una guía sencilla para recordar señales importantes, reconocer situaciones de riesgo y saber qué hacer primero.',
    keyMessage: 'Primero aprendemos. Después practicamos en el simulador.',
    blocks: [
      {
        type: 'warning',
        text: 'Lea con calma. Puede avanzar, regresar o revisar nuevamente cada sección.',
      },
    ],
  },
  {
    icon: '❤',
    title: '1. Cuidar el corazón todos los días',
    text: 'Con el paso de los años pueden aparecer condiciones que aumentan el riesgo cardiovascular. Algunas no se pueden cambiar, como la edad, pero muchos hábitos sí pueden mejorar.',
    keyMessage: 'Pequeñas acciones diarias ayudan a proteger el corazón.',
    blocks: [
      {
        type: 'content-grid',
        items: [
          {
            title: 'Factores que aumentan el riesgo',
            text: 'Presión alta, diabetes, colesterol elevado, tabaquismo, sedentarismo y alimentación poco saludable.',
          },
          {
            title: 'Acciones protectoras',
            text: 'Caminar según sus posibilidades, cuidar la alimentación, no fumar y controlar la presión o el azúcar.',
          },
        ],
      },
      {
        type: 'example',
        text: 'Ejemplo: si una persona tiene presión alta y no la controla, su corazón puede trabajar con más esfuerzo. Por eso es importante asistir a controles y seguir las indicaciones profesionales.',
      },
    ],
  },
  {
    icon: '⚠',
    title: '2. Señales de alarma que no debe ignorar',
    text: 'Una emergencia cardiovascular no siempre se presenta igual en todas las personas. Algunas señales pueden ser fuertes y claras; otras pueden parecer menos evidentes.',
    keyMessage: 'Si una señal es fuerte, repentina o viene con falta de aire, pida ayuda de inmediato.',
    blocks: [
      {
        type: 'signal-list',
        items: [
          'Dolor o presión fuerte en el pecho.',
          'Dificultad para respirar.',
          'Dolor que se extiende al brazo, mandíbula, espalda o cuello.',
          'Náuseas, sudoración fría, mareo o debilidad intensa.',
          'Desmayo, confusión o pérdida de conocimiento.',
        ],
      },
      {
        type: 'example',
        text: 'Ejemplo: Don José siente presión fuerte en el pecho, suda mucho y le cuesta respirar. Estas señales deben tomarse en serio y requieren pedir ayuda.',
      },
    ],
  },
  {
    icon: '📞',
    title: '3. Qué hacer primero ante una emergencia',
    text: 'Cuando hay señales graves, la respuesta debe ser rápida y ordenada. No es necesario hacer todo perfecto; lo más importante es pedir ayuda a tiempo.',
    keyMessage: 'No espere demasiado. Pedir ayuda rápido puede marcar la diferencia.',
    blocks: [
      {
        type: 'step-list',
        items: [
          'Observe si la persona responde y si respira normalmente.',
          'Pida ayuda a una persona cercana.',
          'Llame a emergencias y explique lo que ocurre.',
          'Siga las instrucciones que le indiquen por teléfono.',
        ],
      },
      {
        type: 'warning',
        text: 'Tenga visible el número de emergencia de su ciudad o país. En Ecuador, el número general de emergencias es 911.',
      },
    ],
  },
  {
    icon: '🚫',
    title: '4. Qué no hacer',
    text: 'Algunas acciones pueden retrasar la ayuda y aumentar el riesgo. Ante síntomas graves, es mejor actuar con prudencia y pedir apoyo.',
    keyMessage: 'Ante señales graves, actuar rápido es más seguro que esperar.',
    blocks: [
      {
        type: 'danger-list',
        items: [
          'No espere mucho tiempo para ver si "se le pasa".',
          'No dé remedios caseros o medicamentos sin indicación profesional.',
          'No minimice el dolor fuerte en el pecho o la falta de aire.',
          'No deje sola a la persona si se encuentra muy mal.',
        ],
      },
      {
        type: 'example',
        text: 'Ejemplo: si alguien dice "esperemos un rato", recuerde que en una emergencia cardiovascular el tiempo es importante.',
      },
    ],
  },
  {
    icon: '🫁',
    title: '5. Si la persona no responde o respira mal',
    text: 'Si una persona pierde el conocimiento y no respira normalmente, puede tratarse de una emergencia grave. En ese caso se debe pedir ayuda, llamar a emergencias y seguir instrucciones.',
    keyMessage: 'Si sabe hacer RCP y puede realizarla, puede iniciarla mientras llega la ayuda.',
    blocks: [
      {
        type: 'step-list',
        items: [
          'Verifique si la persona responde.',
          'Observe si respira normalmente.',
          'Pida ayuda cercana y llame a emergencias.',
          'Si sabe realizar RCP y puede hacerlo, inicie maniobras mientras llega la ayuda.',
          'Si no puede hacer RCP, busque ayuda y siga las instrucciones del operador de emergencias.',
        ],
      },
      {
        type: 'warning',
        text: 'Esta guía no reemplaza una capacitación certificada en RCP. Su objetivo es orientar la respuesta inicial.',
      },
    ],
  },
  {
    icon: '✅',
    title: 'Capacitación completada',
    text: 'Ha terminado la capacitación. Ahora podrá practicar con casos simulados donde deberá elegir qué haría ante una emergencia.',
    keyMessage: 'El simulador será la evaluación final práctica de esta capacitación.',
    blocks: [
      {
        type: 'summary-list',
        items: [
          'Reconocer señales de alarma cardiovascular.',
          'Entender que presión alta, diabetes y colesterol elevado aumentan el riesgo.',
          'Pedir ayuda de inmediato ante síntomas graves.',
          'Evitar acciones que retrasen la atención.',
          'Comprender qué hacer si una persona no responde o respira mal.',
        ],
      },
      {
        type: 'notice',
        text: 'Esta capacitación es educativa. No reemplaza una atención médica, un diagnóstico profesional ni un curso certificado de RCP.',
      },
    ],
  },
];
