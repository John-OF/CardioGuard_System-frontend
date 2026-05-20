import type { RiskLevel } from '@/types/results';
import { RISK_LABEL, RISK_BADGE } from '../utils/format';

export function RiskBadge({ level }: { level: RiskLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${RISK_BADGE[level]}`}
    >
      {RISK_LABEL[level]}
    </span>
  );
}
