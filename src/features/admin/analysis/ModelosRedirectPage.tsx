import { Link } from 'react-router-dom';

const MODEL_LINKS = [
  { to: '/modelos', label: 'Panel general de modelos' },
  { to: '/modelos/sistema-hibrido', label: 'Sistema Híbrido (RF + Difusa)' },
  { to: '/modelos/random-forest', label: 'Random Forest' },
  { to: '/modelos/xgboost', label: 'XGBoost' },
  { to: '/modelos/svm', label: 'SVM' },
  { to: '/modelos/mlp', label: 'MLP' },
];

export function ModelosRedirectPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Modelos ML
        </h1>
        <p className="mt-1 text-base text-slate-600">
          Las métricas del componente Machine Learning se visualizan en el
          módulo de modelos, donde se muestran matriz de confusión, reporte de
          clasificación y curvas ROC/AUC.
        </p>
      </header>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        El análisis inferencial de los modelos (odds ratios, intervalos de
        confianza, pruebas de asociación) se implementará en bloques
        posteriores del módulo de análisis estadístico.
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODEL_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-primary/30 hover:shadow-sm"
          >
            <span className="text-sm font-semibold text-slate-800">
              {link.label}
            </span>
            <span className="ml-2 text-primary" aria-hidden>
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
