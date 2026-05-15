import { useNavigate } from 'react-router-dom';

export function HistoryEmpty() {
  const navigate = useNavigate();
  return (
    <div className="card text-center py-12">
      <h2 className="text-2xl font-bold text-slate-900">
        Aún no tiene evaluaciones
      </h2>
      <p className="text-lg text-slate-600 mt-3 max-w-md mx-auto">
        Una vez que realice su primera evaluación, podrá ver aquí su progreso
        a lo largo del tiempo.
      </p>
      <button
        type="button"
        onClick={() => navigate('/evaluacion')}
        className="btn-primary mt-6"
      >
        Realizar mi primera evaluación
      </button>
    </div>
  );
}