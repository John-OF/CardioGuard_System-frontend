import type { CategoricalBarItem } from './CategoricalBarChart';
import type { HorizontalMetricItem } from './HorizontalMetricChart';
import type { ComparisonBarItem } from './ComparisonBarChart';

export interface ChartPoint {
  time: string | number;
  value: number;
}

export interface PrePostScoreSet {
  category: string;
  preMean: number;
  postMean: number;
}

export function transformRiskLevelDistribution(data: unknown): CategoricalBarItem[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformMLProbabilityBuckets(data: unknown): CategoricalBarItem[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformPrePostScores(data: unknown): PrePostScoreSet[] {
  if (!data || typeof data !== 'object') return [];

  const d = data as Record<string, unknown>;
  const result: PrePostScoreSet[] = [];

  const sections: { key: string; label: string }[] = [
    { key: 'education', label: 'Educación' },
    { key: 'emergency', label: 'Emergencia' },
    { key: 'combined', label: 'Combinado' },
  ];

  for (const { key, label } of sections) {
    const section = d[key] as Record<string, unknown> | null | undefined;
    if (!section) continue;

    const preStats = section.pre_score_stats as Record<string, unknown> | null | undefined;
    const postStats = section.post_score_stats as Record<string, unknown> | null | undefined;

    const preMean = preStats?.mean;
    const postMean = postStats?.mean;

    if (typeof preMean === 'number' && typeof postMean === 'number') {
      result.push({ category: label, preMean, postMean });
    }
  }

  return result;
}

export function transformEmergencyPreparedness(data: unknown): CategoricalBarItem[] {
  if (!data || typeof data !== 'object') return [];

  const d = data as Record<string, unknown>;

  const fields: { key: string; label: string; tone?: 'success' | 'warning' | 'primary' | 'danger' | 'info' }[] = [
    { key: 'knows_emergency_number_percentage', label: 'Conoce número emergencia', tone: 'primary' },
    { key: 'calls_immediately_percentage', label: 'Llama inmediatamente', tone: 'success' },
    { key: 'acts_immediately_percentage', label: 'Actúa inmediatamente', tone: 'warning' },
    { key: 'adequate_support_action_percentage', label: 'Apoyo adecuado', tone: 'danger' },
    { key: 'has_prior_training_percentage', label: 'Capacitación previa', tone: 'info' },
  ];

  const result: CategoricalBarItem[] = [];

  for (const { key, label, tone } of fields) {
    const val = d[key];
    if (typeof val === 'number') {
      result.push({ label, value: val, tone });
    }
  }

  return result;
}

export function transformCorrelationStrengths(data: unknown): HorizontalMetricItem[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformLogisticOddsRatios(data: unknown): HorizontalMetricItem[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformContingencyTable(data: unknown): CategoricalBarItem[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformPrePostToComparison(data: unknown): ComparisonBarItem[] {
  const scores = transformPrePostScores(data);
  return scores.map((s) => ({
    label: s.category,
    firstLabel: 'Pre-test',
    firstValue: s.preMean,
    secondLabel: 'Post-test',
    secondValue: s.postMean,
  }));
}
