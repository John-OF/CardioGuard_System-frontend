import type { Priority } from '@/types/results';

interface PriorityBannerProps {
  priorityLevel: Priority;
  recommendedCount: number;
}

const PRIORITY_INTRO: Record<Priority, string> = {
  alta:
    'Según su evaluación, hay varios temas que conviene revisar con atención. Le sugerimos comenzar por estos:',
  media:
    'Su evaluación mostró algunas áreas que vale la pena reforzar. Le recomendamos los siguientes temas:',
  baja:
    'Sus respuestas muestran buena preparación. Para mantenerse al día, le sugerimos repasar:',
};

export function PriorityBanner({ priorityLevel, recommendedCount }: PriorityBannerProps) {
  if (recommendedCount === 0) return null;
  return (
    <section
      className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary-light to-white p-5 sm:p-6"
      aria-labelledby="priority-banner-title"
    >
      <div className="flex items-start gap-4">
        <span
          className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-2xl"
          aria-hidden="true"
        >
          🎯
        </span>
        <div className="flex-1">
          <h2
            id="priority-banner-title"
            className="text-xl sm:text-2xl font-bold text-slate-900"
          >
            Temas más importantes para usted
          </h2>
          <p className="text-base text-slate-700 mt-2 leading-relaxed">
            {PRIORITY_INTRO[priorityLevel]}
          </p>
        </div>
      </div>
    </section>
  );
}