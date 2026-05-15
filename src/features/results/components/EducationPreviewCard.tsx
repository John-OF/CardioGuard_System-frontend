import { useNavigate } from 'react-router-dom';
import type { Priority } from '@/types/results';
import {
  PRIORITY_LABELS,
  PRIORITY_STYLES,
  TOPICS_PREVIEW_LIMIT,
} from '../constants';

interface EducationPreviewCardProps {
  topics: string[];
  priorityLevel: Priority;
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

export function EducationPreviewCard({
  topics,
  priorityLevel,
}: EducationPreviewCardProps) {
  const navigate = useNavigate();
  const visibleTopics = topics.slice(0, TOPICS_PREVIEW_LIMIT);
  const remaining = topics.length - visibleTopics.length;

  return (
    <section
      className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary-light to-white p-6 sm:p-8"
      aria-labelledby="edu-title"
    >
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
          <BookIcon />
        </span>
        <div className="flex-1">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${PRIORITY_STYLES[priorityLevel]}`}
          >
            {PRIORITY_LABELS[priorityLevel]}
          </span>
          <h2 id="edu-title" className="text-2xl font-bold text-slate-900 mt-3">
            Para aprender más
          </h2>
          <p className="text-base text-slate-700 mt-2">
            Hemos preparado contenido educativo según sus respuestas:
          </p>
        </div>
      </div>

      {visibleTopics.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {visibleTopics.map((topic, i) => (
            <li
              key={i}
              className="px-4 py-2 rounded-full bg-white border border-primary/20 text-base text-slate-700"
            >
              {topic}
            </li>
          ))}
          {remaining > 0 && (
            <li className="px-4 py-2 rounded-full bg-white border border-primary/20 text-base text-slate-500 italic">
              +{remaining} {remaining === 1 ? 'tema más' : 'temas más'}
            </li>
          )}
        </ul>
      )}

      <button
        type="button"
        onClick={() => navigate('/educacion')}
        className="btn-primary mt-6 w-full sm:w-auto"
      >
        Ir al módulo educativo
      </button>
    </section>
  );
}