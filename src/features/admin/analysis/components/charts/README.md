# Gráficos del análisis administrativo

El módulo administrativo conserva visualizaciones para tres áreas:

- Estadística descriptiva: distribución de predicción ML y rangos de probabilidad.
- Pre-test / post-test: comparación de puntajes promedio.
- Emergencias: indicadores, niveles de preparación y respuesta adecuada.

Chart.js sigue siendo la biblioteca principal mediante `chart.js` y
`react-chartjs-2`. Los componentes CSS reutilizables se mantienen únicamente
cuando todavía sirven a páginas activas.

## Componentes Chart.js activos

- `PrePostScoreChart.tsx`
- `EmergencyIndicatorsBarChart.tsx`
- `PreparednessLevelsDoughnutChart.tsx`
- `AdequateResponseBarChart.tsx`
- `MLPredictionDoughnutChart.tsx`
- `MLProbabilityBucketsBarChart.tsx`

La infraestructura compartida permanece en `chartjs/BaseChartJsCard.tsx`,
`ChartJsRegistry.ts`, `ChartJsTheme.ts` y `ChartJsEmptyState.tsx`.

Las visualizaciones de chi-cuadrado, correlaciones y regresión logística fueron
retiradas junto con sus páginas por ajuste metodológico. No se usan datos mock:
los transformadores devuelven estados vacíos cuando la API no aporta datos.
