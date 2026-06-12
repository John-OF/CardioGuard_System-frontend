export type WeightRange =
  | 'LT_50'
  | '50_59'
  | '60_69'
  | '70_79'
  | '80_89'
  | '90_99'
  | 'GTE_100';

export type HeightRange =
  | 'LT_140'
  | '140_149'
  | '150_159'
  | '160_169'
  | '170_179'
  | 'GTE_180';

export const WEIGHT_RANGES: Record<WeightRange, { label: string; approx: number }> = {
  LT_50: { label: 'Menos de 50 kg', approx: 45 },
  '50_59': { label: '50–59 kg', approx: 54.5 },
  '60_69': { label: '60–69 kg', approx: 64.5 },
  '70_79': { label: '70–79 kg', approx: 74.5 },
  '80_89': { label: '80–89 kg', approx: 84.5 },
  '90_99': { label: '90–99 kg', approx: 94.5 },
  GTE_100: { label: '100 kg o más', approx: 105 },
};

export const HEIGHT_RANGES: Record<HeightRange, { label: string; approx: number }> = {
  LT_140: { label: 'Menos de 140 cm', approx: 135 },
  '140_149': { label: '140–149 cm', approx: 144.5 },
  '150_159': { label: '150–159 cm', approx: 154.5 },
  '160_169': { label: '160–169 cm', approx: 164.5 },
  '170_179': { label: '170–179 cm', approx: 174.5 },
  GTE_180: { label: '180 cm o más', approx: 185 },
};

export function getApproxWeight(weightRange: WeightRange | undefined | null): number | null {
  if (!weightRange) return null;
  const entry = WEIGHT_RANGES[weightRange];
  return entry ? entry.approx : null;
}

export function getApproxHeight(heightRange: HeightRange | undefined | null): number | null {
  if (!heightRange) return null;
  const entry = HEIGHT_RANGES[heightRange];
  return entry ? entry.approx : null;
}

export function calculateApproxBmi(
  weightRange: WeightRange | undefined | null,
  heightRange: HeightRange | undefined | null,
): number | null {
  const weight = getApproxWeight(weightRange);
  const heightCm = getApproxHeight(heightRange);
  if (weight === null || heightCm === null) return null;
  const heightM = heightCm / 100;
  const bmi = weight / (heightM ** 2);
  return Number.isFinite(bmi) ? Math.round(bmi * 100) / 100 : null;
}
