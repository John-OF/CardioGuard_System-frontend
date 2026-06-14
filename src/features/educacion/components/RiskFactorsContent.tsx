import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconHeartPulse,
  IconLightbulb,
  IconShield,
  IconStethoscope,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface RiskFactorCard {
  title: string;
  subtitle: string;
  text: string;
  listLabel: string;
  items: string[];
  Icon: IconComponent;
  cardClassName: string;
  iconClassName: string;
  markerClassName: string;
}

const MAIN_RISK_FACTORS: RiskFactorCard[] = [
  {
    title: 'Presión arterial alta',
    subtitle: 'Hipertensión',
    text: 'Casi nunca produce síntomas. Puede dañar las arterias en silencio durante años y aumentar el riesgo de infarto o derrame.',
    listLabel: 'Cómo cuidarse',
    items: [
      'Mídase la presión con regularidad',
      'Reduzca la sal en sus comidas',
      'Mantenga un peso saludable',
      'Camine o muévase todos los días',
    ],
    Icon: IconHeartPulse,
    cardClassName: 'border-red-200 bg-red-50',
    iconClassName: 'bg-red-700 text-white',
    markerClassName: 'text-red-700',
  },
  {
    title: 'Diabetes y glucosa alta',
    subtitle: 'Azúcar en sangre',
    text: 'La glucosa elevada puede dañar los vasos sanguíneos del corazón, los ojos, los riñones y otros órganos.',
    listLabel: 'Señales que conviene consultar',
    items: [
      'Sed constante',
      'Necesidad de orinar muchas veces',
      'Cansancio sin razón aparente',
      'Heridas que tardan en sanar',
    ],
    Icon: IconActivity,
    cardClassName: 'border-blue-200 bg-blue-50',
    iconClassName: 'bg-blue-700 text-white',
    markerClassName: 'text-blue-700',
  },
  {
    title: 'Colesterol elevado',
    subtitle: 'Grasa en la sangre',
    text: 'Puede acumularse en las paredes de las arterias y formar placas que dificultan el paso de la sangre.',
    listLabel: 'Cómo cuidarse',
    items: [
      'Evite frituras frecuentes',
      'Prefiera alimentos con fibra',
      'Controle sus valores en consulta médica',
      'Siga el tratamiento indicado si ya lo tiene',
    ],
    Icon: IconStethoscope,
    cardClassName: 'border-purple-200 bg-purple-50',
    iconClassName: 'bg-purple-700 text-white',
    markerClassName: 'text-purple-700',
  },
];

const CONTROLLABLE_FACTORS = [
  'Alimentación',
  'Actividad física',
  'Tabaco',
  'Peso',
  'Presión arterial',
  'Glucosa',
  'Colesterol',
];

const NON_CONTROLLABLE_FACTORS = [
  'Edad',
  'Antecedentes familiares',
  'Sexo',
  'Enfermedades previas',
];

export function RiskFactorsContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="risk-factors-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <h2 id="risk-factors-intro-title" className="text-2xl font-bold text-slate-900">
              Qué son los factores de riesgo
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Los factores de riesgo son condiciones o hábitos que pueden aumentar la
              probabilidad de tener problemas del corazón o de la circulación.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Algunos no se pueden cambiar, como la edad o los antecedentes familiares. Otros sí
              se pueden controlar con hábitos saludables y controles médicos.
            </p>
          </div>

          <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <IconShield className="h-10 w-10 text-emerald-700" />
            <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
              Conocer sus factores de riesgo ayuda a prevenir complicaciones y actuar a tiempo.
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="risk-factors-video-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="risk-factors-video-title" className="text-2xl font-bold text-slate-900">
            Video educativo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Conozca los principales factores que pueden aumentar el riesgo cardiovascular.
          </p>
        </div>
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/a1Maqw_GJjE?start=3"
            title="Video educativo sobre factores de riesgo cardiovascular"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="p-5 sm:p-6">
          <a
            href="https://www.youtube.com/watch?v=a1Maqw_GJjE&t=3s"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Abrir video en YouTube
          </a>
        </div>
      </section>

      <section aria-labelledby="main-risk-factors-title" className="space-y-4">
        <div>
          <h2 id="main-risk-factors-title" className="text-2xl font-bold text-slate-900">
            Los tres factores más importantes
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Pueden avanzar sin causar dolor. Medirlos permite detectarlos y controlarlos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {MAIN_RISK_FACTORS.map(
            ({
              title,
              subtitle,
              text,
              listLabel,
              items,
              Icon,
              cardClassName,
              iconClassName,
              markerClassName,
            }) => (
              <article key={title} className={`rounded-2xl border p-5 sm:p-6 ${cardClassName}`}>
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconClassName}`}
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </span>
                <p className={`mt-4 text-base font-bold uppercase tracking-wide ${markerClassName}`}>
                  {subtitle}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-800">{text}</p>

                <p className="mt-5 text-base font-bold text-slate-900">{listLabel}</p>
                <ul className="mt-3 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-white/80 bg-white p-3 text-base font-semibold leading-snug text-slate-800 shadow-sm"
                    >
                      {title === 'Diabetes y glucosa alta' ? (
                        <IconAlertTriangle
                          className={`mt-0.5 h-5 w-5 shrink-0 ${markerClassName}`}
                        />
                      ) : (
                        <IconCircleCheck
                          className={`mt-0.5 h-5 w-5 shrink-0 ${markerClassName}`}
                        />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ),
          )}
        </div>
      </section>

      <section aria-labelledby="cholesterol-title" className="space-y-4">
        <h2 id="cholesterol-title" className="text-2xl font-bold text-slate-900">
          Colesterol bueno vs. colesterol malo
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <IconCircleCheck className="h-10 w-10 text-emerald-700" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              Colesterol HDL — “bueno”
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-slate-800">
              Ayuda a limpiar las arterias. Conviene mantenerlo en niveles adecuados.
            </p>
          </article>

          <article className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
            <IconAlertCircle className="h-10 w-10 text-red-700" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              Colesterol LDL — “malo”
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-slate-800">
              Puede tapar las arterias cuando está elevado. Conviene mantenerlo bajo control.
            </p>
          </article>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="controllable-factors-title"
          className="rounded-2xl border border-primary/30 bg-primary-light p-5 sm:p-6"
        >
          <h2 id="controllable-factors-title" className="text-2xl font-bold text-slate-900">
            Factores que sí puede controlar
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {CONTROLLABLE_FACTORS.map((factor) => (
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

        <section
          aria-labelledby="non-controllable-factors-title"
          className="rounded-2xl border border-slate-300 bg-slate-100 p-5 sm:p-6"
        >
          <h2 id="non-controllable-factors-title" className="text-2xl font-bold text-slate-900">
            Factores que no siempre puede cambiar
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {NON_CONTROLLABLE_FACTORS.map((factor) => (
              <li
                key={factor}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-800 shadow-sm"
              >
                <IconAlertCircle className="h-5 w-5 shrink-0 text-slate-600" />
                {factor}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="risk-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2 id="risk-useful-fact-title" className="mt-4 text-2xl font-bold text-slate-900">
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            Los factores de riesgo se relacionan entre sí. Mejorar la alimentación, moverse más y
            acudir a controles médicos puede ayudar a reducir varios riesgos al mismo tiempo.
          </p>
        </section>

        <section
          aria-labelledby="risk-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconStethoscope className="h-10 w-10 text-emerald-700" />
          <h2 id="risk-takeaway-title" className="mt-4 text-2xl font-bold text-slate-900">
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            No se trata de tener miedo, sino de conocer sus números y cuidarse mejor. Si no conoce
            su presión, glucosa o colesterol, no puede controlarlos.
          </p>
        </section>
      </div>
    </div>
  );
}
