import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertCircle,
  IconAlertTriangle,
  IconBan,
  IconCheck,
  IconCircleCheck,
  IconFileText,
  IconHandHeart,
  IconLightbulb,
  IconPhone,
  IconShield,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface EmergencyStep {
  title: string;
  subtitle: string;
  text: string;
  Icon: IconComponent;
  cardClassName: string;
  iconClassName: string;
  subtitleClassName: string;
}

const EMERGENCY_STEPS: EmergencyStep[] = [
  {
    title: '1. Proteja',
    subtitle: 'Revise que el lugar sea seguro',
    text: 'Antes de ayudar, observe si hay peligro para usted o para la persona afectada. Evite acercarse si hay fuego, cables eléctricos, tránsito o violencia.',
    Icon: IconShield,
    cardClassName: 'border-blue-200 bg-blue-50',
    iconClassName: 'bg-blue-700 text-white',
    subtitleClassName: 'text-blue-800',
  },
  {
    title: '2. Avise',
    subtitle: 'Pida ayuda de inmediato',
    text: 'Llame al 911 o pida a otra persona que lo haga. Explique qué ocurrió, dónde está y cómo se encuentra la persona.',
    Icon: IconPhone,
    cardClassName: 'border-amber-200 bg-amber-50',
    iconClassName: 'bg-amber-700 text-white',
    subtitleClassName: 'text-amber-800',
  },
  {
    title: '3. Socorra',
    subtitle: 'Ayude sin improvisar',
    text: 'Acompañe a la persona, observe si respira y siga instrucciones. No dé comida, bebidas ni medicamentos si no está indicado.',
    Icon: IconHandHeart,
    cardClassName: 'border-emerald-200 bg-emerald-50',
    iconClassName: 'bg-emerald-700 text-white',
    subtitleClassName: 'text-emerald-800',
  },
];

const WARNING_SIGNS = [
  'Dolor fuerte en el pecho',
  'Dificultad para respirar',
  'Desmayo o pérdida de conciencia',
  'Debilidad repentina en un lado del cuerpo',
  'Sangrado abundante',
  'Convulsiones',
  'Confusión intensa',
  'Quemaduras importantes',
];

const HELPFUL_ACTIONS = [
  'Mantener la calma',
  'Llamar al 911',
  'Hablarle con tranquilidad a la persona',
  'Aflojar ropa ajustada si dificulta respirar',
  'Observar si respira normalmente',
  'Esperar ayuda profesional',
];

const ACTIONS_TO_AVOID = [
  'Mover a la persona sin necesidad',
  'Darle comida o bebidas',
  'Dar medicamentos sin indicación',
  'Dejarla sola',
  'Aplicar remedios caseros',
  'Perder tiempo esperando que se le pase',
];

const FAMILY_PREPARATION: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Tenga números visibles',
    text: 'Coloque el 911 y contactos familiares en un lugar fácil de ver.',
    Icon: IconPhone,
  },
  {
    title: 'Prepare información básica',
    text: 'Tenga a mano enfermedades, medicamentos y alergias importantes.',
    Icon: IconFileText,
  },
  {
    title: 'Practique qué decir',
    text: 'Ensaye cómo explicar una emergencia: qué pasó, dirección y estado de la persona.',
    Icon: IconActivity,
  },
];

export function FirstAidTrainingContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="first-aid-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <h2 id="first-aid-intro-title" className="text-2xl font-bold text-slate-900">
              Primeros auxilios: actuar con calma
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Los primeros auxilios son acciones sencillas que se realizan mientras llega la ayuda
              profesional. No reemplazan al personal médico, pero pueden ayudar a proteger la vida
              de una persona en una emergencia.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Lo más importante es mantener la calma, pedir ayuda y evitar acciones que puedan
              empeorar la situación.
            </p>
          </div>

          <aside className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
            <IconPhone className="h-10 w-10 text-red-700" />
            <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
              Ante una emergencia grave, llame al 911 y siga las indicaciones del operador.
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="first-aid-video-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="first-aid-video-title" className="text-2xl font-bold text-slate-900">
            Video educativo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Aprenda acciones básicas para responder ante una emergencia.
          </p>
        </div>
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/J2x0WuWN6eU"
            title="Video educativo sobre primeros auxilios"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="p-5 sm:p-6">
          <a
            href="https://youtu.be/J2x0WuWN6eU?si=PvJkddhPuQdi4DPI"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Abrir video en YouTube
          </a>
        </div>
      </section>

      <section aria-labelledby="emergency-steps-title" className="space-y-4">
        <div>
          <h2 id="emergency-steps-title" className="text-2xl font-bold text-slate-900">
            Tres pasos básicos ante una emergencia
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Recuerde este orden para ayudar con seguridad mientras llega el personal capacitado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {EMERGENCY_STEPS.map(
            ({ title, subtitle, text, Icon, cardClassName, iconClassName, subtitleClassName }) => (
              <article key={title} className={`rounded-2xl border p-5 sm:p-6 ${cardClassName}`}>
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconClassName}`}
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{title}</h3>
                <p className={`mt-1 text-lg font-bold ${subtitleClassName}`}>{subtitle}</p>
                <p className="mt-3 text-lg leading-relaxed text-slate-800">{text}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <section
        aria-labelledby="warning-signs-title"
        className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6"
      >
        <div className="flex items-start gap-3">
          <IconAlertTriangle className="mt-1 h-9 w-9 shrink-0 text-red-700" />
          <div>
            <h2 id="warning-signs-title" className="text-2xl font-bold text-slate-900">
              Señales de alerta que no debe ignorar
            </h2>
            <p className="mt-2 text-lg text-slate-700">
              Si aparece una señal grave, pida ayuda profesional de inmediato.
            </p>
          </div>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WARNING_SIGNS.map((sign) => (
            <li
              key={sign}
              className="flex gap-3 rounded-xl border border-red-200 bg-white p-4 text-lg font-semibold leading-snug text-slate-800 shadow-sm"
            >
              <IconAlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-700" />
              <span>{sign}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="help-and-avoid-title" className="space-y-4">
        <h2 id="help-and-avoid-title" className="text-2xl font-bold text-slate-900">
          Qué hacer y qué evitar
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <IconCircleCheck className="h-10 w-10 text-emerald-700" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Lo que sí ayuda</h3>
            <ul className="mt-4 space-y-3">
              {HELPFUL_ACTIONS.map((action) => (
                <li key={action} className="flex gap-3 text-lg leading-snug text-slate-800">
                  <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-6">
            <IconBan className="h-10 w-10 text-orange-700" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Lo que debe evitar</h3>
            <ul className="mt-4 space-y-3">
              {ACTIONS_TO_AVOID.map((action) => (
                <li key={action} className="flex gap-3 text-lg leading-snug text-slate-800">
                  <IconBan className="mt-0.5 h-6 w-6 shrink-0 text-orange-700" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="family-preparation-title" className="space-y-4">
        <div>
          <h2 id="family-preparation-title" className="text-2xl font-bold text-slate-900">
            Para adultos mayores y familiares
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Preparar información sencilla antes de una emergencia permite pedir ayuda más rápido.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {FAMILY_PREPARATION.map(({ title, text, Icon }) => (
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
          aria-labelledby="first-aid-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2 id="first-aid-useful-fact-title" className="mt-4 text-2xl font-bold text-slate-900">
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Ayudar no significa hacer procedimientos difíciles. Muchas veces, llamar rápido,
            acompañar y evitar riesgos ya es una ayuda importante.
          </p>
        </section>

        <section
          aria-labelledby="first-aid-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconHandHeart className="h-10 w-10 text-emerald-700" />
          <h2 id="first-aid-takeaway-title" className="mt-4 text-2xl font-bold text-slate-900">
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Los primeros auxilios empiezan con calma, seguridad y llamada oportuna al 911. Actuar
            temprano puede marcar la diferencia mientras llega ayuda profesional.
          </p>
        </section>
      </div>
    </div>
  );
}
