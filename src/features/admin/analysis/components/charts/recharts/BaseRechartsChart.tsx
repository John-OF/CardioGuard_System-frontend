import type { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';
import { ChartEmptyState } from '../ChartEmptyState';

interface BaseRechartsChartProps {
  data?: unknown[];
  height?: number;
  emptyMessage?: string;
  children: ReactElement;
  className?: string;
}

export function BaseRechartsChart({
  data,
  height = 300,
  emptyMessage,
  children,
  className,
}: BaseRechartsChartProps) {
  const hasData = Array.isArray(data) && data.length > 0;

  if (!hasData) {
    return (
      <ChartEmptyState
        message={emptyMessage ?? 'No hay datos suficientes para generar este gráfico.'}
      />
    );
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
