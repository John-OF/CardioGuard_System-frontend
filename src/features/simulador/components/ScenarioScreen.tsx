import type { Scenario } from '../data/scenarios';
import { ScenarioOption } from './ScenarioOption';

interface ScenarioScreenProps {
  scenario: Scenario;
  index: number;
  total: number;
  value: string | string[] | undefined;
  onSelectSingle: (value: string) => void;
  onToggleMulti: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  submitting: boolean;
}

export function ScenarioScreen({
  scenario,
  index,
  total,
  value,
  onSelectSingle,
  onToggleMulti,
  onPrev,
  onNext,
  isFirst,
  isLast,
  submitting,
}: ScenarioScreenProps) {
  const multi = scenario.kind === 'multi';
  const selectedValues = multi
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === 'string'
      ? [value]
      : [];

  const answered = multi ? selectedValues.length > 0 : selectedValues.length === 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-4xl mb-5">
        {scenario.icon}
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 leading-tight">
        {scenario.title}
      </h2>

      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 sm:p-6">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary border-2 border-primary/30 text-base font-bold mb-4">
          Escenario {index + 1} de {total}
        </span>
        <p className="text-lg font-bold text-slate-900 mb-5 leading-relaxed">
          {scenario.situation}
        </p>

        <p className="text-xl font-bold text-primary mb-4">{scenario.question}</p>
        {multi && (
          <p className="text-base text-slate-500 mb-4">
            Puede seleccionar todas las opciones que considere correctas.
          </p>
        )}

        <div className="grid gap-3">
          {scenario.options.map((opt) => (
            <ScenarioOption
              key={opt.value}
              label={opt.label}
              multi={multi}
              selected={selectedValues.includes(opt.value)}
              onClick={() =>
                multi ? onToggleMulti(opt.value) : onSelectSingle(opt.value)
              }
            />
          ))}
        </div>

        {answered && (
          <div className="mt-5 p-4 rounded-2xl bg-primary-light border-2 border-primary text-primary text-lg font-bold">
            Respuesta registrada. Puede continuar al siguiente caso.
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst || submitting}
          className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!answered || submitting}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting
            ? 'Enviando...'
            : isLast
              ? 'Finalizar y ver resultados'
              : 'Continuar'}
        </button>
      </div>

      <p className="text-base text-slate-400 mt-5">
        Avance a su ritmo. Durante el simulador no se muestran respuestas correctas.
      </p>
    </div>
  );
}
