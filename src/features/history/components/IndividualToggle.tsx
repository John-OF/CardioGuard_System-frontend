interface IndividualToggleProps {
  count: number;
  expanded: boolean;
  onToggle: () => void;
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-5 h-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function IndividualToggle({ count, expanded, onToggle }: IndividualToggleProps) {
  if (count === 0) return null;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-colors"
      aria-expanded={expanded}
    >
      <span className="text-lg font-semibold text-slate-700">
        {expanded ? 'Ocultar' : 'Ver'} evaluaciones individuales
      </span>
      <span className="flex items-center gap-3 text-slate-500">
        <span className="text-base">{count}</span>
        <ChevronIcon expanded={expanded} />
      </span>
    </button>
  );
}