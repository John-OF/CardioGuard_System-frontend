import type { ReactNode } from 'react';

interface ResultsLayoutProps {
  children: ReactNode;
  evaluationDate: string | null;
}

export function ResultsLayout({ children, evaluationDate }: ResultsLayoutProps) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Sus resultados
        </h1>
        {evaluationDate && (
          <p className="text-base text-slate-500 mt-1">
            Evaluación realizada el {evaluationDate}
          </p>
        )}
      </header>
      {children}
    </div>
  );
}