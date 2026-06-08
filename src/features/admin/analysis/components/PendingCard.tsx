interface PendingCardProps {
  title: string;
  description: string;
  reason: string;
}

export function PendingCard({ title, description, reason }: PendingCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 opacity-70">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </span>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
          <p className="mt-1 text-xs text-slate-400 italic">{reason}</p>
        </div>
      </div>
    </div>
  );
}
