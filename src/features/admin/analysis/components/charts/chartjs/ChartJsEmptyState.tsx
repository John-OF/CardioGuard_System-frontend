import { ChartEmptyState } from '../ChartEmptyState';
import type { ChartEmptyReason } from '../chartTypes';

interface ChartJsEmptyStateProps {
  reason?: ChartEmptyReason;
  message?: string;
}

export function ChartJsEmptyState({ reason = 'no_data', message }: ChartJsEmptyStateProps) {
  return <ChartEmptyState reason={reason} message={message} />;
}
