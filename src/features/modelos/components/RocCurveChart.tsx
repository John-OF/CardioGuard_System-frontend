import type { RocCurveData } from '@/types/modelMetrics';

interface RocCurveChartProps {
  title?: string;
  modelName: string;
  rocAuc: number | null;
  rocCurve: RocCurveData | null;
}

const pct = (value: number) => `${(value * 100).toFixed(2)}%`;
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

export function RocCurveChart({
  title = 'Curva ROC individual',
  modelName,
  rocAuc,
  rocCurve,
}: RocCurveChartProps) {
  const validCurve = hasValidCurve(rocCurve);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <p className="text-base text-slate-600 mt-1">
            Relaciona falsos positivos (FPR) y verdaderos positivos (TPR) del modelo.
          </p>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-800">
          <span className="block text-sm font-semibold">AUC-ROC</span>
          <span className="text-2xl font-bold">{auc(rocAuc)}</span>
        </div>
      </div>

      {validCurve ? (
        <div className="overflow-x-auto">
          <svg
            role="img"
            aria-label={`Curva ROC de ${modelName} con AUC ${auc(rocAuc)}`}
            viewBox="0 0 420 320"
            className="w-full min-w-[360px] max-w-3xl"
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
            <path d={curvePath(rocCurve)} stroke="#2563eb" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="62" cy="248" r="4" fill="#2563eb" />
            <circle cx="362" cy="24" r="4" fill="#2563eb" />
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
            <text x="244" y="230" className="fill-slate-500 text-[13px]">
              Clasificador aleatorio
            </text>
            <text x="76" y="42" className="fill-blue-700 text-[15px] font-bold">
              {modelName} ({pct(rocAuc ?? 0)})
            </text>
          </svg>
        </div>
      ) : (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-base text-amber-900">
          No hay puntos ROC suficientes para dibujar la curva. El AUC se mostrara si esta disponible.
        </div>
      )}
    </section>
  );
}
