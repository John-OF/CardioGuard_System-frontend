# CardioGuard — Frontend

Interfaz web del sistema CardioGuard para evaluación de riesgo cardiovascular y formación en respuesta ante emergencias. Desarrollado como proyecto de tesis.

---

## Tecnologías

| Componente | Versión |
|---|---|
| React | 19.2 |
| TypeScript | 6 |
| Vite | 8 |
| React Router DOM | 7 |
| Axios | 1.16 |
| Tailwind CSS | 3.4 |

---

## Configuración e instalación

### 1. Requisitos previos

- Node.js 18 o superior
- Backend CardioGuard corriendo (ver `backend/README.md`)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crear el archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://127.0.0.1:8000
```

> Debe apuntar a la URL base del backend FastAPI, sin barra final.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La app queda disponible en `http://localhost:5173`.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Verificación de tipos TypeScript + build de producción |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | ESLint sobre todo el proyecto |

---

## Rutas y estado de implementación

| Ruta | Componente | Estado |
|---|---|---|
| `/` | `HomePage` | Completo |
| `/evaluacion` | `EvaluationPage` | Completo |
| `/resultados/:id` | `ResultsPage` | Completo |
| `/educacion` | `EducationPage` | Completo |
| `/educacion/:topicSlug` | `TopicDetailPage` | Completo |
| `/historial` | `HistoryPage` | Completo |
| `/historial/comparacion/:postId` | `ComparisonPage` | Completo |
| `/simulador` | — | Pendiente (placeholder) |
| `*` | `NotFoundPage` | Completo |

---

## Estado del desarrollo

### Evaluación (`/evaluacion`) — Completo

Flujo de evaluación de 5 pasos con detección automática del estado del usuario:

- **Detección de flujo** al ingresar: primera vez (`first_time`), ciclo pendiente de post-test (`continue_post_test`) o ciclo ya completado (`cycle_complete`)
- **Formulario en 5 pasos** con validación por paso y scroll automático al primer error
  - Paso 0: datos de control (tipo de respondente, edad, sexo)
  - Paso 1: salud (presión, colesterol, glucosa, dolor de pecho, peso, talla)
  - Paso 2: hábitos (actividad física, tabaco, alcohol, dieta, antecedentes)
  - Paso 3: conocimiento cardiovascular (infarto, síntomas, prevención, RCP)
  - Paso 4: respuesta ante emergencias (entrenamiento, acción, tiempo de reacción)
- **Pre-relleno automático** de los pasos 0–2 al iniciar un post-test, con los datos del pre-test guardados en sesión
- **Panel de modo avanzado** para forzar tipo de evaluación (uso interno / demostración)
- Envío al backend y almacenamiento del resultado en `sessionStorage`

### Resultados (`/resultados/:id`) — Completo

Vista completa del resultado de la evaluación con tarjetas visuales:

- Nivel de riesgo cardiovascular (bajo / moderado / alto)
- Probabilidad del modelo ML
- Puntuación de preparación ante emergencias
- IMC calculado y categoría
- Lista de recomendaciones personalizadas
- Vista previa de temas educativos prioritarios
- Banner diferenciado para resultados de post-test
- Redirige a `/evaluacion` si no hay resultado en sesión

### Educación (`/educacion` y `/educacion/:topicSlug`) — Completo

Sección de contenido educativo cardiovascular:

- Muestra temas recomendados por el backend según brechas detectadas en la evaluación (con nivel de prioridad)
- Lista completa de temas disponibles, ordenados por relevancia al resultado
- Página de detalle por tema con contenido estructurado, nota de advertencia médica, sección de cierre y temas relacionados
- CTA para realizar el post-test si el último resultado fue un pre-test pendiente

### Historial (`/historial`) — Completo

Vista del historial de evaluaciones del usuario:

- Lista de ciclos completados (pre-test + post-test), ordenados del más reciente al más antiguo
- Lista colapsable de evaluaciones individuales (`regular`)
- Estado vacío cuando el usuario no tiene historial

### Comparación (`/historial/comparacion/:postId`) — Completo

Vista de comparación entre pre-test y post-test de un ciclo:

- Encabezado con fechas y resumen de mejora general del ciclo
- Comparación del nivel de riesgo y probabilidad ML entre ambas evaluaciones
- Comparación de puntajes de conocimiento educativo y de emergencias

### Simulador (`/simulador`) — Pendiente

Muestra un placeholder "En construcción". No tiene implementación.

---

## Arquitectura del frontend

### Módulos por funcionalidad

Cada sección principal vive en su propio directorio bajo `src/features/`:

```
src/features/
├── evaluation/    # Formulario multi-paso + hooks de flujo
├── results/       # Tarjetas de resultados
├── education/     # Catálogo de temas + detalle de tema
└── history/       # Historial + comparación de ciclos
```

### Componentes de formulario reutilizables

Cuatro primitivos en `src/components/ui/` usados por todos los pasos del formulario:

- `RadioCardGroup` — selección única con tarjetas visuales
- `CheckboxCardGroup` — selección múltiple con tarjetas
- `OptionCard` — tarjeta de opción individual (radio o checkbox)
- `NumberField` — input numérico con unidad (ej. kg, cm, mmHg)

Todos llevan `data-field={nombre}` para que `scrollToFirstError` pueda localizar el primer campo inválido en el DOM.

### Estado y almacenamiento

| Dato | Almacenamiento | Duración |
|---|---|---|
| UUID del usuario | `localStorage` | Persiste entre sesiones |
| Resultado de la última evaluación | `sessionStorage` | Solo la pestaña actual |
| Datos del último pre-test | `sessionStorage` | Hasta completar el post-test |

Todo acceso a `localStorage` y `sessionStorage` va a través de `src/utils/storage.ts`.

### Usuario anónimo

El sistema no requiere registro. Cada usuario se identifica con un UUID v4 generado en el primer acceso (`crypto.randomUUID`) y almacenado en `localStorage`. El UUID se inyecta automáticamente en cada request mediante un interceptor de Axios (`X-Anonymous-User-Id`). Si el backend devuelve un UUID distinto en la respuesta, el interceptor lo sincroniza.

### Alias de importación

Todas las importaciones internas usan el alias `@/` mapeado a `src/`, configurado en `vite.config.ts`. No se usan rutas relativas entre módulos de `features/`.

### Tipos TypeScript

`src/types/evaluation.ts` es un espejo directo del schema Pydantic `EvaluationRequest` del backend. `src/types/results.ts` tipifica la respuesta de `POST /api/predict`. Si el backend cambia un campo, estos archivos son los primeros a actualizar.

---

## Estructura del proyecto

```
frontend/src/
├── api/
│   ├── client.ts              # Instancia Axios + interceptor de UUID
│   ├── evaluation.ts          # predictEvaluation()
│   └── history.ts             # getLastCycle(), getUserHistory(), getComparison()
├── components/
│   ├── layout/AppLayout.tsx   # Header, nav, <Outlet>
│   └── ui/                    # RadioCardGroup, CheckboxCardGroup, OptionCard, NumberField, ProgressBar
├── features/
│   ├── evaluation/
│   │   ├── steps/             # Step0Control … Step4Emergency
│   │   ├── hooks/             # useEvaluationForm, useAutoDetectEvaluationType, usePrefillFromPretest
│   │   ├── components/        # EvaluationLayout, FlowIntro, AdvancedModePanel, PrefillNotice
│   │   ├── constants.ts
│   │   └── EvaluationPage.tsx
│   ├── results/
│   │   ├── components/        # RiskLevelCard, MLProbabilityCard, PreparednessCard, BMICard,
│   │   │                      #   RecommendationsList, EducationPreviewCard, PostTestBanner, ResultsActions
│   │   └── ResultsPage.tsx
│   ├── education/
│   │   ├── components/        # EducationLayout, PriorityBanner, TopicGrid, TopicCard,
│   │   │                      #   TopicContent, TopicTip, TopicSectionHeader, EducationFooter
│   │   ├── data/              # topicContents.ts (catálogo de temas)
│   │   ├── utils/             # priorityMatcher.ts
│   │   ├── topics/TopicDetailPage.tsx
│   │   └── EducationPage.tsx
│   └── history/
│       ├── components/        # CycleListItem, RegularEvaluationItem, ComparisonHeader,
│       │                      #   RiskComparison, KnowledgeComparison, ChangePill, HistoryEmpty
│       ├── hooks/             # useHistoryData, useComparisonData
│       ├── HistoryPage.tsx
│       └── ComparisonPage.tsx
├── hooks/
│   └── useAnonymousUser.ts
├── pages/
│   ├── HomePage.tsx
│   └── NotFoundPage.tsx
├── routes/AppRouter.tsx
├── types/
│   ├── evaluation.ts
│   └── results.ts
└── utils/
    ├── storage.ts
    ├── uuid.ts
    ├── scrollToError.ts
    └── dateFormat.ts
```

---

## Consideraciones de diseño

- La interfaz está diseñada para usuarios de **60 años en adelante**: tipografía grande (base 18 px), botones de al menos 56 px de alto, alto contraste.
- No hay layouts específicos para móvil; el diseño está optimizado para escritorio y tablets.
- No hay suite de pruebas automatizadas configurada.
