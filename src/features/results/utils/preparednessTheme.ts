import type { PreparednessLevel } from '@/types/results';

export interface PreparednessTheme {
  level: PreparednessLevel;
  label: string;
  message: string;
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  titleColorClass: string;
  barClass: string;
  badgeClass: string;
}

export const PREPAREDNESS_THEMES: Record<PreparednessLevel, PreparednessTheme> = {
  alta: {
    level: 'alta',
    label: 'Buena preparación',
    message:
      'Sus respuestas muestran que sabría cómo actuar ante una emergencia cardiovascular. Le recomendamos repasar de vez en cuando estos conocimientos para mantenerlos frescos.',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
    iconBgClass: 'bg-green-600',
    titleColorClass: 'text-green-800',
    barClass: 'bg-green-600',
    badgeClass: 'bg-green-100 text-green-800 border-green-200',
  },
  media: {
    level: 'media',
    label: 'Preparación parcial',
    message:
      'Tiene algunos conocimientos sobre cómo actuar ante una emergencia, pero hay áreas que conviene reforzar. El módulo educativo le ayudará a llenar esas brechas.',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    iconBgClass: 'bg-amber-600',
    titleColorClass: 'text-amber-800',
    barClass: 'bg-amber-600',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  baja: {
    level: 'baja',
    label: 'Preparación inicial',
    message:
      'Hay aspectos importantes sobre cómo actuar ante una emergencia cardiovascular que aún no domina. El módulo educativo está diseñado especialmente para usted.',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    iconBgClass: 'bg-red-600',
    titleColorClass: 'text-red-800',
    barClass: 'bg-red-600',
    badgeClass: 'bg-red-100 text-red-800 border-red-200',
  },
};