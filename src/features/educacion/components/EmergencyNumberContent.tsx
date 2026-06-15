import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertCircle,
  IconAlertTriangle,
  IconBan,
  IconBrain,
  IconCircleCheck,
  IconFileText,
  IconHandHeart,
  IconLightbulb,
  IconPhone,
  IconShield,
} from '@/components/ui/icons';
import emergencyNumberImage from '@/img/911.png';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface WarningCard {
  title: string;
  text: string;
  Icon: IconComponent;
}

const CALL_REASONS: WarningCard[] = [
  {
    title: 'Dolor fuerte en el pecho',
    text: 'Presión, opresión o dolor que no se quita o aparece con falta de aire.',
    Icon: IconActivity,
  },
  {
    title: 'Dificultad para respirar',
    text: 'Respiración muy difícil, rápida o sensación de ahogo.',
    Icon: IconActivity,
  },
  {
    title: 'Desmayo o pérdida de conciencia',
    text: 'La persona no responde o se cae repentinamente.',
    Icon: IconAlertCircle,
  },
  {
    title: 'Señales de derrame cerebral',
    text: 'Debilidad en un lado del cuerpo, boca torcida o dificultad para hablar.',
    Icon: IconBrain,
  },
  {
    title: 'Dolor que se extiende',
    text: 'Dolor que va al brazo, espalda, cuello, mandíbula o estómago.',
    Icon: IconHandHeart,
  },
  {
    title: 'Emergencia grave',
    text: 'Sangrado abundante, convulsiones, accidente o situación que ponga en riesgo la vida.',
    Icon: IconAlertTriangle,
  },
];

const CALL_INFORMATION = [
  {
    title: 'Dónde está',
    text: 'Diga la dirección completa, referencia del lugar, barrio o punto conocido.',
  },
  {
    title: 'Qué pasó',
    text: 'Explique con palabras sencillas lo que ocurrió: dolor en el pecho, desmayo, caída, falta de aire u otra emergencia.',
  },
  {
    title: 'Cómo está la persona',
    text: 'Indique si respira, si responde, si está despierta o si tiene dolor intenso.',
  },
  {
    title: 'Quién llama',
    text: 'Diga su nombre y número de contacto por si necesitan devolver la llamada.',
  },
];

const COMMON_MISTAKES = [
  'Esperar a ver si se le pasa',
  'Buscar remedios caseros antes de llamar',
  'Trasladar a la persona sin orientación si está muy grave',
  'Colgar antes de recibir instrucciones',
  'Dar comida, bebida o medicamentos sin indicación',
];

const HOME_PREPARATION: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Téngalo visible',
    text: 'Coloque el 911 cerca del teléfono, en la refrigeradora o en un lugar fácil de ver.',
    Icon: IconPhone,
  },
  {
    title: 'Avise a la familia',
    text: 'Todos en casa deben saber cuándo llamar y qué información decir.',
    Icon: IconShield,
  },
  {
    title: 'Anote datos importantes',
    text: 'Tenga a mano enfermedades, medicamentos, alergias y contactos familiares.',
    Icon: IconFileText,
  },
];

export function EmergencyNumberContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="emergency-number-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 id="emergency-number-intro-title" className="text-2xl font-bold text-slate-900">
          911: el número que debe saber de memoria
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          El 911 es el número para pedir ayuda en una emergencia. Debe recordarlo y tenerlo visible
          en casa, especialmente si vive con adultos mayores o personas con riesgo cardiovascular.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          Llamar a tiempo puede ayudar a que la atención llegue más rápido y evitar que una
          situación grave empeore.
        </p>

        <aside className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5">
          <IconPhone className="h-10 w-10 text-red-700" />
          <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
            Si hay dolor fuerte en el pecho, dificultad para respirar, desmayo o señales de derrame
            cerebral, llame al 911 de inmediato.
          </p>
        </aside>
      </section>

      <section
        aria-labelledby="emergency-infographic-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="emergency-infographic-title" className="text-2xl font-bold text-slate-900">
            Infografía: Linea 911
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Revise esta guía visual con calma y recuerde los pasos principales.
          </p>
        </div>
        <figure className="flex justify-center border-t border-slate-200 bg-slate-50 p-3 sm:p-6">
          <img
            src={emergencyNumberImage}
            alt="Infografía sobre cómo actuar en una emergencia y llamar al 911"
            className="h-auto w-full max-w-5xl rounded-xl border border-slate-200 object-contain shadow-sm"
          />
        </figure>
      </section>

      <section aria-labelledby="when-to-call-title" className="space-y-4">
        <div>
          <h2 id="when-to-call-title" className="text-2xl font-bold text-slate-900">
            Cuándo debe llamar al 911
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Estas señales necesitan atención profesional rápida.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CALL_REASONS.map(({ title, text, Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm sm:p-6"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-700 text-white"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="call-information-title" className="space-y-4">
        <div>
          <h2 id="call-information-title" className="text-2xl font-bold text-slate-900">
            Qué decir cuando llame
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Hable despacio y entregue la información en este orden.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CALL_INFORMATION.map(({ title, text }, index) => (
            <li
              key={title}
              className="flex gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-slate-700">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <IconPhone className="mt-0.5 h-8 w-8 shrink-0 text-amber-700" />
          <p className="text-lg font-bold leading-relaxed text-slate-900">
            No cuelgue hasta que el operador se lo indique.
          </p>
        </aside>
      </section>

      <section aria-labelledby="mistakes-title" className="space-y-4">
        <div>
          <h2 id="mistakes-title" className="text-2xl font-bold text-slate-900">
            Errores que debe evitar
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Evitar demoras y acciones improvisadas ayuda a proteger a la persona.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {COMMON_MISTAKES.map((mistake) => (
            <li
              key={mistake}
              className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 text-lg font-semibold leading-snug text-slate-800"
            >
              <IconBan className="mt-0.5 h-6 w-6 shrink-0 text-orange-700" />
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="prepare-at-home-title" className="space-y-4">
        <div>
          <h2 id="prepare-at-home-title" className="text-2xl font-bold text-slate-900">
            Prepare el número en casa
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Una preparación sencilla permite actuar con más claridad en una emergencia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {HOME_PREPARATION.map(({ title, text, Icon }) => (
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
          aria-labelledby="emergency-number-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2
            id="emergency-number-useful-fact-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            No necesita estar completamente seguro de qué ocurre para llamar. Si la situación
            parece grave, es mejor pedir ayuda y seguir las indicaciones del operador.
          </p>
        </section>

        <section
          aria-labelledby="emergency-number-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconCircleCheck className="h-10 w-10 text-emerald-700" />
          <h2
            id="emergency-number-takeaway-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            El 911 debe estar en su memoria y en un lugar visible. En una emergencia, llamar rápido
            puede marcar la diferencia.
          </p>
        </section>
      </div>
    </div>
  );
}
