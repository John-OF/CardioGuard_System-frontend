import { useNavigate } from 'react-router-dom';

interface EducationFooterProps {
  /**
   * Si el usuario tiene un pre-test pendiente, mostramos un CTA grande
   * invitándolo a hacer el post-test. Esto se calcula en EducationPage
   * leyendo el último resultado de sessionStorage.
   */
  showPostTestCTA: boolean;
}

export function EducationFooter({ showPostTestCTA }: EducationFooterProps) {
  const navigate = useNavigate();

  if (showPostTestCTA) {
    return (
      <section
        className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary-light to-white p-6 sm:p-8 text-center"
        aria-labelledby="post-test-cta-title"
      >
        <h2
          id="post-test-cta-title"
          className="text-2xl font-bold text-slate-900"
        >
          ¿Listo para evaluar lo aprendido?
        </h2>
        <p className="text-base text-slate-700 mt-3 max-w-xl mx-auto leading-relaxed">
          Cuando se sienta preparado, realice su evaluación final. Podrá comparar su
          progreso con la evaluación que hizo antes de aprender.
        </p>
        <button
          type="button"
          onClick={() => navigate('/evaluacion')}
          className="btn-primary mt-6"
        >
          Hacer mi evaluación final
        </button>
      </section>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button
        type="button"
        onClick={() => navigate('/historial')}
        className="btn-secondary w-full sm:w-auto"
      >
        Ver mi historial
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="btn-secondary w-full sm:w-auto"
      >
        Volver al inicio
      </button>
    </div>
  );
}