import { useEffect, useState } from 'react';
import type { PreparednessLevel } from '@/types/results';
import { PREPAREDNESS_THEMES } from '../utils/preparednessTheme';

interface PreparednessCardProps {
  score: number; // 0..1
  level: PreparednessLevel;
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
      aria-hidden="true"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}

export function PreparednessCard({ score, level }: PreparednessCardProps) {
  const theme = PREPAREDNESS_THEMES[level];
  const target = Math.max(0, Math.min(1, score)) * 100;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setWidth(target), 100);
    return () => window.clearTimeout(t);
  }, [target]);

  return (
    <section
      className={`rounded-2xl border-2 ${theme.borderClass} ${theme.bgClass} p-6 sm:p-8`}
      aria-labelledby="prep-title"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
        <span
          className={`flex-shrink-0 w-20 h-20 rounded-2xl ${theme.iconBgClass} text-white flex items-center justify-center`}
        >
          <GraduationIcon />
        </span>
        <div className="flex-1 w-full">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
            Preparación ante emergencias
          </p>
          <h2
            id="prep-title"
            className={`text-2xl sm:text-3xl font-bold ${theme.titleColorClass} mt-1`}
          >
            {theme.label}
          </h2>

          <div className="mt-4">
            <div className="flex items-end justify-end mb-2">
              <span className="text-2xl font-bold text-slate-900">
                {target.toFixed(0)}%
              </span>
            </div>
            <div
              className="w-full h-4 bg-white/70 rounded-full overflow-hidden border border-white"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(target)}
              aria-label="Nivel de preparación ante emergencias"
            >
              <div
                className={`h-full ${theme.barClass} rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>

          <p className="text-base text-slate-700 mt-4 leading-relaxed">
            {theme.message}
          </p>
        </div>
      </div>
    </section>
  );
}