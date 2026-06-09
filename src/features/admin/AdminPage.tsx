import { Outlet } from 'react-router-dom';
import { useAdminAuth } from './hooks/useAdminAuth';
import { AdminLogin } from './components/AdminLogin';
import { AdminSidebar } from './components/AdminSidebar';
import type { AdminOutletContext } from '@/types/admin';

export function AdminPage() {
  const { state, verifying, error, login, logout } = useAdminAuth();

  if (state.status === 'unauthenticated') {
    return <AdminLogin onSubmit={login} verifying={verifying} error={error} />;
  }

  const ctx: AdminOutletContext = { token: state.token, logout };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar onLogout={logout} />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-8">
          <Outlet context={ctx} />
        </div>
      </main>
    </div>
  );
}
