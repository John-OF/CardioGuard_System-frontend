interface WizardProgressProps {
  // -1 = intro; 0..n-1 = escenario
  current: number;
  total: number;
}

export function WizardProgress({ current, total }: WizardProgressProps) {
  const isIntro = current < 0;
  // intro + escenarios como pasos del avance
  const percent = isIntro ? 0 : ((current + 1) / total) * 100;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex justify-between items-center text-base font-bold text-slate-700 mb-3">
        <span>
          {isIntro ? 'Inicio' : `Escenario ${current + 1} de ${total}`}
        </span>
        <span className="text-slate-500 font-normal">
          {isIntro ? 'Simulador no iniciado' : 'Evaluación práctica'}
        </span>
      </div>
      <div
        className="w-full h-4 bg-slate-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={isIntro ? 0 : current + 1}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Avance del simulador"
      >
        <div
          className="h-full bg-primary rounded-full transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
