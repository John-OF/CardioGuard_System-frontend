import { useCallback, useState } from 'react';
import { storage } from '@/utils/storage';
import { fetchAdminStats, AdminUnauthorizedError } from '@/api/admin';

export type AdminAuthState =
  | { status: 'unauthenticated' }
  | { status: 'authenticated'; token: string };

interface UseAdminAuth {
  state: AdminAuthState;
  verifying: boolean;
  error: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

/**
 * Maneja el token administrativo.
 *
 * - Al montar, confía en el token guardado en sessionStorage (si existe).
 *   La validación real ocurre en la primera petición del dashboard: un 401
 *   dispara `logout()` y devuelve al usuario a la pantalla de login.
 * - `login()` valida el token contra /api/admin/stats antes de persistirlo,
 *   para mostrar el error directamente en la pantalla de acceso.
 */
export function useAdminAuth(): UseAdminAuth {
  const [state, setState] = useState<AdminAuthState>(() => {
    const saved = storage.getAdminToken();
    return saved
      ? { status: 'authenticated', token: saved }
      : { status: 'unauthenticated' };
  });
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (rawToken: string) => {
    const token = rawToken.trim();
    if (!token) {
      setError('Ingrese el token administrativo.');
      return;
    }

    setVerifying(true);
    setError(null);
    try {
      await fetchAdminStats(token);
      storage.setAdminToken(token);
      setState({ status: 'authenticated', token });
    } catch (err) {
      if (err instanceof AdminUnauthorizedError) {
        setError('Token incorrecto. Verifique e intente de nuevo.');
      } else {
        setError(
          'No se pudo contactar al servidor. Intente de nuevo más tarde.'
        );
      }
    } finally {
      setVerifying(false);
    }
  }, []);

  const logout = useCallback(() => {
    storage.clearAdminToken();
    setState({ status: 'unauthenticated' });
    setError('La sesión expiró o el token es inválido. Ingrese de nuevo.');
  }, []);

  return { state, verifying, error, login, logout };
}
