import type { ReactNode } from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface EvaluationLayoutProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  title: string;
  description?: string;
  children: ReactNode;
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
}

export function EvaluationLayout({
  currentStep,
  totalSteps,
  stepLabels,
  title,
  description,
  children,
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  isSubmitting = false,
}: EvaluationLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Barra de progreso */}
      <div className="card">
        <ProgressBar
          current={currentStep}
          total={totalSteps}
          labels={stepLabels}
        />
      </div>

      {/* Encabezado del paso + contenido */}
      <div className="card space-y-8">
        <header className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
          {description && (
            <p className="text-lg text-slate-600 mt-2">{description}</p>
          )}
        </header>

        <div className="space-y-8">{children}</div>
      </div>

      {/* Navegación */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstStep || isSubmitting}
          className="btn-secondary order-2 sm:order-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="btn-primary order-1 sm:order-2"
        >
          {isSubmitting
            ? 'Enviando...'
            : isLastStep
              ? 'Finalizar evaluación'
              : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}