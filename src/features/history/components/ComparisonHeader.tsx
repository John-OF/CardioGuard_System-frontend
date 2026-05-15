import type { ComparisonSummary } from '@/types/results';
import { formatEvaluationDate } from '@/utils/dateFormat';

interface ComparisonHeaderProps {
  preDate: string;
  postDate: string;
  comparison: ComparisonSummary;
}

function buildNarrative(summary: ComparisonSummary): string {
  const eduUp = summary.education_result === 'mejoró';
  const eduDown = summary.education_result === 'empeoró';
  const emgUp = summary.emergency_result === 'mejoró';
  const emgDown = summary.emergency_result === 'empeoró';

  if (eduUp && emgUp) {
    return 'Su preparación mejoró en todas las áreas evaluadas. ¡Excelente progreso!';
  }
  if (eduUp && !emgDown) {
    return 'Mejoró sus conocimientos sobre salud cardiovascular.';
  }
  if (emgUp && !eduDown) {
    return 'Mejoró su preparación ante emergencias.';
  }
  if (eduDown && emgDown) {
    return 'Sus respuestas indican algunos cambios que conviene conversar con su médico o tutor.';
  }
  if (eduDown || emgDown) {
    return 'Algunas respuestas cambiaron respecto a su evaluación anterior. Le recomendamos revisar el módulo educativo.';
  }
  return 'Sus resultados se mantienen estables respecto a su evaluación anterior.';
}

export function ComparisonHeader({ preDate, postDate, comparison }: ComparisonHeaderProps) {
  const formattedPre = formatEvaluationDate(preDate);
  const formattedPost = formatEvaluationDate(postDate);
  const narrative = buildNarrative(comparison);

  return (
    <header className="space-y-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Comparación de su ciclo
        </h1>
        <p className="text-base text-slate-600 mt-2">
          Evaluación inicial: <span className="font-semibold">{formattedPre}</span>
          <span className="mx-2">·</span>
          Evaluación final: <span className="font-semibold">{formattedPost}</span>
        </p>
      </div>
      <div className="card bg-primary-light border-primary/30">
        <p className="text-lg text-slate-800">{narrative}</p>
      </div>
    </header>
  );
}