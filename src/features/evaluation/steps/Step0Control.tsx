import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { NumberField } from '@/components/ui/NumberField';
import { RESPONDER_TYPE_OPTIONS, SEX_OPTIONS } from '../constants';
import { PrefillNotice } from '../components/PrefillNotice';
import type { EvaluationFormState } from '@/types/evaluation';
import type { FormErrors } from '../hooks/useEvaluationForm';

interface Step0Props {
  formData: EvaluationFormState;
  errors: FormErrors;
  setField: <K extends keyof EvaluationFormState>(
    key: K,
    value: EvaluationFormState[K]
  ) => void;
  showPrefillNotice?: boolean;
}

export function Step0Control({
  formData,
  errors,
  setField,
  showPrefillNotice,
}: Step0Props) {
  return (
    <>
      {showPrefillNotice && <PrefillNotice emphasized />}

      <RadioCardGroup
        name="responder_type"
        label="¿Quién responderá la evaluación?"
        description="Esta información nos ayuda a entender el contexto de las respuestas."
        options={RESPONDER_TYPE_OPTIONS}
        value={formData.responder_type}
        onChange={(v) => setField('responder_type', v)}
        error={errors.responder_type}
      />

      <NumberField
        name="age"
        label="¿Cuál es su edad?"
        description="Indique su edad en años cumplidos."
        value={formData.age}
        onChange={(v) => setField('age', v)}
        min={60}
        max={100}
        unit="años"
        error={errors.age}
      />

      <RadioCardGroup
        name="sex"
        label="Sexo"
        options={SEX_OPTIONS}
        value={formData.sex}
        onChange={(v) => setField('sex', v)}
        error={errors.sex}
      />
    </>
  );
}