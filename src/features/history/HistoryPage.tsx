import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistoryData } from './hooks/useHistoryData';
import { HistoryEmpty } from './components/HistoryEmpty';
import { CycleListItem } from './components/CycleListItem';
import { RegularEvaluationItem } from './components/RegularEvaluationItem';
import { IndividualToggle } from './components/IndividualToggle';

export function HistoryPage() {
  const navigate = useNavigate();
  const state = useHistoryData();
  const [showRegulars, setShowRegulars] = useState(false);

  if (state.status === 'loading') {
    return (
      <div className="card text-center text-lg text-slate-600">
        Cargando su historial...
      </div>
    );
  }

  if (state.status === 'no_user' || state.status === 'empty') {
    return <HistoryEmpty />;
  }

  if (state.status === 'error') {
    return (
      <div className="card text-center">
        <p className="text-lg text-slate-700">
          No pudimos cargar su historial en este momento. Intente de nuevo más tarde.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-secondary mt-4"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const { cycles, regularEvaluations, historyById } = state;
  const totalCycles = cycles.length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Mi historial
        </h1>
        <p className="text-base text-slate-600 mt-2">
          Aquí puede ver el progreso de sus evaluaciones a lo largo del tiempo.
        </p>
      </header>

      {cycles.length === 0 && regularEvaluations.length > 0 && (
        <div className="card bg-amber-50 border-amber-200">
          <p className="text-base text-slate-700">
            Aún no ha realizado un ciclo de evaluación completo (pre-test y post-test).
            Sus evaluaciones individuales se muestran más abajo.
          </p>
        </div>
      )}

      {cycles.length > 0 && (
        <section aria-label="Ciclos de evaluación" className="space-y-4">
          {cycles.map((cycle, idx) => (
            <CycleListItem
              key={cycle.pre_test.evaluation_id}
              cycle={cycle}
              cycleNumber={totalCycles - idx}
              historyById={historyById}
            />
          ))}
        </section>
      )}

      {regularEvaluations.length > 0 && (
        <section aria-label="Evaluaciones individuales" className="space-y-3">
          <IndividualToggle
            count={regularEvaluations.length}
            expanded={showRegulars}
            onToggle={() => setShowRegulars((v) => !v)}
          />
          {showRegulars && (
            <div className="space-y-3">
              {regularEvaluations.map((item) => (
                <RegularEvaluationItem key={item.evaluation_id} item={item} />
              ))}
            </div>
          )}
        </section>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/evaluacion')}
          className="btn-primary w-full sm:w-auto"
        >
          Nueva evaluación
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-secondary w-full sm:w-auto"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}