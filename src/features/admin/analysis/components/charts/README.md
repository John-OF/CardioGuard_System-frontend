# Charts — CardioGuard / Lightweight Charts

## ¿Por qué Lightweight Charts™?
Lightweight Charts™ es una biblioteca de gráficos financieros liviana, mantenida por TradingView, ideal para visualizar datos de análisis en aplicaciones web. Se eligió porque:
- No requiere WebGL ni canvas complejo.
- Es compatible con React mediante un wrapper simple.
- Ofrece series de línea, área, histograma y barras.
- Tiene buen rendimiento con conjuntos de datos moderados.
- No depende de D3.js ni de bibliotecas pesadas.

## Ubicación
```
src/features/admin/analysis/components/charts/
├── BaseLightweightChart.tsx   # Wrapper base (creación, resize, limpieza)
├── ChartEmptyState.tsx        # Estado vacío para gráficos sin datos
├── ChartCard.tsx              # Contenedor visual con título, nota, footer
├── chartTypes.ts              # Tipos compartidos (ChartPoint, ChartBucket, etc.)
├── chartTransformers.ts       # Transformers placeholder (devuelven arreglo vacío)
└── README.md                  # Este archivo
```

## Cómo usar BaseLightweightChart
```tsx
import { BaseLightweightChart } from './charts/BaseLightweightChart';
import { LineSeries } from 'lightweight-charts';

<BaseLightweightChart
  height={350}
  dataAvailable={data.length > 0}
  onInit={(chart) => {
    const series = chart.addSeries(LineSeries, { color: '#2563eb' });
    series.setData(data);
  }}
/>
```

El callback `onInit` recibe la instancia `IChartApi` ya creada. Dentro de él se agregan las series y se asignan los datos. La limpieza (`chart.remove()`) se maneja automáticamente al desmontar.

## Cuándo usar Lightweight Charts
- Visualización de tendencias (puntajes pre/post, evolución temporal).
- Distribuciones (histogramas de frecuencias, buckets de probabilidad).
- Comparaciones numéricas (odds ratios, fortaleza de correlación).
- Indicadores de panel (métricas de ML, niveles de riesgo).

## Cuándo NO usar Lightweight Charts
- Tablas grandes de datos (usar componentes de tabla).
- Diagramas de torta (no soportados; considerar alternativa futura).
- Gráficos de dispersión puros (usar data_points_preview si aplica).
- Visualizaciones que requieren interacción compleja (zooming extremo, dragging).

## Estado vacío
Cada gráfico debe verificar si hay datos disponibles antes de renderizar. Si no hay datos, `BaseLightweightChart` muestra automáticamente `ChartEmptyState` con un mensaje en español. Los mensajes disponibles:
- `no_data`: "No hay datos suficientes para generar este gráfico."
- `insufficient_data`: "Este gráfico se activará cuando existan más registros."
- `endpoint_not_ready`: "El endpoint actual no expone los datos agregados necesarios."
- `feature_not_implemented`: "Esta visualización estará disponible en un próximo bloque."

## Estrategia de gráficos (Block 11C)

CardioGuard usa tres enfoques de visualización:

| Enfoque | Propósito | Biblioteca |
|---------|-----------|------------|
| **Recharts** | Primario — gráficos académicos categóricos (barras agrupadas, barras horizontales, distribuciones, comparaciones) | `recharts` |
| **Lightweight Charts** | Secundario — series de tiempo, tendencias, histogramas numéricos, evolución por fecha, probabilidades ML | `lightweight-charts` |
| **CSS Charts** | Visualizaciones simples y controladas donde una biblioteca sería excesiva | Tailwind CSS |

Recharts es la biblioteca principal porque la mayoría de los gráficos de tesis son categóricos, comparativos y académicos. Lightweight Charts se mantiene instalado y puede evaluarse su eliminación en el futuro si no se utiliza.

## Nota importante
Este bloque (Block 11A) solo instala la dependencia y crea la infraestructura base de gráficos. **No se integran gráficos en las páginas de análisis existentes.** La integración ocurrirá en bloques posteriores (11B, 11C, etc.).
