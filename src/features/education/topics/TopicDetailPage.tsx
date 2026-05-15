import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { TOPICS_BY_SLUG } from '../data/topicContents';
import { getRelatedTopics } from '../utils/priorityMatcher';
import { TopicContent } from '../components/TopicContent';
import { TopicTip } from '../components/TopicTip';
import { TopicCard } from '../components/TopicCard';

export function TopicDetailPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const navigate = useNavigate();

  // Al cambiar de tema, subir al inicio de la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [topicSlug]);

  if (!topicSlug || !TOPICS_BY_SLUG[topicSlug]) {
    return (
      <div className="card text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Tema no encontrado
        </h1>
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
  const related = getRelatedTopics(topicSlug, 2);

  const lastResult = storage.getLastResult();
  const showPostTestCTA =
    lastResult !== null && lastResult.evaluation_type === 'pre_test';

  return (
    <article className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/educacion')}
        className="text-primary font-semibold text-base hover:underline inline-flex items-center gap-1"
      >
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
        Volver a temas
      </button>

      <header className="space-y-3">
        <span
          className="inline-flex w-16 h-16 rounded-2xl bg-primary-light items-center justify-center text-4xl"
          aria-hidden="true"
        >
          {topic.icon}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          {topic.title}
        </h1>
        <p className="text-lg text-slate-600 italic max-w-3xl">
          {topic.subtitle}
        </p>
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
        <h2
          id="closing-title"
          className="text-lg font-bold text-slate-900"
        >
          Lo que se lleva
        </h2>
        <p className="text-lg text-slate-800 mt-2 leading-relaxed">
          {topic.closing}
        </p>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="space-y-4">
          <h2
            id="related-title"
            className="text-2xl font-bold text-slate-900"
          >
            Continúe aprendiendo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((t) => (
              <TopicCard key={t.slug} topic={t} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/educacion')}
          className="btn-secondary w-full sm:w-auto"
        >
          Ver todos los temas
        </button>
        {showPostTestCTA && (
          <button
            type="button"
            onClick={() => navigate('/evaluacion')}
            className="btn-primary w-full sm:w-auto"
          >
            Hacer mi evaluación final
          </button>
        )}
      </div>
    </article>
  );
}