import type { CategoricalBarItem } from './CategoricalBarChart';
import type { ComparisonBarItem } from './ComparisonBarChart';
import { CHART_TONE_HEX } from './chartTheme';
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

export interface ChartJsBucketData {
  labels: string[];
  values: number[];
  percentages?: number[];
  colors?: string[];
}

const ML_PREDICTION_LABEL_MAP: Record<string, string> = {
  '0': 'Menor probabilidad ML',
  '1': 'Mayor probabilidad ML',
  bajo: 'Menor probabilidad ML',
  alto: 'Mayor probabilidad ML',
  low: 'Menor probabilidad ML',
  high: 'Mayor probabilidad ML',
  'menor probabilidad': 'Menor probabilidad ML',
  'mayor probabilidad': 'Mayor probabilidad ML',
};

const ML_PREDICTION_COLOR_MAP: Record<string, string> = {
  '0': CHART_TONE_HEX.lowRisk,
  '1': CHART_TONE_HEX.highRisk,
  bajo: CHART_TONE_HEX.lowRisk,
  alto: CHART_TONE_HEX.highRisk,
  low: CHART_TONE_HEX.lowRisk,
  high: CHART_TONE_HEX.highRisk,
  'menor probabilidad': CHART_TONE_HEX.lowRisk,
  'mayor probabilidad': CHART_TONE_HEX.highRisk,
};

export function transformRiskLevelDistributionChartJs(data: unknown): ChartJsBucketData | null {
  if (!data || typeof data !== 'object') return null;

  const d = data as Record<string, unknown>;
  const cf = d.categorical_frequencies as Record<string, unknown> | undefined;
  if (!cf) return null;

  const system = cf.system as Record<string, unknown> | undefined;
  if (!system) return null;

  const mlPrediction = system.ml_prediction;
  if (!Array.isArray(mlPrediction) || mlPrediction.length === 0) return null;

  const labels: string[] = [];
  const values: number[] = [];
  const percentages: number[] = [];
  const colors: string[] = [];

  for (const row of mlPrediction) {
    const r = row as { value?: string | number; count?: number; percentage?: number };
    if (typeof r.count !== 'number') continue;

    const rawKey = String(r.value ?? '').toLowerCase().trim();
    const mappedLabel = ML_PREDICTION_LABEL_MAP[rawKey] ?? String(r.value ?? '');

    labels.push(mappedLabel);
    values.push(r.count);
    percentages.push(typeof r.percentage === 'number' ? r.percentage : 0);

    const color = ML_PREDICTION_COLOR_MAP[rawKey];
    colors.push(color ?? CHART_TONE_HEX.highRisk);
  }

  if (labels.length === 0) return null;
  return { labels, values, percentages, colors };
}

export function transformMLProbabilityBucketsChartJs(data: unknown): ChartJsBucketData | null {
  if (!data || typeof data !== 'object') return null;

  const d = data as Record<string, unknown>;
  const histograms = d.histograms as Record<string, unknown> | undefined;
  if (!histograms) return null;

  const bins = histograms.ml_probability;
  if (!Array.isArray(bins) || bins.length === 0) return null;

  const total = bins.reduce((s: number, b: unknown) => {
    const bin = b as { count?: number };
    return s + (typeof bin.count === 'number' ? bin.count : 0);
  }, 0);

  if (total === 0) return null;

  const labels: string[] = [];
  const values: number[] = [];
  const percentages: number[] = [];
  const colors: string[] = [];

  for (const bin of bins) {
    const b = bin as { bin_start?: number; bin_end?: number; count?: number };
    if (typeof b.bin_start !== 'number' || typeof b.bin_end !== 'number' || typeof b.count !== 'number') continue;
    if (b.count === 0) continue;

    const startPct = (b.bin_start * 100).toFixed(0);
    const endPct = (b.bin_end * 100).toFixed(0);
    labels.push(`${startPct}% - ${endPct}%`);
    values.push(b.count);
    percentages.push((b.count / total) * 100);
    colors.push(CHART_TONE_HEX.ml);
  }

  if (labels.length === 0) return null;
  return { labels, values, percentages, colors };
}
