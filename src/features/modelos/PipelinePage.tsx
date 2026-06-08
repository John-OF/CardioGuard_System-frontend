import { Link } from 'react-router-dom';
import { IconBrain, IconTrees, IconActivity } from '@/components/ui/icons';
import { MODEL_META_BY_BACKEND_NAME } from './data/models';
import { useModelMetrics } from './hooks/useModelMetrics';
import { RocComparisonChart } from './components/RocComparisonChart';
import { AucSummaryTable } from './components/AucSummaryTable';

// Reglas de puntaje REALES, espejo de backend/app/services/fuzzy_service.py.
// La lógica difusa NO es un modelo entrenado: es un puntaje por reglas clínicas
// que se aplica DESPUÉS del Random Forest. Por eso no tiene accuracy/AUC/matriz.
const SCORING_RULES: { factor: string; rules: { when: string; points: string }[] }[] = [
  {
    factor: 'Probabilidad del Random Forest',
    rules: [
      { when: '≥ 75 %', points: '+4' },
      { when: '50 – 74 %', points: '+3' },
      { when: '25 – 49 %', points: '+2' },
      { when: '< 25 %', points: '+1' },
    ],
  },
  {
    factor: 'Edad',
    rules: [
      { when: '≥ 80 años', points: '+2' },
      { when: '70 – 79 años', points: '+1' },
      { when: '< 70 años', points: '0' },
    ],
  },
  {
    factor: 'Índice de masa corporal (IMC)',
    rules: [
      { when: '≥ 30 (obesidad)', points: '+2' },
      { when: '25 – 29.9 (sobrepeso)', points: '+1' },
      { when: '< 25', points: '0' },
    ],
  },
  {
    factor: 'Actividad física',
    rules: [
      { when: 'Sedentario / nula', points: '+2' },
      { when: 'Baja', points: '+1' },
      { when: 'Regular', points: '0' },
    ],
  },
  {
    factor: 'Presión arterial (sistólica)',
    rules: [
      { when: '≥ 140 mmHg', points: '+2' },
      { when: '130 – 139 mmHg', points: '+1' },
      { when: '< 130 mmHg', points: '0' },
    ],
  },
  {
    factor: 'Colesterol',
    rules: [
      { when: '≥ 240 mg/dL', points: '+2' },
      { when: '220 – 239 mg/dL', points: '+1' },
      { when: '< 220 mg/dL', points: '0' },
    ],
  },
];

const RISK_THRESHOLDS = [
  { level: 'Bajo', range: 'Puntaje < 6', className: 'border-green-200 bg-green-50 text-green-700' },
  { level: 'Moderado', range: 'Puntaje 6 – 9', className: 'border-amber-200 bg-amber-50 text-amber-700' },
  { level: 'Alto', range: 'Puntaje ≥ 10', className: 'border-red-200 bg-red-50 text-red-700' },
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
    displayName: MODEL_META_BY_BACKEND_NAME[model.name]?.name ?? model.name,
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
            <strong>probabilidad</strong> a partir de sus datos clínicos. Luego, una{' '}
            <strong>lógica difusa</strong> —un sistema de reglas clínicas— combina
            esa probabilidad con su edad, IMC, actividad física, presión arterial y
            colesterol para asignar un <strong>nivel de riesgo</strong> final: bajo,
            moderado o alto.
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
            title="Lógica difusa"
            text="Reglas clínicas combinan esa probabilidad con edad, IMC, actividad, presión y colesterol en un puntaje de 0 a 12."
            iconClass="bg-purple-100 text-purple-600"
          />
          <Arrow />
          <StageCard
            step={4}
            Icon={IconActivity}
            title="Nivel de riesgo"
            text="Según el puntaje, el sistema clasifica el riesgo como bajo, moderado o alto."
            iconClass="bg-blue-100 text-blue-600"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Analisis ROC/AUC de los modelos evaluados
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
          El analisis ROC/AUC pertenece a los modelos de aprendizaje automatico
          evaluados. La capa de logica difusa no tiene una curva ROC propia porque es
          una capa interpretativa basada en reglas aplicada despues del modelo de ML
          seleccionado.
        </div>
      </section>

      {/* Tabla de reglas */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Cómo se calcula el puntaje
        </h2>
        <p className="text-base text-slate-600 mb-4">
          Cada factor suma puntos. La probabilidad del Random Forest es el factor de
          mayor peso (hasta 4 puntos); los demás aportan hasta 2 cada uno.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCORING_RULES.map((group) => (
            <div
              key={group.factor}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-bold text-slate-900 mb-3">{group.factor}</h3>
              <ul className="space-y-1.5">
                {group.rules.map((rule) => (
                  <li
                    key={rule.when}
                    className="flex items-center justify-between text-sm border-b border-slate-100 pb-1.5 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-600">{rule.when}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {rule.points}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Umbrales de nivel */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Del puntaje al nivel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RISK_THRESHOLDS.map((t) => (
            <div key={t.level} className={`rounded-2xl border-2 p-5 ${t.className}`}>
              <p className="text-2xl font-bold">{t.level}</p>
              <p className="text-sm mt-1 opacity-90">{t.range}</p>
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
              La lógica difusa <strong>no es un modelo entrenado</strong>: es un
              conjunto de reglas clínicas, por lo que no tiene métricas de desempeño
              (exactitud, AUC) propias. Las métricas de aprendizaje automático
              corresponden al <strong>Random Forest</strong>, que puede consultar en
              su página.
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
