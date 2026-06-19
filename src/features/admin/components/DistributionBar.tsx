interface Segment {
  label: string;
  value: number;
  /** clase de color para la barra (paleta sobria) */
  colorClass: string;
}

interface DistributionBarProps {
  title: string;
  segments: Segment[];
  emptyMessage?: string;
}

/**
 * Lista de filas etiqueta + barra proporcional + conteo.
 * Mantiene una paleta apagada (slate/zinc) acorde al panel de tesistas.
 */
export function DistributionBar({ title, segments, emptyMessage }: DistributionBarProps) {
  const total = segments.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      {total === 0 && emptyMessage ? (
        <p className="mt-3 text-xs leading-5 text-slate-500">{emptyMessage}</p>
      ) : (
      <ul className="mt-3 space-y-2">
        {segments.map((s) => {
          const ratio = total > 0 ? s.value / total : 0;
          return (
            <li key={s.label}>
              <div className="flex items-baseline justify-between text-xs text-slate-600">
                <span>{s.label}</span>
                <span className="tabular-nums">
                  {s.value}{' '}
                  <span className="text-slate-400">
                    ({(ratio * 100).toFixed(0)}%)
                  </span>
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${s.colorClass}`}
                  style={{ width: `${Math.max(ratio * 100, total > 0 && s.value > 0 ? 2 : 0)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      )}
    </div>
  );
}
