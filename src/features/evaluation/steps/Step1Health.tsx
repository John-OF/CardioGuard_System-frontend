import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { NumberField } from '@/components/ui/NumberField';
import {
  BLOOD_PRESSURE_OPTIONS,
  CHOLESTEROL_OPTIONS,
  FASTING_GLUCOSE_OPTIONS,
  CHEST_PAIN_EFFORT_OPTIONS,
  CHEST_PAIN_TYPE_OPTIONS,
} from '../constants';
import { PrefillNotice } from '../components/PrefillNotice';
import type { EvaluationFormState } from '@/types/evaluation';
import type { FormErrors } from '../hooks/useEvaluationForm';

interface Step1Props {
  formData: EvaluationFormState;
  errors: FormErrors;
  setField: <K extends keyof EvaluationFormState>(
    key: K,
    value: EvaluationFormState[K]
  ) => void;
  showPrefillNotice?: boolean;
}

export function Step1Health({
  formData,
  errors,
  setField,
  showPrefillNotice,
}: Step1Props) {
  return (
    <>
      {showPrefillNotice && <PrefillNotice />}

      <RadioCardGroup
        name="blood_pressure_category"
        label="¿Cuál es su nivel de presión arterial habitual?"
        description="Si no lo sabe con exactitud, elija el rango que más se acerque a sus últimas mediciones."
        options={BLOOD_PRESSURE_OPTIONS}
        value={formData.blood_pressure_category}
        onChange={(v) => setField('blood_pressure_category', v)}
        error={errors.blood_pressure_category}
      />

      <RadioCardGroup
        name="cholesterol_category"
        label="¿Cuál es su nivel de colesterol?"
        description="Según su último análisis de sangre, si lo recuerda."
        options={CHOLESTEROL_OPTIONS}
        value={formData.cholesterol_category}
        onChange={(v) => setField('cholesterol_category', v)}
        error={errors.cholesterol_category}
      />

      <RadioCardGroup
        name="fasting_glucose"
        label="¿Su glucosa en ayunas es mayor a 120 mg/dL?"
        description="Es el azúcar en sangre medido sin haber comido al menos 8 horas antes."
        options={FASTING_GLUCOSE_OPTIONS}
        value={formData.fasting_glucose}
        onChange={(v) => setField('fasting_glucose', v)}
        error={errors.fasting_glucose}
      />

      <RadioCardGroup
        name="chest_pain_effort"
        label="¿Ha sentido dolor en el pecho al hacer un esfuerzo físico?"
        description="Por ejemplo, al subir escaleras o caminar rápido."
        options={CHEST_PAIN_EFFORT_OPTIONS}
        value={formData.chest_pain_effort}
        onChange={(v) => setField('chest_pain_effort', v)}
        error={errors.chest_pain_effort}
      />

      <RadioCardGroup
        name="chest_pain_type"
        label="¿Qué tipo de dolor en el pecho ha tenido?"
        description="Elija la opción que mejor describa lo que ha sentido."
        options={CHEST_PAIN_TYPE_OPTIONS}
        value={formData.chest_pain_type}
        onChange={(v) => setField('chest_pain_type', v)}
        error={errors.chest_pain_type}
      />

      <NumberField
        name="weight_kg"
        label="¿Cuánto pesa?"
        description="En kilogramos."
        value={formData.weight_kg}
        onChange={(v) => setField('weight_kg', v)}
        min={30}
        max={180}
        step={0.1}
        unit="kg"
        error={errors.weight_kg}
      />

      <NumberField
        name="height_cm"
        label="¿Cuánto mide?"
        description="En centímetros (por ejemplo, 165)."
        value={formData.height_cm}
        onChange={(v) => setField('height_cm', v)}
        min={120}
        max={220}
        step={1}
        unit="cm"
        error={errors.height_cm}
      />
    </>
  );
}