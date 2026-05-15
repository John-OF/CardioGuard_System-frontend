export function PostTestBanner() {
  return (
    <div
      className="rounded-2xl border-2 border-primary/30 bg-primary-light p-5 flex gap-4 items-start"
      role="status"
    >
      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <div>
        <p className="text-lg font-semibold text-slate-900">
          Esta es su segunda evaluación
        </p>
        <p className="text-base text-slate-700 mt-1">
          Puede ver la comparación completa con su evaluación anterior en su historial.
        </p>
      </div>
    </div>
  );
}