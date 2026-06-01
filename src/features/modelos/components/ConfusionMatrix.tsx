interface ConfusionMatrixProps {
  matrix: number[][];
  labels?: string[];
}

export function ConfusionMatrix({
  matrix,
  labels = ['Negativo', 'Positivo'],
}: ConfusionMatrixProps) {
  const total = matrix.flat().reduce((sum, val) => sum + val, 0);

  const cellColor = (value: number) => {
    const percentage = (value / total) * 100;
    if (percentage > 30) return 'bg-blue-600 text-white';
    if (percentage > 20) return 'bg-blue-500 text-white';
    if (percentage > 10) return 'bg-blue-400 text-white';
    if (percentage > 5) return 'bg-blue-300 text-slate-900';
    return 'bg-blue-100 text-slate-900';
  };

  const summary = [
    { label: 'Verdaderos Positivos (VP)', value: matrix[1][1] },
    { label: 'Verdaderos Negativos (VN)', value: matrix[0][0] },
    { label: 'Falsos Positivos (FP)', value: matrix[0][1] },
    { label: 'Falsos Negativos (FN)', value: matrix[1][0] },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-2xl font-bold mb-6 text-slate-900">Matriz de confusión</h3>

      <div className="flex items-center gap-3">
        <div
          className="text-base font-semibold text-slate-700 -rotate-90 whitespace-nowrap"
          style={{ width: '24px' }}
        >
          Real
        </div>

        <div className="flex-1">
          <div className="text-center text-base font-semibold text-slate-700 mb-2">
            Predicción
          </div>

          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `90px repeat(${labels.length}, 1fr)` }}
          >
            <div />
            {labels.map((label) => (
              <div
                key={label}
                className="text-center font-semibold text-slate-700 text-sm pb-1"
              >
                {label}
              </div>
            ))}

            {matrix.map((row, i) => (
              <div key={i} className="contents">
                <div className="flex items-center justify-end pr-3 font-semibold text-slate-700 text-sm">
                  {labels[i]}
                </div>
                {row.map((value, j) => (
                  <div
                    key={j}
                    className={`flex flex-col items-center justify-center p-5 rounded-lg ${cellColor(value)}`}
                  >
                    <span className="text-2xl font-bold">{value}</span>
                    <span className="text-xs mt-1 opacity-80">
                      {((value / total) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
        {summary.map((item) => (
          <div key={item.label}>
            <span className="font-semibold text-slate-700">{item.label}:</span>{' '}
            <span className="text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
