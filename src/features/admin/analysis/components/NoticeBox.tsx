import type { ReactNode } from 'react';

interface NoticeBoxProps {
  variant?: 'info' | 'warning' | 'academic';
  children: ReactNode;
}

const VARIANTS: Record<string, string> = {
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  academic: 'border-slate-200 bg-slate-50 text-slate-600',
};

export function NoticeBox({ variant = 'info', children }: NoticeBoxProps) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${VARIANTS[variant]}`}
    >
      {children}
    </div>
  );
}
