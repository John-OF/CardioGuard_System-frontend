import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconBan,
  IconCheck,
  IconCircleCheck,
  IconClock,
  IconHandHeart,
  IconHeart,
  IconLightbulb,
  IconShield,
  IconTarget,
  IconTrees,
} from '@/components/ui/icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface HabitCard {
  title: string;
  subtitle: string;
  items: string[];
  Icon: IconComponent;
  cardClassName: string;
  iconClassName: string;
  markerClassName: string;
}

const HEALTHY_HABITS: HabitCard[] = [
  {
    title: 'Ejercicio diario',
    subtitle: 'Mueva el cuerpo todos los días',
    items: [
      'Camine al menos 30 minutos al día',
      'Si es mucho seguido, divida en 2 sesiones de 15 minutos',
      'Use un ritmo cómodo: debe poder hablar, pero no cantar',
      'Nadar o hacer ejercicios sentado también cuenta',
    ],
    Icon: IconActivity,
    cardClassName: 'border-blue-200 bg-blue-50',
    iconClassName: 'bg-blue-700 text-white',
    markerClassName: 'text-blue-700',
  },
  {
    title: 'Alimentación saludable',
    subtitle: 'Comer mejor, no menos',
    items: [
      'Incluya frutas, verduras y granos como lenteja o fréjol',
      'Prefiera pescado, pollo o carnes magras',
      'Use aceite de oliva o girasol con moderación',
      'Reduzca sal, azúcar, frituras y ultraprocesados',
    ],
    Icon: IconTrees,
    cardClassName: 'border-emerald-200 bg-emerald-50',
    iconClassName: 'bg-emerald-700 text-white',
    markerClassName: 'text-emerald-700',
  },
  {
    title: 'Dejar el tabaco',
    subtitle: 'Beneficios inmediatos a cualquier edad',
    items: [
      'En 24 horas puede mejorar la circulación',
      'En semanas se respira mejor',
      'En 1 año puede bajar el riesgo de infarto',
      'Pida ayuda en centros de salud si lo necesita',
    ],
    Icon: IconBan,
    cardClassName: 'border-orange-200 bg-orange-50',
    iconClassName: 'bg-orange-700 text-white',
    markerClassName: 'text-orange-700',
  },
  {
    title: 'Dormir bien',
    subtitle: '7 a 8 horas de descanso',
    items: [
      'Dormir poco puede relacionarse con presión alta',
      'Si ronca fuerte, consulte con su médico',
      'Mantenga horarios regulares de sueño',
      'El descanso también es parte del cuidado del corazón',
    ],
    Icon: IconClock,
    cardClassName: 'border-purple-200 bg-purple-50',
    iconClassName: 'bg-purple-700 text-white',
    markerClassName: 'text-purple-700',
  },
];

const FOODS_TO_INCREASE = [
  'Frutas y verduras frescas',
  'Pescado, pollo o carnes magras',
  'Granos: lenteja, fréjol, garbanzo',
  'Frutos secos sin sal',
  'Agua y preparaciones con poca grasa',
];

const FOODS_TO_REDUCE = [
  'Sal en exceso',
  'Azúcar y dulces',
  'Frituras frecuentes',
  'Gaseosas y bebidas azucaradas',
  'Carnes muy procesadas',
];

const SMALL_GOALS: Array<{
  title: string;
  text: string;
  Icon: IconComponent;
}> = [
  {
    title: 'Esta semana',
    text: 'Camine 10 minutos más de lo habitual o levántese varias veces al día si pasa mucho tiempo sentado.',
    Icon: IconActivity,
  },
  {
    title: 'En sus comidas',
    text: 'Agregue una fruta o verdura al día y reduzca poco a poco la sal.',
    Icon: IconHeart,
  },
  {
    title: 'En casa',
    text: 'Duerma con horarios más regulares y evite fumar dentro del hogar.',
    Icon: IconClock,
  },
];

export function HealthyHabitsContent() {
  return (
    <div className="space-y-8">
      <section
        aria-labelledby="healthy-habits-intro-title"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center">
          <div>
            <h2 id="healthy-habits-intro-title" className="text-2xl font-bold text-slate-900">
              Hábitos que protegen su corazón
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Cuidar el corazón no significa hacer cambios difíciles de golpe. Pequeñas acciones
              diarias pueden ayudar a mejorar la presión arterial, el colesterol, la glucosa y la
              circulación.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              Lo más importante es empezar con metas simples, mantenerlas en el tiempo y acudir a
              controles médicos cuando corresponda.
            </p>
          </div>

          <aside className="rounded-2xl border border-teal-200 bg-teal-50 p-5 sm:p-6">
            <IconShield className="h-10 w-10 text-teal-700" />
            <p className="mt-3 text-lg font-bold leading-relaxed text-slate-900">
              Cada pequeño cambio suma: moverse más, comer mejor, dormir bien y evitar el tabaco
              ayudan a proteger su corazón.
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="healthy-habits-video-title"
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-6">
          <h2 id="healthy-habits-video-title" className="text-2xl font-bold text-slate-900">
            Video educativo
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Aprenda hábitos sencillos para cuidar mejor su corazón cada día.
          </p>
        </div>
        <div className="aspect-video w-full bg-slate-900">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/EdbWHOcd84s"
            title="Video educativo sobre hábitos saludables para el corazón"
            loading="lazy"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className="p-5 sm:p-6">
          <a
            href="https://www.youtube.com/watch?v=EdbWHOcd84s"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 py-3 text-lg font-bold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Abrir video en YouTube
          </a>
        </div>
      </section>

      <section aria-labelledby="healthy-pillars-title" className="space-y-4">
        <div>
          <h2 id="healthy-pillars-title" className="text-2xl font-bold text-slate-900">
            Los cuatro pilares del corazón sano
          </h2>
          <p className="mt-2 text-lg text-slate-700">
            Elija un hábito para comenzar y avance a su propio ritmo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {HEALTHY_HABITS.map(
            ({ title, subtitle, items, Icon, cardClassName, iconClassName, markerClassName }) => (
              <article key={title} className={`rounded-2xl border p-5 sm:p-6 ${cardClassName}`}>
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconClassName}`}
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">{title}</h3>
                <p className={`mt-1 text-lg font-bold ${markerClassName}`}>{subtitle}</p>
                <ul className="mt-5 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-xl border border-white/80 bg-white p-3 text-base font-semibold leading-snug text-slate-800 shadow-sm"
                    >
                      <IconCircleCheck className={`mt-0.5 h-5 w-5 shrink-0 ${markerClassName}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ),
          )}
        </div>
      </section>

      <section aria-labelledby="food-guide-title" className="space-y-4">
        <h2 id="food-guide-title" className="text-2xl font-bold text-slate-900">
          Guía de alimentación
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <IconTrees className="h-10 w-10 text-emerald-700" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Lo que conviene aumentar</h3>
            <ul className="mt-4 space-y-3">
              {FOODS_TO_INCREASE.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-snug text-slate-800">
                  <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-orange-200 bg-orange-50 p-5 sm:p-6">
            <IconBan className="h-10 w-10 text-orange-700" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Lo que conviene reducir</h3>
            <ul className="mt-4 space-y-3">
              {FOODS_TO_REDUCE.map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-snug text-slate-800">
                  <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-orange-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="small-goals-title" className="space-y-4">
        <div className="flex items-center gap-3">
          <IconTarget className="h-9 w-9 shrink-0 text-primary" />
          <h2 id="small-goals-title" className="text-2xl font-bold text-slate-900">
            Empiece con metas pequeñas
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SMALL_GOALS.map(({ title, text, Icon }) => (
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
          aria-labelledby="healthy-useful-fact-title"
          className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
        >
          <IconLightbulb className="h-10 w-10 text-amber-700" />
          <h2 id="healthy-useful-fact-title" className="mt-4 text-2xl font-bold text-slate-900">
            Un dato útil
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            El estrés también afecta al corazón. Caminar al aire libre, conversar con familiares,
            escuchar música o tener un pasatiempo ayudan a mantener la calma.
          </p>
        </section>

        <section
          aria-labelledby="healthy-takeaway-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
        >
          <IconHandHeart className="h-10 w-10 text-emerald-700" />
          <h2 id="healthy-takeaway-title" className="mt-4 text-2xl font-bold text-slate-900">
            Lo que se lleva
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-800">
            No necesita cambiar todo en un solo día. Con moverse un poco más, comer mejor y
            controlar sus números con el médico, ya está cuidando su corazón.
          </p>
        </section>
      </div>
    </div>
  );
}
