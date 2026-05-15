# CardioGuard - Frontend

Interfaz web del sistema CardioGuard para evaluación de riesgo cardiovascular y formación en respuesta ante emergencias. Desarrollado como proyecto de tesis.

---

## Tecnologías

- **React 19** — biblioteca de UI
- **TypeScript 6** — tipado estático
- **Vite 8** — bundler y servidor de desarrollo
- **React Router DOM 7** — enrutamiento del lado del cliente
- **Axios** — cliente HTTP con interceptores
- **Tailwind CSS 3** — estilos utilitarios
- **Inter** (Google Fonts) — tipografía principal

---

## Estructura del proyecto

```
frontend/
│
├── public/                        # Archivos estáticos públicos
│
├── src/
│   ├── api/                       # Capa de comunicación con el backend
│   │   ├── client.ts              # Instancia Axios + interceptores de UUID
│   │   ├── evaluation.ts          # predictEvaluation()
│   │   └── history.ts             # getLastCycle(), getUserHistory()
│   │
│   ├── assets/                    # Recursos estáticos (imágenes, íconos)
│   │
│   ├── components/                # Componentes reutilizables globales
│   │   ├── layout/
│   │   │   └── AppLayout.tsx      # Layout principal: header, nav, footer, <Outlet>
│   │   └── ui/
│   │       ├── CheckboxCardGroup.tsx  # Grupo de selección múltiple con tarjetas
│   │       ├── NumberField.tsx        # Input numérico con unidad y validación
│   │       ├── OptionCard.tsx         # Tarjeta de opción (radio o checkbox)
│   │       ├── ProgressBar.tsx        # Barra de progreso de pasos del formulario
│   │       └── RadioCardGroup.tsx     # Grupo de selección única con tarjetas
│   │
│   ├── features/                  # Módulos de funcionalidad
│   │   ├── evaluation/            # Módulo de evaluación (Módulo 1 — completo)
│   │   │   ├── components/        # Componentes internos del módulo
│   │   │   │   ├── AdvancedModePanel.tsx  # Panel de uso interno para forzar tipo de evaluación
│   │   │   │   ├── EvaluationLayout.tsx   # Layout de paso: barra + contenido + navegación
│   │   │   │   ├── FlowIntro.tsx          # Pantalla de bienvenida según flujo detectado
│   │   │   │   └── PrefillNotice.tsx      # Aviso de datos pre-cargados del pre-test
│   │   │   ├── hooks/
│   │   │   │   ├── useAutoDetectEvaluationType.ts  # Detecta el flujo del usuario (first_time / continue_post_test / cycle_complete)
│   │   │   │   ├── useEvaluationForm.ts            # Estado del formulario, validación por paso, navegación
│   │   │   │   └── usePrefillFromPretest.ts        # Pre-rellena pasos 0–2 con datos del pre-test guardado
│   │   │   ├── steps/             # Un componente por paso del formulario
│   │   │   │   ├── Step0Control.tsx   # Paso 0: tipo de respondente, edad, sexo
│   │   │   │   ├── Step1Health.tsx    # Paso 1: presión, colesterol, glucosa, dolor de pecho, peso, talla
│   │   │   │   ├── Step2Habits.tsx    # Paso 2: actividad física, tabaco, alcohol, dieta, antecedentes
│   │   │   │   ├── Step3Education.tsx # Paso 3: conocimiento cardiovascular y reconocimiento de síntomas
│   │   │   │   └── Step4Emergency.tsx # Paso 4: entrenamiento, número de emergencias, acción ante crisis
│   │   │   ├── constants.ts       # Opciones tipadas para cada pregunta del formulario
│   │   │   └── EvaluationPage.tsx # Página principal: orquesta flujo, pasos, submit y navegación
│   │   │
│   │   └── results/               # Módulo de resultados (Módulo 2 — pendiente)
│   │       └── ResultsPage.tsx    # Vista temporal: muestra JSON crudo del backend
│   │
│   ├── hooks/                     # Hooks globales
│   │   └── useAnonymousUser.ts    # Garantiza la existencia del UUID en localStorage
│   │
│   ├── pages/                     # Páginas generales de la app
│   │   ├── HomePage.tsx           # Pantalla de inicio con accesos rápidos
│   │   └── NotFoundPage.tsx       # Página 404
│   │
│   ├── routes/
│   │   └── AppRouter.tsx          # Definición de rutas con React Router
│   │
│   ├── styles/
│   │   └── globals.css            # Estilos base, utilidades y variables Tailwind
│   │
│   ├── types/                     # Tipos TypeScript globales
│   │   ├── evaluation.ts          # Tipos del formulario (espejo del schema Pydantic del backend)
│   │   └── results.ts             # Tipos de respuesta de la API
│   │
│   ├── utils/                     # Utilidades transversales
│   │   ├── scrollToError.ts       # Scroll al primer campo con error (via data-field)
│   │   ├── storage.ts             # Abstracción de localStorage y sessionStorage
│   │   └── uuid.ts                # Generador de UUID v4 (crypto.randomUUID con fallback)
│   │
│   ├── App.tsx                    # Raíz de la app: renderiza AppRouter
│   └── main.tsx                   # Entry point: monta React, importa globals.css
│
├── index.html
├── .env                           # Variables de entorno (no commitear)
├── .env.example                   # Plantilla de variables de entorno
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

---

## Configuración e instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/John-OF/CardioGuard_System-frontend.git
cd CardioGuard_System-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar el archivo de ejemplo y completar los valores:

```bash
cp .env.example .env
```

Contenido del `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

> `VITE_API_URL` debe apuntar a la URL base del backend FastAPI (sin barra final).

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en el puerto 5173 |
| `npm run build` | Verifica tipos TypeScript y genera el build de producción |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |

---

## Rutas de la aplicación

| Ruta | Componente | Estado |
|---|---|---|
| `/` | `HomePage` | ✅ Implementado |
| `/evaluacion` | `EvaluationPage` | ✅ Implementado |
| `/resultados/:id` | `ResultsPage` | 🔄 Vista temporal (Módulo 2) |
| `/educacion` | — | ⏳ Pendiente |
| `/simulador` | — | ⏳ Pendiente |
| `/historial` | — | ⏳ Pendiente |
| `*` | `NotFoundPage` | ✅ Implementado |

---

## Estado del desarrollo

### Módulo 1 — Evaluación ✅

El flujo de evaluación está completo. Incluye:

- Detección automática del estado del usuario al ingresar (`first_time`, `continue_post_test`, `cycle_complete`)
- Formulario de 5 pasos con validación por paso y scroll al primer error
- Pre-relleno automático de datos del pre-test al iniciar un post-test
- Envío al backend y persistencia del resultado en `sessionStorage`
- Panel de modo avanzado para forzar tipo de evaluación (uso interno / demostración)

### Módulo 2 — Resultados ⏳

La página de resultados muestra temporalmente el JSON crudo de la respuesta del backend. Será reemplazada por tarjetas visuales de riesgo, IMC, recomendaciones y tópicos educativos.

### Módulos pendientes ⏳

Las secciones de **Educación**, **Simulador** e **Historial** están en la navegación pero aún no tienen páginas implementadas.

---

## Decisiones técnicas clave

### Usuario anónimo

El sistema no requiere registro. Cada sesión se identifica con un UUID v4 generado en el primer acceso y persistido en `localStorage`. El UUID se inyecta automáticamente en cada request al backend mediante un interceptor de Axios (`X-Anonymous-User-Id`). Si el backend retorna un UUID distinto en la respuesta, el interceptor lo sincroniza.

### Estrategia de almacenamiento

| Dato | Almacenamiento | Duración |
|---|---|---|
| UUID del usuario | `localStorage` | Persiste entre sesiones |
| Resultado de evaluación | `sessionStorage` | Solo la pestaña actual |
| Datos del último pre-test | `sessionStorage` | Solo la pestaña actual |

### Pre-relleno del post-test

Al completar un pre-test, el formulario completo se guarda en `sessionStorage`. Si el usuario regresa a hacer el post-test en la misma sesión, los pasos 0, 1 y 2 (datos que no cambian en minutos: edad, sexo, salud, hábitos) se pre-rellenan automáticamente. El usuario puede corregirlos antes de continuar. Al cerrar el ciclo con el post-test, los datos guardados se limpian.

### Tipado del formulario

Los tipos en `src/types/evaluation.ts` son un espejo directo del schema Pydantic `EvaluationRequest` del backend. Si el backend cambia, ese archivo es el primero a actualizar.

### Alias de importación

Todas las importaciones internas usan el alias `@/` mapeado a `src/`, configurado en `vite.config.ts`:

```ts
resolve: {
  alias: { '@': path.resolve(__dirname, './src') }
}
```

### Componentes de formulario

Los campos del formulario están construidos sobre tres primitivos reutilizables (`OptionCard`, `RadioCardGroup`, `CheckboxCardGroup`, `NumberField`) que comparten estilo y accesibilidad. Cada campo lleva el atributo `data-field={nombre}` para que `scrollToFirstError` pueda localizarlo en el DOM.