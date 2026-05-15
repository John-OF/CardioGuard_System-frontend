import type { PredictResponseData, StoredPredictResponseData } from '@/types/results';
import type { EvaluationRequest } from '@/types/evaluation';

const KEYS = {
  USER_ID: 'cardioguard_user_id',
  LAST_RESULT: 'cardioguard_last_result',
  LAST_PRETEST_FORM: 'cardioguard_last_pretest_form',
} as const;

export const storage = {
  // === UUID anónimo (localStorage: persiste entre sesiones) ===
  getUserId(): string | null {
    return localStorage.getItem(KEYS.USER_ID);
  },
  setUserId(id: string): void {
    localStorage.setItem(KEYS.USER_ID, id);
  },
  clearUserId(): void {
    localStorage.removeItem(KEYS.USER_ID);
  },

  // === Resultado de evaluación (sessionStorage: solo esta pestaña) ===
  setLastResult(result: PredictResponseData): void {
    const stored: StoredPredictResponseData = {
      ...result,
      _saved_at: new Date().toISOString(),
    };
    sessionStorage.setItem(KEYS.LAST_RESULT, JSON.stringify(stored));
  },
  getLastResult(): StoredPredictResponseData | null {
    const raw = sessionStorage.getItem(KEYS.LAST_RESULT);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredPredictResponseData;
    } catch {
      return null;
    }
  },
  clearLastResult(): void {
    sessionStorage.removeItem(KEYS.LAST_RESULT);
  },

  // === Datos del último pre-test (sessionStorage) ===
  // Usado para pre-rellenar el post-test sin pedirle al usuario
  // que vuelva a ingresar datos médicos que no cambian en minutos.
  setLastPretestForm(form: EvaluationRequest): void {
    sessionStorage.setItem(KEYS.LAST_PRETEST_FORM, JSON.stringify(form));
  },
  getLastPretestForm(): EvaluationRequest | null {
    const raw = sessionStorage.getItem(KEYS.LAST_PRETEST_FORM);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as EvaluationRequest;
    } catch {
      return null;
    }
  },
  clearLastPretestForm(): void {
    sessionStorage.removeItem(KEYS.LAST_PRETEST_FORM);
  },
};