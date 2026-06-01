import type { ClassificationReport as ClassificationReportData } from '../data/models';

const pct = (value: number) => `${(value * 100).toFixed(2)}%`;

export function ClassificationReport({
  classes,
  accuracy,
  macroAvg,
  weightedAvg,
}: ClassificationReportData) {
  const totalSupport = Object.values(classes).reduce((sum, m) => sum + m.support, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-bold mb-6 text-slate-900">Reporte de clasificación</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-base border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left font-bold text-slate-900 px-3 py-2">Clase</th>
              <th className="text-center font-bold text-slate-900 px-3 py-2">Precisión</th>
              <th className="text-center font-bold text-slate-900 px-3 py-2">Recall</th>
              <th className="text-center font-bold text-slate-900 px-3 py-2">F1-Score</th>
              <th className="text-center font-bold text-slate-900 px-3 py-2">Soporte</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(classes).map(([className, m]) => (
              <tr key={className} className="border-t border-slate-100">
                <td className="font-semibold text-slate-900 px-3 py-2">{className}</td>
                <td className="text-center px-3 py-2">
                  <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-semibold">
                    {pct(m.precision)}
                  </span>
                </td>
                <td className="text-center px-3 py-2">
                  <span className="inline-flex px-3 py-1 rounded-full bg-purple-100 text-purple-900 font-semibold">
                    {pct(m.recall)}
                  </span>
                </td>
                <td className="text-center px-3 py-2">
                  <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-900 font-semibold">
                    {pct(m.f1Score)}
                  </span>
                </td>
                <td className="text-center font-semibold text-slate-900 px-3 py-2">{m.support}</td>
              </tr>
            ))}

            <tr>
              <td colSpan={5} className="h-2 p-0 bg-slate-100" />
            </tr>

            <tr className="bg-blue-50">
              <td className="font-bold text-slate-900 px-3 py-2">Promedio macro</td>
              <td className="text-center font-semibold text-blue-900 px-3 py-2">{pct(macroAvg.precision)}</td>
              <td className="text-center font-semibold text-blue-900 px-3 py-2">{pct(macroAvg.recall)}</td>
              <td className="text-center font-semibold text-blue-900 px-3 py-2">{pct(macroAvg.f1Score)}</td>
              <td className="text-center font-semibold text-slate-900 px-3 py-2">{macroAvg.support}</td>
            </tr>

            <tr className="bg-purple-50">
              <td className="font-bold text-slate-900 px-3 py-2">Promedio ponderado</td>
              <td className="text-center font-semibold text-purple-900 px-3 py-2">{pct(weightedAvg.precision)}</td>
              <td className="text-center font-semibold text-purple-900 px-3 py-2">{pct(weightedAvg.recall)}</td>
              <td className="text-center font-semibold text-purple-900 px-3 py-2">{pct(weightedAvg.f1Score)}</td>
              <td className="text-center font-semibold text-slate-900 px-3 py-2">{weightedAvg.support}</td>
            </tr>

            <tr className="bg-green-50">
              <td className="font-bold text-slate-900 px-3 py-2">Exactitud global</td>
              <td colSpan={3} className="text-center px-3 py-2">
                <span className="inline-flex px-4 py-1.5 rounded-full bg-green-600 text-white font-bold text-lg">
                  {pct(accuracy)}
                </span>
              </td>
              <td className="text-center font-semibold text-slate-900 px-3 py-2">{totalSupport}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <h4 className="font-semibold text-base text-slate-900 mb-3">Interpretación:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
          <div>
            <span className="font-semibold text-blue-900">Precisión:</span> proporción de predicciones positivas que fueron correctas.
          </div>
          <div>
            <span className="font-semibold text-purple-900">Recall:</span> proporción de casos positivos reales que fueron identificados.
          </div>
          <div>
            <span className="font-semibold text-green-900">F1-Score:</span> media armónica entre precisión y recall.
          </div>
        </div>
      </div>
    </div>
  );
}
