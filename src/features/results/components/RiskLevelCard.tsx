import type { RiskLevel } from '@/types/results';
import { RISK_THEMES } from '../utils/riskTheme';

interface RiskLevelCardProps {
  level: RiskLevel;
}

function RiskIcon({ level }: { level: RiskLevel }) {
  const className = 'w-12 h-12';
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  if (level === 'bajo') {
    // shield-check
    return (
      <svg {...common}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    );
  }
  if (level === 'moderado') {
    // alert-triangle
    return (
      <svg {...common}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" x2="12" y1="9" y2="13" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
      </svg>
    );
  }
  // heart-pulse
  return (
    <svg {...common}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </svg>
  );
}

export function RiskLevelCard({ level }: RiskLevelCardProps) {
  const theme = RISK_THEMES[level];
  return (
    <section
      className={`rounded-2xl border-2 ${theme.borderClass} ${theme.bgClass} p-6 sm:p-8`}
      aria-labelledby="risk-title"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
        <span
          className={`flex-shrink-0 w-20 h-20 rounded-2xl ${theme.iconBgClass} text-white flex items-center justify-center`}
        >
          <RiskIcon level={level} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
            Nivel de riesgo
          </p>
          <h2
            id="risk-title"
            className={`text-3xl sm:text-4xl font-bold ${theme.titleColorClass} mt-1`}
          >
            {theme.title}
          </h2>
          <p className="text-lg text-slate-700 mt-3 leading-relaxed">
            {theme.message}
          </p>
        </div>
      </div>
    </section>
  );
}