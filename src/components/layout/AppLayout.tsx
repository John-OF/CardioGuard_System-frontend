import { Outlet, Link } from 'react-router-dom';
import { useAnonymousUser } from '@/hooks/useAnonymousUser';
import { useAdvancedMode } from '@/hooks/useAdvancedMode';

export function AppLayout() {
  // Garantiza que exista un UUID anónimo desde el primer render.
  // Es transparente para el usuario, no se muestra en pantalla.
  useAnonymousUser();

  const { enabled: advancedMode, notice, registerLogoClick } = useAdvancedMode();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={registerLogoClick}
              aria-label="CardioGuard"
              className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              ❤
              {advancedMode && (
                <span
                  aria-hidden
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white"
                />
              )}
            </button>
            <Link to="/" className="text-xl font-bold text-slate-800">
              CardioGuard
            </Link>
          </div>
          <nav className="hidden sm:flex gap-6 text-base font-medium">
            <Link to="/evaluacion" className="hover:text-primary">Evaluación</Link>
            <Link to="/alfabetizacion" className="hover:text-primary">Alfabetización</Link>
            <Link to="/historial" className="hover:text-primary">Historial</Link>
          </nav>
        </div>
      </header>

      {notice && (
        <div
          role="status"
          className="fixed top-4 right-4 z-50 rounded-lg bg-slate-800 px-4 py-2 text-sm text-white shadow-lg"
        >
          {notice}
        </div>
      )}

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        CardioGuard · Proyecto de tesis · Universidad de Guayaquil
      </footer>
    </div>
  );
}
