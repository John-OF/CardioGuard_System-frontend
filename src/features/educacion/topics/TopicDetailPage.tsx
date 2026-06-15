import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TOPICS, TOPICS_BY_SLUG } from '../data/topicContents';
import type { Topic } from '../types';
import { TopicContent } from '../components/TopicContent';
import { TopicTip } from '../components/TopicTip';
import { GlosarioView } from '../components/GlosarioView';
import { RecognizeSymptomsContent } from '../components/RecognizeSymptomsContent';
import { HeartAttackIntroContent } from '../components/HeartAttackIntroContent';
import { RiskFactorsContent } from '../components/RiskFactorsContent';
import { HealthyHabitsContent } from '../components/HealthyHabitsContent';
import { FirstAidTrainingContent } from '../components/FirstAidTrainingContent';
import { EmergencyNumberContent } from '../components/EmergencyNumberContent';
import { EmergencyActionContent } from '../components/EmergencyActionContent';
import { ReactionTimeContent } from '../components/ReactionTimeContent';

/**
 * Navegación secuencial entre temas: botón izquierdo al tema anterior,
 * botón derecho ("Continúe aprendiendo") al siguiente. En el primer tema
 * solo aparece el de la derecha; en el último, solo el de la izquierda.
 */
function TopicPagination({ prev, next }: { prev?: Topic; next?: Topic }) {
  const navigate = useNavigate();

  if (!prev && !next) return null;

  return (
    <nav
      className="flex items-stretch justify-between gap-4 pt-2"
      aria-label="Navegación entre temas"
    >
      {prev ? (
        <button
          type="button"
          onClick={() => navigate(`/educacion/${prev.slug}`)}
          className="flex-1 max-w-sm text-left rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary hover:bg-primary-light transition-colors"
        >
          <span className="flex items-center gap-1 text-sm font-semibold text-slate-500">
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Tema anterior
          </span>
          <span className="block text-base font-bold text-slate-900 mt-1">{prev.title}</span>
        </button>
      ) : (
        <span className="flex-1 max-w-sm" aria-hidden="true" />
      )}

      {next ? (
        <button
          type="button"
          onClick={() => navigate(`/educacion/${next.slug}`)}
          className="flex-1 max-w-sm text-right rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary hover:bg-primary-light transition-colors"
        >
          <span className="flex items-center justify-end gap-1 text-sm font-semibold text-primary">
            Continúe aprendiendo
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
          </span>
          <span className="block text-base font-bold text-slate-900 mt-1">{next.title}</span>
        </button>
      ) : (
        <span className="flex-1 max-w-sm" aria-hidden="true" />
      )}
    </nav>
  );
}

export function TopicDetailPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [topicSlug]);

  if (!topicSlug || !TOPICS_BY_SLUG[topicSlug]) {
    return (
      <div className="card text-center">
        <h1 className="text-2xl font-bold text-slate-900">Tema no encontrado</h1>
        <p className="text-base text-slate-600 mt-2">
          El tema que busca no existe o el enlace puede ser incorrecto.
        </p>
        <button
          type="button"
          onClick={() => navigate('/educacion')}
          className="btn-primary mt-6"
        >
          Ver todos los temas
        </button>
      </div>
    );
  }

  const topic = TOPICS_BY_SLUG[topicSlug];

  const currentIndex = TOPICS.findIndex((t) => t.slug === topicSlug);
  const prevTopic = currentIndex > 0 ? TOPICS[currentIndex - 1] : undefined;
  const nextTopic =
    currentIndex >= 0 && currentIndex < TOPICS.length - 1
      ? TOPICS[currentIndex + 1]
      : undefined;

  if (topic.category === 'glosario') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>
        <GlosarioView />
        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'reconocer-sintomas') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <RecognizeSymptomsContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'que-es-infarto') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <HeartAttackIntroContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'factores-riesgo') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <RiskFactorsContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'habitos-saludables') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <HealthyHabitsContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'capacitacion-primeros-auxilios') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <FirstAidTrainingContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'numero-emergencias') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <EmergencyNumberContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'que-hacer-emergencia') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <EmergencyActionContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  if (topic.slug === 'tiempo-reaccion') {
    return (
      <article className="space-y-6">
        <header className="space-y-3">
          <span
            className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
            aria-hidden="true"
          >
            <topic.Icon className="w-8 h-8" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
        </header>

        <TopicTip
          variant="warning"
          title={topic.importantNote.title}
          text={topic.importantNote.text}
        />

        <ReactionTimeContent />

        <TopicPagination prev={prevTopic} next={nextTopic} />
      </article>
    );
  }

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <span
          className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-primary"
          aria-hidden="true"
        >
          <topic.Icon className="w-8 h-8" />
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{topic.title}</h1>
        <p className="text-lg text-slate-600 italic max-w-3xl">{topic.subtitle}</p>
      </header>

      <TopicTip
        variant="warning"
        title={topic.importantNote.title}
        text={topic.importantNote.text}
      />

      <TopicContent blocks={topic.blocks} />

      <section
        aria-labelledby="closing-title"
        className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6"
      >
        <h2 id="closing-title" className="text-lg font-bold text-slate-900">
          Lo que se lleva
        </h2>
        <p className="text-lg text-slate-800 mt-2 leading-relaxed">{topic.closing}</p>
      </section>

      <TopicPagination prev={prevTopic} next={nextTopic} />
    </article>
  );
}
