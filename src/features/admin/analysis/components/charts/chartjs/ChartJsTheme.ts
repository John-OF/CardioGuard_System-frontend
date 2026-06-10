import type { ChartTone } from '../chartTheme';
import { CHART_TONE_HEX } from '../chartTheme';

export function chartJsColor(tone: ChartTone): string {
  return CHART_TONE_HEX[tone] ?? '#94a3b8';
}

export function chartJsColors(tones: ChartTone[]): string[] {
  return tones.map(chartJsColor);
}

export const CHARTJS_DEFAULT_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#475569',
        font: { family: 'Inter, system-ui, sans-serif', size: 12 },
      },
    },
    tooltip: {
      titleFont: { family: 'Inter, system-ui, sans-serif' },
      bodyFont: { family: 'Inter, system-ui, sans-serif' },
    },
  },
  scales: {
    x: {
      ticks: { color: '#64748b', font: { family: 'Inter, system-ui, sans-serif' } },
      grid: { color: '#f1f5f9' },
    },
    y: {
      ticks: { color: '#64748b', font: { family: 'Inter, system-ui, sans-serif' } },
      grid: { color: '#f1f5f9' },
    },
  },
} as const;
