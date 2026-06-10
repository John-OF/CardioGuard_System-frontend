import type { CategoricalBarItem } from './CategoricalBarChart';
import type { HorizontalMetricItem } from './HorizontalMetricChart';
import type { ComparisonBarItem } from './ComparisonBarChart';
import type { ChartTone } from './chartTheme';

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
  if (!data || typeof data !== 'object') return [];

  const d = data as Record<string, unknown>;
  const groups = d.groups as Record<string, unknown> | null | undefined;
  if (!groups) return [];

  const allTests: Record<string, unknown>[] = [];

  const independent = groups.fuzzy_independent;
  if (Array.isArray(independent)) {
    allTests.push(...independent);
  }

  const dependent = groups.fuzzy_dependent;
  if (Array.isArray(dependent)) {
    allTests.push(...dependent);
  }

  const result: HorizontalMetricItem[] = [];

  for (const test of allTests) {
    if (test.valid !== true) continue;
    const coefficient = test.coefficient;
    if (typeof coefficient !== 'number') continue;

    const variables = test.variables as Record<string, unknown> | undefined;
    const x = variables?.x as Record<string, unknown> | undefined;
    const y = variables?.y as Record<string, unknown> | undefined;
    const xLabel = String(x?.label ?? x?.name ?? 'Variable X');
    const yLabel = String(y?.label ?? y?.name ?? 'Variable Y');

    const pValue = test.p_value;
    const strength = String(test.strength ?? '');
    const direction = String(test.direction ?? '');
    const method = String(test.method ?? '');

    const parts: string[] = [];
    if (strength) {
      parts.push(strength.charAt(0).toUpperCase() + strength.slice(1));
    }
    if (direction) {
      parts.push(direction);
    }
    if (typeof pValue === 'number') {
      parts.push(`p=${pValue.toFixed(3)}`);
    }
    if (method) {
      parts.push(`(${methodLabel(method)})`);
    }

    let tone: ChartTone = 'neutral';
    if (coefficient > 0.5) tone = 'success';
    else if (coefficient > 0) tone = 'primary';
    else if (coefficient < -0.5) tone = 'danger';
    else tone = 'info';

    result.push({
      label: `${xLabel} vs ${yLabel}`,
      value: coefficient,
      helperText: parts.length > 0 ? parts.join(' · ') : undefined,
      tone,
    });
  }

  return result;
}

function methodLabel(method: string): string {
  if (method === 'pearson') return 'Pearson';
  if (method === 'spearman') return 'Spearman';
  return method;
}

export function transformLogisticOddsRatios(data: unknown): HorizontalMetricItem[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformPreparednessLevels(data: unknown): CategoricalBarItem[] {
  if (!data || !Array.isArray(data)) return [];

  const toneMap: Record<string, ChartTone> = {
    baja: 'highRisk',
    bajo: 'highRisk',
    media: 'moderateRisk',
    moderada: 'moderateRisk',
    alta: 'lowRisk',
    alto: 'lowRisk',
  };

  const labelMap: Record<string, string> = {
    baja: 'Preparación baja',
    bajo: 'Preparación baja',
    media: 'Preparación media',
    moderada: 'Preparación media',
    alta: 'Preparación alta',
    alto: 'Preparación alta',
  };

  return data
    .map((item: Record<string, unknown>) => {
      const level = String(item.level ?? '');
      const count = item.count;
      const percentage = item.percentage;
      if (typeof count !== 'number') return null;
      return {
        label: labelMap[level.toLowerCase()] ?? level,
        value: count,
        percentage: typeof percentage === 'number' ? percentage : undefined,
        tone: toneMap[level.toLowerCase()] ?? 'neutral',
      } as CategoricalBarItem;
    })
    .filter((item): item is CategoricalBarItem => item !== null);
}

export function transformAdequateResponseDistribution(data: unknown): CategoricalBarItem[] {
  if (!data || typeof data !== 'object') return [];

  const d = data as Record<string, unknown>;
  const adequate = d.adequate_count;
  const nonAdequate = d.non_adequate_count;
  const adequatePct = d.adequate_percentage;
  const nonAdequatePct = d.non_adequate_percentage;

  if (typeof adequate !== 'number' && typeof nonAdequate !== 'number') return [];

  const total = (typeof adequate === 'number' ? adequate : 0) + (typeof nonAdequate === 'number' ? nonAdequate : 0);
  if (total === 0) return [];

  const result: CategoricalBarItem[] = [];

  if (typeof adequate === 'number') {
    result.push({
      label: 'Respuesta adecuada',
      value: adequate,
      percentage: typeof adequatePct === 'number' ? adequatePct : (total > 0 ? (adequate / total) * 100 : undefined),
      tone: 'adequate',
    });
  }

  if (typeof nonAdequate === 'number') {
    result.push({
      label: 'Respuesta no adecuada',
      value: nonAdequate,
      percentage: typeof nonAdequatePct === 'number' ? nonAdequatePct : (total > 0 ? (nonAdequate / total) * 100 : undefined),
      tone: 'notAdequate',
    });
  }

  return result;
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
