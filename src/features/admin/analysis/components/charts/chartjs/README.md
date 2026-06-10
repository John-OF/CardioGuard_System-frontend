# Chart.js — CardioGuard / Admin Analysis

Chart.js is the main charting library for professional academic/statistical charts in the CardioGuard Admin Analysis module.

## Why Chart.js

- General-purpose academic charts: bar, line, doughnut, pie, scatter, radar, mixed
- React integration via react-chartjs-2
- Modular registration for tree-shaking
- Spanish-compatible labels and tooltips

## Installation

```bash
npm install chart.js react-chartjs-2
```

Do NOT install from GitHub or use CDN.

## Infrastructure

```
src/features/admin/analysis/components/charts/chartjs/
├── BaseChartJsCard.tsx                # Wrapper with ChartCard + empty state
├── ChartJsEmptyState.tsx              # Delegates to CSS ChartEmptyState
├── ChartJsTheme.ts                    # Map project ChartTone to Chart.js colors
├── ChartJsRegistry.ts                 # Central Chart.js component registration
├── ChiSquareObservedExpectedChart.tsx     # Production Chart.js chart (chi-square contingency)
├── EmergencyIndicatorsBarChart.tsx        # Production Chart.js chart (emergency indicators bar)
├── PreparednessLevelsDoughnutChart.tsx    # Production Chart.js chart (preparedness donut)
├── AdequateResponseBarChart.tsx           # Production Chart.js chart (adequate response bar)
├── ChartJsSmokeTest.tsx                   # Minimal isolated verification (not in production)
└── README.md                          # This file
```

## Registration

Import `ChartJsRegistry.ts` once per entry point or per chart file:

```ts
import './ChartJsRegistry';
```

Registered components: CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Title, Filler.

## Usage

```tsx
import { Bar } from 'react-chartjs-2';
import './ChartJsRegistry';
import { BaseChartJsCard } from './chartjs/BaseChartJsCard';

<BaseChartJsCard title="Título" subtitle="Subtítulo" dataAvailable={hasData}>
  <Bar data={data} options={options} />
</BaseChartJsCard>
```

## Production charts

### ChiSquareObservedExpectedChart

Integrated into `ChiSquareAnalysisPage.tsx`. Shows a grouped bar chart comparing observed vs. expected frequencies from the first valid chi-square test.

Transformer: `transformChiSquareObservedExpectedChart` in `chartTransformers.ts`

### PrePostScoreChart

Integrated into `PrePostAnalysisPage.tsx` (migrated from CSS ComparisonBarChart in Block 21). Shows a horizontal grouped bar chart comparing average pre-test vs. post-test scores for Education, Emergency, and Combined dimensions.

Uses `transformPrePostToComparison` from `chartTransformers.ts`.

### PreparednessLevelsDoughnutChart

Integrated into `EmergencyAnalysisPage.tsx` (migrated from CSS CategoricalBarChart in Block 22). Shows a doughnut chart with proportional distribution of emergency preparedness levels (baja/media/alta).

Uses `transformPreparednessLevels` from `chartTransformers.ts` and color tones from `chartTheme.ts` (highRisk, moderateRisk, lowRisk).

### EmergencyIndicatorsBarChart

Integrated into `EmergencyAnalysisPage.tsx` (migrated from CSS CategoricalBarChart in Block 23). Shows a horizontal bar chart with percentage indicators for emergency preparedness dimensions (conoce número, llama inmediatamente, actúa inmediatamente, apoyo adecuado, capacitación previa).

Uses `transformEmergencyPreparedness` from `chartTransformers.ts` and individual bar colors from `chartTheme.ts` via each item's tone.

### AdequateResponseBarChart

Integrated into `EmergencyAnalysisPage.tsx` (migrated from CSS CategoricalBarChart in Block 24). Shows a horizontal bar chart comparing adequate vs. non-adequate emergency response counts with percentages in tooltip.

Uses `transformAdequateResponseDistribution` from `chartTransformers.ts` with adequate (green) and notAdequate (red) tones.

## CSS Chart Fallback

CSS chart components (CategoricalBarChart, ComparisonBarChart, HorizontalMetricChart) remain as fallback and for simple controlled visualizations. They do not depend on Chart.js.

## Rules

- All visible text must be in Spanish.
- No mock data in production pages.
- Empty states must use ChartJsEmptyState.
- Register only the Chart.js components actually used.
