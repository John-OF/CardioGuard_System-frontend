interface StatusBadgeProps {
  status: 'implemented' | 'pending' | 'postponed' | 'planned' | 'insufficient_data';
}

const STYLES: Record<string, string> = {
  implemented: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  postponed: 'bg-slate-100 text-slate-500 border-slate-200',
  planned: 'bg-blue-50 text-blue-700 border-blue-200',
  insufficient_data: 'bg-slate-100 text-slate-500 border-slate-200',
};

const LABELS: Record<string, string> = {
  implemented: 'Implementado',
  pending: 'Pendiente',
  postponed: 'Pausado',
  planned: 'Planificado',
  insufficient_data: 'Datos insuficientes',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
