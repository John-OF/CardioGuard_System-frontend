# Recharts — CardioGuard / Chart Strategy

## Recharts: biblioteca principal

Recharts es la biblioteca principal para gráficos académicos y categóricos en el módulo Admin/Analysis de CardioGuard.

**Ventajas para el proyecto:**
- Construida sobre componentes React.
- Soporta gráficos de barras agrupadas, apiladas, horizontales, líneas, áreas, dispersión y más.
- Manejo sencillo de tooltips y leyendas personalizadas.
- Ideal para visualizaciones categóricas: comparaciones pre/post, distribuciones por nivel de riesgo, odds ratios, etc.

## Lightweight Charts: secundario / experimental

Lightweight Charts se mantiene instalado para casos donde sea más apropiado:
- Series de tiempo (evolución por fecha).
- Líneas de tendencia.
- Áreas de evolución.
- Histogramas numéricos.
- Probabilidades de ML.
- Tendencias de puntaje de riesgo difuso.

Si tras evaluaciones futuras no se utiliza, puede eliminarse en un bloque de limpieza posterior.

## CSS Charts: aceptable

Los gráficos CSS simples (como el `PrePostScoreChart` actual) siguen siendo aceptables para visualizaciones muy controladas donde una biblioteca completa sería excesiva.

## Mapa de tipos de gráfico recomendados por módulo

| Módulo | Tipo de gráfico recomendado |
|--------|------------------------------|
| Análisis descriptivo | Barras, histogramas |
| Pre-test/Post-test | Barras agrupadas (Recharts) |
| Emergencias | Barras, barras horizontales |
| Chi-cuadrado | Barras agrupadas |
| Correlaciones | Barras, dispersión |
| Regresión logística | Barras horizontales (odds ratios) |
| Métricas ML | Líneas, áreas (Lightweight Charts) |
| Lógica difusa | Líneas, áreas, barras |

## Reglas

- **Estado vacío:** todo gráfico debe mostrar `ChartEmptyState` si no hay datos.
- **Texto en español:** todas las etiquetas, tooltips y leyendas deben estar en español.
- **Nota académica:** los gráficos deben incluir una nota metodológica no diagnóstica.
- **Sin decoración:** ningún gráfico debe ser puramente decorativo; todo gráfico debe responder una pregunta analítica.
