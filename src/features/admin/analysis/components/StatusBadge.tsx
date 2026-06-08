interface StatusBadgeProps {
  status: 'implemented' | 'pending' | 'postponed';
}

const STYLES: Record<string, string> = {
  implemented: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  postponed: 'bg-slate-100 text-slate-500 border-slate-200',
};

const LABELS: Record<string, string> = {
  implemented: 'Implementado',
  pending: 'Pendiente',
  postponed: 'Pausado',
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
