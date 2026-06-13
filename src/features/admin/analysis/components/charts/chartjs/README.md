# Chart.js en el análisis administrativo

Chart.js permanece activo para las páginas de análisis descriptivo, pre-test /
post-test y emergencias. No se debe retirar `chart.js` ni `react-chartjs-2`.

## Infraestructura

- `BaseChartJsCard.tsx`: contenedor común.
- `ChartJsEmptyState.tsx`: estado sin datos.
- `ChartJsTheme.ts`: colores del proyecto.
- `ChartJsRegistry.ts`: registro central de escalas y elementos.

## Gráficos de producción

- `PrePostScoreChart.tsx`: comparación de puntajes pre-test y post-test.
- `EmergencyIndicatorsBarChart.tsx`: indicadores declarados de preparación.
- `PreparednessLevelsDoughnutChart.tsx`: niveles de preparación.
- `AdequateResponseBarChart.tsx`: respuesta adecuada y no adecuada.
- `MLPredictionDoughnutChart.tsx`: distribución de predicción ML.
- `MLProbabilityBucketsBarChart.tsx`: intervalos de probabilidad ML.

Los gráficos inferenciales de chi-cuadrado, correlaciones y regresión logística
se retiraron por ajuste metodológico. Todos los textos visibles deben estar en
español y las páginas de producción deben consumir datos reales de la API.
