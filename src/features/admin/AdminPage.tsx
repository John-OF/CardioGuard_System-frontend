import { useAdminAuth } from './hooks/useAdminAuth';
import { useAdminStats } from './hooks/useAdminStats';
import { useAdminCycles } from './hooks/useAdminCycles';
import { AdminLogin } from './components/AdminLogin';
import { StatsSection } from './components/StatsSection';
import { CyclesTable } from './components/CyclesTable';

function AdminDashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  // `onLogout` ya viene memoizado (useCallback) desde useAdminAuth,
  // así que es seguro pasarlo como dependencia estable a los hooks de datos.
  const stats = useAdminStats(token, onLogout);
  const cycles = useAdminCycles(token, onLogout);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              CardioGuard
            </p>
            <h1 className="text-lg font-semibold text-slate-100">
              Panel administrativo
            </h1>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-md border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-6 py-8">
        {/* Estadísticas generales */}
        {stats.status === 'loading' && (
          <p className="text-sm text-slate-500">Cargando estadísticas…</p>
        )}
        {stats.status === 'error' && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            No se pudieron cargar las estadísticas. Intente recargar la página.
          </div>
        )}
        {stats.status === 'ready' && <StatsSection stats={stats.data} />}

        {/* Tabla de ciclos */}
        <CyclesTable
          items={cycles.state.status === 'ready' ? cycles.state.data.items : []}
          total={
            cycles.state.status === 'ready' ? cycles.state.data.total : 0
          }
          page={cycles.page}
          pageCount={cycles.pageCount}
          order={cycles.order}
          loading={cycles.state.status === 'loading'}
          onOrderChange={cycles.setOrder}
          onPageChange={cycles.goToPage}
        />
        {cycles.state.status === 'error' && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            No se pudo cargar la tabla de ciclos.
          </div>
        )}
      </main>
    </div>
  );
}

export function AdminPage() {
  const { state, verifying, error, login, logout } = useAdminAuth();

  if (state.status === 'unauthenticated') {
    return <AdminLogin onSubmit={login} verifying={verifying} error={error} />;
  }

  return <AdminDashboard token={state.token} onLogout={logout} />;
}
