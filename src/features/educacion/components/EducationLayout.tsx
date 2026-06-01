import type { ReactNode } from 'react';

interface EducationLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function EducationLayout({ title, description, children }: EducationLayoutProps) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
        {description && (
          <p className="text-base text-slate-600 mt-2 max-w-3xl">{description}</p>
        )}
      </header>
      {children}
    </div>
  );
}