import { useNavigate } from 'react-router-dom';

export function ResultsActions() {
  const navigate = useNavigate();
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
        onClick={() => navigate('/')}
        className="btn-secondary flex-1 sm:flex-none"
      >
        Volver al inicio
      </button>
    </div>
  );
}