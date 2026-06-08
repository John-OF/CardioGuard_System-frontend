import { NavLink } from 'react-router-dom';

const NAV_ICON = 'w-5 h-5 shrink-0';
const NAV_BASE =
  'block rounded-lg px-3 py-2 text-base font-medium transition-colors whitespace-nowrap';
const NAV_INACTIVE =
  'text-white/55 hover:bg-[rgba(255,255,255,0.06)] hover:text-white';
const NAV_ACTIVE = 'bg-[#3d5af1] text-white font-semibold';

function IconBarChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}
function IconPieChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
function IconSplit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M12 20v-8" /><path d="M3 3l7 7" />
    </svg>
  );
}
function IconAlertCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
function IconCpu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}
function IconClock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const SIDEBAR_ITEMS = [
  { to: '/admin/analisis', icon: IconPieChart, label: 'Resumen', end: true },
  { to: '/admin/analisis/descriptivo', icon: IconBarChart, label: 'Descriptivo' },
  { to: '/admin/analisis/pre-post', icon: IconSplit, label: 'Pre-test / Post-test' },
  { to: '/admin/analisis/emergencias', icon: IconAlertCircle, label: 'Emergencias' },
  { to: '/admin/analisis/modelos', icon: IconCpu, label: 'Modelos ML' },
  { to: '/admin/analisis/pendientes', icon: IconClock, label: 'Análisis pendientes' },
];

interface AnalysisSidebarProps {
  onNavigate?: () => void;
}

export function AnalysisSidebar({ onNavigate }: AnalysisSidebarProps) {
  return (
    <div className="flex h-full w-72 flex-col bg-[#1a1f35]">
      <div className="border-b border-[rgba(255,255,255,0.08)] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          CardioGuard
        </p>
        <h2 className="text-lg font-semibold text-slate-100">
          Módulo de análisis
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`
            }
          >
            <span className="flex items-center gap-3">
              <item.icon className={NAV_ICON} />
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
