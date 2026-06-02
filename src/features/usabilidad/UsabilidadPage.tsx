import type { ComponentType, SVGProps } from 'react';
import {
  IconClipboardCheck,
  IconClock,
  IconLock,
  IconLightbulb,
} from '@/components/ui/icons';

// Enlace al formulario de usabilidad (Google Forms).
// Si cambia el formulario, actualizar solo esta constante.
const USABILITY_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScq_N7ShT5Wfn5M2IaHE_SddWNPvFa7A_-ZGoKIgR3lc5w3qA/viewform?usp=header';

const points: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
}[] = [
  {
    Icon: IconClock,
    title: 'Toma pocos minutos',
    text: 'Son preguntas breves y sencillas sobre su experiencia usando el sistema.',
  },
  {
    Icon: IconLock,
    title: 'Es anónimo',
    text: 'No le pedimos su nombre ni datos personales. Sus respuestas son confidenciales.',
  },
  {
    Icon: IconLightbulb,
    title: 'Nos ayuda a mejorar',
    text: 'Su opinión nos permite hacer la herramienta más clara y fácil de usar.',
  },
];

export function UsabilidadPage() {
  return (
    <div className="space-y-8">
      <header className="text-center max-w-2xl mx-auto">
        <span
          aria-hidden
          className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
        >
          <IconClipboardCheck className="w-8 h-8" />
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-3">
          Cuéntenos su experiencia
        </h1>
        <p className="text-lg text-slate-600">
          Su opinión es muy valiosa. Le invitamos a completar un breve formulario sobre la
          usabilidad de este sistema web. Nos ayudará a mejorarlo para usted y para otras
          personas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {points.map((point) => (
          <div
            key={point.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
          >
            <span
              aria-hidden
              className="inline-flex w-12 h-12 rounded-xl bg-primary-light items-center justify-center text-primary"
            >
              <point.Icon className="w-6 h-6" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-3 mb-1">{point.title}</h3>
            <p className="text-base text-slate-600">{point.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">¿Listo para compartir su opinión?</h2>
        <p className="text-lg mb-6 text-white/90">
          El formulario se abrirá en una pestaña nueva.
        </p>
        <a
          href={USABILITY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-700 hover:bg-blue-50 transition-colors"
        >
          Abrir formulario de usabilidad
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
            aria-hidden
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
