import { useEffect, useState } from 'react';
import { checkHealth } from '@/api/health';

export type BackendStatus = 'checking' | 'online' | 'inactive' | 'loading';

// Detección de entorno por la URL del backend:
// - localhost/127.0.0.1 (o sin URL) → ejecución LOCAL.
// - cualquier otra (p. ej. dominio de Render) → DESPLEGADO.
const API_BASE = import.meta.env.VITE_API_URL ?? '';
const IS_LOCAL = API_BASE === '' || /localhost|127\.0\.0\.1/i.test(API_BASE);

// Cada cuánto revalidar cuando el servidor responde bien.
const REVALIDATE_MS = 30_000;
// Reintento cuando está caído: rápido en desplegado (Render despertando),
// algo más lento en local (esperando a que el dev encienda el backend).
const RETRY_DEPLOY_MS = 4_000;
const RETRY_LOCAL_MS = 8_000;
// Timeout del ping: corto en local (el fallo es inmediato); más holgado en
// desplegado para tolerar el cold-start de Render.
const PING_TIMEOUT_MS = IS_LOCAL ? 4_000 : 12_000;

/**
 * Estado del backend con revalidación periódica.
 * - online: el servidor respondió.
 * - inactive: solo en LOCAL, el servidor no responde (apagado).
 * - loading: solo en DESPLEGADO, el servidor no responde aún (despertando) → se sigue reintentando.
 * - checking: estado inicial mientras se hace el primer ping.
 */
export function useBackendStatus(): BackendStatus {
  const [status, setStatus] = useState<BackendStatus>('checking');

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      const ok = await checkHealth(PING_TIMEOUT_MS);
      if (!active) return;

      let nextDelay: number;
      if (ok) {
        setStatus('online');
        nextDelay = REVALIDATE_MS;
      } else if (IS_LOCAL) {
        setStatus('inactive');
        nextDelay = RETRY_LOCAL_MS;
      } else {
        setStatus('loading');
        nextDelay = RETRY_DEPLOY_MS;
      }

      timer = setTimeout(tick, nextDelay);
    };

    tick();

    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return status;
}
