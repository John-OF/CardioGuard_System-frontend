import type { BMICategory } from '@/types/results';

export interface BMITheme {
  category: BMICategory;
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export const BMI_THEMES: Record<BMICategory, BMITheme> = {
  bajo_peso: {
    category: 'bajo_peso',
    label: 'Peso bajo',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-200',
  },
  normal: {
    category: 'normal',
    label: 'Peso normal',
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
    borderClass: 'border-green-200',
  },
  sobrepeso: {
    category: 'sobrepeso',
    label: 'Sobrepeso',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-200',
  },
  obesidad: {
    category: 'obesidad',
    label: 'Obesidad',
    bgClass: 'bg-red-50',
    textClass: 'text-red-700',
    borderClass: 'border-red-200',
  },
};

export const BMI_HEALTHY_RANGE = '18.5 a 24.9';