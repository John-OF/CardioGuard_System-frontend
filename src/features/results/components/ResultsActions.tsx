import { useNavigate } from 'react-router-dom';
import type { EvaluationType } from '@/types/results';

interface ResultsActionsProps {
  evaluationType: EvaluationType;
}

export function ResultsActions({ evaluationType }: ResultsActionsProps) {
  const navigate = useNavigate();

  if (evaluationType === 'pre_test') {
    return (
      <div className="pt-2">
        <button
          type="button"
          onClick={() => navigate('/capacitacion')}
          className="btn-primary w-full sm:w-auto"
        >
          Ir a Capacitación
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button
        type="button"
        onClick={() => navigate('/historial')}
        className="btn-secondary flex-1 sm:flex-none"
      >
        Ver mi historial
      </button>
      <button
        type="button"
        onClick={() => navigate('/educacion')}
        className="btn-secondary flex-1 sm:flex-none"
      >
        Explorar Educación
      </button>
      <button
        type="button"
        onClick={() => navigate('/evaluacion')}
        className="btn-secondary flex-1 sm:flex-none"
      >
        Volver al inicio
      </button>
    </div>
  );
}
