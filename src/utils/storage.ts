import type { PredictResponseData, StoredPredictResponseData } from '@/types/results';
import type { EvaluationRequest } from '@/types/evaluation';

const KEYS = {
  USER_ID: 'cardioguard_user_id',
  LAST_RESULT: 'cardioguard_last_result',
  LAST_PRETEST_FORM: 'cardioguard_last_pretest_form',
  ADMIN_TOKEN: 'cardioguard_admin_token',
  ADVANCED_MODE: 'cardioguard_advanced_mode',
  // localStorage: payloads de pre-test indexados por evaluation_id.
  // Permite reanudar un ciclo huérfano (desde Historial) en el mismo
  // navegador sin re-ingresar los datos clínicos.
  PRETEST_FORMS_BY_ID: 'cardioguard_pretest_forms_by_id',
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
  setLastResult(
    result: PredictResponseData,
    variant: 'full' | 'reduced' = 'full'
  ): void {
    const stored: StoredPredictResponseData = {
      ...result,
      _saved_at: new Date().toISOString(),
      _variant: variant,
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

  // === Modo avanzado (sessionStorage: solo esta pestaña) ===
  // Toggle oculto que expone el panel de control manual del tipo de
  // evaluación en EvaluationPage. Se activa con 5 taps en el logo.
  getAdvancedMode(): boolean {
    return sessionStorage.getItem(KEYS.ADVANCED_MODE) === '1';
  },
  setAdvancedMode(value: boolean): void {
    if (value) {
      sessionStorage.setItem(KEYS.ADVANCED_MODE, '1');
    } else {
      sessionStorage.removeItem(KEYS.ADVANCED_MODE);
    }
  },
  // Un ciclo está activo si en sessionStorage hay un resultado de
  // pre_test (el usuario ya hizo pre pero aún no cerró el ciclo).
  isCycleActive(): boolean {
    return this.getLastResult()?.evaluation_type === 'pre_test';
  },

  // === Token administrativo (sessionStorage: solo esta pestaña) ===
  // No es para usuarios finales: solo los tesistas acceden a /admin.
  getAdminToken(): string | null {
    return sessionStorage.getItem(KEYS.ADMIN_TOKEN);
  },
  setAdminToken(token: string): void {
    sessionStorage.setItem(KEYS.ADMIN_TOKEN, token);
  },
  clearAdminToken(): void {
    sessionStorage.removeItem(KEYS.ADMIN_TOKEN);
  },

  // === Pre-tests por evaluation_id (localStorage: persiste entre sesiones) ===
  // Usado por el simulador para reanudar un ciclo huérfano (?continue=<preId>)
  // recuperando los datos clínicos del pre-test sin un endpoint backend.
  _readPretestMap(): Record<string, EvaluationRequest> {
    const raw = localStorage.getItem(KEYS.PRETEST_FORMS_BY_ID);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  },
  savePretestFormById(evaluationId: string, form: EvaluationRequest): void {
    const map = this._readPretestMap();
    map[evaluationId] = form;
    localStorage.setItem(KEYS.PRETEST_FORMS_BY_ID, JSON.stringify(map));
  },
  getPretestFormById(evaluationId: string): EvaluationRequest | null {
    return this._readPretestMap()[evaluationId] ?? null;
  },
  clearPretestFormById(evaluationId: string): void {
    const map = this._readPretestMap();
    if (evaluationId in map) {
      delete map[evaluationId];
      localStorage.setItem(KEYS.PRETEST_FORMS_BY_ID, JSON.stringify(map));
    }
  },
};