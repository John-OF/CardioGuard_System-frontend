import { Link, useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { fetchAnalysisOverview, fetchAnalysisReadiness } from '@/api/analysis';
import { StatusBadge } from './components/StatusBadge';
import { NoticeBox } from './components/NoticeBox';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import type { AdminOutletContext } from '@/types/admin';

function toArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

export function AnalysisOverviewPage() {
  const { token, logout } = useOutletContext<AdminOutletContext>();

  const overview = useAnalysisQuery(
    () => fetchAnalysisOverview(token),
    [token],
  );
  const readiness = useAnalysisQuery(
    () => fetchAnalysisReadiness(token),
    [token],
  );

  if (overview.status === 'error' || readiness.status === 'error') {
    const msg = overview.error ?? readiness.error ?? '';
    if (msg.includes('Token') || msg.includes('401')) {
      logout();
      return null;
    }
    return <ErrorState message="No se pudo cargar el módulo de análisis. Verifique que el backend esté activo." />;
  }

  if (overview.status === 'loading' || readiness.status === 'loading') {
    return <LoadingState />;
  }

  const ov = overview.data;
  const rd = readiness.data;

  if (!ov || !rd) {
    return <ErrorState message="No se recibieron datos del servidor." />;
  }

  const availableBlocks = toArray(ov.available_blocks);
  const fuzzyReadyBlocks = toArray(
    rd.conditionally_ready_after_fuzzy_validation ?? rd.blocked_by_fuzzy_logic,
  );
  const unavailableBlocks = toArray(rd.unavailable_due_to_missing_data);
  const fuzzyValidation = rd.fuzzy_validation_summary;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{ov.module}</h1>
        <p className="mt-1 text-base text-slate-600">
          Panel académico para revisar datos anónimos del prototipo.
        </p>
      </header>

      <NoticeBox variant="academic">{ov.non_diagnostic_notice}</NoticeBox>

      {ov.fuzzy_validation_note && (
        <NoticeBox variant="info">{ov.fuzzy_validation_note}</NoticeBox>
      )}

      {availableBlocks.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Bloques implementados
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableBlocks.map((block) => (
              <div
                key={block.id}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-medium text-slate-400">
                    Bloque {block.implementation_block ?? block.block ?? '—'}
                  </span>
                  <StatusBadge status={block.status === 'implemented' ? 'implemented' : 'planned'} />
                </div>
                <h3 className="mt-1 text-sm font-semibold text-slate-800">
                  {block.title ?? block.id}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {block.description ?? block.endpoint ?? ''}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {fuzzyReadyBlocks.length > 0 && (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-semibold text-amber-800">
            Análisis difuso habilitado condicionalmente
            {ov.fuzzy_conditionally_ready_count != null
              ? ` (${ov.fuzzy_conditionally_ready_count})`
              : ` (${fuzzyReadyBlocks.length})`}
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-amber-700">
            {fuzzyReadyBlocks.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>
          {fuzzyValidation && (
            <p className="mt-2 text-xs text-amber-600 italic">
              {fuzzyValidation.implementation}. {fuzzyValidation.data_consistency_warning}
            </p>
          )}
          {!fuzzyValidation && rd.fuzzy_postponement_reason && (
            <p className="mt-2 text-xs text-amber-600 italic">
              {rd.fuzzy_postponement_reason}
            </p>
          )}
        </section>
      )}

      {unavailableBlocks.length > 0 && (
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-500">
            No disponibles por datos faltantes
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-500">
            {unavailableBlocks.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-wrap gap-3">
        <Link to="/admin/analisis/descriptivo" className="btn-secondary text-sm min-h-0 px-6 py-2.5">
          Ir a análisis descriptivo
        </Link>
        <Link to="/admin/analisis/modelos" className="btn-secondary text-sm min-h-0 px-6 py-2.5">
          Ver modelos ML
        </Link>
      </section>
    </div>
  );
}
