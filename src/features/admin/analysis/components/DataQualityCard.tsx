interface DataQualityEntry {
  label: string;
  value: number;
}

interface DataQualityCardProps {
  entries: DataQualityEntry[];
}

export function DataQualityCard({ entries }: DataQualityCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h4 className="mb-2 text-sm font-semibold text-slate-700">
        Calidad de datos
      </h4>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        {entries.map((entry) => (
          <div key={entry.label} className="contents">
            <dt className="text-slate-500">{entry.label}</dt>
            <dd className="text-right tabular-nums text-slate-900">
              {entry.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
