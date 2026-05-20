import type { AdminCycleItem, CyclesOrder } from '@/types/admin';
import { RiskBadge } from './RiskBadge';
import { pct, deltaPts, deltaSign, shortDate } from '../utils/format';

interface CyclesTableProps {
  items: AdminCycleItem[];
  total: number;
  page: number;        // 0-based
  pageCount: number;
  order: CyclesOrder;
  loading: boolean;
  onOrderChange: (order: CyclesOrder) => void;
  onPageChange: (page: number) => void;
}

function DeltaTag({ value, invert = false }: { value: number; invert?: boolean }) {
  // invert=true para ML: una caída de probabilidad es una mejora.
  const effective = invert ? -value : value;
  const sign = deltaSign(effective);
  const cls =
    sign === 'up'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : sign === 'down'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : 'bg-slate-50 text-slate-600 border-slate-200';
  return (
    <span
      className={`inline-block rounded border px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${cls}`}
    >
      {deltaPts(value)}
    </span>
  );
}

function ScoreCell({
  pre,
  post,
  delta,
  invert = false,
}: {
  pre: number;
  post: number;
  delta: number;
  invert?: boolean;
}) {
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="tabular-nums text-slate-600">
        {pct(pre)} <span className="text-slate-400">→</span>{' '}
        <span className="font-medium text-slate-900">{pct(post)}</span>
      </span>
      <DeltaTag value={delta} invert={invert} />
    </div>
  );
}

function ImprovedBadge({ improved }: { improved: boolean }) {
  return improved ? (
    <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
      Mejoró
    </span>
  ) : (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-500">
      No mejoró
    </span>
  );
}

export function CyclesTable({
  items,
  total,
  page,
  pageCount,
  order,
  loading,
  onOrderChange,
  onPageChange,
}: CyclesTableProps) {
  const from = total === 0 ? 0 : page * 20 + 1;
  const to = Math.min(total, (page + 1) * 20);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Ciclos completos
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="cycles-order" className="text-slate-500">
            Orden:
          </label>
          <select
            id="cycles-order"
            value={order}
            onChange={(e) => onOrderChange(e.target.value as CyclesOrder)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-0"
          >
            <option value="recent">Más reciente</option>
            <option value="oldest">Más antiguo</option>
          </select>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[56rem] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2 pl-4 pr-3 font-medium">Usuario</th>
              <th className="py-2 px-3 font-medium">Pre-test</th>
              <th className="py-2 px-3 font-medium">Post-test</th>
              <th className="py-2 px-3 text-right font-medium">Educación</th>
              <th className="py-2 px-3 text-right font-medium">Emergencia</th>
              <th className="py-2 px-3 text-right font-medium">Prob. ML</th>
              <th className="py-2 pl-3 pr-4 text-right font-medium">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  Cargando ciclos…
                </td>
              </tr>
            )}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  No hay ciclos completos registrados.
                </td>
              </tr>
            )}

            {!loading &&
              items.map((c) => (
                <tr
                  key={`${c.pre_test.evaluation_id}-${c.post_test.evaluation_id}`}
                  className="border-t border-slate-100 align-top"
                >
                  <td className="py-3 pl-4 pr-3">
                    <span className="font-mono text-xs text-slate-600">
                      {c.anonymous_user_id}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-xs text-slate-500">
                      {shortDate(c.pre_test.created_at)}
                    </div>
                    <div className="mt-1">
                      <RiskBadge level={c.pre_test.risk_level} />
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-xs text-slate-500">
                      {shortDate(c.post_test.created_at)}
                    </div>
                    <div className="mt-1">
                      <RiskBadge level={c.post_test.risk_level} />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <ScoreCell
                      pre={c.pre_test.education_score}
                      post={c.post_test.education_score}
                      delta={c.delta.education_change}
                    />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <ScoreCell
                      pre={c.pre_test.emergency_score}
                      post={c.post_test.emergency_score}
                      delta={c.delta.emergency_change}
                    />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <ScoreCell
                      pre={c.pre_test.ml_probability}
                      post={c.post_test.ml_probability}
                      delta={c.delta.ml_probability_change}
                      invert
                    />
                  </td>
                  <td className="py-3 pl-3 pr-4 text-right">
                    <ImprovedBadge improved={c.delta.improved} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span className="tabular-nums">
          {total === 0
            ? 'Sin resultados'
            : `Mostrando ${from}–${to} de ${total}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 0 || loading}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="tabular-nums text-slate-600">
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page + 1 >= pageCount || loading}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}
