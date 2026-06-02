import type { ComponentType, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import {
  IconHeart,
  IconBrain,
  IconShield,
  IconActivity,
  IconAlertCircle,
  IconAlertTriangle,
  IconGraduationCap,
  IconDatabase,
  IconClipboardCheck,
  IconBookOpen,
  IconHistory,
  IconStar,
} from '@/components/ui/icons';

const features = [
  {
    Icon: IconHeart,
    iconColor: 'text-red-600',
    title: 'Cardioprotección',
    description:
      'Sistema inteligente para la prevención y detección temprana de riesgo cardiovascular en adultos mayores.',
    className: 'bg-red-50 border-red-200 text-red-700',
  },
  {
    Icon: IconBrain,
    iconColor: 'text-blue-600',
    title: 'Inteligencia Artificial',
    description:
      'Modelos de Machine Learning combinados con lógica difusa para predicciones precisas y confiables.',
    className: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    Icon: IconShield,
    iconColor: 'text-green-600',
    title: 'Soporte Vital',
    description:
      'Protocolos y guías para el soporte vital básico, adaptados a las necesidades de los adultos mayores.',
    className: 'bg-green-50 border-green-200 text-green-700',
  },
];

const quickLinks: {
  to: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    to: '/evaluacion',
    title: 'Evaluación Preventiva',
    description: 'Evaluación completa de su riesgo cardiovascular.',
    Icon: IconClipboardCheck,
  },
  {
    to: '/educacion',
    title: 'Educación',
    description: 'Material educativo sobre prevención cardiovascular.',
    Icon: IconBookOpen,
  },
  {
    to: '/historial',
    title: 'Historial',
    description: 'Revise sus evaluaciones previas y su progreso.',
    Icon: IconHistory,
  },
  {
    to: '/modelos',
    title: 'Modelos Predictivos',
    description: 'Análisis con modelos de Machine Learning.',
    Icon: IconBrain,
  },
];

const models = [
  {
    name: 'Random Forest',
    selected: true,
    subtitle: 'Bosque aleatorio · seleccionado',
    accuracy: '83.6%',
    className: 'border-2 border-emerald-300 bg-emerald-50',
    valueClass: 'text-emerald-600',
    nameClass: 'text-emerald-900',
  },
  {
    name: 'XGBoost',
    selected: false,
    subtitle: 'Extreme Gradient Boosting',
    accuracy: '72.1%',
    className: 'border-orange-200',
    valueClass: 'text-orange-600',
    nameClass: 'text-orange-900',
  },
  {
    name: 'SVM',
    selected: false,
    subtitle: 'Support Vector Machine',
    accuracy: '72.1%',
    className: 'border-sky-200',
    valueClass: 'text-sky-600',
    nameClass: 'text-sky-900',
  },
  {
    name: 'Redes Neuronales (MLP)',
    selected: false,
    subtitle: 'Multi-Layer Perceptron',
    accuracy: '70.5%',
    className: 'border-purple-200',
    valueClass: 'text-purple-600',
    nameClass: 'text-purple-900',
  },
];

// Módulos integrados: borde lateral izquierdo de color como indicador de categoría.
const modules = [
  {
    Icon: IconActivity,
    title: 'Evaluación cardiovascular preventiva',
    description:
      'Registro de variables clínicas, conductuales y predictoras para Machine Learning.',
    border: 'border-l-red-500',
    iconColor: 'text-red-600',
  },
  {
    Icon: IconAlertCircle,
    title: 'Simulador de emergencia',
    description:
      'Escenarios interactivos para practicar la respuesta ante un infarto o situación de urgencia.',
    border: 'border-l-orange-500',
    iconColor: 'text-orange-600',
  },
  {
    Icon: IconGraduationCap,
    title: 'Módulo educativo',
    description:
      'Contenidos de prevención, autocuidado y soporte vital básico.',
    border: 'border-l-green-500',
    iconColor: 'text-green-600',
  },
];

// Cómo funciona: tarjetas con fondo de color tenue.
const howItWorks = [
  {
    Icon: IconDatabase,
    title: 'Ingeniería de datos',
    description:
      'La información del usuario se captura mediante formularios y simulador, y se almacena de forma segura en la base de datos para análisis estadístico.',
    className: 'bg-blue-50 border-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    Icon: IconShield,
    title: 'Privacidad',
    description:
      'Los datos son confidenciales, se almacenan de manera segura y solo se usarán con fines académicos y de investigación.',
    className: 'bg-green-50 border-green-100',
    iconColor: 'text-green-600',
  },
  {
    Icon: IconBrain,
    title: 'Entrenamiento',
    description:
      'Los modelos de Machine Learning se entrenan utilizando el dataset UCI Heart Disease.',
    className: 'bg-purple-50 border-purple-100',
    iconColor: 'text-purple-600',
  },
];

export function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero del proyecto (tesis) + estadísticas */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-2xl p-8 sm:p-12 text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-100 mb-3">
          Proyecto de tesis · Ingeniería de Software
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 max-w-4xl">
          Inteligencia artificial aplicada para la cardioprotección vascular y la
          formación en soporte vital básico
        </h1>
        <p className="text-lg sm:text-xl text-blue-50 max-w-3xl mb-8">
          Herramienta académica orientada a adultos mayores para apoyar la
          orientación preventiva, el autocuidado y el aprendizaje de acciones
          básicas ante emergencias.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-6 py-3">
            <p className="text-3xl font-bold">83.6%</p>
            <p className="text-sm text-blue-50">Exactitud del mejor modelo</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-6 py-3">
            <p className="text-3xl font-bold">4</p>
            <p className="text-sm text-blue-50">Modelos ML</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-6 py-3">
            <p className="text-3xl font-bold">303</p>
            <p className="text-sm text-blue-50">Registros del dataset</p>
          </div>
        </div>
      </section>

      {/* Objetivo del proyecto */}
      <section>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <IconHeart className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold text-slate-900">
              Objetivo del Proyecto
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Apoyar la orientación preventiva en cardioprotección vascular y
            fortalecer la formación básica en soporte vital básico en adultos
            mayores mediante un prototipo web que integra evaluación preventiva,
            Machine Learning, lógica difusa, recomendaciones, capacitación y
            simulación de escenarios de emergencia.
          </p>
        </div>
      </section>

      {/* Acceso rápido */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Acceso rápido
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="inline-flex w-12 h-12 shrink-0 rounded-xl bg-primary-light items-center justify-center text-primary"
                >
                  <link.Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {link.title}
                  </h3>
                  <p className="text-base text-slate-600">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparación de modelos */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          Comparación de modelos
        </h2>
        <p className="text-lg text-slate-700 mb-6">
          El sistema evalúa cuatro modelos de Machine Learning para garantizar la
          mejor precisión en la predicción de riesgo cardiovascular:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {models.map((model) => (
            <div
              key={model.name}
              className={`bg-white rounded-lg p-4 border ${model.className}`}
            >
              <h4
                className={`font-bold text-lg mb-2 flex items-center gap-1.5 ${model.nameClass}`}
              >
                {model.name}
                {model.selected && (
                  <IconStar
                    aria-hidden
                    className="w-4 h-4 fill-current stroke-none text-emerald-500"
                  />
                )}
              </h4>
              <p className={`text-3xl font-bold mb-1 ${model.valueClass}`}>
                {model.accuracy}
              </p>
              <p className="text-sm text-slate-600">{model.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/modelos"
            className="btn-primary inline-flex items-center justify-center"
          >
            Ver análisis detallado de modelos
          </Link>
        </div>
      </section>

      {/* Características */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Características principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`rounded-2xl border-2 p-6 ${feature.className}`}
            >
              <feature.Icon className={`w-10 h-10 ${feature.iconColor}`} />
              <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
              <p className="text-base text-slate-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Módulos integrados */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Módulos Integrados en el Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.title}
              className={`rounded-2xl border border-slate-200 border-l-4 ${mod.border} bg-white p-6 shadow-sm`}
            >
              <mod.Icon className={`w-9 h-9 ${mod.iconColor}`} />
              <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                {mod.title}
              </h3>
              <p className="text-base text-slate-600">{mod.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona el sistema */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Cómo Funciona el Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((step) => (
            <div
              key={step.title}
              className={`rounded-2xl border p-6 ${step.className}`}
            >
              <step.Icon className={`w-9 h-9 ${step.iconColor}`} />
              <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-base text-slate-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Avisos legales */}
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <IconAlertTriangle className="w-7 h-7 text-amber-600" />
          <h2 className="text-2xl font-bold text-amber-700">Avisos Legales</h2>
        </div>
        <ul className="space-y-2 text-base text-slate-700">
          <li className="flex items-start gap-2">
            <span aria-hidden className="text-amber-600 mt-1">
              •
            </span>
            Uso de datos únicamente con fines académicos y de investigación.
          </li>
          <li className="flex items-start gap-2">
            <span aria-hidden className="text-amber-600 mt-1">
              •
            </span>
            Propósito del proyecto: educativo, preventivo y funcional.
          </li>
        </ul>
      </section>

      {/* Banner: extensión de responsabilidad médica */}
      <section className="rounded-2xl bg-blue-700 p-6 sm:p-8 text-white shadow-sm">
        <div className="flex items-start gap-4">
          <IconShield className="w-9 h-9 shrink-0" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Extensión de Responsabilidad Médica
            </h2>
            <p className="text-lg font-bold text-blue-50">
              El prototipo no reemplaza la atención de profesionales de salud.
            </p>
          </div>
        </div>
      </section>

      {/* Aviso importante */}
      <section className="rounded-2xl border border-red-200 border-l-4 border-l-red-500 bg-red-50 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <IconAlertCircle className="w-8 h-8 shrink-0 text-red-600" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-2">
              Aviso Importante
            </h2>
            <p className="text-base text-slate-700">
              Este prototipo tiene fines académicos, preventivos, educativos y
              funcionales.{' '}
              <span className="font-bold text-slate-900">
                No realiza diagnósticos médicos ni reemplaza la atención de
                profesionales de salud.
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
