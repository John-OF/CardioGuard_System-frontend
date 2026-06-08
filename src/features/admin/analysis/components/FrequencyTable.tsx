import type { FrequencyRow } from '@/types/analysis';

interface FrequencyTableProps {
  title: string;
  rows: FrequencyRow[];
}

export function FrequencyTable({ title, rows }: FrequencyTableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
        <p className="mt-1 text-sm text-slate-400">Sin datos</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h4 className="mb-2 text-sm font-semibold text-slate-700">{title}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="pb-1 pr-3 font-medium">Valor</th>
              <th className="pb-1 px-3 text-right font-medium">n</th>
              <th className="pb-1 pl-3 text-right font-medium">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row.value)} className="border-t border-slate-100">
                <td className="py-1.5 pr-3 text-slate-700">
                  {row.label ?? row.value}
                </td>
                <td className="py-1.5 px-3 text-right tabular-nums text-slate-900">
                  {row.count}
                </td>
                <td className="py-1.5 pl-3 text-right tabular-nums text-slate-600">
                  {row.percentage.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
