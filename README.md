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
| `/evaluacion` | `EvaluationPage` | Completo (en el menú: "Evaluación Preventiva") |
| `/resultados/:evaluationId` | `ResultsPage` | Completo |
| `/educacion` | `EducacionPage` | Completo — portada de bienvenida de la sección (antes "Alfabetización") |
| `/educacion/:topicSlug` | `TopicDetailPage` | Completo |
| `/capacitacion` | `CapacitacionPage` | Completo |
| `/simulador` | `SimuladorPage` | Completo |
| `/modelos` | `ModelosHomePage` | Completo — portada de bienvenida a las métricas |
| `/modelos/sistema-hibrido` | `PipelinePage` | Completo — explicación del pipeline RF + lógica difusa |
| `/modelos/:modelSlug` | `ModelPage` | Completo |
| `/historial` | `HistoryPage` | Completo |
| `/historial/comparacion/:postId` | `ComparisonPage` | Completo |
| `/usabilidad` | `UsabilidadPage` | Completo |
| `/aviso-legal` | `AvisoLegalPage` | Completo |
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

### Educación (`/educacion` y `/educacion/:topicSlug`) — Completo

Sección de contenido educativo cardiovascular de consulta libre (renombrada desde "Alfabetización"):

- **Portada de bienvenida** (`EducacionPage`): intro accesible + sección "¿Cómo está organizado?" que describe las 4 categorías de contenido + CTA "Empezar por el primer tema". No es un catálogo de tarjetas (sería redundante con el submenú lateral).
- El submenú "Educación" del sidebar lista todos los temas del catálogo (`data/topicCatalog.ts`).
- Página de detalle por tema (`TopicDetailPage`) con contenido estructurado, nota de advertencia médica y sección de cierre.
- **Navegación secuencial** entre temas (botón izquierdo al anterior, derecho "Continúe aprendiendo" al siguiente), siguiendo el orden del catálogo; el último paso es el glosario.
- Vista de glosario para términos cardiovasculares de uso frecuente (`GlosarioView`).

### Capacitación (`/capacitacion`) — Completo

Wizard de lecciones que el usuario recorre entre el pre-test y el simulador. Es la antesala del post-test:

- Avanza secuencialmente por las lecciones definidas en `data/lessons.ts` (componente `LessonCard` + `WizardProgress`).
- Al finalizar, redirige al `/simulador` para ejecutar el post-test.
- A diferencia de Educación, no es navegación libre: tiene orden y progreso.

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
- **Riesgo cardiovascular: un único resultado** (no comparación). Como el ciclo no vuelve a pedir los datos clínicos (pasos 0–2), el resultado ML es idéntico en pre y post; se muestra una tarjeta de riesgo + una nota "Sobre este resultado" que aclara que el riesgo depende de datos clínicos fijos y que lo que evoluciona es el conocimiento.
- Comparación de puntajes de conocimiento educativo y de emergencias (lo que sí cambia con la capacitación).

### Admin (`/admin`) — Completo

Panel administrativo para los tesistas. Vive fuera de `AppLayout` (sin cabecera ni navegación pública):

- **Acceso por token**: pantalla `AdminLogin` solicita el `X-Admin-Token`; se guarda en `sessionStorage` mientras dure la pestaña.
- **Estadísticas globales** (`StatsSection`): totales (evaluaciones, usuarios únicos, ciclos completos), distribución de riesgo, demografía (edad, sexo, IMC), métricas de mejora pre/post y tasa de completación de ciclos.
- **Tabla de ciclos** (`CyclesTable`): listado paginado de ciclos pre/post completados con deltas de conocimiento, emergencias y nivel de riesgo. Soporta ordenamiento por más reciente o más antiguo.
- Si el token resulta inválido durante una llamada, los hooks de datos disparan logout automático.

### Modelos Predictivos (`/modelos`, `/modelos/sistema-hibrido` y `/modelos/:modelSlug`) — Completo

Comparación de los 4 modelos de Machine Learning entrenados (RandomForest, XGBoost, SVM, MLP), con submenú colapsable en el sidebar:

- **Portada `/modelos`** (`ModelosHomePage`): bienvenida a las métricas (aclara que son **reales**, no simuladas) + bloque "¿Cómo predice el sistema el riesgo?" con CTA a `/modelos/sistema-hibrido` + sección "¿Qué encontrará aquí?" + CTA al modelo seleccionado. Contenido editable.
- **Sistema Híbrido `/modelos/sistema-hibrido`** (`PipelinePage`): página explicativa del **pipeline de predicción real** (primer ítem del submenú). Describe el flujo de 4 pasos (datos → Random Forest → lógica difusa → nivel de riesgo), con un diagrama, la tabla de reglas de puntaje reales (espejo de `backend/app/services/fuzzy_service.py`) y los umbrales (<6 bajo · 6–9 moderado · ≥10 alto). **No muestra métricas**: la lógica difusa es un puntaje por reglas, no un modelo entrenado (no tiene accuracy/AUC); enlaza al Random Forest para las métricas ML.
- **Detalle `/modelos/:modelSlug`** (`ModelPage`): una sola página genérica dirigida por el slug.
  - Métricas reales por modelo: exactitud, precisión, recall, F1 y validación cruzada (media y desviación F1).
  - Matriz de confusión y reporte de clasificación (por clase + macro/ponderado).
- Las métricas provienen de una **copia estática** del JSON del backend en `features/modelos/data/realMetrics.ts` (`form_model_metrics_7vars.json`). No incluye curva ROC/AUC ni importancia de características (el backend no las genera).
- Cada modelo del submenú y la cabecera de su página usan un **ícono SVG** (lucide inline, en `components/ui/icons.tsx`), no emojis.
- Pendiente futuro: servir las métricas vía endpoint `GET /api/models/metrics` (ver `INTEGRACION_MODELOS_PREDICTIVOS.md`). Las reglas de `PipelinePage` deben re-copiarse a mano si cambia `fuzzy_service.py`.

> **Submenús con patrón split:** los ítems "Educación" y "Modelos Predictivos" del sidebar separan dos acciones: el **texto** es un enlace a la portada (`/educacion`, `/modelos`) y el **chevron `>`** es un botón aparte que solo abre/cierra el submenú.

### Usabilidad (`/usabilidad`) — Completo

Página que invita a responder un formulario de usabilidad del sistema. Botón que abre el Google Forms en una pestaña nueva (URL en la constante `USABILITY_FORM_URL`).

### Aviso legal (`/aviso-legal`) — Completo

Página de descargo: deja claro que CardioGuard es un **prototipo experimental**, que los resultados **no constituyen un diagnóstico médico** y que ante cualquier duda se debe **consultar a un médico**; incluye nota de emergencias (911) y manejo anónimo de datos.

### Indicador de estado del servidor — Completo

Al fondo del sidebar, `BackendStatusPill` (hook `useBackendStatus`) hace ping a `GET /api/health` y **revalida cada 30 s**:

- 🟢 **Servidor activo** · 🔴 **Servidor inactivo** (local, backend apagado) · 🟡 **Servidor cargando…** (desplegado, cold-start de Render) · ⚪ **Verificando…**.
- El entorno (local vs. desplegado) se infiere de `VITE_API_URL`. Es 100 % frontend (no toca el backend).

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
├── educacion/       # Catálogo de temas + detalle + glosario (antes "alfabetizacion")
├── capacitacion/    # Wizard de lecciones (gateway al simulador)
├── simulador/       # Wizard de escenarios — genera el post_test
├── modelos/         # Pantalla comparativa de modelos predictivos
├── history/         # Historial + comparación de ciclos
├── usabilidad/      # CTA a formulario de usabilidad (Google Forms)
├── aviso-legal/     # Página de descargo legal
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
│   ├── admin.ts               # getAdminStats, getAdminCycles
│   └── health.ts              # checkHealth() para el pill de estado del servidor
├── components/
│   ├── layout/                # AppLayout (logo táctil, nav, <Outlet>) + BackendStatusPill
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
│   ├── educacion/
│   │   ├── components/        # EducationLayout, TopicContent, TopicTip, GlosarioView
│   │   ├── data/              # topicCatalog.ts (metadata) + topicContents.ts (currículo)
│   │   ├── topics/TopicDetailPage.tsx
│   │   ├── types.ts
│   │   └── EducacionPage.tsx
│   ├── capacitacion/
│   │   ├── components/        # LessonCard, WizardProgress
│   │   ├── data/lessons.ts
│   │   └── CapacitacionPage.tsx
│   ├── simulador/
│   │   ├── components/        # SimuladorIntro, ScenarioScreen, ScenarioOption, WizardProgress
│   │   ├── data/scenarios.ts
│   │   ├── hooks/useSimuladorSubmit.ts
│   │   └── SimuladorPage.tsx
│   ├── modelos/
│   │   ├── components/        # MetricsCards, ConfusionMatrix, ClassificationReport
│   │   ├── data/             # realMetrics.ts (copia del JSON del backend) + models.ts
│   │   ├── ModelosHomePage.tsx  # Portada /modelos (bienvenida a las métricas)
│   │   ├── PipelinePage.tsx     # /modelos/sistema-hibrido (pipeline RF + lógica difusa)
│   │   └── ModelPage.tsx        # Detalle /modelos/:modelSlug
│   ├── usabilidad/
│   │   └── UsabilidadPage.tsx
│   ├── aviso-legal/
│   │   └── AvisoLegalPage.tsx
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
│   ├── useAdvancedMode.ts     # Toggle de 5 taps + sincronización entre componentes
│   └── useBackendStatus.ts    # Ping a /api/health + revalidación periódica
├── pages/
│   ├── HomePage.tsx           # Landing: hero de tesis + stats, objetivo, módulos, cómo funciona, avisos legales, comparación de modelos
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

- **Despliegue en producción**: hosting de la SPA, configuración del `VITE_API_URL` definitivo y publicación junto al backend en un dominio con HTTPS.
- **Cifras del Home hardcodeadas (deuda técnica)**: las exactitudes y el total de registros del banner y la tabla comparativa de `pages/HomePage.tsx` (`83.6%`, `72.1%`, `72.1%`, `70.5%`, `303`, `4`) son **literales escritos a mano**, no derivados de `features/modelos/data/realMetrics.ts`. Hoy coinciden con el backend, pero si se reentrena el modelo y se actualiza `realMetrics.ts`, el Home queda desincronizado en silencio. Refactor pendiente: leer esas cifras desde `PREDICTIVE_MODELS` / `realMetrics.ts`. (El `303` no está en el JSON —solo los 61 de prueba— así que se dejaría como constante.) Detalle en `INTEGRACION_MODELOS_PREDICTIVOS.md`.
