import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  methodologicalNote?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  methodologicalNote,
  children,
  footer,
}: ChartCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        )}
        {methodologicalNote && (
          <p className="mt-2 text-xs italic text-slate-400">
            Nota metodológica: {methodologicalNote}
          </p>
        )}
      </div>
      <div>{children}</div>
      {footer && (
        <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
}
