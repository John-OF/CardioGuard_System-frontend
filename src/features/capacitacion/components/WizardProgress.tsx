interface WizardProgressProps {
  current: number;
  total: number;
}

export function WizardProgress({ current, total }: WizardProgressProps) {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex justify-between items-center text-base font-bold text-slate-700 mb-3">
        <span>Paso {current + 1} de {total}</span>
        <span className="text-slate-500 font-normal">Capacitación informativa</span>
      </div>
      <div
        className="w-full h-4 bg-slate-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Avance de la capacitación"
      >
        <div
          className="h-full bg-primary rounded-full transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
