import { useState, useCallback } from 'react';
import type { EvaluationFormState, EvaluationRequest } from '@/types/evaluation';

const STEP_COUNT = 5;

export type FormErrors = Partial<Record<keyof EvaluationRequest, string>>;

interface UseEvaluationFormReturn {
  formData: EvaluationFormState;
  currentStep: number;
  errors: FormErrors;
  totalSteps: number;
  setField: <K extends keyof EvaluationFormState>(
    key: K,
    value: EvaluationFormState[K]
  ) => void;
  goToNext: () => boolean;
  goToPrevious: () => void;
  validateAll: () => boolean;
  validateStep: (step: number) => FormErrors;
}

export function useEvaluationForm(): UseEvaluationFormReturn {
  const [formData, setFormData] = useState<EvaluationFormState>({
    symptoms: [],
    evaluation_type: 'regular',
    previous_evaluation_id: null,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});

  // ✅ MEMOIZADO con useCallback: ahora setField mantiene la misma referencia
  // entre renders, así los useEffect que dependen de él no se re-disparan.
  const setField = useCallback(
    <K extends keyof EvaluationFormState>(
      key: K,
      value: EvaluationFormState[K]
    ) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const validateStep = (step: number): FormErrors => {
    const e: FormErrors = {};
    const required = (k: keyof EvaluationRequest, msg = 'Este campo es obligatorio') => {
      const v = formData[k];
      if (v === undefined || v === null || v === '') e[k] = msg;
    };

    switch (step) {
      case 0:
        required('responder_type', 'Indique quién está respondiendo');
        if (formData.age === undefined) e.age = 'Ingrese la edad';
        else if (formData.age < 60) e.age = 'CardioGuard está dirigido a personas de 60 años o más';
        else if (formData.age > 100) e.age = 'La edad debe ser de 100 años o menos';
        required('sex', 'Seleccione el sexo');
        break;

      case 1:
        required('blood_pressure_category');
        required('cholesterol_category');
        required('fasting_glucose');
        required('chest_pain_effort');
        required('chest_pain_type');
        if (formData.weight_kg === undefined) e.weight_kg = 'Ingrese el peso';
        else if (formData.weight_kg < 30 || formData.weight_kg > 180)
          e.weight_kg = 'El peso debe estar entre 30 y 180 kg';
        if (formData.height_cm === undefined) e.height_cm = 'Ingrese la talla';
        else if (formData.height_cm < 120 || formData.height_cm > 220)
          e.height_cm = 'La talla debe estar entre 120 y 220 cm';
        break;

      case 2:
        required('activity_level');
        required('smoking_status');
        required('alcohol_use');
        required('diet_quality');
        required('family_history');
        break;

      case 3:
        required('infarction_knowledge');
        required('symptom_self_assessment');
        if (!formData.symptoms || formData.symptoms.length === 0) {
          e.symptoms = 'Seleccione al menos una opción (puede elegir "No sé")';
        }
        required('prevention_knowledge');
        required('risk_factor_knowledge');
        required('rcp_knowledge');
        break;

      case 4:
        required('prior_training');
        required('emergency_number_knowledge');
        required('emergency_action');
        required('reaction_time');
        required('emergency_support_action');
        if (formData.evaluation_type === 'post_test' && !formData.previous_evaluation_id) {
          e.previous_evaluation_id = 'Debe seleccionar el ID del pre-test previo';
        }
        break;
    }

    return e;
  };

  const goToNext = (): boolean => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }
    setErrors({});
    setCurrentStep((s) => Math.min(s + 1, STEP_COUNT - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  };

  const goToPrevious = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateAll = (): boolean => {
    const all: FormErrors = {};
    for (let i = 0; i < STEP_COUNT; i++) {
      Object.assign(all, validateStep(i));
    }
    setErrors(all);
    return Object.keys(all).length === 0;
  };

  return {
    formData,
    currentStep,
    errors,
    totalSteps: STEP_COUNT,
    setField,
    goToNext,
    goToPrevious,
    validateAll,
    validateStep,
  };
}