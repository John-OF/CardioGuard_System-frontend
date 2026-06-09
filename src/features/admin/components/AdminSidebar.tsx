import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  );
}

function HeartPulseIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function ChiSquareIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h14M5 12h14M5 17h14M8 4l8 16M16 4L8 20" />
    </svg>
  );
}

function CorrelationIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 18c4 0 5-12 8-12s4 12 8 12M4 6h.01M20 18h.01" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}

const navItems = [
  { to: '/admin', label: 'Panel general', icon: HomeIcon, end: true },
];

const analysisItems = [
  { to: '/admin/analisis', label: 'Resumen', icon: BarChartIcon, end: true },
  { to: '/admin/analisis/descriptivo', label: 'Descriptivo', icon: DatabaseIcon },
  { to: '/admin/analisis/pre-post', label: 'Pre-test / Post-test', icon: FlaskIcon },
  { to: '/admin/analisis/emergencias', label: 'Emergencias', icon: HeartPulseIcon },
  { to: '/admin/analisis/chi-cuadrado', label: 'Chi-cuadrado', icon: ChiSquareIcon },
  { to: '/admin/analisis/correlaciones', label: 'Correlaciones', icon: CorrelationIcon },
  { to: '/admin/analisis/modelos', label: 'Modelos ML', icon: BrainIcon },
  { to: '/admin/analisis/pendientes', label: 'Pendientes', icon: ClockIcon },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0E7490] text-sm font-bold text-white">
          CG
        </div>
        <span className="text-base font-semibold text-white">CardioGuard</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#3d5af1] text-white font-semibold'
                  : 'text-white/55 hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
              }`
            }
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}

        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-white/30">
            Análisis
          </p>
        </div>

        {analysisItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-[#3d5af1] text-white font-semibold'
                  : 'text-white/55 hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
              }`
            }
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[rgba(255,255,255,0.08)] p-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/55 transition-colors hover:bg-[rgba(255,255,255,0.06)] hover:text-white whitespace-nowrap"
        >
          <LogOutIcon />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 h-screen sticky top-0 bg-[#1a1f35] overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile menu button */}
      <MobileDrawer>
        {sidebarContent}
      </MobileDrawer>
    </>
  );
}

function MobileDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 flex md:hidden items-center justify-center w-10 h-10 rounded-lg bg-[#1a1f35] text-white shadow-lg"
        aria-label="Abrir menú"
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#1a1f35] flex flex-col overflow-hidden">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-white/55 hover:text-white"
              >
                <CloseIcon />
              </button>
            </div>
            {children}
          </aside>
        </div>
      )}
    </>
  );
}
