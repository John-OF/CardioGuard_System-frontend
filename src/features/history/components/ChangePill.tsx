import type { ChangeResult } from '@/types/results';
import { CHANGE_THEMES } from '../utils/changeTheme';

interface ChangePillProps {
  result: ChangeResult;
  customLabel?: string;
}

function ArrowIcon({ direction }: { direction: 'up' | 'down' | 'minus' }) {
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function ChangePill({ result, customLabel }: ChangePillProps) {
  const theme = CHANGE_THEMES[result];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-semibold text-sm ${theme.bgClass} ${theme.textClass} ${theme.borderClass}`}
    >
      <ArrowIcon direction={theme.icon} />
      {customLabel ?? theme.label}
    </span>
  );
}