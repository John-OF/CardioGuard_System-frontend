export type ChartTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'lowRisk'
  | 'moderateRisk'
  | 'highRisk'
  | 'preTest'
  | 'postTest'
  | 'adequate'
  | 'notAdequate'
  | 'ml'
  | 'fuzzy';

export const CHART_TONE_CLASS: Record<ChartTone, string> = {
  neutral: 'bg-slate-400',
  primary: 'bg-blue-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-indigo-500',
  lowRisk: 'bg-emerald-500',
  moderateRisk: 'bg-amber-500',
  highRisk: 'bg-red-500',
  preTest: 'bg-blue-500',
  postTest: 'bg-emerald-500',
  adequate: 'bg-emerald-500',
  notAdequate: 'bg-red-500',
  ml: 'bg-purple-500',
  fuzzy: 'bg-orange-500',
};

export const CHART_TONE_HEX: Record<ChartTone, string> = {
  neutral: '#94a3b8',
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#6366f1',
  lowRisk: '#10b981',
  moderateRisk: '#f59e0b',
  highRisk: '#ef4444',
  preTest: '#3b82f6',
  postTest: '#22c55e',
  adequate: '#10b981',
  notAdequate: '#ef4444',
  ml: '#8b5cf6',
  fuzzy: '#f97316',
};
