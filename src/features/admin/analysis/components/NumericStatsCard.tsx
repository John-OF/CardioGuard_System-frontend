import type { NumericStats } from '@/types/analysis';

interface NumericStatsCardProps {
  title: string;
  stats: NumericStats | null;
  maxScore?: number;
}

export function NumericStatsCard({ title, stats, maxScore }: NumericStatsCardProps) {
  if (!stats) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
        <p className="mt-2 text-sm text-slate-400">Sin datos</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-slate-700">
        {title}
        {maxScore !== undefined && (
          <span className="ml-1 font-normal text-slate-400">
            (máx. {maxScore})
          </span>
        )}
      </h4>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <dt className="text-slate-500">n</dt>
        <dd className="text-right tabular-nums text-slate-900">{stats.count}</dd>
        <dt className="text-slate-500">Media</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {stats.mean?.toFixed(2) ?? '—'}
        </dd>
        <dt className="text-slate-500">Mediana</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {stats.median?.toFixed(2) ?? '—'}
        </dd>
        <dt className="text-slate-500">DE</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {stats.std?.toFixed(2) ?? '—'}
        </dd>
        <dt className="text-slate-500">Mín</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {stats.min?.toFixed(2) ?? '—'}
        </dd>
        <dt className="text-slate-500">Máx</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {stats.max?.toFixed(2) ?? '—'}
        </dd>
        <dt className="text-slate-500">Q1</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {stats.q1?.toFixed(2) ?? '—'}
        </dd>
        <dt className="text-slate-500">Q3</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {stats.q3?.toFixed(2) ?? '—'}
        </dd>
      </dl>
    </div>
  );
}
