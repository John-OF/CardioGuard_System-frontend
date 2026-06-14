import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertCircle,
  IconAlertTriangle,
  IconHeartPulse,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const COMMON_SIGNS: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Dolor o presión en el pecho',
    text: 'Sensación de peso, opresión o apretón en el centro del pecho. Puede durar varios minutos o aparecer y desaparecer.',
    Icon: IconHeartPulse,
  },
  {
    title: 'Falta de aire',
    text: 'Dificultad para respirar incluso en reposo o con poco esfuerzo. Puede ocurrir con o sin dolor de pecho.',
    Icon: IconActivity,
  },
  {
    title: 'Dolor que se extiende',
    text: 'El dolor puede ir al brazo izquierdo, cuello, mandíbula, espalda o estómago.',
    Icon: IconAlertCircle,
  },
  {
    title: 'Náuseas, mareo o sudoración',
    text: 'Sudoración fría, náuseas o mareo sin razón aparente, especialmente en mujeres y adultos mayores.',
    Icon: IconAlertTriangle,
  },
];

const CONFUSING_SYMPTOMS = [
  'Una indigestión que no se quita',
  'Dolor en la espalda alta repentino',
  'Cansancio inusual sin razón clara',
  'Sensación de que algo no anda bien',
];

const ACTIONS = [
  'Llame al 911. No espere a “ver si se pasa”.',
  'Siéntese o recuéstese. Evite hacer esfuerzos.',
  'Afloje la ropa del cuello y la cintura.',
  'Mantenga la calma y respire despacio.',
  'No coma ni beba hasta que llegue ayuda.',
];

export function RecognizeSymptomsContent() {
  return (
    <div className="space-y-8">
      <section aria-labelledby="common-signs-title" className="space-y-4">
        <div>
          <h2 id="common-signs-title" className="text-2xl font-bold text-slate-900">
            Los signos más comunes
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Estas señales pueden aparecer juntas o por separado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {COMMON_SIGNS.map(({ title, text, Icon }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700"
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="confusing-symptoms-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <h2 id="confusing-symptoms-title" className="text-2xl font-bold text-slate-900">
            Síntomas que pueden confundirse
          </h2>
          <p className="mt-2 text-lg leading-relaxed text-slate-700">
            Algunos signos se parecen a otros malestares comunes. Si tiene factores de riesgo,
            no los descarte.
          </p>
          <ul className="mt-5 space-y-3">
            {CONFUSING_SYMPTOMS.map((symptom) => (
              <li
                key={symptom}
                className="flex gap-3 rounded-xl border border-amber-200 bg-white p-4 text-lg font-semibold leading-snug text-slate-800"
              >
                <IconAlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="actions-title"
          className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6"
        >
          <h2 id="actions-title" className="text-2xl font-bold text-slate-900">
            Qué hacer si los reconoce
          </h2>
          <p className="mt-2 text-lg leading-relaxed text-slate-700">
            Si nota uno o varios de estos signos, actúe de inmediato.
          </p>
          <ol className="mt-5 space-y-3">
            {ACTIONS.map((action, index) => (
              <li
                key={action}
                className="flex gap-3 rounded-xl border border-red-200 bg-white p-4 text-lg leading-snug text-slate-800"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-700 text-base font-bold text-white"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="pt-1 font-semibold">{action}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section
        aria-labelledby="educational-video-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="educational-video-title" className="text-2xl font-bold text-slate-900">
            Video educativo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Aprenda a reconocer señales de alerta de forma sencilla.
          </p>
        </div>
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/L5sigtEWNJU"
            title="Video educativo sobre reconocimiento de síntomas"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="p-5 sm:p-6">
          <a
            href="https://www.youtube.com/watch?v=L5sigtEWNJU"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Abrir video en YouTube
          </a>
        </div>
      </section>

      <section
        aria-labelledby="why-recognize-title"
        className="rounded-2xl border border-primary/30 bg-primary-light p-5 sm:p-6"
      >
        <h2 id="why-recognize-title" className="text-2xl font-bold text-slate-900">
          Por qué importa reconocer los síntomas
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-slate-800">
          Reconocer los síntomas a tiempo permite pedir ayuda más rápido. En una emergencia
          cardiovascular, actuar temprano puede reducir complicaciones y mejorar la atención.
        </p>
      </section>
    </div>
  );
}
