import type { RocCurveData } from '@/types/modelMetrics';

export interface RocComparisonItem {
  name: string;
  displayName: string;
  rocAuc: number | null;
  rocCurve: RocCurveData | null;
  selected: boolean;
}

interface RocComparisonChartProps {
  models: RocComparisonItem[];
}

const COLORS = ['#059669', '#ea580c', '#0284c7', '#9333ea'];

const auc = (value: number | null) => (typeof value === 'number' ? value.toFixed(4) : 'No disponible');

function hasValidCurve(curve: RocCurveData | null): curve is RocCurveData {
  return Boolean(
    curve &&
      curve.fpr.length >= 2 &&
      curve.fpr.length === curve.tpr.length &&
      curve.fpr.every(Number.isFinite) &&
      curve.tpr.every(Number.isFinite),
  );
}

function curvePath(curve: RocCurveData) {
  const left = 62;
  const top = 24;
  const width = 300;
  const height = 224;

  return curve.fpr
    .map((fpr, index) => {
      const tpr = curve.tpr[index];
      const x = left + Math.min(1, Math.max(0, fpr)) * width;
      const y = top + (1 - Math.min(1, Math.max(0, tpr))) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export function RocComparisonChart({ models }: RocComparisonChartProps) {
  const validModels = models.filter(
    (model): model is RocComparisonItem & { rocCurve: RocCurveData } =>
      hasValidCurve(model.rocCurve),
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-slate-900">Comparacion ROC de modelos</h3>
        <p className="text-base text-slate-600 mt-1">
          La curva mas cercana a la esquina superior izquierda indica mejor discriminacion.
        </p>
      </div>

      {validModels.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-6 items-start">
          <div className="overflow-x-auto">
            <svg
              role="img"
              aria-label="Curvas ROC comparativas de los modelos evaluados"
              viewBox="0 0 420 320"
              className="w-full min-w-[360px]"
            >
              <rect x="62" y="24" width="300" height="224" fill="#f8fafc" stroke="#cbd5e1" />
              {[0, 0.5, 1].map((tick) => {
                const x = 62 + tick * 300;
                const y = 24 + (1 - tick) * 224;
                return (
                  <g key={tick}>
                    <line x1={x} y1="24" x2={x} y2="248" stroke="#e2e8f0" />
                    <line x1="62" y1={y} x2="362" y2={y} stroke="#e2e8f0" />
                    <text x={x} y="273" textAnchor="middle" className="fill-slate-600 text-[13px]">
                      {tick.toFixed(1)}
                    </text>
                    <text x="48" y={y + 4} textAnchor="end" className="fill-slate-600 text-[13px]">
                      {tick.toFixed(1)}
                    </text>
                  </g>
                );
              })}
              <path d="M 62 248 L 362 24" stroke="#94a3b8" strokeWidth="2" strokeDasharray="8 7" fill="none" />
              {validModels.map((model, index) => (
                <path
                  key={model.name}
                  d={curvePath(model.rocCurve)}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={model.selected ? 5 : 3}
                  strokeDasharray={model.selected ? undefined : index % 2 === 0 ? '10 5' : undefined}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              <text x="212" y="306" textAnchor="middle" className="fill-slate-800 text-[15px] font-semibold">
                FPR - Tasa de falsos positivos
              </text>
              <text
                x="18"
                y="136"
                textAnchor="middle"
                transform="rotate(-90 18 136)"
                className="fill-slate-800 text-[15px] font-semibold"
              >
                TPR - Tasa de verdaderos positivos
              </text>
            </svg>
          </div>

          <div className="space-y-3">
            {models.map((model, index) => (
              <div
                key={model.name}
                className={`rounded-lg border p-3 ${
                  model.selected ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-3 w-8 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-bold text-slate-900">{model.displayName}</span>
                </div>
                <p className="mt-1 text-sm text-slate-700">
                  AUC-ROC: <span className="font-semibold">{auc(model.rocAuc)}</span>
                </p>
                {model.selected && (
                  <span className="mt-2 inline-flex rounded-md border border-emerald-300 bg-white px-2 py-1 text-sm font-semibold text-emerald-700">
                    Modelo seleccionado
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-base text-amber-900">
          No hay puntos ROC suficientes para dibujar la comparacion.
        </div>
      )}
    </section>
  );
}
