import { useOutletContext } from 'react-router-dom';
import { useAdminStats } from './hooks/useAdminStats';
import { useAdminCycles } from './hooks/useAdminCycles';
import type { AdminOutletContext } from '@/types/admin';
import { StatsSection } from './components/StatsSection';
import { CyclesTable } from './components/CyclesTable';

const thesisAlignment = [
  'El modelo de Machine Learning estima una probabilidad de riesgo cardiovascular a partir de variables clínicas y conductuales.',
  'El sistema difuso Mamdani interpreta la salida del modelo junto con edad, IMC, actividad física, presión arterial y colesterol para generar un nivel interpretativo de riesgo bajo, moderado o alto.',
  'La estadística descriptiva resume la muestra y los registros generados por el sistema.',
  'El análisis pre-test / post-test permite observar cambios en el componente educativo sobre soporte vital básico.',
  'El análisis de emergencias resume la preparación declarada ante eventos cardiovasculares.',
  'Los resultados son académicos, preventivos y orientativos; no constituyen diagnóstico clínico.',
];

const fuzzyStatus = [
  'Motor: scikit-fuzzy.',
  'Método de defuzzificación: centroide.',
  'Entradas consideradas: probabilidad ML, edad, IMC, actividad física, presión arterial y colesterol.',
  'Salidas: nivel de riesgo difuso y puntaje difuso aproximado.',
  'La interpretación difusa funciona como una capa explicativa del resultado del modelo, no como diagnóstico médico.',
];

const methodologicalConsiderations = [
  'Los datos son anónimos y de uso exclusivamente académico.',
  'Los resultados no reemplazan la evaluación médica profesional.',
  'El tiempo de reacción ante emergencias corresponde a una respuesta ordinal/autodeclarada, no a una medición cronometrada en segundos.',
  'Los registros históricos pueden combinar resultados generados antes y después de la validación Mamdani; para análisis definitivos se recomienda usar registros posteriores a dicha validación o recalcular los valores difusos históricos.',
  'El análisis inferencial mediante chi-cuadrado, correlaciones y regresión logística fue retirado por ajuste metodológico, para evitar forzar variables cualitativas o educativas en pruebas no alineadas con el enfoque final.',
];

function MethodologyList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0E7490]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Estado metodológico del prototipo
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
          El prototipo CardioGuard integra estimación automática de riesgo,
          interpretación difusa y análisis descriptivo/educativo con fines
          académicos y preventivos.
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <MethodologyList title="Alineación con la tesis" items={thesisAlignment} />
          <MethodologyList title="Estado de lógica difusa Mamdani" items={fuzzyStatus} />
          <MethodologyList
            title="Consideraciones metodológicas"
            items={methodologicalConsiderations}
          />
        </div>
      </section>
    </div>
  );
}
