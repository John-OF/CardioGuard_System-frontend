import { Link, useOutletContext } from 'react-router-dom';
import { useAnalysisQuery } from './hooks/useAnalysisQuery';
import { fetchAnalysisOverview, fetchAnalysisReadiness } from '@/api/analysis';
import { StatusBadge } from './components/StatusBadge';
import { NoticeBox } from './components/NoticeBox';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

interface OutletCtx {
  token: string;
  logout: () => void;
}

export function AnalysisOverviewPage() {
  const { token, logout } = useOutletContext<OutletCtx>();

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

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">{ov.module}</h1>
        <p className="mt-1 text-base text-slate-600">
          Panel académico para revisar datos anónimos del prototipo.
        </p>
      </header>

      <NoticeBox variant="academic">{ov.non_diagnostic_notice}</NoticeBox>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Bloques implementados
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ov.available_blocks.map((block) => (
            <div
              key={block.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-slate-400">
                  Bloque {block.implementation_block}
                </span>
                <StatusBadge status="implemented" />
              </div>
              <h3 className="mt-1 text-sm font-semibold text-slate-800">
                {block.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{block.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-sm font-semibold text-amber-800">
          Bloques posteriores pendientes ({ov.fuzzy_blocked_count})
        </h3>
        <ul className="mt-2 space-y-1 text-sm text-amber-700">
          {rd.blocked_by_fuzzy_logic.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-amber-600 italic">
          {rd.fuzzy_postponement_reason}
        </p>
      </section>

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
