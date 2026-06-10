import { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import type { IChartApi, ChartOptions } from 'lightweight-charts';
import { ChartEmptyState } from './ChartEmptyState';
import type { ChartEmptyReason } from './chartTypes';

interface BaseLightweightChartProps {
  height?: number;
  options?: Partial<ChartOptions>;
  dataAvailable: boolean;
  emptyReason?: ChartEmptyReason;
  emptyMessage?: string;
  onInit: (chart: IChartApi) => void;
}

export function BaseLightweightChart({
  height = 300,
  options,
  dataAvailable,
  emptyReason = 'no_data',
  emptyMessage,
  onInit,
}: BaseLightweightChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onInitRef = useRef(onInit);
  const optionsRef = useRef(options);
  onInitRef.current = onInit;
  optionsRef.current = options;

  useEffect(() => {
    if (!dataAvailable || !containerRef.current) return;

    const chart = createChart(containerRef.current, {
      height,
      layout: {
        textColor: '#334155',
        background: { type: ColorType.Solid, color: '#ffffff' },
      },
      grid: {
        vertLines: { color: '#f1f5f9' },
        horzLines: { color: '#f1f5f9' },
      },
      ...optionsRef.current,
    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        chart.applyOptions({ width });
      }
    });

    resizeObserver.observe(containerRef.current);

    onInitRef.current(chart);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [dataAvailable, height]);

  if (!dataAvailable) {
    return <ChartEmptyState reason={emptyReason} message={emptyMessage} />;
  }

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%' }}
      role="img"
      aria-label="Gráfico de análisis"
    />
  );
}
