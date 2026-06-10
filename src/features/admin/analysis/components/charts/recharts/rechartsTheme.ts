export const RECHARTS_THEME = {
  defaultHeight: 350,
  margins: { top: 10, right: 20, left: 0, bottom: 5 },
  gridColor: '#e2e8f0',
  axis: {
    tickColor: '#64748b',
    tickFontSize: 12,
  },
  tooltip: {
    background: '#ffffff',
    border: '#e2e8f0',
    textColor: '#334155',
  },
  colors: {
    preTest: '#3b82f6',
    postTest: '#22c55e',
    riskLow: '#22c55e',
    riskModerate: '#f59e0b',
    riskHigh: '#ef4444',
    adequate: '#22c55e',
    notAdequate: '#ef4444',
    ml: '#8b5cf6',
    fuzzy: '#f97316',
    neutral: '#94a3b8',
  },
} as const;
