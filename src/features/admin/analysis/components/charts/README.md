# Charts — CardioGuard / CSS + Chart.js

## Estrategia de gráficos (Block 19)

CardioGuard usa dos enfoques de visualización:

| Enfoque | Propósito | Implementación |
|---------|-----------|----------------|
| **CSS Charts** | Fallback — gráficos académicos categóricos simples (barras, comparaciones, métricas horizontales) | Componentes React + Tailwind CSS |
| **Chart.js** | Principal — gráficos profesionales académicos/estadísticos (barras, líneas, dona, dispersión, mixtos) | `chart.js` + `react-chartjs-2` |

### Historial

- **Recharts** fue eliminado (Block 11F) por incompatibilidad en tiempo de ejecución (`require_isUnsafeProperty is not a function`). No debe reintroducirse.
- **Lightweight Charts** fue eliminado (Block 19) porque no se alineaba con las necesidades de visualización académica/estadística del proyecto.
- **Chart.js** fue adoptado (Block 19) como biblioteca principal para gráficos profesionales.
- **CSS Charts** se mantienen como fallback y para visualizaciones simples y controladas.

### Historial de integración CSS

- **Block 11F**: Componentes CSS reutilizables creados (CategoricalBarChart, ComparisonBarChart, HorizontalMetricChart, ChartLegend, chartTheme).
- **Block 12**: EmergencyIndicatorsSection integrado en EmergencyAnalysisPage (CategoricalBarChart con emergency_action_profile).
- **Block 13**: PreparednessLevelsChartSection integrado en EmergencyAnalysisPage (CategoricalBarChart con preparedness_levels).
- **Block 14**: AdequateResponseChartSection integrado en EmergencyAnalysisPage (CategoricalBarChart con adequate_response).
- **Block 15**: PrePostScoreChart refactorizado para usar ComparisonBarChart mediante transformPrePostToComparison.

## Componentes CSS reutilizables

```
src/features/admin/analysis/components/charts/
├── CategoricalBarChart.tsx      # Barras horizontales categóricas (nivel, frecuencia, porcentaje)
├── ComparisonBarChart.tsx       # Barras agrupadas para comparación por pares (pre/post, antes/después)
├── HorizontalMetricChart.tsx    # Barras de métricas numéricas con soporte centerAtZero (correlaciones, odds ratios)
├── ChartCard.tsx                # Contenedor visual con título, nota, footer
├── ChartEmptyState.tsx          # Estado vacío para gráficos sin datos
├── ChartLegend.tsx              # Leyenda reutilizable con códigos de color semánticos
├── chartTheme.ts                # Paleta de colores semánticos (ChartTone) para barras
├── chartTypes.ts                # Tipos compartidos
├── chartTransformers.ts         # Transformadores de datos API → formato de gráfico
├── PrePostScoreChart.tsx        # Chart.js horizontal grouped bar (pre-test/post-test), no delega en ComparisonBarChart
├── chartjs/                     # Infraestructura Chart.js
│   ├── BaseChartJsCard.tsx
│   ├── ChartJsEmptyState.tsx
│   ├── ChartJsTheme.ts
│   ├── ChartJsRegistry.ts
│   ├── MLPredictionDoughnutChart.tsx           # Dona de predicción ML (descriptivo)
│   ├── MLProbabilityBucketsBarChart.tsx      # Barras de probabilidad ML (descriptivo)
│   ├── CorrelationStrengthBarChart.tsx         # Barras de correlación (correlaciones)
│   ├── LogisticOddsRatioBarChart.tsx            # Barras de razón de momios (regresión logística)
│   ├── ChartJsSmokeTest.tsx     # Solo para verificación manual (no importado en producción)
│   └── README.md
└── README.md                    # Este archivo
```

## Cómo usar CategoricalBarChart

```tsx
import { CategoricalBarChart } from './charts/CategoricalBarChart';

<CategoricalBarChart
  title="Niveles de preparación"
  subtitle="Distribución de participantes por nivel"
  data={[
    { label: 'Bajo', value: 15, tone: 'highRisk' },
    { label: 'Medio', value: 30, tone: 'moderateRisk' },
    { label: 'Alto', value: 55, tone: 'lowRisk' },
  ]}
  showPercentages
  methodologicalNote="Datos simulados con fines ilustrativos."
/>
```

## Cómo usar ComparisonBarChart

```tsx
import { ComparisonBarChart } from './charts/ComparisonBarChart';

<ComparisonBarChart
  title="Pre-test vs Post-test"
  subtitle="Comparación de puntajes por categoría"
  data={[
    { label: 'Educación', firstLabel: 'Pre-test', firstValue: 65, secondLabel: 'Post-test', secondValue: 82 },
    { label: 'Emergencia', firstLabel: 'Pre-test', firstValue: 58, secondLabel: 'Post-test', secondValue: 79 },
  ]}
/>
```

## Cómo usar HorizontalMetricChart

```tsx
import { HorizontalMetricChart } from './charts/HorizontalMetricChart';

<HorizontalMetricChart
  title="Coeficientes de correlación"
  subtitle="Fortaleza de asociación"
  data={[
    { label: 'Edad vs Conocimiento', value: 0.45, tone: 'primary' },
    { label: 'Capacitación vs Emergencia', value: 0.72, tone: 'success' },
  ]}
  centerAtZero
/>
```

## Cómo usar ChartLegend

```tsx
import { ChartLegend } from './charts/ChartLegend';

<ChartLegend
  items={[
    { label: 'Pre-test', tone: 'preTest' },
    { label: 'Post-test', tone: 'postTest' },
  ]}
/>
```

## Cuándo usar cada componente CSS

| Componente | Caso de uso |
|------------|-------------|
| `CategoricalBarChart` | Distribuciones de frecuencia, niveles (bajo/medio/alto), respuestas (adecuado/no adecuado), porcentajes por categoría |
| `ComparisonBarChart` | Comparación pre-test/post-test, antes/después, dos grupos por categoría |
| `HorizontalMetricChart` | Correlaciones, odds ratios, importancia de características, métricas numéricas con soporte de valores negativos |

## Reglas

### Estado vacío
Cada gráfico debe verificar si hay datos disponibles antes de renderizar. Usar `ChartEmptyState` con mensaje en español. Mensajes disponibles:
- `no_data`: "No hay datos suficientes para generar este gráfico."
- `insufficient_data`: "Este gráfico se activará cuando existan más registros."
- `endpoint_not_ready`: "El endpoint actual no expone los datos agregados necesarios."
- `feature_not_implemented`: "Esta visualización estará disponible en un próximo bloque."

### Texto visible en español
Todo texto visible al usuario debe estar en español, incluyendo títulos, etiquetas, notas y mensajes de estado vacío.

### Nota metodológica no diagnóstica
Los gráficos académicos deben incluir una nota metodológica que aclare el propósito no clínico de la visualización.

### Sin dependencias externas adicionales
Los componentes CSS no agregan dependencias nuevas. Solo usan React y Tailwind CSS.

### Sin datos mock
Los transformadores retornan arreglos vacíos cuando los datos de API no están disponibles. No se usan valores inventados en páginas de producción.

## Páginas con gráficos integrados

### /admin/analisis/emergencias (EmergencyAnalysisPage)
Tres gráficos (todos Chart.js):
1. **Indicadores de preparación ante emergencias** — EmergencyIndicatorsBarChart (barras horizontales de porcentajes)
2. **Distribución de niveles de preparación** — PreparednessLevelsDoughnutChart (dona proporcional por nivel)
3. **Respuesta adecuada ante emergencia** — AdequateResponseBarChart (barras horizontales con conteos y porcentajes)

### /admin/analisis/pre-post (PrePostAnalysisPage)
Un gráfico Chart.js (vía PrePostScoreChart):
- **Comparación pre-test/post-test** — barras agrupadas horizontales con puntajes promedio pre-test y post-test para Educación, Emergencia y Total combinado

### /admin/analisis/correlaciones (CorrelationAnalysisPage)
Un gráfico Chart.js (migrado desde CSS HorizontalMetricChart en Block 27):
- **Fuerza de correlación entre variables** — CorrelationStrengthBarChart (barras horizontales con coefientes de -1 a 1, colores por dirección/fuerza, tooltip con r, p-valor y método)

### /admin/analisis/regresion-logistica (LogisticRegressionAnalysisPage)
Un gráfico Chart.js (migrado desde CSS HorizontalMetricChart en Block 28):
- **Razón de momios por variable** — LogisticOddsRatioBarChart (barras horizontales con log(OR) centrado en OR=1, colores por dirección, tooltip con OR original e interpretación)

### /admin/analisis/chi-cuadrado (ChiSquareAnalysisPage)
Un gráfico Chart.js:
- **Frecuencias observadas y esperadas** — barras agrupadas para la primera prueba válida, con conteos reales vs. esperados bajo H0

### /admin/analisis/descriptivo (DescriptiveAnalysisPage)
Dos gráficos Chart.js (Block 25):
1. **Distribución de predicción ML** — MLPredictionDoughnutChart (dona proporcional con clasificación menor/mayor probabilidad ML) usando frecuencias de `ml_prediction` del sistema. No representa niveles de riesgo reales — el backend descriptivo no expone `risk_level_distribution` para ese fin.
2. **Distribución de probabilidad ML** — MLProbabilityBucketsBarChart (barras horizontales con intervalos de probabilidad) usando `histograms.ml_probability`.

Ambos gráficos se renderizan en una grilla responsiva de 2 columnas después de las tarjetas de resumen y antes de las tablas de frecuencias detalladas. Usan datos reales del endpoint `GET /api/admin/analysis/descriptive` sin valores mock.
