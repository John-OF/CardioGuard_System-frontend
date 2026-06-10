# Charts — CardioGuard / CSS + Lightweight Charts

## Estrategia de gráficos (Block 11F)

CardioGuard usa dos enfoques de visualización:

| Enfoque | Propósito | Implementación |
|---------|-----------|----------------|
| **CSS Charts** | Principal — gráficos académicos categóricos (barras categorizadas, comparaciones agrupadas, métricas horizontales) | Componentes React + Tailwind CSS |
| **Lightweight Charts** | Secundario — series de tiempo, tendencias, histogramas numéricos, evolución por fecha (uso futuro) | `lightweight-charts` |

~~Recharts~~ fue eliminado (Block 11F) por incompatibilidad en tiempo de ejecución (`require_isUnsafeProperty is not a function`) derivada de su dependencia `es-toolkit` al ser pre-bundled por Vite. No debe reintroducirse.

## Historial de integración

- **Block 11F**: Componentes CSS reutilizables creados (CategoricalBarChart, ComparisonBarChart, HorizontalMetricChart, ChartLegend, chartTheme).
- **Block 12**: EmergencyIndicatorsSection integrado en EmergencyAnalysisPage (CategoricalBarChart con emergency_action_profile).
- **Block 13**: PreparednessLevelsChartSection integrado en EmergencyAnalysisPage (CategoricalBarChart con preparedness_levels).
- **Block 14**: AdequateResponseChartSection integrado en EmergencyAnalysisPage (CategoricalBarChart con adequate_response).
- **Block 15**: PrePostScoreChart refactorizado para usar ComparisonBarChart mediante transformPrePostToComparison.

## Componentes CSS reutilizables

```
src/features/admin/analysis/components/charts/
├── BaseLightweightChart.tsx     # Wrapper base para Lightweight Charts
├── CategoricalBarChart.tsx      # Barras horizontales categóricas (nivel, frecuencia, porcentaje)
├── ComparisonBarChart.tsx       # Barras agrupadas para comparación por pares (pre/post, antes/después)
├── HorizontalMetricChart.tsx    # Barras de métricas numéricas con soporte centerAtZero (correlaciones, odds ratios)
├── ChartCard.tsx                # Contenedor visual con título, nota, footer
├── ChartEmptyState.tsx          # Estado vacío para gráficos sin datos
├── ChartLegend.tsx              # Leyenda reutilizable con códigos de color semánticos
├── chartTheme.ts                # Paleta de colores semánticos (ChartTone) para barras
├── chartTypes.ts                # Tipos compartidos para Lightweight Charts
├── chartTransformers.ts         # Transformadores de datos API → formato de gráfico
├── PrePostScoreChart.tsx        # Wrapper que delega en ComparisonBarChart (pre-test/post-test)
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

## Cuándo usar cada componente

| Componente | Caso de uso |
|------------|-------------|
| `CategoricalBarChart` | Distribuciones de frecuencia, niveles (bajo/medio/alto), respuestas (adecuado/no adecuado), porcentajes por categoría |
| `ComparisonBarChart` | Comparación pre-test/post-test, antes/después, dos grupos por categoría |
| `HorizontalMetricChart` | Correlaciones, odds ratios, importancia de características, métricas numéricas con soporte de valores negativos |
| `BaseLightweightChart` | Series de tiempo, tendencias, histogramas numéricos, evolución temporal |
| `ChartEmptyState` | Estado vacío para cualquier gráfico sin datos |

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

### Sin dependencias externas
Los componentes CSS no agregan dependencias nuevas. Usan solo React y Tailwind CSS.

### Sin datos mock
Los transformadores retornan arreglos vacíos cuando los datos de API no están disponibles. No se usan valores inventados en páginas de producción.

## Páginas con gráficos integrados

### /admin/analisis/emergencias (EmergencyAnalysisPage)
Tres gráficos CategoricalBarChart:
1. **Indicadores de preparación ante emergencias** — 5 barras del perfil de acción (porcentajes)
2. **Distribución de niveles de preparación** — niveles bajo/media/alto (conteo + porcentaje)
3. **Respuesta adecuada ante emergencia** — adecuado vs no adecuado (conteo + porcentaje)

### /admin/analisis/pre-post (PrePostAnalysisPage)
Un gráfico ComparisonBarChart (vía PrePostScoreChart wrapper):
- **Comparación pre-test/post-test** — Educación, Emergencia y Total combinado
