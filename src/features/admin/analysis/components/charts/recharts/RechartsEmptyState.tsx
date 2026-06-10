import { ChartEmptyState } from '../ChartEmptyState';
import type { ChartEmptyReason } from '../chartTypes';

interface RechartsEmptyStateProps {
  reason?: ChartEmptyReason;
  message?: string;
}

export function RechartsEmptyState({ reason, message }: RechartsEmptyStateProps) {
  return <ChartEmptyState reason={reason} message={message} />;
}
