import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './hooks/useAdminAuth';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export function AdminPage() {
  const { state, verifying, error, login, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (state.status === 'unauthenticated') {
    return <AdminLogin onSubmit={login} verifying={verifying} error={error} />;
  }

  const isAnalysisRoute = location.pathname.startsWith('/admin/analisis');

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
          <div className="flex items-center gap-3">
            {!isAnalysisRoute && (
              <button
                type="button"
                onClick={() => navigate('/admin/analisis')}
                className="rounded-md border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
              >
                Módulo de análisis
              </button>
            )}
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-6 py-8">
        {isAnalysisRoute ? (
          <Outlet context={{ token: state.token, logout }} />
        ) : (
          <AdminDashboard token={state.token} onLogout={logout} />
        )}
      </main>
    </div>
  );
}
