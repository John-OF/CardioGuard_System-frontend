import { Outlet, Link } from 'react-router-dom';
import { useAnonymousUser } from '@/hooks/useAnonymousUser';

export function AppLayout() {
  // Garantiza que exista un UUID anónimo desde el primer render.
  // Es transparente para el usuario, no se muestra en pantalla.
  useAnonymousUser();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              ❤
            </div>
            <span className="text-xl font-bold text-slate-800">CardioGuard</span>
          </Link>
          <nav className="hidden sm:flex gap-6 text-base font-medium">
            <Link to="/evaluacion" className="hover:text-primary">Evaluación</Link>
            <Link to="/educacion" className="hover:text-primary">Aprender</Link>
            <Link to="/simulador" className="hover:text-primary">Simulador</Link>
            <Link to="/historial" className="hover:text-primary">Historial</Link>
          </nav>
        </div>
      </header>

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