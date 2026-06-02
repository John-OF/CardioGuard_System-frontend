import { useNavigate } from 'react-router-dom';
import { IconCompass, IconCheck } from '@/components/ui/icons';

interface SimuladorIntroProps {
  onStart: () => void;
}

export function SimuladorIntro({ onStart }: SimuladorIntroProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary mb-5">
        <IconCompass className="w-10 h-10" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 leading-tight">
        Antes de iniciar el simulador
      </h2>

      <p className="text-lg text-slate-700 mb-5 leading-relaxed">
        A continuación verá situaciones relacionadas con una posible emergencia
        cardiovascular. Lea con calma y elija qué haría en cada caso.
      </p>

      <div className="bg-amber-50 border-l-8 border-amber-400 rounded-2xl p-5 text-lg font-bold text-slate-900">
        Este simulador es la evaluación práctica posterior a la capacitación.
      </div>

      <ul className="mt-6 space-y-3">
        {[
          'Se mostrará una situación por pantalla.',
          'Debe elegir la acción que considera más adecuada.',
          'Durante el simulador no se muestran respuestas correctas o incorrectas.',
          'Al finalizar verá su resultado en la página de resultados.',
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-lg text-slate-800"
          >
            <IconCheck aria-hidden className="w-5 h-5 shrink-0 mt-1 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 bg-amber-50 border-l-8 border-amber-400 rounded-2xl p-5 text-base text-slate-600">
        Esta actividad es educativa. No reemplaza atención médica, diagnóstico
        profesional ni un curso certificado de RCP.
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate('/capacitacion')}
          className="btn-secondary"
        >
          Revisar capacitación
        </button>
        <button type="button" onClick={onStart} className="btn-primary">
          Iniciar simulador
        </button>
      </div>

      <p className="text-base text-slate-400 mt-5">
        Avance a su ritmo. No hay cronómetro visible.
      </p>
    </div>
  );
}
