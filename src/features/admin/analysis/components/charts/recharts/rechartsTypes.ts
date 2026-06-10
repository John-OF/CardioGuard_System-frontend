export interface RechartsDataPoint {
  name: string;
  [key: string]: string | number | undefined;
}

export interface RechartsCategoryValue {
  category: string;
  value: number;
  secondaryValue?: number;
}

export interface RechartsSeriesConfig {
  dataKey: string;
  name: string;
  color: string;
}

export type RechartsValueFormatter = (value: number) => string;

export type RechartsChartVariant =
  | 'bar'
  | 'grouped-bar'
  | 'horizontal-bar'
  | 'stacked-bar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'scatter';
