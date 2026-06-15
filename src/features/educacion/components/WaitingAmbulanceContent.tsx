import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconBan,
  IconCircleCheck,
  IconFileText,
  IconHandHeart,
  IconLightbulb,
  IconPhone,
  IconShield,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const WAITING_ACTIONS: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Mantenga la calma',
    text: 'Hable despacio y con voz tranquila. La persona puede sentirse asustada y necesita sentirse acompañada.',
    Icon: IconShield,
  },
  {
    title: 'Ubique a la persona con seguridad',
    text: 'Si está consciente, ayúdela a sentarse o recostarse en una posición cómoda. Evite esfuerzos.',
    Icon: IconHandHeart,
  },
  {
    title: 'Observe su respiración',
    text: 'Mire si respira con normalidad, si responde cuando le habla y si el dolor aumenta.',
    Icon: IconActivity,
  },
  {
    title: 'Prepare información',
    text: 'Tenga lista la dirección, edad aproximada, enfermedades, medicamentos, alergias y qué ocurrió.',
    Icon: IconFileText,
  },
  {
    title: 'Espere en un lugar visible',
    text: 'Si es seguro, pida a alguien que espere a la ambulancia en la entrada o en un punto fácil de encontrar.',
    Icon: IconPhone,
  },
];

const PARAMEDIC_INFORMATION = [
  'Qué síntomas presentó',
  'A qué hora empezó',
  'Si perdió el conocimiento',
  'Si respira normalmente',
  'Medicamentos que toma',
  'Enfermedades conocidas',
  'Alergias importantes',
  'Contactos familiares',
];

const ACTIONS_TO_AVOID = [
  'No le dé comida ni bebidas',
  'No le dé medicamentos sin indicación',
  'No la deje sola',
  'No la obligue a caminar',
  'No minimice síntomas graves',
  'No mueva a la persona si está inconsciente, muy débil o después de una caída fuerte',
];

const HOME_COORDINATION: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Abra el paso',
    text: 'Retire objetos que dificulten la entrada de la ambulancia o el paso del personal de emergencia.',
    Icon: IconShield,
  },
  {
    title: 'Encienda una luz',
    text: 'Si es de noche, ilumine la entrada o pida a alguien que guíe al equipo de ayuda.',
    Icon: IconLightbulb,
  },
  {
    title: 'Tenga documentos cerca',
    text: 'Si es posible, tenga cédula, recetas o lista de medicamentos a mano.',
    Icon: IconFileText,
  },
];

export function WaitingAmbulanceContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="waiting-ambulance-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 id="waiting-ambulance-intro-title" className="text-2xl font-bold text-slate-900">
          Mientras espera la ambulancia
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          Después de llamar al 911, es importante acompañar a la persona y evitar acciones que
          puedan empeorar la situación. La ayuda profesional ya está en camino, pero su calma y sus
          cuidados pueden ser muy importantes.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          No necesita hacer procedimientos difíciles. Lo principal es observar, acompañar, informar
          y seguir las instrucciones del operador.
        </p>

        <aside className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <IconPhone className="h-10 w-10 text-blue-700" />
          <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
            No cuelgue hasta que el operador se lo indique. Sus instrucciones pueden ayudarle a
            actuar con más seguridad.
          </p>
        </aside>
      </section>

      <section
        aria-labelledby="waiting-ambulance-video-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="waiting-ambulance-video-title" className="text-2xl font-bold text-slate-900">
            Video educativo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Aprenda qué hacer de forma segura mientras llega la ambulancia.
          </p>
        </div>
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/h3Q7TrTUbaY"
            title="Video educativo sobre qué hacer mientras llega la ambulancia"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="p-5 sm:p-6">
          <a
            href="https://youtu.be/h3Q7TrTUbaY?si=1cMiz8PeDHJr-i31"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Abrir video en YouTube
          </a>
        </div>
      </section>

      <section aria-labelledby="waiting-actions-title" className="space-y-4">
        <div>
          <h2 id="waiting-actions-title" className="text-2xl font-bold text-slate-900">
            Qué hacer mientras espera
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Estas acciones ayudan a cuidar a la persona y facilitan la llegada del equipo médico.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {WAITING_ACTIONS.map(({ title, text, Icon }, index) => (
            <article
              key={title}
              className={
                index === WAITING_ACTIONS.length - 1
                  ? 'rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6 md:col-span-2'
                  : 'rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6'
              }
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white"
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

      <section
        aria-labelledby="paramedic-information-title"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
      >
        <h2 id="paramedic-information-title" className="text-2xl font-bold text-slate-900">
          Información útil para entregar
        </h2>
        <p className="mt-2 text-lg text-slate-700">
          Tener esta información lista puede ayudar al personal de emergencia a actuar más rápido.
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PARAMEDIC_INFORMATION.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white p-4 text-lg font-semibold leading-snug text-slate-800 shadow-sm"
            >
              <IconCircleCheck className="h-6 w-6 shrink-0 text-emerald-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="waiting-avoid-title" className="space-y-4">
        <div>
          <h2 id="waiting-avoid-title" className="text-2xl font-bold text-slate-900">
            Lo que debe evitar
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Evite acciones que puedan aumentar el riesgo o retrasar la atención.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ACTIONS_TO_AVOID.map((action) => (
            <li
              key={action}
              className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 text-lg font-semibold leading-snug text-slate-800"
            >
              <IconBan className="mt-0.5 h-6 w-6 shrink-0 text-orange-700" />
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="organize-environment-title" className="space-y-4">
        <div>
          <h2 id="organize-environment-title" className="text-2xl font-bold text-slate-900">
            Organice el entorno
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Un acceso despejado permite que el personal llegue y trabaje sin demoras.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {HOME_COORDINATION.map(({ title, text, Icon }) => (
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
          aria-labelledby="waiting-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2 id="waiting-useful-fact-title" className="mt-4 text-2xl font-bold text-slate-900">
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Acompañar también es ayudar. Quedarse cerca, observar cambios y transmitir información
            clara puede apoyar la atención profesional.
          </p>
        </section>

        <section
          aria-labelledby="waiting-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconHandHeart className="h-10 w-10 text-emerald-700" />
          <h2 id="waiting-takeaway-title" className="mt-4 text-2xl font-bold text-slate-900">
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Después de llamar al 911, mantenga la calma, acompañe a la persona, observe su
            respiración y prepare información para la ambulancia.
          </p>
        </section>
      </div>
    </div>
  );
}
