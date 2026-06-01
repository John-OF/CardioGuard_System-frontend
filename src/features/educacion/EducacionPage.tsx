import { Link } from 'react-router-dom';
import { EducationLayout } from './components/EducationLayout';
import { TOPIC_METAS, CATEGORY_LABELS } from './data/topicCatalog';
import type { TopicCategory } from './types';

// Cómo se presenta la sección al usuario: cada categoría con una frase
// que explica qué aprenderá ahí. El orden coincide con CATEGORY_LABELS.
const CATEGORY_INTRO: { category: TopicCategory; icon: string; text: string }[] = [
  {
    category: 'enfermedad',
    icon: '🫀',
    text: 'Qué es un infarto, por qué ocurre y los factores que ponen en riesgo a su corazón.',
  },
  {
    category: 'prevencion',
    icon: '🌿',
    text: 'Hábitos sencillos para cuidar su corazón en el día a día.',
  },
  {
    category: 'rcp',
    icon: '🫶',
    text: 'Los fundamentos de la RCP y por qué vale la pena capacitarse.',
  },
  {
    category: 'emergencia',
    icon: '🚨',
    text: 'Qué hacer en los primeros minutos de una emergencia y mientras llega la ayuda.',
  },
];

// Primer tema de la secuencia, para el botón "Empezar por el primer tema".
const firstTopic = TOPIC_METAS[0];

export function EducacionPage() {
  return (
    <EducationLayout
      title="Educación en salud cardiovascular"
      description="Aprenda a su ritmo sobre el corazón, las señales de alarma, la RCP y cómo actuar en una emergencia. No necesita conocimientos previos."
    >
      <div className="space-y-8">
        <section className="card space-y-3">
          <h2 className="text-xl font-bold text-slate-900">¿Cómo está organizado?</h2>
          <p className="text-base text-slate-600">
            El contenido se divide en cuatro áreas. Puede leerlas en orden o ir
            directo al tema que le interese desde el menú lateral.
          </p>
          <ul className="space-y-3 mt-2">
            {CATEGORY_INTRO.map(({ category, icon, text }) => (
              <li key={category} className="flex items-start gap-3">
                <span
                  className="inline-flex w-10 h-10 shrink-0 rounded-xl bg-primary-light items-center justify-center text-xl"
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span className="text-base">
                  <span className="font-semibold text-slate-900">
                    {CATEGORY_LABELS[category]}.
                  </span>{' '}
                  <span className="text-slate-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl bg-primary-light border border-primary/20 p-6 text-center">
          <p className="text-lg text-slate-800">
            ¿No sabe por dónde empezar? Le recomendamos comenzar por el principio.
          </p>
          <Link
            to={`/educacion/${firstTopic.slug}`}
            className="btn-primary inline-flex items-center gap-2 mt-4"
          >
            Empezar por el primer tema
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <p className="text-sm text-slate-500 mt-3">
            Primer tema: {firstTopic.shortTitle}
          </p>
        </section>
      </div>
    </EducationLayout>
  );
}
