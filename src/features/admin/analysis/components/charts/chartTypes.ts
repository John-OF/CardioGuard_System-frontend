export interface ChartPoint {
  time: string | number;
  value: number;
}

export interface ChartSeriesPoint {
  time: string | number;
  value: number;
}

export interface ChartBucket {
  label: string;
  count: number;
  percentage?: number;
}

export interface ChartCategoryValue {
  category: string;
  value: number;
  secondaryValue?: number;
}

export type ChartEmptyReason =
  | 'no_data'
  | 'insufficient_data'
  | 'endpoint_not_ready'
  | 'feature_not_implemented';

export type LightweightChartKind =
  | 'line'
  | 'area'
  | 'histogram'
  | 'bar';
