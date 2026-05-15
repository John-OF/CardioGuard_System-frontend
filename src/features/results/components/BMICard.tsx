import type { BMICategory } from '@/types/results';
import { BMI_THEMES, BMI_HEALTHY_RANGE } from '../utils/bmiTheme';

interface BMICardProps {
  bmi: number;
  category: BMICategory;
}

export function BMICard({ bmi, category }: BMICardProps) {
  const theme = BMI_THEMES[category];
  return (
    <section className="card" aria-labelledby="bmi-title">
      <h2 id="bmi-title" className="text-xl font-semibold text-slate-900">
        Su Índice de Masa Corporal
      </h2>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-5xl font-bold text-slate-900">{bmi.toFixed(1)}</p>
        <span
          className={`inline-flex items-center px-5 py-3 rounded-xl border-2 ${theme.bgClass} ${theme.textClass} ${theme.borderClass} font-semibold text-lg`}
        >
          {theme.label}
        </span>
      </div>
      <p className="text-base text-slate-600 mt-4 leading-relaxed">
        Un peso saludable para la mayoría de las personas se ubica entre{' '}
        <span className="font-semibold text-slate-800">{BMI_HEALTHY_RANGE}</span>.
        Su médico puede orientarle sobre lo más adecuado para usted.
      </p>
    </section>
  );
}