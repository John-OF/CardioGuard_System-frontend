interface ProgressBarProps {
  current: number;   // paso actual (0-indexed)
  total: number;     // total de pasos
  labels?: string[]; // etiquetas opcionales por paso
}

export function ProgressBar({ current, total, labels }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="space-y-3">
      {/* Texto contextual */}
      <div className="flex items-center justify-between text-base">
        <span className="font-semibold text-slate-700">
          Paso {current + 1} de {total}
        </span>
        {labels && labels[current] && (
          <span className="text-slate-600">{labels[current]}</span>
        )}
      </div>

      {/* Barra */}
      <div
        className="w-full h-3 bg-slate-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Progreso: paso ${current + 1} de ${total}`}
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Indicadores de paso */}
      <div className="flex justify-between gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i <= current ? 'bg-primary' : 'bg-slate-200'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}