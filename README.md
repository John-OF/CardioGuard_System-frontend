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
| `/resultados/:evaluationId` | `ResultsPage` | Completo |
| `/alfabetizacion` | `AlfabetizacionPage` | Completo |
| `/alfabetizacion/:topicSlug` | `TopicDetailPage` | Completo |
| `/capacitacion` | `CapacitacionPage` | Completo |
| `/simulador` | `SimuladorPage` | Completo |
| `/historial` | `HistoryPage` | Completo |
| `/historial/comparacion/:postId` | `ComparisonPage` | Completo |
| `/admin` | `AdminPage` | Completo (protegido por token) |
| `*` | `NotFoundPage` | Completo |

> `/admin` se monta **fuera** de `AppLayout`, sin cabecera ni navegación pública. Solo se accede escribiendo la URL.

### Flujo completo del ciclo educativo

```
/evaluacion (pre_test)  →  /resultados/:id  →  /capacitacion  →  /simulador (post_test)
   →  /resultados/:id (variante reducida)  →  /historial/comparacion/:postId
```

El simulador es **la única ruta** que genera un `post_test` en el flujo normal. Reutiliza los datos clínicos del pre-test guardados en `sessionStorage` (pasos 0–2) y solo pregunta los escenarios correspondientes a los pasos 3 y 4. El resultado se guarda con la variante `reduced`, que oculta la probabilidad ML y el panel de IMC en la página de resultados.

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
- **Panel de modo avanzado** (oculto por defecto): permite forzar el tipo de evaluación entre `regular` y `pre_test`. La opción `post_test` ya no se selecciona manualmente — siempre se origina desde `/simulador`.
- Envío al backend y almacenamiento del resultado en `sessionStorage`

### Resultados (`/resultados/:evaluationId`) — Completo

Vista del resultado de la evaluación. Tiene dos variantes que dependen de cómo se generó el resultado:

- **Variante completa** (`full`): se muestra para evaluaciones `regular` y `pre_test`. Incluye nivel de riesgo, probabilidad del modelo ML, preparación ante emergencias, IMC, recomendaciones y vista previa de temas educativos.
- **Variante reducida** (`reduced`): se muestra al volver del simulador (post-test). Oculta la probabilidad ML y el IMC para presentar al usuario solo el feedback educativo. La variante se guarda en `sessionStorage` junto al resultado (`_variant`).

Si no hay resultado en sesión, redirige a `/evaluacion`.

### Alfabetización (`/alfabetizacion` y `/alfabetizacion/:topicSlug`) — Completo

Sección de contenido educativo cardiovascular de consulta libre:

- Muestra temas recomendados por el backend según brechas detectadas en la evaluación, con nivel de prioridad (alta / media / baja).
- Lista completa de temas disponibles, ordenados por relevancia frente al último resultado.
- Página de detalle por tema con contenido estructurado, nota de advertencia médica, sección de cierre y temas relacionados.
- Vista de glosario para términos cardiovasculares de uso frecuente.
- CTA para realizar el post-test si el último resultado fue un pre-test pendiente.

### Capacitación (`/capacitacion`) — Completo

Wizard de lecciones que el usuario recorre entre el pre-test y el simulador. Es la antesala del post-test:

- Avanza secuencialmente por las lecciones definidas en `data/lessons.ts` (componente `LessonCard` + `WizardProgress`).
- Al finalizar, redirige al `/simulador` para ejecutar el post-test.
- A diferencia de Alfabetización, no es navegación libre: tiene orden y progreso.

### Simulador (`/simulador`) — Completo

Wizard de escenarios que **genera el `post_test`** del ciclo. Es la única vía a un post-test dentro del flujo normal:

- Acepta dos modos de entrada:
  - **Flujo normal**: hay un `pre_test` reciente en `sessionStorage` (`LAST_RESULT` + `LAST_PRETEST_FORM`).
  - **Ciclo huérfano**: `?continue=<preEvaluationId>` — recupera el pre-test desde `localStorage` (mapa `PRETEST_FORMS_BY_ID`) para usuarios que vuelven días después desde Historial.
- Presenta escenarios definidos en `data/scenarios.ts`, cuyas respuestas sustituyen los pasos 3 y 4 del pre-test guardado.
- Construye el payload final reutilizando los datos clínicos (pasos 0–2) del pre-test, evita re-preguntarlos.
- Envía la evaluación con `evaluation_type: 'post_test'` + `previous_evaluation_id`, guarda el resultado con `_variant: 'reduced'` y limpia los rastros del pre-test (`LAST_PRETEST_FORM` + entrada en `PRETEST_FORMS_BY_ID`).
- Redirige a `/resultados/:id` con la vista reducida.

### Historial (`/historial`) — Completo

Vista del historial de evaluaciones del usuario:

- Lista de ciclos completados (pre-test + post-test), ordenados del más reciente al más antiguo.
- Botón de "reanudar" sobre ciclos pendientes que llevan a `/simulador?continue=<preId>`.
- Lista colapsable de evaluaciones individuales (`regular`).
- Estado vacío cuando el usuario no tiene historial.

### Comparación (`/historial/comparacion/:postId`) — Completo

Vista de comparación entre pre-test y post-test de un ciclo:

- Encabezado con fechas y resumen de mejora general del ciclo.
- Comparación del nivel de riesgo y probabilidad ML entre ambas evaluaciones.
- Comparación de puntajes de conocimiento educativo y de emergencias.

### Admin (`/admin`) — Completo

Panel administrativo para los tesistas. Vive fuera de `AppLayout` (sin cabecera ni navegación pública):

- **Acceso por token**: pantalla `AdminLogin` solicita el `X-Admin-Token`; se guarda en `sessionStorage` mientras dure la pestaña.
- **Estadísticas globales** (`StatsSection`): totales (evaluaciones, usuarios únicos, ciclos completos), distribución de riesgo, demografía (edad, sexo, IMC), métricas de mejora pre/post y tasa de completación de ciclos.
- **Tabla de ciclos** (`CyclesTable`): listado paginado de ciclos pre/post completados con deltas de conocimiento, emergencias y nivel de riesgo. Soporta ordenamiento por más reciente o más antiguo.
- Si el token resulta inválido durante una llamada, los hooks de datos disparan logout automático.

### Modo avanzado — Completo

Toggle oculto para demos y depuración. Se activa con **5 toques sobre el logo del header dentro de una ventana de 3 segundos**.

- Estado guardado en `sessionStorage` como `cardioguard_advanced_mode`.
- Indicador visual: un punto verde en la esquina superior derecha del logo cuando está activo.
- Mientras está activo, `EvaluationPage` muestra el `AdvancedModePanel` en el último paso, exponiendo el control manual de `evaluation_type` (limitado a `regular` y `pre_test`).
- **No se puede activar/desactivar durante un ciclo activo**: si hay un resultado de `pre_test` en sesión, el toggle se bloquea y muestra el mensaje "No se puede cambiar el modo durante un ciclo activo." Esto evita romper un ciclo en curso.
- La sincronización entre componentes montados se hace con un evento `window` (`cardioguard:advanced-mode-changed`); no hay React Context.

Implementación: hook `src/hooks/useAdvancedMode.ts` + helpers en `src/utils/storage.ts` (`getAdvancedMode`, `setAdvancedMode`, `isCycleActive`).

---

## Arquitectura del frontend

### Módulos por funcionalidad

Cada sección principal vive en su propio directorio bajo `src/features/`:

```
src/features/
├── evaluation/      # Formulario multi-paso + detección automática de flujo
├── results/         # Tarjetas de resultados (variantes 'full' y 'reduced')
├── alfabetizacion/  # Catálogo de temas + detalle + glosario
├── capacitacion/    # Wizard de lecciones (gateway al simulador)
├── simulador/       # Wizard de escenarios — genera el post_test
├── history/         # Historial + comparación de ciclos
└── admin/           # Panel de tesistas (fuera de AppLayout)
```

### Componentes de formulario reutilizables

Cuatro primitivos en `src/components/ui/` usados por todos los pasos del formulario:

- `RadioCardGroup` — selección única con tarjetas visuales
- `CheckboxCardGroup` — selección múltiple con tarjetas
- `OptionCard` — tarjeta de opción individual (radio o checkbox)
- `NumberField` — input numérico con unidad (ej. kg, cm, mmHg)

Todos llevan `data-field={nombre}` para que `scrollToFirstError` pueda localizar el primer campo inválido en el DOM.

### Estado y almacenamiento

| Dato | Almacenamiento | Duración | Propósito |
|---|---|---|---|
| UUID del usuario | `localStorage` | Persiste entre sesiones | Identifica al usuario anónimo en cada request |
| Pre-tests indexados por ID | `localStorage` | Persiste entre sesiones | Permite reanudar un ciclo huérfano desde Historial |
| Resultado de la última evaluación | `sessionStorage` | Solo la pestaña actual | Renderiza la página de resultados (con variante `full` o `reduced`) |
| Datos del último pre-test | `sessionStorage` | Hasta completar el post-test | Pre-llena pasos 0–2 y alimenta al simulador |
| Token administrativo | `sessionStorage` | Solo la pestaña actual | Acceso al panel `/admin` |
| Modo avanzado | `sessionStorage` | Solo la pestaña actual | Habilita el `AdvancedModePanel` |

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
│   ├── history.ts             # getLastCycle, getUserHistory, getComparison
│   └── admin.ts               # getAdminStats, getAdminCycles
├── components/
│   ├── layout/AppLayout.tsx   # Header (con logo táctil), nav, <Outlet>
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
│   │   │                      #   RecommendationsList, EducationPreviewCard, PostTestBanner,
│   │   │                      #   ResultsActions
│   │   └── ResultsPage.tsx
│   ├── alfabetizacion/
│   │   ├── components/        # EducationLayout, PriorityBanner, TopicGrid, TopicCard,
│   │   │                      #   TopicContent, TopicTip, TopicSectionHeader, GlosarioView,
│   │   │                      #   EducationFooter
│   │   ├── data/              # topicContents.ts (catálogo de temas)
│   │   ├── utils/             # priorityMatcher.ts
│   │   ├── topics/TopicDetailPage.tsx
│   │   ├── types.ts
│   │   ├── EducationPage.tsx
│   │   └── AlfabetizacionPage.tsx
│   ├── capacitacion/
│   │   ├── components/        # LessonCard, WizardProgress
│   │   ├── data/lessons.ts
│   │   └── CapacitacionPage.tsx
│   ├── simulador/
│   │   ├── components/        # SimuladorIntro, ScenarioScreen, ScenarioOption, WizardProgress
│   │   ├── data/scenarios.ts
│   │   ├── hooks/useSimuladorSubmit.ts
│   │   └── SimuladorPage.tsx
│   ├── history/
│   │   ├── components/        # CycleListItem, RegularEvaluationItem, ComparisonHeader,
│   │   │                      #   RiskComparison, KnowledgeComparison, ChangePill, HistoryEmpty
│   │   ├── hooks/             # useHistoryData, useComparisonData
│   │   ├── HistoryPage.tsx
│   │   └── ComparisonPage.tsx
│   └── admin/
│       ├── components/        # AdminLogin, StatsSection, CyclesTable, StatCard,
│       │                      #   DistributionBar, RiskBadge
│       ├── hooks/             # useAdminAuth, useAdminStats, useAdminCycles
│       ├── utils/format.ts
│       └── AdminPage.tsx
├── hooks/
│   ├── useAnonymousUser.ts
│   └── useAdvancedMode.ts     # Toggle de 5 taps + sincronización entre componentes
├── pages/
│   ├── HomePage.tsx
│   └── NotFoundPage.tsx
├── routes/AppRouter.tsx
├── types/
│   ├── evaluation.ts
│   ├── results.ts
│   └── admin.ts
└── utils/
    ├── storage.ts
    ├── uuid.ts
    ├── scrollToError.ts
    └── dateFormat.ts
```

---

## Consideraciones de diseño

- La interfaz está diseñada para usuarios de **60 años en adelante**: tipografía grande (base 18 px), botones de al menos 56 px de alto, alto contraste.
- El diseño está optimizado para escritorio y tablets; los formularios funcionan en móvil pero no hay layouts específicos para esa franja.

---

## Pendiente

- **Despliegue en producción**: hosting de la SPA, configuración del `VITE_API_URL` definitivo y publicación junto al backend en un dominio con HTTPS. Es el único punto pendiente del frontend.
