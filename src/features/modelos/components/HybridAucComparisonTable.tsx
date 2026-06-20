import type { NormalizedHybridComparison } from '@/types/modelMetrics';

interface HybridAucComparisonTableProps {
  rows: NormalizedHybridComparison[];
}

const auc = (value: number) => value.toFixed(4);
const delta = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(4)}`;

export function HybridAucComparisonTable({ rows }: HybridAucComparisonTableProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">
        Comparacion de AUC: ML puro vs. ML + fuzzy
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-base border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-2 text-left font-bold text-slate-900">Modelo</th>
              <th className="px-3 py-2 text-center font-bold text-slate-900">AUC ML puro</th>
              <th className="px-3 py-2 text-center font-bold text-slate-900">AUC ML + fuzzy</th>
              <th className="px-3 py-2 text-center font-bold text-slate-900">Delta AUC</th>
              <th className="px-3 py-2 text-left font-bold text-slate-900">Interpretacion</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.model} className="border-t border-slate-100">
                <td className="px-3 py-3 font-semibold text-slate-900">{row.displayName}</td>
                <td className="px-3 py-3 text-center text-slate-700">{auc(row.aucMl)}</td>
                <td className="px-3 py-3 text-center text-slate-700">{auc(row.aucFuzzy)}</td>
                <td className="px-3 py-3 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 font-bold ${
                      row.deltaAuc > 0.005
                        ? 'bg-emerald-100 text-emerald-800'
                        : row.deltaAuc < -0.005
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {delta(row.deltaAuc)}
                  </span>
                </td>
                <td className="px-3 py-3 text-sm text-slate-700">{row.interpretation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
