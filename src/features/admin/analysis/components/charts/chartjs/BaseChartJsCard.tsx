import type { ReactNode } from 'react';
import { ChartCard } from '../ChartCard';
import { ChartJsEmptyState } from './ChartJsEmptyState';
import type { ChartEmptyReason } from '../chartTypes';

export interface BaseChartJsCardProps {
  title?: string;
  subtitle?: string;
  dataAvailable: boolean;
  emptyReason?: ChartEmptyReason;
  emptyMessage?: string;
  methodologicalNote?: string;
  children: ReactNode;
}

export function BaseChartJsCard({
  title,
  subtitle,
  dataAvailable,
  emptyReason = 'no_data',
  emptyMessage,
  methodologicalNote,
  children,
}: BaseChartJsCardProps) {
  if (!dataAvailable) {
    return (
      <ChartCard title={title ?? ''} subtitle={subtitle} methodologicalNote={methodologicalNote}>
        <ChartJsEmptyState reason={emptyReason} message={emptyMessage} />
      </ChartCard>
    );
  }

  return (
    <ChartCard title={title ?? ''} subtitle={subtitle} methodologicalNote={methodologicalNote}>
      <div className="relative" style={{ height: 300 }}>
        {children}
      </div>
    </ChartCard>
  );
}
