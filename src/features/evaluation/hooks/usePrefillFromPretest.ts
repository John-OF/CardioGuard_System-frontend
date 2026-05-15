import { useEffect, useRef, useState } from 'react';
import { storage } from '@/utils/storage';
import type {
  EvaluationFormState,
  EvaluationRequest,
} from '@/types/evaluation';

// Campos que se pre-rellenan (todos los de pasos 0, 1 y 2)
const PREFILL_KEYS: (keyof EvaluationRequest)[] = [
  // Paso 0
  'responder_type',
  'age',
  'sex',
  // Paso 1 - Salud
  'blood_pressure_category',
  'cholesterol_category',
  'fasting_glucose',
  'chest_pain_effort',
  'chest_pain_type',
  'weight_kg',
  'height_cm',
  // Paso 2 - Hábitos
  'activity_level',
  'smoking_status',
  'alcohol_use',
  'diet_quality',
  'family_history',
];

interface UsePrefillFromPretestParams {
  // Si está activo el flujo "post_test", queremos pre-rellenar
  evaluationType: EvaluationFormState['evaluation_type'];
  // Setter del hook del formulario
  setField: <K extends keyof EvaluationFormState>(
    key: K,
    value: EvaluationFormState[K]
  ) => void;
}

export function usePrefillFromPretest({
  evaluationType,
  setField,
}: UsePrefillFromPretestParams): { isPrefilled: boolean } {
  const [isPrefilled, setIsPrefilled] = useState(false);
  // Garantiza que el efecto solo aplique una vez por montaje
  const appliedRef = useRef(false);

  useEffect(() => {
    if (appliedRef.current) return;
    if (evaluationType !== 'post_test') return;

    const pretestForm = storage.getLastPretestForm();
    if (!pretestForm) {
      // No hay datos guardados — caso raro (cerró el navegador entre pre y post).
      // No hacemos nada: el usuario completa los campos como si fuese nuevo.
      return;
    }

    appliedRef.current = true;
    for (const key of PREFILL_KEYS) {
      const value = pretestForm[key];
      if (value !== undefined && value !== null) {
        setField(key, value as EvaluationFormState[typeof key]);
      }
    }
    setIsPrefilled(true);
  }, [evaluationType, setField]);

  return { isPrefilled };
}
