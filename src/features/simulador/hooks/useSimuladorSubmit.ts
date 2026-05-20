import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { predictEvaluation } from '@/api/evaluation';
import type { EvaluationRequest } from '@/types/evaluation';
import type { ScenarioField } from '../data/scenarios';

export type SimuladorAnswers = Partial<Pick<EvaluationRequest, ScenarioField>>;

export interface SimuladorContext {
  // Datos clínicos del pre-test (pasos 0,1,2). Modo normal: sessionStorage.
  // Modo ciclo huérfano (?continue): localStorage por evaluation_id.
  pretestForm: EvaluationRequest;
  // ID del pre-test → previous_evaluation_id del post_test.
  previousEvaluationId: string;
}

interface UseSimuladorSubmitReturn {
  submit: (answers: SimuladorAnswers, ctx: SimuladorContext) => Promise<void>;
  submitting: boolean;
  error: string | null;
}

export function useSimuladorSubmit(): UseSimuladorSubmitReturn {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (answers: SimuladorAnswers, ctx: SimuladorContext) => {
    setSubmitting(true);
    setError(null);

    try {
      // Pasos 0,1,2 del pre-test + respuestas frescas de pasos 3 y 4.
      // El spread reemplaza por completo cada clave (incluido symptoms[]).
      const payload: EvaluationRequest = {
        ...ctx.pretestForm,
        ...answers,
        evaluation_type: 'post_test',
        previous_evaluation_id: ctx.previousEvaluationId,
      };

      const result = await predictEvaluation(payload);

      // Variante reducida: la página de resultados oculta ML e IMC.
      storage.setLastResult(result, 'reduced');
      // Ciclo cerrado: limpiamos ambos rastros del pre-test.
      storage.clearLastPretestForm();
      storage.clearPretestFormById(ctx.previousEvaluationId);

      navigate(`/resultados/${result.evaluation_id}`, { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error inesperado al enviar el simulador.';
      setError(msg);
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return { submit, submitting, error };
}
