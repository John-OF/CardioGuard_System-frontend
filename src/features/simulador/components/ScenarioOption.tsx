interface ScenarioOptionProps {
  label: string;
  selected: boolean;
  multi: boolean;
  onClick: () => void;
}

export function ScenarioOption({ label, selected, multi, onClick }: ScenarioOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full text-left p-5 rounded-2xl border-2 text-lg transition-all duration-150 flex items-center gap-4
        ${
          selected
            ? 'border-primary bg-primary-light font-bold text-slate-900'
            : 'border-slate-200 bg-white text-slate-800 hover:border-primary hover:bg-primary-light/50'
        }`}
    >
      <span
        aria-hidden="true"
        className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border-2 ${
          multi ? 'rounded-md' : 'rounded-full'
        } ${selected ? 'border-primary bg-primary text-white' : 'border-slate-300'}`}
      >
        {selected ? '✓' : ''}
      </span>
      <span className="flex-1">{label}</span>
    </button>
  );
}
