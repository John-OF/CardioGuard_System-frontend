import { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAnonymousUser } from '@/hooks/useAnonymousUser';
import { useAdvancedMode } from '@/hooks/useAdvancedMode';
import { TOPIC_METAS } from '@/features/educacion/data/topicCatalog';
import { PREDICTIVE_MODELS } from '@/features/modelos/data/models';
import { BackendStatusPill } from './BackendStatusPill';
import {
  IconHome,
  IconActivity,
  IconBookOpen,
  IconBrain,
  IconHistory,
  IconClipboardCheck,
  IconScale,
} from '@/components/ui/icons';

const NAV_ICON = 'w-5 h-5 shrink-0';

const NAV_BASE =
  'block rounded-lg px-3 py-2 text-base font-medium transition-colors whitespace-nowrap';
const NAV_INACTIVE =
  'text-white/55 hover:bg-[rgba(255,255,255,0.06)] hover:text-white';
const NAV_ACTIVE = 'bg-[#3d5af1] text-white font-semibold';

export function AppLayout() {
  // Garantiza que exista un UUID anónimo desde el primer render.
  useAnonymousUser();

  const { enabled: advancedMode, notice, registerLogoClick } = useAdvancedMode();
  const location = useLocation();

  const isEducacionRoute = location.pathname.startsWith('/educacion');
  const isModelosRoute = location.pathname.startsWith('/modelos');
  const [educacionOpen, setEducacionOpen] = useState(isEducacionRoute);
  const [modelosOpen, setModelosOpen] = useState(isModelosRoute);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Si el usuario navega a una ruta de educación, abrir el dropdown.
  useEffect(() => {
    if (isEducacionRoute) setEducacionOpen(true);
  }, [isEducacionRoute]);

  // Si el usuario navega a una ruta de modelos, abrir el dropdown.
  useEffect(() => {
    if (isModelosRoute) setModelosOpen(true);
  }, [isModelosRoute]);

  // Cerrar el drawer móvil al cambiar de ruta.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const sidebarContent = (
    <div className="w-72 h-full bg-[#1a1f35] flex flex-col">
      <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.08)] flex items-center gap-3">
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
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1a1f35]"
            />
          )}
        </button>
        <span className="text-xl font-bold text-white">CardioGuard</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`
          }
        >
          <span className="flex items-center gap-3">
            <IconHome className={NAV_ICON} />
            Inicio
          </span>
        </NavLink>

        <NavLink
          to="/evaluacion"
          className={({ isActive }) =>
            `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`
          }
        >
          <span className="flex items-center gap-3">
            <IconActivity className={NAV_ICON} />
            Evaluación Preventiva
          </span>
        </NavLink>

        <div>
          <div
            className={`flex items-center rounded-lg whitespace-nowrap ${
              isEducacionRoute ? NAV_ACTIVE : NAV_INACTIVE
            }`}
          >
            <NavLink
              to="/educacion"
              end
              className="flex items-center gap-3 flex-1 px-3 py-2 text-base font-medium rounded-l-lg"
            >
              <IconBookOpen className={NAV_ICON} />
              Educación
            </NavLink>
            <button
              type="button"
              onClick={() => setEducacionOpen((v) => !v)}
              aria-expanded={educacionOpen}
              aria-controls="educacion-submenu"
              aria-label="Mostrar temas de educación"
              className="px-3 py-2 self-stretch flex items-center rounded-r-lg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 transition-transform ${
                  educacionOpen ? 'rotate-90' : ''
                }`}
                aria-hidden
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          {educacionOpen && (
            <ul
              id="educacion-submenu"
              className="mt-1 ml-4 pl-2 space-y-0.5"
            >
              {TOPIC_METAS.map((topic) => (
                <li key={topic.slug}>
                  <NavLink
                    to={`/educacion/${topic.slug}`}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-[#3d5af1] text-white font-semibold'
                          : 'text-white/55 hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
                      }`
                    }
                  >
                    <topic.Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{topic.shortTitle}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div
            className={`flex items-center rounded-lg whitespace-nowrap ${
              isModelosRoute ? NAV_ACTIVE : NAV_INACTIVE
            }`}
          >
            <NavLink
              to="/modelos"
              end
              className="flex items-center gap-3 flex-1 px-3 py-2 text-base font-medium rounded-l-lg"
            >
              <IconBrain className={NAV_ICON} />
              Modelos Predictivos
            </NavLink>
            <button
              type="button"
              onClick={() => setModelosOpen((v) => !v)}
              aria-expanded={modelosOpen}
              aria-controls="modelos-submenu"
              aria-label="Mostrar modelos predictivos"
              className="px-3 py-2 self-stretch flex items-center rounded-r-lg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 transition-transform ${
                  modelosOpen ? 'rotate-90' : ''
                }`}
                aria-hidden
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          {modelosOpen && (
            <ul id="modelos-submenu" className="mt-1 ml-4 pl-2 space-y-0.5">
              <li>
                <NavLink
                  to="/modelos/sistema-hibrido"
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-[#3d5af1] text-white font-semibold'
                        : 'text-white/55 hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
                    }`
                  }
                >
                  <IconBrain aria-hidden className="w-4 h-4 shrink-0" />
                  <span className="truncate">Sistema Híbrido (RF + Difusa)</span>
                </NavLink>
              </li>
              {PREDICTIVE_MODELS.map((model) => (
                <li key={model.slug}>
                  <NavLink
                    to={`/modelos/${model.slug}`}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                        isActive
                          ? 'bg-[#3d5af1] text-white font-semibold'
                          : 'text-white/55 hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
                      }`
                    }
                  >
                    <model.Icon aria-hidden className="w-4 h-4 shrink-0" />
                    <span className="truncate">{model.menuLabel}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        <NavLink
          to="/historial"
          className={({ isActive }) =>
            `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`
          }
        >
          <span className="flex items-center gap-3">
            <IconHistory className={NAV_ICON} />
            Historial
          </span>
        </NavLink>

        <NavLink
          to="/usabilidad"
          className={({ isActive }) =>
            `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`
          }
        >
          <span className="flex items-center gap-3">
            <IconClipboardCheck className={NAV_ICON} />
            Usabilidad
          </span>
        </NavLink>

        <NavLink
          to="/aviso-legal"
          className={({ isActive }) =>
            `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`
          }
        >
          <span className="flex items-center gap-3">
            <IconScale className={NAV_ICON} />
            Aviso legal
          </span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
        <BackendStatusPill />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar fijo en desktop */}
      <aside className="hidden md:flex sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Drawer móvil */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="fixed inset-y-0 left-0 z-50 md:hidden shadow-xl">
            {sidebarContent}
          </aside>
        </>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Barra superior solo en móvil */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
              aria-hidden
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-lg font-bold text-slate-800">CardioGuard</span>
        </div>

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

        <footer className="bg-[#151929] border-t border-[rgba(255,255,255,0.06)] py-6 text-center text-sm text-white/40">
          <span>CardioGuard</span>
          <span aria-hidden className="text-white/20 mx-2">·</span>
          <span>Proyecto de tesis</span>
          <span aria-hidden className="text-white/20 mx-2">·</span>
          <span>Universidad de Guayaquil</span>
        </footer>
      </div>
    </div>
  );
}
