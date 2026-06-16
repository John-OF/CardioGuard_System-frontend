import type { RiskLevel } from '@/types/results';

/** 0..1 -> "73%" */
export function pct(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/** Porcentaje ya en escala 0..100 -> "73%" */
export function pctRaw(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/** Delta en escala 0..1 -> "+12 pts" / "-3 pts" / "0 pts" */
export function deltaPts(value: number): string {
  const points = Math.round(value * 100);
  if (points === 0) return '0 pts';
  return `${points > 0 ? '+' : ''}${points} pts`;
}

export function deltaSign(value: number): 'up' | 'down' | 'flat' {
  if (value > 0.0001) return 'up';
  if (value < -0.0001) return 'down';
  return 'flat';
}

export function shortDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/** Entero redondeado. null/undefined → fallback */
export function formatInteger(value: number | null | undefined, fallback = 'Sin datos'): string {
  if (value == null) return fallback;
  return Math.round(value).toString();
}

/** Edad promedio redondeada → "67 años". null → "Sin datos" */
export function formatAge(value: number | null | undefined): string {
  if (value == null) return 'Sin datos';
  return `${Math.round(value)} años`;
}

/** Decimal con dígitos controlados. null → fallback */
export function formatDecimal(value: number | null | undefined, digits = 1, fallback = 'Sin datos'): string {
  if (value == null) return fallback;
  return value.toFixed(digits);
}

export const RISK_LABEL: Record<RiskLevel, string> = {
  bajo: 'Bajo',
  moderado: 'Moderado',
  alto: 'Alto',
};

// Paleta sobria (tonos apagados) para los niveles de riesgo.
export const RISK_BADGE: Record<RiskLevel, string> = {
  bajo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  moderado: 'bg-amber-50 text-amber-700 border-amber-200',
  alto: 'bg-rose-50 text-rose-700 border-rose-200',
};
