import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { formatEvaluationDate } from '@/utils/dateFormat';
import type { StoredPredictResponseData } from '@/types/results';

import { ResultsLayout } from './components/ResultsLayout';
import { PostTestBanner } from './components/PostTestBanner';
import { RiskLevelCard } from './components/RiskLevelCard';
import { MLProbabilityCard } from './components/MLProbabilityCard';
import { PreparednessCard } from './components/PreparednessCard';
import { BMICard } from './components/BMICard';
import { RecommendationsList } from './components/RecommendationsList';
import { EducationPreviewCard } from './components/EducationPreviewCard';
import { ResultsActions } from './components/ResultsActions';

export function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<StoredPredictResponseData | null>(null);

  useEffect(() => {
    const stored = storage.getLastResult();
    if (!stored) {
      navigate('/evaluacion', { replace: true });
      return;
    }
    setResult(stored);
  }, [navigate]);

  if (!result) {
    return (
      <div className="card text-center text-lg text-slate-600">
        Cargando resultados...
      </div>
    );
  }

  const evaluationDate = formatEvaluationDate(result._saved_at);
  const isPostTest = result.evaluation_type === 'post_test';

  return (
    <ResultsLayout evaluationDate={evaluationDate}>
      {isPostTest && <PostTestBanner />}
      <RiskLevelCard level={result.risk.level} />
      <MLProbabilityCard probability={result.ml.probability} />
      <PreparednessCard
        score={result.preparedness.score}
        level={result.preparedness.level}
      />
      <BMICard bmi={result.derived.bmi} category={result.derived.bmi_category} />
      <RecommendationsList recommendations={result.recommendations} />
      <EducationPreviewCard
        topics={result.education.topics}
        priorityLevel={result.education.priority_level}
      />
      <ResultsActions />
    </ResultsLayout>
  );
}