import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import {
  YES_NO_SOMETIMES_OPTIONS,
  SMOKING_OPTIONS,
  ALCOHOL_OPTIONS,
  DIET_OPTIONS,
  FAMILY_HISTORY_OPTIONS,
} from '../constants';
import { PrefillNotice } from '../components/PrefillNotice';
import type { EvaluationFormState } from '@/types/evaluation';
import type { FormErrors } from '../hooks/useEvaluationForm';

interface Step2Props {
  formData: EvaluationFormState;
  errors: FormErrors;
  setField: <K extends keyof EvaluationFormState>(
    key: K,
    value: EvaluationFormState[K]
  ) => void;
  showPrefillNotice?: boolean;
}

export function Step2Habits({
  formData,
  errors,
  setField,
  showPrefillNotice,
}: Step2Props) {
  return (
    <>
      {showPrefillNotice && <PrefillNotice />}

      <RadioCardGroup
        name="activity_level"
        label="¿Realiza actividad física regularmente?"
        description="Caminar, hacer ejercicio o moverse al menos 30 minutos varias veces por semana."
        options={YES_NO_SOMETIMES_OPTIONS}
        value={formData.activity_level}
        onChange={(v) => setField('activity_level', v)}
        error={errors.activity_level}
      />

      <RadioCardGroup
        name="smoking_status"
        label="¿Fuma o ha fumado en el pasado?"
        options={SMOKING_OPTIONS}
        value={formData.smoking_status}
        onChange={(v) => setField('smoking_status', v)}
        error={errors.smoking_status}
      />

      <RadioCardGroup
        name="alcohol_use"
        label="¿Consume bebidas alcohólicas?"
        options={ALCOHOL_OPTIONS}
        value={formData.alcohol_use}
        onChange={(v) => setField('alcohol_use', v)}
        error={errors.alcohol_use}
      />

      <RadioCardGroup
        name="diet_quality"
        label="¿Cómo describiría su alimentación?"
        description="Una alimentación saludable incluye frutas, verduras, granos integrales y poca sal."
        options={DIET_OPTIONS}
        value={formData.diet_quality}
        onChange={(v) => setField('diet_quality', v)}
        error={errors.diet_quality}
      />

      <RadioCardGroup
        name="family_history"
        label="¿Tiene familiares directos que hayan sufrido un infarto o enfermedad del corazón?"
        description="Padres, hermanos o hijos."
        options={FAMILY_HISTORY_OPTIONS}
        value={formData.family_history}
        onChange={(v) => setField('family_history', v)}
        error={errors.family_history}
      />
    </>
  );
}