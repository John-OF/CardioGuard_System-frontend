import type { DetectedFlow } from '../hooks/useAutoDetectEvaluationType';

interface FlowIntroProps {
  flow: DetectedFlow;
  onContinue: () => void;
  onStartNew: () => void;
}

export function FlowIntro({ flow, onContinue, onStartNew }: FlowIntroProps) {
  if (flow.type === 'continue_post_test') {
    return (
      <div className="card max-w-2xl mx-auto text-center space-y-6">
        <div className="text-5xl">📚</div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">
            ¿Listo para la segunda evaluación?
          </h1>
          <p className="text-lg text-slate-600">
            Ya completó la primera evaluación y revisó el material educativo.
            Ahora puede responder de nuevo el formulario para ver cuánto aprendió.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={onContinue} className="btn-primary">
            Comenzar segunda evaluación
          </button>
          <button onClick={onStartNew} className="btn-secondary">
            Empezar una evaluación nueva
          </button>
        </div>
      </div>
    );
  }

  if (flow.type === 'cycle_complete') {
    return (
      <div className="card max-w-2xl mx-auto text-center space-y-6">
        <div className="text-5xl">✅</div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">
            Ya completó un ciclo completo
          </h1>
          <p className="text-lg text-slate-600">
            ¿Le gustaría hacer una nueva evaluación para ver cómo está hoy?
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={onStartNew} className="btn-primary">
            Comenzar nueva evaluación
          </button>
        </div>
      </div>
    );
  }

  return null;
}