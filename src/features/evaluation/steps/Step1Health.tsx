import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import {
  BLOOD_PRESSURE_OPTIONS,
  CHOLESTEROL_OPTIONS,
  FASTING_GLUCOSE_OPTIONS,
  CHEST_PAIN_EFFORT_OPTIONS,
  CHEST_PAIN_TYPE_OPTIONS,
  WEIGHT_RANGE_OPTIONS,
  HEIGHT_RANGE_OPTIONS,
} from '../constants';
import { PrefillNotice } from '../components/PrefillNotice';
import { calculateApproxBmi, getApproxWeight, getApproxHeight } from '../utils/rangeMapping';
import type { EvaluationFormState, WeightRange, HeightRange } from '@/types/evaluation';
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

function ApproxBmiDisplay({
  weightRange,
  heightRange,
}: {
  weightRange: WeightRange | undefined;
  heightRange: HeightRange | undefined;
}) {
  const bmi = calculateApproxBmi(weightRange, heightRange);
  if (bmi === null) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
      <p className="text-sm font-medium text-slate-700">
        IMC aproximado: <span className="font-bold text-slate-900">{bmi.toFixed(1)}</span>
      </p>
      <p className="mt-1 text-xs text-slate-500">
        El IMC se calcula de forma aproximada a partir de los rangos seleccionados de peso y estatura.
      </p>
    </div>
  );
}

export function Step1Health({
  formData,
  errors,
  setField,
  showPrefillNotice,
}: Step1Props) {
  const handleWeightChange = (rawValue: string) => {
    const value = rawValue as WeightRange;
    setField('weight_range', value);
    const approx = getApproxWeight(value);
    if (approx !== null) {
      setField('weight_kg', approx);
    }
  };

  const handleHeightChange = (rawValue: string) => {
    const value = rawValue as HeightRange;
    setField('height_range', value);
    const approx = getApproxHeight(value);
    if (approx !== null) {
      setField('height_cm', approx);
    }
  };

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

      <RadioCardGroup
        name="weight_range"
        label="Rango de peso"
        description="Seleccione el rango que mejor corresponda a su peso actual."
        options={WEIGHT_RANGE_OPTIONS}
        value={formData.weight_range}
        onChange={handleWeightChange}
        error={errors.weight_range}
      />

      <RadioCardGroup
        name="height_range"
        label="Rango de estatura"
        description="Seleccione el rango que mejor corresponda a su estatura actual."
        options={HEIGHT_RANGE_OPTIONS}
        value={formData.height_range}
        onChange={handleHeightChange}
        error={errors.height_range}
      />

      <ApproxBmiDisplay
        weightRange={formData.weight_range}
        heightRange={formData.height_range}
      />
    </>
  );
}
