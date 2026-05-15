import type { ChangeResult } from '@/types/results';
import { ChangePill } from './ChangePill';

interface KnowledgeBarProps {
  label: string;
  score: number;
  max: number;
  highlighted?: boolean;
}

function KnowledgeBar({ label, score, max, highlighted = false }: KnowledgeBarProps) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-base font-semibold text-slate-700">{label}</span>
        <span className="text-base font-bold text-slate-900">
          {score} <span className="text-slate-500 font-normal">/ {max}</span>
        </span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            highlighted ? 'bg-primary' : 'bg-slate-400'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface DimensionProps {
  title: string;
  preScore: number;
  postScore: number;
  max: number;
  result: ChangeResult;
}

function Dimension({ title, preScore, postScore, max, result }: DimensionProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <ChangePill result={result} />
      </div>
      <div className="space-y-4">
        <KnowledgeBar label="Antes" score={preScore} max={max} />
        <KnowledgeBar
          label="Después"
          score={postScore}
          max={max}
          highlighted={result === 'mejoró'}
        />
      </div>
    </div>
  );
}

interface KnowledgeComparisonProps {
  educationPre: number;
  educationPost: number;
  educationResult: ChangeResult;
  emergencyPre: number;
  emergencyPost: number;
  emergencyResult: ChangeResult;
}

export function KnowledgeComparison({
  educationPre,
  educationPost,
  educationResult,
  emergencyPre,
  emergencyPost,
  emergencyResult,
}: KnowledgeComparisonProps) {
  return (
    <section aria-labelledby="know-cmp-title" className="space-y-4">
      <h2 id="know-cmp-title" className="text-xl font-semibold text-slate-900">
        Su aprendizaje
      </h2>
      <Dimension
        title="Conocimiento sobre salud cardiovascular"
        preScore={educationPre}
        postScore={educationPost}
        max={12}
        result={educationResult}
      />
      <Dimension
        title="Preparación ante emergencias"
        preScore={emergencyPre}
        postScore={emergencyPost}
        max={8}
        result={emergencyResult}
      />
    </section>
  );
}