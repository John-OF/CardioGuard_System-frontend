import { IconCheck } from '@/components/ui/icons';
import type { Lesson, LessonBlock } from '../data/lessons';

interface LessonCardProps {
  lesson: Lesson;
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
}

function BlockRenderer({ block }: { block: LessonBlock }) {
  if (block.type === 'content-grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        {block.items.map((item, i) => (
          <div
            key={i}
            className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5"
          >
            <p className="text-base font-bold text-primary mb-2">{item.title}</p>
            <p className="text-lg text-slate-700">{item.text}</p>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === 'signal-list') {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-4 items-start bg-slate-50 border-2 border-slate-200 rounded-2xl p-4"
          >
            <span className="flex-shrink-0 text-2xl font-bold text-red-600 leading-tight">!</span>
            <span className="text-lg text-slate-800">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'step-list') {
    return (
      <ol className="mt-5 space-y-3">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-4 items-start bg-slate-50 border-2 border-slate-200 rounded-2xl p-4"
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-lg text-slate-800 pt-1">{item}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (block.type === 'danger-list') {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-4 items-start bg-red-50 border-2 border-red-200 rounded-2xl p-4"
          >
            <span className="flex-shrink-0 text-2xl font-bold text-red-700 leading-tight">×</span>
            <span className="text-lg text-slate-800">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'summary-list') {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-lg text-slate-800"
          >
            <IconCheck aria-hidden className="w-5 h-5 shrink-0 mt-1 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'warning') {
    return (
      <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-5 text-lg text-slate-800">
        {block.text}
      </div>
    );
  }

  if (block.type === 'example') {
    return (
      <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-5 text-lg text-slate-700 italic">
        {block.text}
      </div>
    );
  }

  if (block.type === 'notice') {
    return (
      <div className="mt-5 bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-5 text-base text-slate-600">
        {block.text}
      </div>
    );
  }

  return null;
}

export function LessonCard({ lesson, step, total, onPrev, onNext, onFinish }: LessonCardProps) {
  const isLast = step === total - 1;
  const isFirst = step === 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary mb-5">
        <lesson.Icon className="w-10 h-10" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 leading-tight">
        {lesson.title}
      </h2>

      <p className="text-lg text-slate-700 mb-5 leading-relaxed">{lesson.text}</p>

      <div className="bg-red-50 border-l-8 border-red-500 rounded-2xl p-5 text-lg font-bold text-slate-900">
        {lesson.keyMessage}
      </div>

      {lesson.blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onFinish}
            className="btn-primary"
          >
            Hacer la simulación
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="btn-primary"
          >
            {isFirst ? 'Comenzar' : 'Entendido, continuar'}
          </button>
        )}
      </div>

      <p className="text-base text-slate-400 mt-5">
        Avance a su ritmo. Puede regresar para revisar la información.
      </p>
    </div>
  );
}
