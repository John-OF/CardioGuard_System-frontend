import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertTriangle,
  IconBan,
  IconCircleCheck,
  IconFileText,
  IconHandHeart,
  IconLightbulb,
  IconPhone,
  IconShield,
} from '@/components/ui/icons';
import emergencyActionImage from '@/img/actuar_emergencia.png';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const ACTION_STEPS: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: '1. Mantenga la calma',
    text: 'Respire despacio y hable con tranquilidad. La calma ayuda a tomar mejores decisiones.',
    Icon: IconShield,
  },
  {
    title: '2. Llame al 911',
    text: 'Pida ayuda profesional. Diga dónde está, qué ocurrió y cómo se encuentra la persona.',
    Icon: IconPhone,
  },
  {
    title: '3. Acompañe a la persona',
    text: 'No la deje sola. Ayúdela a sentarse o recostarse si está consciente y evite esfuerzos.',
    Icon: IconHandHeart,
  },
  {
    title: '4. Observe si respira',
    text: 'Mire si respira con normalidad y si responde cuando le habla. Informe esto al operador.',
    Icon: IconActivity,
  },
  {
    title: '5. Siga instrucciones',
    text: 'Escuche al operador del 911 y siga sus indicaciones hasta que llegue ayuda.',
    Icon: IconCircleCheck,
  },
];

const ACTIONS_TO_AVOID = [
  'No espere a ver si se le pasa',
  'No le dé comida ni bebidas',
  'No le dé medicamentos sin indicación',
  'No la mueva si está muy débil, inconsciente o después de una caída fuerte',
  'No la deje sola',
  'No cuelgue hasta que el operador se lo indique',
];

const HOME_PREPARATION: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Número visible',
    text: 'Coloque el 911 y contactos familiares en un lugar fácil de ver.',
    Icon: IconPhone,
  },
  {
    title: 'Datos médicos',
    text: 'Tenga a mano enfermedades, medicamentos y alergias importantes.',
    Icon: IconFileText,
  },
  {
    title: 'Dirección clara',
    text: 'Asegúrese de que todos sepan decir la dirección o una referencia del domicilio.',
    Icon: IconShield,
  },
];

export function EmergencyActionContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="emergency-action-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 id="emergency-action-intro-title" className="text-2xl font-bold text-slate-900">
          Los primeros minutos: qué hacer cuando ocurre
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          Cuando ocurre una emergencia, los primeros minutos son importantes. Mantener la calma,
          pedir ayuda y acompañar a la persona puede marcar una diferencia mientras llega atención
          profesional.
        </p>
        <p className="mt-3 text-lg leading-relaxed text-slate-700">
          No se trata de hacer procedimientos difíciles, sino de actuar con seguridad y evitar
          errores comunes.
        </p>

        <aside className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5">
          <IconPhone className="h-10 w-10 text-red-700" />
          <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
            Si la persona tiene dolor fuerte en el pecho, dificultad para respirar, se desmaya o no
            responde, llame al 911 de inmediato.
          </p>
        </aside>
      </section>

      <section
        aria-labelledby="emergency-action-infographic-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2
            id="emergency-action-infographic-title"
            className="text-2xl font-bold text-slate-900"
          >
            Guía visual: actuar en emergencia
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Revise esta infografía con calma y recuerde los pasos principales.
          </p>
        </div>
        <figure className="flex justify-center border-t border-slate-200 bg-slate-50 p-3 sm:p-6">
          <img
            src={emergencyActionImage}
            alt="Infografía sobre qué hacer durante los primeros minutos de una emergencia"
            className="h-auto w-full max-w-5xl rounded-xl border border-slate-200 object-contain shadow-sm"
          />
        </figure>
      </section>

      <section aria-labelledby="emergency-action-steps-title" className="space-y-4">
        <div>
          <h2 id="emergency-action-steps-title" className="text-2xl font-bold text-slate-900">
            Qué hacer paso a paso
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Siga este orden y manténgase junto a la persona hasta que llegue ayuda.
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ACTION_STEPS.map(({ title, text, Icon }, index) => (
            <li
              key={title}
              className={
                index === ACTION_STEPS.length - 1
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
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="emergency-action-avoid-title" className="space-y-4">
        <div>
          <h2 id="emergency-action-avoid-title" className="text-2xl font-bold text-slate-900">
            Lo que no debe hacer
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Evite acciones que retrasen la ayuda o puedan empeorar la situación.
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

      <section aria-labelledby="emergency-action-prepare-title" className="space-y-4">
        <div>
          <h2 id="emergency-action-prepare-title" className="text-2xl font-bold text-slate-900">
            Tenga todo listo antes de una emergencia
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Preparar estos datos permite pedir ayuda con mayor rapidez.
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
          aria-labelledby="emergency-action-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2
            id="emergency-action-useful-fact-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            En una emergencia, ayudar también significa pedir ayuda rápido, acompañar y evitar
            acciones que puedan empeorar la situación.
          </p>
        </section>

        <section
          aria-labelledby="emergency-action-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconAlertTriangle className="h-10 w-10 text-emerald-700" />
          <h2
            id="emergency-action-takeaway-title"
            className="mt-4 text-2xl font-bold text-slate-900"
          >
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Recuerde: llamar, calmar, acompañar y esperar ayuda profesional. No necesita hacerlo
            perfecto; actuar con calma ya es una gran ayuda.
          </p>
        </section>
      </div>
    </div>
  );
}
