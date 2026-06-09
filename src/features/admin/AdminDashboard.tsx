import { useOutletContext } from 'react-router-dom';
import { useAdminStats } from './hooks/useAdminStats';
import { useAdminCycles } from './hooks/useAdminCycles';
import type { AdminOutletContext } from '@/types/admin';
import { StatsSection } from './components/StatsSection';
import { CyclesTable } from './components/CyclesTable';

export function AdminDashboard() {
  const { token, logout } = useOutletContext<AdminOutletContext>();
  const stats = useAdminStats(token, logout);
  const cycles = useAdminCycles(token, logout);

  return (
    <div className="space-y-10">
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
    </div>
  );
}
