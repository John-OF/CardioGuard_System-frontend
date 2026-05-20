import { useState, type FormEvent } from 'react';

interface AdminLoginProps {
  onSubmit: (token: string) => void;
  verifying: boolean;
  error: string | null;
}

export function AdminLogin({ onSubmit, verifying, error }: AdminLoginProps) {
  const [token, setToken] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!verifying) onSubmit(token);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            CardioGuard
          </p>
          <h1 className="mt-1 text-xl font-semibold text-slate-100">
            Panel administrativo
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Acceso restringido al equipo administrativo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg"
        >
          <label
            htmlFor="admin-token"
            className="block text-sm font-medium text-slate-300"
          >
            Token administrativo
          </label>
          <input
            id="admin-token"
            type="password"
            autoComplete="off"
            autoFocus
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={verifying}
            className="mt-2 w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-0 disabled:opacity-60"
            placeholder="Ingrese el token"
          />

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-md border border-rose-800 bg-rose-950/60 px-3 py-2 text-sm text-rose-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={verifying}
            className="mt-5 w-full rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {verifying ? 'Verificando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
