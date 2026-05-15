import { useNavigate, useParams } from 'react-router-dom';
import { useComparisonData } from './hooks/useComparisonData';
import { ComparisonHeader } from './components/ComparisonHeader';
import { RiskComparison } from './components/RiskComparison';
import { KnowledgeComparison } from './components/KnowledgeComparison';

export function ComparisonPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const state = useComparisonData(postId);

  if (state.status === 'loading') {
    return (
      <div className="card text-center text-lg text-slate-600">
        Cargando comparación...
      </div>
    );
  }

  if (state.status === 'not_found' || state.status === 'invalid') {
    return (
      <div className="card text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          No pudimos cargar esta comparación
        </h1>
        <p className="text-base text-slate-600 mt-2">
          {state.status === 'not_found'
            ? 'La evaluación que busca no existe o fue eliminada.'
            : 'Esta evaluación no tiene una comparación disponible.'}
        </p>
        <button
          type="button"
          onClick={() => navigate('/historial')}
          className="btn-primary mt-6"
        >
          Volver al historial
        </button>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="card text-center">
        <p className="text-lg text-slate-700">
          Ocurrió un error al cargar la comparación. Intente más tarde.
        </p>
        <button
          type="button"
          onClick={() => navigate('/historial')}
          className="btn-secondary mt-4"
        >
          Volver al historial
        </button>
      </div>
    );
  }

  const { pre_test, post_test, comparison } = state.data;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/historial')}
        className="text-primary font-semibold text-base hover:underline inline-flex items-center gap-1"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Volver al historial
      </button>

      <ComparisonHeader
        preDate={pre_test.created_at}
        postDate={post_test.created_at}
        comparison={comparison}
      />

      <RiskComparison
        pre={pre_test}
        post={post_test}
        comparison={comparison}
      />

      <KnowledgeComparison
        educationPre={pre_test.education_score}
        educationPost={post_test.education_score}
        educationResult={comparison.education_result}
        emergencyPre={pre_test.emergency_score}
        emergencyPost={post_test.emergency_score}
        emergencyResult={comparison.emergency_result}
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/historial')}
          className="btn-secondary w-full sm:w-auto"
        >
          Volver al historial
        </button>
        <button
          type="button"
          onClick={() => navigate('/evaluacion')}
          className="btn-primary w-full sm:w-auto"
        >
          Realizar nueva evaluación
        </button>
      </div>
    </div>
  );
}