import { useNavigate } from 'react-router-dom';
import type { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  recommended?: boolean;
}

export function TopicCard({ topic, recommended = false }: TopicCardProps) {
  const navigate = useNavigate();
  return (
    <article
      className={`
        rounded-2xl bg-white p-5 sm:p-6 flex flex-col
        transition-all duration-150
        ${
          recommended
            ? 'border-2 border-primary shadow-sm'
            : 'border border-slate-200 hover:border-slate-300'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          {topic.icon}
        </span>
        {recommended && (
          <span className="ml-auto inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold uppercase tracking-wide">
            Recomendado
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mt-4">
        {topic.shortTitle}
      </h3>
      <p className="text-base text-slate-600 mt-2 leading-relaxed flex-1">
        {topic.shortDescription}
      </p>

      <button
        type="button"
        onClick={() => navigate(`/educacion/${topic.slug}`)}
        className="mt-5 inline-flex items-center gap-2 text-primary font-semibold text-base hover:underline self-start"
      >
        Leer más
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
      </button>
    </article>
  );
}