import type { RiskLevel } from '@/types/results';

export interface RiskTheme {
  level: RiskLevel;
  title: string;
  message: string;
  bgClass: string;
  borderClass: string;
  iconBgClass: string;
  titleColorClass: string;
  barClass: string;
}

export const RISK_THEMES: Record<RiskLevel, RiskTheme> = {
  bajo: {
    level: 'bajo',
    title: 'Su riesgo es bajo',
    message:
      'Su corazón está en buenas condiciones según sus respuestas. Le recomendamos mantener sus hábitos saludables y continuar con sus chequeos médicos regulares.',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-200',
    iconBgClass: 'bg-green-600',
    titleColorClass: 'text-green-800',
    barClass: 'bg-green-600',
  },
  moderado: {
    level: 'moderado',
    title: 'Su riesgo es moderado',
    message:
      'Algunos factores sugieren que es importante prestar atención a su salud cardiovascular. Pequeños cambios en su día a día pueden marcar una gran diferencia.',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    iconBgClass: 'bg-amber-600',
    titleColorClass: 'text-amber-800',
    barClass: 'bg-amber-600',
  },
  alto: {
    level: 'alto',
    title: 'Su riesgo es alto',
    message:
      'Sus respuestas indican factores que merecen atención médica. Le recomendamos conversar con su doctor de confianza sobre estos resultados pronto.',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    iconBgClass: 'bg-red-600',
    titleColorClass: 'text-red-800',
    barClass: 'bg-red-600',
  },
};