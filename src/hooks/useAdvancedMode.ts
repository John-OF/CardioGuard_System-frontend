import { useCallback, useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/storage';

const EVENT_NAME = 'cardioguard:advanced-mode-changed';
const CLICK_WINDOW_MS = 3000;
const REQUIRED_CLICKS = 5;
const NOTICE_TIMEOUT_MS = 2500;

export interface AdvancedModeApi {
  enabled: boolean;
  notice: string | null;
  registerLogoClick: () => void;
}

export function useAdvancedMode(): AdvancedModeApi {
  const [enabled, setEnabled] = useState<boolean>(() => storage.getAdvancedMode());
  const [notice, setNotice] = useState<string | null>(null);

  const clickTimestamps = useRef<number[]>([]);
  const noticeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handler = () => setEnabled(storage.getAdvancedMode());
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  useEffect(
    () => () => {
      if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
    },
    []
  );

  const flashNotice = useCallback((msg: string) => {
    setNotice(msg);
    if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(null), NOTICE_TIMEOUT_MS);
  }, []);

  const registerLogoClick = useCallback(() => {
    const now = Date.now();
    const recent = clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS);
    recent.push(now);
    clickTimestamps.current = recent;

    if (recent.length < REQUIRED_CLICKS) return;

    clickTimestamps.current = [];

    if (storage.isCycleActive()) {
      flashNotice('No se puede cambiar el modo durante un ciclo activo.');
      return;
    }

    const next = !storage.getAdvancedMode();
    storage.setAdvancedMode(next);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
    flashNotice(next ? 'Modo avanzado activado.' : 'Modo avanzado desactivado.');
  }, [flashNotice]);

  return { enabled, notice, registerLogoClick };
}
