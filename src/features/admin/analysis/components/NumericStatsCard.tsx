import type { NumericStats } from '@/types/analysis';

interface NumericStatsCardProps {
  title: string;
  stats: NumericStats | null;
  maxScore?: number;
  decimals?: number;
  stdDecimals?: number;
}

export function NumericStatsCard({ title, stats, maxScore, decimals = 2, stdDecimals }: NumericStatsCardProps) {
  const fmt = (v: number | null | undefined, d?: number) => v != null ? v.toFixed(d ?? decimals) : '—';

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
          {fmt(stats.mean)}
        </dd>
        <dt className="text-slate-500">Mediana</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {fmt(stats.median)}
        </dd>
        <dt className="text-slate-500">DE</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {fmt(stats.std, stdDecimals)}
        </dd>
        <dt className="text-slate-500">Mín</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {fmt(stats.min)}
        </dd>
        <dt className="text-slate-500">Máx</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {fmt(stats.max)}
        </dd>
        <dt className="text-slate-500">Q1</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {fmt(stats.q1)}
        </dd>
        <dt className="text-slate-500">Q3</dt>
        <dd className="text-right tabular-nums text-slate-900">
          {fmt(stats.q3)}
        </dd>
      </dl>
    </div>
  );
}
