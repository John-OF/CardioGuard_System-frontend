import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertTriangle,
  IconBan,
  IconCircleCheck,
  IconClock,
  IconHandHeart,
  IconLightbulb,
  IconPhone,
  IconShield,
  IconStethoscope,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const TIME_IMPACT_CARDS: Array<{
  title: string;
  subtitle: string;
  text: string;
  Icon: IconComponent;
  cardClassName: string;
  iconClassName: string;
  subtitleClassName: string;
}> = [
  {
    title: 'Primeros minutos',
    subtitle: 'Reconocer la emergencia',
    text: 'La persona puede presentar dolor, falta de aire, desmayo o debilidad. Identificar estas señales es el primer paso.',
    Icon: IconAlertTriangle,
    cardClassName: 'border-red-200 bg-red-50',
    iconClassName: 'bg-red-700 text-white',
    subtitleClassName: 'text-red-800',
  },
  {
    title: 'Llamada al 911',
    subtitle: 'Pedir ayuda profesional',
    text: 'Mientras más rápido se llama, más pronto puede activarse la atención de emergencia.',
    Icon: IconPhone,
    cardClassName: 'border-blue-200 bg-blue-50',
    iconClassName: 'bg-blue-700 text-white',
    subtitleClassName: 'text-blue-800',
  },
  {
    title: 'Acompañamiento',
    subtitle: 'Evitar esfuerzos y riesgos',
    text: 'La persona debe estar acompañada, tranquila y sin realizar esfuerzos mientras llega ayuda.',
    Icon: IconHandHeart,
    cardClassName: 'border-amber-200 bg-amber-50',
    iconClassName: 'bg-amber-700 text-white',
    subtitleClassName: 'text-amber-800',
  },
  {
    title: 'Atención oportuna',
    subtitle: 'Reducir complicaciones',
    text: 'Recibir atención a tiempo puede ayudar a disminuir daños y mejorar la respuesta ante la emergencia.',
    Icon: IconStethoscope,
    cardClassName: 'border-emerald-200 bg-emerald-50',
    iconClassName: 'bg-emerald-700 text-white',
    subtitleClassName: 'text-emerald-800',
  },
];

const QUICK_TIMELINE = [
  {
    title: '0 minutos: reconozca',
    text: 'Observe señales graves: dolor fuerte, falta de aire, desmayo o dificultad para hablar.',
  },
  {
    title: '1 minuto: llame',
    text: 'Marque 911 o pida a otra persona que lo haga.',
  },
  {
    title: 'Mientras espera: acompañe',
    text: 'No deje sola a la persona. Ayúdela a sentarse o recostarse si está consciente.',
  },
  {
    title: 'Hasta que llegue ayuda: siga instrucciones',
    text: 'Escuche al operador y evite dar comida, bebidas o medicamentos sin indicación.',
  },
];

const DELAY_PHRASES = [
  '“Vamos a esperar un poco.”',
  '“Seguro se le pasa.”',
  '“Primero busquemos un remedio.”',
  '“Mejor lo llevamos sin llamar.”',
  '“No quiero molestar a nadie.”',
];

const HELPFUL_ACTIONS: Array<{
  title: string;
  Icon: IconComponent;
}> = [
  { title: 'Llamar al 911', Icon: IconPhone },
  { title: 'Dar la dirección exacta', Icon: IconShield },
  { title: 'Mantener la calma', Icon: IconClock },
  { title: 'Acompañar a la persona', Icon: IconHandHeart },
  { title: 'Observar si respira', Icon: IconActivity },
  { title: 'Seguir instrucciones del operador', Icon: IconCircleCheck },
];

export function ReactionTimeContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="reaction-time-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 id="reaction-time-intro-title" className="text-2xl font-bold text-slate-900">
          Cada minuto cuenta
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          En una emergencia cardiovascular, actuar rápido puede ayudar a que la persona reciba
          atención profesional a tiempo. No se trata de correr o improvisar, sino de reconocer
          señales, llamar al 911 y acompañar con calma.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          Esperar demasiado puede aumentar el riesgo de complicaciones. Por eso es importante pedir
          ayuda apenas aparecen señales graves.
        </p>

        <aside className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5">
          <IconPhone className="h-10 w-10 text-red-700" />
          <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
            Si hay dolor fuerte en el pecho, dificultad para respirar, desmayo, confusión o
            debilidad repentina, llame al 911 de inmediato.
          </p>
        </aside>
      </section>

      <section
        aria-labelledby="reaction-time-video-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="reaction-time-video-title" className="text-2xl font-bold text-slate-900">
            Video educativo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Comprenda por qué actuar rápido puede marcar la diferencia en una emergencia.
          </p>
        </div>
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/AMb07BdRe5c"
            title="Video educativo sobre la importancia del tiempo de reacción"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="p-5 sm:p-6">
          <a
            href="https://youtu.be/AMb07BdRe5c?si=FruA8NIB00-Az_DN"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Abrir video en YouTube
          </a>
        </div>
      </section>

      <section aria-labelledby="lost-time-title" className="space-y-4">
        <div>
          <h2 id="lost-time-title" className="text-2xl font-bold text-slate-900">
            Qué pasa cuando se pierde tiempo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Cada acción oportuna ayuda a acercar la atención profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {TIME_IMPACT_CARDS.map(
            ({
              title,
              subtitle,
              text,
              Icon,
              cardClassName,
              iconClassName,
              subtitleClassName,
            }) => (
              <article
                key={title}
                className={'rounded-2xl border p-5 sm:p-6 ' + cardClassName}
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
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{title}</h3>
                <p className={'mt-1 text-lg font-bold ' + subtitleClassName}>{subtitle}</p>
                <p className="mt-3 text-lg leading-relaxed text-slate-800">{text}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <section aria-labelledby="quick-timeline-title" className="space-y-4">
        <div>
          <h2 id="quick-timeline-title" className="text-2xl font-bold text-slate-900">
            Línea de acción rápida
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Recuerde este orden desde el primer momento.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {QUICK_TIMELINE.map(({ title, text }, index) => (
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
      </section>

      <section aria-labelledby="delay-phrases-title" className="space-y-4">
        <div>
          <h2 id="delay-phrases-title" className="text-2xl font-bold text-slate-900">
            Frases que pueden hacer perder tiempo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Ante señales graves, es mejor llamar y recibir orientación profesional.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DELAY_PHRASES.map((phrase) => (
            <li
              key={phrase}
              className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 text-lg font-semibold leading-snug text-slate-800"
            >
              <IconBan className="mt-0.5 h-6 w-6 shrink-0 text-orange-700" />
              <span>{phrase}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="helpful-actions-title" className="space-y-4">
        <div>
          <h2 id="helpful-actions-title" className="text-2xl font-bold text-slate-900">
            Qué sí ayuda desde el primer momento
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Son acciones sencillas que permiten responder sin improvisar.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HELPFUL_ACTIONS.map(({ title, Icon }) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-lg font-semibold leading-snug text-slate-800"
            >
              <Icon className="h-7 w-7 shrink-0 text-emerald-700" />
              <span>{title}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="reaction-time-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2
            id="reaction-time-useful-fact-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            No necesita saber el diagnóstico para pedir ayuda. Si la situación parece grave, llamar
            rápido es una decisión segura.
          </p>
        </section>

        <section
          aria-labelledby="reaction-time-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconClock className="h-10 w-10 text-emerald-700" />
          <h2
            id="reaction-time-takeaway-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            El tiempo importa. Reconocer señales, llamar al 911 y acompañar con calma puede marcar
            la diferencia mientras llega ayuda profesional.
          </p>
        </section>
      </div>
    </div>
  );
}
