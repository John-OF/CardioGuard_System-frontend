import type { ChangeResult } from '@/types/results';

export interface ChangeTheme {
  result: ChangeResult;
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  // Nombre del ícono interno: lo dibuja ChangePill
  icon: 'up' | 'down' | 'minus';
}

export const CHANGE_THEMES: Record<ChangeResult, ChangeTheme> = {
  mejoró: {
    result: 'mejoró',
    label: 'Mejoró',
    bgClass: 'bg-green-50',
    textClass: 'text-green-800',
    borderClass: 'border-green-200',
    icon: 'up',
  },
  empeoró: {
    result: 'empeoró',
    label: 'Empeoró',
    bgClass: 'bg-red-50',
    textClass: 'text-red-800',
    borderClass: 'border-red-200',
    icon: 'down',
  },
  'sin cambios': {
    result: 'sin cambios',
    label: 'Sin cambios',
    bgClass: 'bg-slate-50',
    textClass: 'text-slate-700',
    borderClass: 'border-slate-200',
    icon: 'minus',
  },
};