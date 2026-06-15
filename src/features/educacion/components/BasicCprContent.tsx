import type { ComponentType, SVGProps } from 'react';
import {
  IconActivity,
  IconAlertCircle,
  IconBan,
  IconCircleCheck,
  IconHandHeart,
  IconHeart,
  IconHeartPulse,
  IconPhone,
  IconShield,
} from '@/components/ui/icons';
import cprInfographic from '../../../img/rcp_basica.jpeg';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface InfoCard {
  title: string;
  text: string;
  icon: IconComponent;
}

const NECESSARY_CARDS: InfoCard[] = [
  {
    title: 'No responde',
    text: 'La persona no abre los ojos, no habla y no reacciona cuando le llama o le toca suavemente.',
    icon: IconAlertCircle,
  },
  {
    title: 'No respira normal',
    text: 'No respira, respira muy raro o solo hace jadeos. Esto puede indicar una emergencia grave.',
    icon: IconHeartPulse,
  },
  {
    title: 'Ayuda en camino',
    text: 'La RCP debe acompañarse de una llamada rápida al 911 y de las indicaciones del operador.',
    icon: IconPhone,
  },
];

const FEAR_CARDS: InfoCard[] = [
  {
    title: 'Pida ayuda',
    text: 'Si hay más personas cerca, pida que llamen al 911 y busquen apoyo.',
    icon: IconHandHeart,
  },
  {
    title: 'Siga instrucciones',
    text: 'Escuche al operador y haga solo lo que le indique.',
    icon: IconShield,
  },
  {
    title: 'Acompañe',
    text: 'Si no puede hacer compresiones, acompañar, observar y comunicar cambios también ayuda.',
    icon: IconHeart,
  },
];

const MISTAKES = [
  'No pierda tiempo buscando remedios caseros',
  'No dé comida ni bebidas',
  'No deje sola a la persona',
  'No espere a ver si se despierta',
  'No intente procedimientos que no conoce',
  'No olvide llamar al 911',
];

function InfoCard({ title, text, icon: Icon }: InfoCard) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-700">{text}</p>
    </article>
  );
}

export function BasicCprContent() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">RCP básica</h2>
        <div className="mt-4 max-w-4xl space-y-3 text-lg leading-relaxed text-slate-700">
          <p>
            La RCP básica es una ayuda de emergencia que puede aplicarse cuando una persona no responde y no respira con normalidad. Su objetivo es mantener la circulación hasta que llegue ayuda profesional.
          </p>
          <p>
            Esta información es educativa. Si ocurre una emergencia real, llame al 911 y siga las instrucciones del operador.
          </p>
        </div>
        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
          <IconAlertCircle className="mt-0.5 h-7 w-7 shrink-0" aria-hidden="true" />
          <p className="text-lg font-semibold leading-relaxed">
            Si la persona no responde y no respira normalmente, llame al 911 de inmediato o pida a alguien que lo haga.
          </p>
        </div>
      </section>

      <section aria-labelledby="cpr-necessary-title">
        <h2 id="cpr-necessary-title" className="text-2xl font-bold text-slate-900">
          Cuándo puede ser necesaria
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {NECESSARY_CARDS.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cpr-steps-title"
        className="-mx-4 border-y border-slate-200 bg-slate-50 py-6 shadow-sm sm:mx-0 sm:rounded-3xl sm:border sm:p-6 lg:p-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="px-4 text-center sm:px-0">
            <h2 id="cpr-steps-title" className="text-2xl font-bold text-slate-900">
              Los pasos básicos
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
              Revise esta guía visual con calma. En una emergencia real, llame al 911 y siga las instrucciones del operador.
            </p>
          </div>
          <div className="mt-6 overflow-hidden border-y border-slate-200 bg-white shadow-md sm:rounded-2xl sm:border">
            <img
              src={cprInfographic}
              alt="Infografía sobre los pasos básicos de RCP solo con manos"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="cpr-reminders-title">
        <h2 id="cpr-reminders-title" className="text-2xl font-bold text-slate-900">
          Recuerde dos ideas importantes
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InfoCard
            title="Presione fuerte y rápido"
            text="La RCP solo con manos busca mantener la circulación. El ritmo aproximado es de 100 a 120 compresiones por minuto."
            icon={IconActivity}
          />
          <InfoCard
            title="No se detenga sin motivo"
            text="Continúe hasta que llegue ayuda profesional, la persona muestre signos de vida o usted no pueda continuar."
            icon={IconCircleCheck}
          />
        </div>
      </section>

      <section
        aria-labelledby="cpr-mistakes-title"
        className="rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8"
      >
        <h2 id="cpr-mistakes-title" className="text-2xl font-bold text-slate-900">
          Errores que debe evitar
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {MISTAKES.map((mistake) => (
            <div key={mistake} className="flex gap-3 rounded-xl border border-red-100 bg-white p-4">
              <IconBan className="mt-0.5 h-6 w-6 shrink-0 text-red-700" aria-hidden="true" />
              <p className="text-base font-medium leading-relaxed text-slate-800">{mistake}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="cpr-fear-title">
        <h2 id="cpr-fear-title" className="text-2xl font-bold text-slate-900">
          Si tiene miedo de equivocarse
        </h2>
        <p className="mt-3 max-w-4xl text-lg leading-relaxed text-slate-700">
          Es normal sentir miedo en una emergencia. Lo más importante es pedir ayuda rápido. El operador del 911 puede guiarle paso a paso.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {FEAR_CARDS.map((card) => (
            <InfoCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-sky-200 bg-sky-50 p-6">
          <IconHeartPulse className="h-8 w-8 text-sky-700" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Un dato útil</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-700">
            La RCP puede ayudar a mantener el flujo de sangre mientras llega ayuda profesional. Aprenderla con práctica aumenta la confianza para actuar.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <IconCircleCheck className="h-8 w-8 text-emerald-700" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-bold text-slate-900">Lo que se lleva</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-700">
            Ante una persona que no responde y no respira normalmente: llame al 911, pida ayuda y siga instrucciones. Cada minuto cuenta.
          </p>
        </article>
      </section>
    </div>
  );
}
