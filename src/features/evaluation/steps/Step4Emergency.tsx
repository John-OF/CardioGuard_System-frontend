import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import {
  YES_NO_OPTIONS,
  EMERGENCY_ACTION_OPTIONS,
  REACTION_TIME_OPTIONS,
  EMERGENCY_SUPPORT_OPTIONS,
} from '../constants';
import type { EvaluationFormState } from '@/types/evaluation';
import type { FormErrors } from '../hooks/useEvaluationForm';

interface Step4Props {
  formData: EvaluationFormState;
  errors: FormErrors;
  setField: <K extends keyof EvaluationFormState>(
    key: K,
    value: EvaluationFormState[K]
  ) => void;
}

export function Step4Emergency({ formData, errors, setField }: Step4Props) {
  return (
    <>
      <RadioCardGroup
        name="prior_training"
        label="¿Ha recibido entrenamiento previo en primeros auxilios o RCP?"
        options={YES_NO_OPTIONS}
        value={formData.prior_training}
        onChange={(v) => setField('prior_training', v)}
        error={errors.prior_training}
      />

      <RadioCardGroup
        name="emergency_number_knowledge"
        label="¿Sabe a qué número llamar en caso de emergencia médica?"
        description="En Ecuador, el número de emergencias es el 911."
        options={YES_NO_OPTIONS}
        value={formData.emergency_number_knowledge}
        onChange={(v) => setField('emergency_number_knowledge', v)}
        error={errors.emergency_number_knowledge}
      />

      <RadioCardGroup
        name="emergency_action"
        label="Si alguien cerca de usted sufre un infarto, ¿qué haría primero?"
        options={EMERGENCY_ACTION_OPTIONS}
        value={formData.emergency_action}
        onChange={(v) => setField('emergency_action', v)}
        error={errors.emergency_action}
      />

      <RadioCardGroup
        name="reaction_time"
        label="¿Qué tan rápido cree que reaccionaría ante una emergencia?"
        options={REACTION_TIME_OPTIONS}
        value={formData.reaction_time}
        onChange={(v) => setField('reaction_time', v)}
        error={errors.reaction_time}
      />

      <RadioCardGroup
        name="emergency_support_action"
        label="Si la persona pierde el conocimiento, ¿qué haría usted?"
        options={EMERGENCY_SUPPORT_OPTIONS}
        value={formData.emergency_support_action}
        onChange={(v) => setField('emergency_support_action', v)}
        error={errors.emergency_support_action}
      />
    </>
  );
}