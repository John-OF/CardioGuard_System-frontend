import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertCircle,
  IconBookOpen,
  IconBrain,
  IconCircleCheck,
  IconDatabase,
  IconHandHeart,
  IconHeartPulse,
  IconLightbulb,
  IconNetwork,
  IconPhone,
  IconShield,
  IconStethoscope,
  IconTarget,
  IconTrees,
  IconZap,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface GlossaryTerm {
  title: string;
  definition: string;
  example: string;
  Icon: IconComponent;
}

interface GlossaryCategory {
  id: string;
  title: string;
  description: string;
  terms: GlossaryTerm[];
  cardClassName: string;
  iconClassName: string;
  exampleClassName: string;
}

const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    id: 'emergency-concepts',
    title: 'Emergencias y respuesta rápida',
    description: 'Palabras que ayudan a reconocer una urgencia y pedir ayuda correctamente.',
    cardClassName: 'border-red-200 bg-red-50',
    iconClassName: 'bg-red-700 text-white',
    exampleClassName: 'border-red-200 bg-white',
    terms: [
      {
        title: '911',
        definition:
          'Número de emergencias al que debe llamar cuando una persona está en peligro o necesita ayuda urgente.',
        example:
          'Ejemplo: dolor fuerte en el pecho, desmayo, dificultad para respirar o accidente grave.',
        Icon: IconPhone,
      },
      {
        title: 'Emergencia',
        definition:
          'Situación que puede poner en riesgo la vida o la salud de una persona y necesita atención inmediata.',
        example: 'Ejemplo: una persona no responde, se desmaya o tiene dolor intenso.',
        Icon: IconAlertCircle,
      },
      {
        title: 'Primeros auxilios',
        definition: 'Acciones básicas que se realizan mientras llega ayuda profesional.',
        example:
          'Ejemplo: llamar al 911, acompañar a la persona y evitar que haga esfuerzos.',
        Icon: IconHandHeart,
      },
      {
        title: 'RCP',
        definition:
          'Maniobra que ayuda a mantener la circulación cuando una persona no respira normalmente o no responde.',
        example: 'Debe aprenderse con capacitación práctica o guía profesional.',
        Icon: IconActivity,
      },
    ],
  },
  {
    id: 'heart-concepts',
    title: 'Corazón y circulación',
    description: 'Términos básicos para comprender cómo se cuidan el corazón y las arterias.',
    cardClassName: 'border-blue-200 bg-blue-50',
    iconClassName: 'bg-blue-700 text-white',
    exampleClassName: 'border-blue-200 bg-white',
    terms: [
      {
        title: 'Cardiovascular',
        definition: 'Relacionado con el corazón y los vasos sanguíneos.',
        example: 'Ejemplo: presión arterial, circulación, infarto y colesterol.',
        Icon: IconHeartPulse,
      },
      {
        title: 'Infarto',
        definition:
          'Ocurre cuando una parte del corazón recibe poca o ninguna sangre por un bloqueo en una arteria.',
        example:
          'Puede causar dolor en el pecho, falta de aire, sudoración o dolor que se extiende.',
        Icon: IconAlertCircle,
      },
      {
        title: 'Presión arterial',
        definition: 'Fuerza con la que la sangre empuja las paredes de las arterias.',
        example:
          'Cuando está alta por mucho tiempo, puede aumentar el riesgo cardiovascular.',
        Icon: IconActivity,
      },
      {
        title: 'Colesterol',
        definition:
          'Sustancia grasa que circula en la sangre. En exceso puede acumularse en las arterias.',
        example: 'El colesterol elevado puede dificultar el paso de la sangre.',
        Icon: IconStethoscope,
      },
    ],
  },
  {
    id: 'risk-concepts',
    title: 'Factores de riesgo',
    description: 'Condiciones y hábitos que pueden aumentar la posibilidad de enfermar.',
    cardClassName: 'border-amber-200 bg-amber-50',
    iconClassName: 'bg-amber-700 text-white',
    exampleClassName: 'border-amber-200 bg-white',
    terms: [
      {
        title: 'Factor de riesgo',
        definition:
          'Condición o hábito que aumenta la probabilidad de tener un problema de salud.',
        example: 'Ejemplo: presión alta, diabetes, tabaquismo o sedentarismo.',
        Icon: IconTarget,
      },
      {
        title: 'Diabetes',
        definition:
          'Enfermedad en la que la glucosa o azúcar en la sangre se mantiene elevada.',
        example:
          'Puede afectar los vasos sanguíneos y aumentar el riesgo cardiovascular.',
        Icon: IconActivity,
      },
      {
        title: 'Sedentarismo',
        definition: 'Pasar mucho tiempo sin actividad física o movimiento.',
        example: 'Caminar, moverse en casa o hacer ejercicios suaves ayuda a reducirlo.',
        Icon: IconTrees,
      },
      {
        title: 'Tabaquismo',
        definition:
          'Consumo de tabaco o cigarrillo. Afecta los pulmones, el corazón y las arterias.',
        example: 'Dejar de fumar mejora la salud cardiovascular a cualquier edad.',
        Icon: IconShield,
      },
    ],
  },
  {
    id: 'technology-concepts',
    title: 'Tecnología usada en CardioGuard',
    description: 'Conceptos del prototipo explicados sin lenguaje técnico complicado.',
    cardClassName: 'border-purple-200 bg-purple-50',
    iconClassName: 'bg-purple-700 text-white',
    exampleClassName: 'border-purple-200 bg-white',
    terms: [
      {
        title: 'Machine Learning',
        definition:
          'Técnica de inteligencia artificial que permite al sistema aprender patrones a partir de datos.',
        example:
          'En CardioGuard se usa para estimar una probabilidad de riesgo cardiovascular.',
        Icon: IconBrain,
      },
      {
        title: 'Probabilidad ML',
        definition:
          'Resultado numérico que indica qué tan probable es que exista mayor riesgo según el modelo.',
        example: 'No es diagnóstico médico. Es una orientación preventiva del prototipo.',
        Icon: IconDatabase,
      },
      {
        title: 'Lógica difusa',
        definition:
          'Método que ayuda a interpretar valores que no son totalmente blanco o negro, sino graduales.',
        example:
          'Permite expresar el riesgo como bajo, moderado o alto de forma más comprensible.',
        Icon: IconNetwork,
      },
      {
        title: 'Riesgo interpretativo',
        definition:
          'Nivel generado por el sistema para orientar al usuario de forma preventiva.',
        example: 'Debe entenderse como apoyo educativo, no como diagnóstico clínico.',
        Icon: IconZap,
      },
    ],
  },
];

const USAGE_TIPS: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Lea una tarjeta a la vez',
    text: 'No necesita estudiar todo de memoria. Revise solo el concepto que necesite.',
    Icon: IconBookOpen,
  },
  {
    title: 'Relacione con ejemplos',
    text: 'Los ejemplos ayudan a entender cómo se usa cada palabra en una situación real.',
    Icon: IconCircleCheck,
  },
  {
    title: 'Pregunte si tiene dudas',
    text: 'Si un término médico no queda claro, consulte con un profesional de salud o un familiar de confianza.',
    Icon: IconHandHeart,
  },
];

export function KeyConceptsContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="key-concepts-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 id="key-concepts-intro-title" className="text-2xl font-bold text-slate-900">
          Conceptos clave
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          Esta sección reúne palabras importantes que aparecen en la plataforma. Conocerlas ayuda a
          comprender mejor los temas de salud cardiovascular, primeros auxilios y autocuidado.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          No necesita memorizar todo de una vez. Puede revisar estas tarjetas cuando tenga dudas.
        </p>

        <aside className="mt-5 rounded-2xl border border-primary/30 bg-primary-light p-5">
          <IconBookOpen className="h-10 w-10 text-primary" />
          <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
            Use esta página como un pequeño diccionario visual para entender mejor cada tema.
          </p>
        </aside>
      </section>

      {GLOSSARY_CATEGORIES.map(
        ({
          id,
          title,
          description,
          terms,
          cardClassName,
          iconClassName,
          exampleClassName,
        }) => (
          <section key={id} aria-labelledby={id} className="space-y-4">
            <div>
              <h2 id={id} className="text-2xl font-bold text-slate-900">
                {title}
              </h2>
              <p className="mt-2 text-lg text-slate-700">{description}</p>
            </div>

            <dl className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {terms.map(({ title: term, definition, example, Icon }) => (
                <div
                  key={term}
                  className={'rounded-2xl border p-5 shadow-sm sm:p-6 ' + cardClassName}
                >
                  <span
                    className={
                      'inline-flex h-12 w-12 items-center justify-center rounded-xl ' +
                      iconClassName
                    }
                    aria-hidden="true"
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <dt className="mt-4 text-2xl font-bold text-slate-900">{term}</dt>
                  <dd className="mt-3 text-lg leading-relaxed text-slate-800">{definition}</dd>
                  <dd
                    className={
                      'mt-4 rounded-xl border p-4 text-base font-semibold leading-relaxed text-slate-700 ' +
                      exampleClassName
                    }
                  >
                    {example}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ),
      )}

      <section aria-labelledby="use-concepts-title" className="space-y-4">
        <div>
          <h2 id="use-concepts-title" className="text-2xl font-bold text-slate-900">
            Cómo usar estos conceptos
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Consulte esta guía cuando encuentre una palabra que no conozca.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {USAGE_TIPS.map(({ title, text, Icon }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-9 w-9 text-primary" />
              <h3 className="mt-3 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="key-concepts-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2
            id="key-concepts-useful-fact-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Comprender las palabras básicas ayuda a tomar mejores decisiones y a comunicarse mejor
            durante una emergencia.
          </p>
        </section>

        <section
          aria-labelledby="key-concepts-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconHeartPulse className="h-10 w-10 text-emerald-700" />
          <h2
            id="key-concepts-takeaway-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            No se trata de memorizar términos difíciles. Lo importante es reconocer palabras clave
            y saber cuándo pedir ayuda.
          </p>
        </section>
      </div>
    </div>
  );
}
