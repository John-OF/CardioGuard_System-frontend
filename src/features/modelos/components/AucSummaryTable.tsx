import type { RocComparisonItem } from './RocComparisonChart';

interface AucSummaryTableProps {
  models: RocComparisonItem[];
}

const auc = (value: number | null) => (typeof value === 'number' ? value.toFixed(4) : 'No disponible');

export function AucSummaryTable({ models }: AucSummaryTableProps) {
  const sortedModels = [...models].sort((a, b) => (b.rocAuc ?? -1) - (a.rocAuc ?? -1));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">Resumen AUC-ROC</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-base border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-2 text-left font-bold text-slate-900">Modelo</th>
              <th className="px-3 py-2 text-center font-bold text-slate-900">AUC-ROC</th>
              <th className="px-3 py-2 text-left font-bold text-slate-900">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sortedModels.map((model) => (
              <tr
                key={model.name}
                className={`border-t border-slate-100 ${
                  model.selected ? 'bg-emerald-50' : 'bg-white'
                }`}
              >
                <td className="px-3 py-3 font-semibold text-slate-900">{model.displayName}</td>
                <td className="px-3 py-3 text-center">
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 font-bold text-blue-900">
                    {auc(model.rocAuc)}
                  </span>
                </td>
                <td className="px-3 py-3 text-slate-700">
                  {model.selected ? (
                    <span className="inline-flex rounded-md border border-emerald-300 bg-white px-2 py-1 text-sm font-semibold text-emerald-700">
                      Seleccionado para produccion
                    </span>
                  ) : (
                    'Modelo comparativo'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
