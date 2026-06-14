import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertCircle,
  IconBan,
  IconBookOpen,
  IconCircleCheck,
  IconHeartPulse,
  IconLightbulb,
  IconTrendingUp,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const HEART_ATTACK_STAGES: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
  iconClassName: string;
}> = [
  {
    title: 'Arteria sana',
    text: 'La sangre fluye libremente hacia el músculo cardíaco.',
    Icon: IconActivity,
    iconClassName: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'Acumulación',
    text: 'Grasa y colesterol pueden acumularse en las paredes de la arteria.',
    Icon: IconTrendingUp,
    iconClassName: 'bg-amber-50 text-amber-700',
  },
  {
    title: 'Bloqueo',
    text: 'La arteria se estrecha o se cierra, y llega menos sangre al corazón.',
    Icon: IconBan,
    iconClassName: 'bg-orange-50 text-orange-700',
  },
  {
    title: 'Infarto',
    text: 'El músculo cardíaco queda sin oxígeno y puede empezar a dañarse.',
    Icon: IconAlertCircle,
    iconClassName: 'bg-red-50 text-red-700',
  },
];

const RISK_FACTORS = [
  'Presión arterial alta',
  'Colesterol elevado',
  'Diabetes o glucosa alta',
  'Fumar',
  'Vida sedentaria',
  'Sobrepeso',
  'Antecedentes familiares',
];

export function HeartAttackIntroContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="heart-work-title"
        className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center"
      >
        <div>
          <h2 id="heart-work-title" className="text-2xl font-bold text-slate-900">
            Cómo trabaja su corazón
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">
            Su corazón es un músculo que late todos los días para enviar sangre con oxígeno a
            todo el cuerpo. Esa sangre llega al músculo cardíaco a través de las arterias
            coronarias.
          </p>
          <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-800">
            Cuando esas arterias se bloquean, el corazón recibe menos oxígeno y puede ocurrir un
            infarto.
          </p>
        </div>

        <aside className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <IconHeartPulse className="mx-auto h-12 w-12 text-red-700" />
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-red-800">60–100</p>
          <p className="mt-1 text-lg font-bold text-slate-900">latidos por minuto</p>
          <p className="mt-1 text-base text-slate-700">todos los días de su vida</p>
        </aside>
      </section>

      <section
        aria-labelledby="heart-attack-video-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="heart-attack-video-title" className="text-2xl font-bold text-slate-900">
            Video educativo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Conozca de forma sencilla qué ocurre durante un infarto.
          </p>
        </div>
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/u6HFAUNgRNk"
            title="Video educativo sobre qué es un infarto"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="p-5 sm:p-6">
          <a
            href="https://www.youtube.com/watch?v=u6HFAUNgRNk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Abrir video en YouTube
          </a>
        </div>
      </section>

      <section aria-labelledby="heart-attack-process-title" className="space-y-4">
        <h2 id="heart-attack-process-title" className="text-2xl font-bold text-slate-900">
          Qué pasa durante un infarto
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HEART_ATTACK_STAGES.map(({ title, text, Icon, iconClassName }, index) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconClassName}`}
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-bold text-slate-400" aria-hidden="true">
                  {index + 1} de 4
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-slate-700">{text}</p>
            </article>
          ))}
        </div>

        <div className="flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
          <IconAlertCircle className="mt-0.5 h-7 w-7 shrink-0 text-red-700" />
          <p className="text-lg font-bold leading-relaxed text-slate-900">
            Mientras más tiempo pasa sin atención, más músculo cardíaco puede dañarse. Por eso
            se dice: “tiempo es músculo”.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="why-it-matters-title"
        className="rounded-2xl border border-primary/30 bg-primary-light p-5 sm:p-6"
      >
        <h2 id="why-it-matters-title" className="text-2xl font-bold text-slate-900">
          Por qué importa saber esto
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-800">
          Muchos infartos aparecen de forma repentina, pero algunos factores de riesgo sí pueden
          controlarse. Conocerlos ayuda a cuidarse mejor.
        </p>
        <ul className="mt-5 flex flex-wrap gap-3" aria-label="Factores de riesgo cardiovascular">
          {RISK_FACTORS.map((factor) => (
            <li
              key={factor}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-4 py-3 text-base font-bold text-slate-800 shadow-sm"
            >
              <IconCircleCheck className="h-5 w-5 shrink-0 text-primary" />
              {factor}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2 id="useful-fact-title" className="mt-4 text-2xl font-bold text-slate-900">
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Un infarto no es lo mismo que un paro cardíaco. El infarto ocurre por un bloqueo de
            sangre; el paro cardíaco ocurre cuando el corazón se detiene por completo. Uno puede
            llevar al otro, pero no son lo mismo.
          </p>
        </section>

        <section
          aria-labelledby="takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconBookOpen className="h-10 w-10 text-emerald-700" />
          <h2 id="takeaway-title" className="mt-4 text-2xl font-bold text-slate-900">
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Saber qué es un infarto y por qué ocurre ayuda a reconocer una emergencia y pedir
            ayuda a tiempo. Este conocimiento es preventivo y no reemplaza la atención médica.
          </p>
        </section>
      </div>
    </div>
  );
}
