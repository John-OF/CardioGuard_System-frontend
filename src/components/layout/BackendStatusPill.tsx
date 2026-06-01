import { useBackendStatus, type BackendStatus } from '@/hooks/useBackendStatus';

const CONFIG: Record<
  BackendStatus,
  { dot: string; pulse: boolean; title: string; subtitle: string; titleColor: string }
> = {
  checking: {
    dot: 'bg-slate-400',
    pulse: true,
    title: 'Verificando servidor…',
    subtitle: 'Comprobando la conexión',
    titleColor: 'text-white/70',
  },
  online: {
    dot: 'bg-emerald-400',
    pulse: false,
    title: 'Servidor activo',
    subtitle: 'Sistema operativo',
    titleColor: 'text-emerald-300',
  },
  inactive: {
    dot: 'bg-red-400',
    pulse: false,
    title: 'Servidor inactivo',
    subtitle: 'Inícielo para poder evaluar',
    titleColor: 'text-red-300',
  },
  loading: {
    dot: 'bg-amber-400',
    pulse: true,
    title: 'Servidor cargando…',
    subtitle: 'Puede tardar ~30 s la primera vez',
    titleColor: 'text-amber-300',
  },
};

export function BackendStatusPill() {
  const status = useBackendStatus();
  const cfg = CONFIG[status];

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-3 py-3"
    >
      <span className="relative flex h-2.5 w-2.5 mt-1.5 shrink-0">
        {cfg.pulse && (
          <span
            aria-hidden
            className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${cfg.dot}`}
          />
        )}
        <span
          aria-hidden
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${cfg.dot}`}
        />
      </span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold ${cfg.titleColor}`}>{cfg.title}</p>
        <p className="text-xs text-white/45">{cfg.subtitle}</p>
      </div>
    </div>
  );
}
