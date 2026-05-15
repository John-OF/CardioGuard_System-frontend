import type { Priority } from '@/types/results';

export const ML_DISCLAIMER =
  'Esta cifra es una estimación basada en sus respuestas. No es un diagnóstico médico. Solo su doctor puede confirmar su estado de salud.';

export const TOPICS_PREVIEW_LIMIT = 4;

export const PRIORITY_LABELS: Record<Priority, string> = {
  alta: 'Prioridad alta',
  media: 'Prioridad media',
  baja: 'Prioridad baja',
};

export const PRIORITY_STYLES: Record<Priority, string> = {
  alta: 'bg-primary text-white',
  media: 'bg-primary-light text-primary',
  baja: 'bg-slate-100 text-slate-700',
};