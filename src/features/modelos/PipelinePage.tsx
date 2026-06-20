import { Link } from 'react-router-dom';
import { IconBrain, IconTrees, IconActivity } from '@/components/ui/icons';
import { MODEL_META_BY_BACKEND_NAME } from './data/models';
import { useModelMetrics } from './hooks/useModelMetrics';
import { RocComparisonChart } from './components/RocComparisonChart';
import { AucSummaryTable } from './components/AucSummaryTable';
import { HybridAucComparisonTable } from './components/HybridAucComparisonTable';
import { HybridRocComparisonChart } from './components/HybridRocComparisonChart';

// Documentación del sistema de inferencia difusa (Mamdani), espejo de
// backend/app/services/fuzzy_service.py. La lógica difusa NO es un modelo
// entrenado: combina la probabilidad del Random Forest con variables clínicas
// mediante funciones de membresía + reglas IF-THEN + inferencia + defuzzificación.
// Por eso no tiene accuracy/AUC/matriz de confusión.

// Variables de entrada y sus conjuntos difusos (etiquetas lingüísticas de las
// funciones de membresía definidas en fuzzy_service.py).
const FUZZY_VARIABLES: { variable: string; sets: { label: string; when: string }[] }[] = [
  {
    variable: 'Probabilidad del Random Forest',
    sets: [
      { label: 'Baja', when: 'alrededor de 0 – 40 %' },
      { label: 'Media', when: 'alrededor de 30 – 70 %' },
      { label: 'Alta', when: 'alrededor de 60 – 100 %' },
    ],
  },
  {
    variable: 'Edad',
    sets: [
      { label: 'Joven', when: 'hasta ~60 años' },
      { label: 'Mayor', when: 'alrededor de 60 – 82 años' },
      { label: 'Muy mayor', when: 'desde ~78 años' },
    ],
  },
  {
    variable: 'Índice de masa corporal (IMC)',
    sets: [
      { label: 'Normal', when: 'hasta ~25' },
      { label: 'Sobrepeso', when: 'alrededor de 23 – 31' },
      { label: 'Obesidad', when: 'desde ~29' },
    ],
  },
  {
    variable: 'Actividad física',
    sets: [
      { label: 'Sedentario', when: 'poca o nula actividad' },
      { label: 'Moderado', when: 'actividad ocasional' },
      { label: 'Activo', when: 'actividad regular' },
    ],
  },
  {
    variable: 'Presión arterial (sistólica)',
    sets: [
      { label: 'Normal', when: 'hasta ~128 mmHg' },
      { label: 'Elevada', when: 'alrededor de 125 – 148 mmHg' },
      { label: 'Alta', when: 'desde ~140 mmHg' },
    ],
  },
  {
    variable: 'Colesterol',
    sets: [
      { label: 'Normal', when: 'hasta ~210 mg/dL' },
      { label: 'Límite', when: 'alrededor de 200 – 240 mg/dL' },
      { label: 'Alto', when: 'desde ~230 mg/dL' },
    ],
  },
];

// Reglas IF-THEN representativas (espejo de la base de reglas en fuzzy_service.py).
const FUZZY_RULES: string[] = [
  'SI la probabilidad del Random Forest es ALTA → el riesgo es ALTO.',
  'SI la probabilidad es MEDIA → el riesgo es MODERADO.',
  'SI la probabilidad es BAJA → el riesgo es BAJO.',
  'SI la probabilidad es MEDIA Y algún factor clínico es severo (edad muy mayor, obesidad, sedentarismo, presión alta o colesterol alto) → el riesgo es ALTO.',
  'SI la probabilidad es BAJA Y algún factor clínico es severo → el riesgo sube a MODERADO.',
  'SI la probabilidad es ALTA PERO todo el perfil clínico es sano → el riesgo baja a MODERADO.',
  'SI la presión es ALTA Y el colesterol es ALTO → el riesgo es ALTO.',
];

const RISK_LEVELS = [
  { level: 'Bajo', className: 'border-green-200 bg-green-50 text-green-700' },
  { level: 'Moderado', className: 'border-amber-200 bg-amber-50 text-amber-700' },
  { level: 'Alto', className: 'border-red-200 bg-red-50 text-red-700' },
];

function StageCard({
  step,
  Icon,
  title,
  text,
  iconClass,
}: {
  step: number;
  Icon: typeof IconBrain;
  title: string;
  text: string;
  iconClass: string;
}) {
  return (
    <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className={`inline-flex w-10 h-10 shrink-0 rounded-xl items-center justify-center ${iconClass}`}>
          <Icon className="w-5 h-5" />
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Paso {step}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-slate-300 lg:rotate-0 rotate-90">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}

export function PipelinePage() {
  const { metrics, loading, source } = useModelMetrics();
  const comparisonModels = metrics.models.map((model) => ({
    name: model.name,
    displayName: model.displayName || MODEL_META_BY_BACKEND_NAME[model.name]?.name || model.name,
    rocAuc: model.rocAuc,
    rocCurve: model.rocCurve,
    selected: model.isSelected || model.name === metrics.selectedModel,
  }));
  const selectedModel = comparisonModels.find((model) => model.selected);

  return (
    <div className="space-y-8">
      {source === 'fallback' && !loading && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-base text-amber-900">
          Mostrando metricas locales de respaldo porque el backend de metricas no respondio.
        </div>
      )}

      {/* Cabecera */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white"
            aria-hidden
          >
            <IconBrain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Sistema Híbrido
            </h1>
            <p className="text-lg text-slate-600 mt-1">
              Random Forest + Lógica Difusa
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            ¿Cómo estima el sistema su riesgo cardiovascular?
          </h2>
          <p className="text-base text-slate-700 leading-relaxed">
            CardioGuard combina dos etapas. Primero, un modelo de{' '}
            <strong>Random Forest</strong> (aprendizaje automático) estima una{' '}
            <strong>probabilidad</strong> a partir de sus datos clínicos. Luego, un{' '}
            <strong>sistema de lógica difusa</strong> combina esa probabilidad con su
            edad, IMC, actividad física, presión arterial y colesterol para asignar un{' '}
            <strong>nivel de riesgo</strong> final: bajo, moderado o alto. En lugar de
            cortes rígidos, la lógica difusa razona con <strong>grados de pertenencia</strong>{' '}
            (por ejemplo, una presión puede ser «en parte elevada y en parte alta»).
          </p>
        </div>
      </div>

      {/* Diagrama del flujo */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">El flujo, paso a paso</h2>
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <StageCard
            step={1}
            Icon={IconActivity}
            title="Sus datos"
            text="Variables clínicas y de hábitos recogidas en el formulario de evaluación preventiva."
            iconClass="bg-slate-100 text-slate-600"
          />
          <Arrow />
          <StageCard
            step={2}
            Icon={IconTrees}
            title="Random Forest"
            text="El modelo de ML estima una probabilidad de riesgo (0–100 %) a partir de 7 variables clínicas."
            iconClass="bg-emerald-100 text-emerald-600"
          />
          <Arrow />
          <StageCard
            step={3}
            Icon={IconBrain}
            title="Inferencia difusa"
            text="Funciones de membresía y reglas IF-THEN combinan la probabilidad con edad, IMC, actividad, presión y colesterol."
            iconClass="bg-purple-100 text-purple-600"
          />
          <Arrow />
          <StageCard
            step={4}
            Icon={IconActivity}
            title="Nivel de riesgo"
            text="El resultado difuso se concreta (defuzzificación) en un riesgo continuo y se clasifica en bajo, moderado o alto."
            iconClass="bg-blue-100 text-blue-600"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Comparacion ROC/AUC de modelos ML puros
          </h2>
          <p className="text-base text-slate-600">
            Esta comparacion muestra la capacidad de cada modelo para distinguir entre
            casos con riesgo y sin riesgo. El modelo seleccionado es{' '}
            <strong>{selectedModel?.displayName ?? 'Random Forest'}</strong>.
          </p>
        </div>
        <RocComparisonChart models={comparisonModels} />
        <AucSummaryTable models={comparisonModels} />
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-base text-blue-900">
          Estas curvas corresponden exclusivamente a la probabilidad directa de los
          modelos de aprendizaje automatico evaluados sobre el conjunto de prueba UCI.
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Comparacion ROC/AUC de modelos ML + postprocesamiento difuso
          </h2>
          <p className="text-base text-slate-600">
            Esta evaluacion experimental aplica un score fuzzy offline a la probabilidad
            de cada modelo usando solamente variables disponibles en UCI.
          </p>
        </div>
        {metrics.hybridModels.length > 0 && metrics.hybridComparison.length > 0 ? (
          <>
            <HybridRocComparisonChart
              models={metrics.hybridModels}
              selectedModel={metrics.selectedModel}
            />
            <HybridAucComparisonTable rows={metrics.hybridComparison} />
            <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 text-base text-purple-900">
              {metrics.methodologicalNote}
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-base text-slate-700">
            La evaluacion hibrida offline no esta disponible en el artefacto de metricas.
          </div>
        )}
      </section>

      {/* Variables y conjuntos difusos */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Las variables y sus niveles difusos
        </h2>
        <p className="text-base text-slate-600 mb-4">
          Cada variable se describe con etiquetas que se solapan: un valor puede
          pertenecer en cierto grado a más de una (eso son las{' '}
          <strong>funciones de membresía</strong>).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FUZZY_VARIABLES.map((group) => (
            <div
              key={group.variable}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-bold text-slate-900 mb-3">{group.variable}</h3>
              <ul className="space-y-1.5">
                {group.sets.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-3 text-sm border-b border-slate-100 pb-1.5 last:border-0 last:pb-0"
                  >
                    <span className="font-semibold text-slate-900">{s.label}</span>
                    <span className="text-slate-500 text-right">{s.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Reglas IF-THEN */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Algunas reglas del sistema
        </h2>
        <p className="text-base text-slate-600 mb-4">
          El motor de inferencia evalúa reglas de tipo «SI… ENTONCES…» y las combina
          según el grado con que se cumplen.
        </p>
        <ul className="space-y-2">
          {FUZZY_RULES.map((rule) => (
            <li
              key={rule}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <IconBrain className="w-4 h-4" />
              </span>
              <span className="text-sm text-slate-700 leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Niveles de salida */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">El resultado final</h2>
        <p className="text-base text-slate-600 mb-4">
          Tras combinar las reglas, el sistema <strong>defuzzifica</strong> (método del
          centroide) para obtener un riesgo continuo, que finalmente se expresa como uno
          de estos tres niveles:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RISK_LEVELS.map((t) => (
            <div key={t.level} className={`rounded-2xl border-2 p-5 ${t.className}`}>
              <p className="text-2xl font-bold">{t.level}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aclaración honesta + enlace a métricas */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-slate-500 shrink-0"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="16" y2="12" />
            <line x1="12" x2="12.01" y1="8" y2="8" />
          </svg>
          <div>
            <p className="text-base text-slate-700 leading-relaxed">
              La lógica difusa productiva <strong>no es un modelo entrenado</strong> y no
              tiene métricas independientes. La comparación ROC/AUC anterior es una
              evaluación offline del efecto de un postprocesamiento experimental sobre
              cada score ML; no valida clínicamente la capa productiva. Las métricas del
              <strong> Random Forest</strong> puro se pueden consultar en su página.
            </p>
            <Link
              to="/modelos/random-forest"
              className="btn-primary inline-flex items-center gap-2 mt-4"
            >
              Ver métricas del Random Forest
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
