export interface ChartPoint {
  time: string | number;
  value: number;
}

export interface PrePostScoreSet {
  category: string;
  preMean: number;
  postMean: number;
}

export function transformRiskLevelDistribution(data: unknown): ChartPoint[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformMLProbabilityBuckets(data: unknown): ChartPoint[] {
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

export function transformEmergencyPreparedness(data: unknown): ChartPoint[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformCorrelationStrengths(data: unknown): ChartPoint[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}

export function transformLogisticOddsRatios(data: unknown): ChartPoint[] {
  if (!data || !Array.isArray(data)) return [];
  return [];
}
