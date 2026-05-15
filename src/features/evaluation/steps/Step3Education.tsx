import { RadioCardGroup } from '@/components/ui/RadioCardGroup';
import { CheckboxCardGroup } from '@/components/ui/CheckboxCardGroup';
import {
  INFARCTION_KNOWLEDGE_OPTIONS,
  SYMPTOM_SELF_OPTIONS,
  SYMPTOMS_OPTIONS,
  PREVENTION_OPTIONS,
  RISK_FACTOR_OPTIONS,
  RCP_KNOWLEDGE_OPTIONS,
} from '../constants';
import type { EvaluationFormState } from '@/types/evaluation';
import type { FormErrors } from '../hooks/useEvaluationForm';

interface Step3Props {
  formData: EvaluationFormState;
  errors: FormErrors;
  setField: <K extends keyof EvaluationFormState>(
    key: K,
    value: EvaluationFormState[K]
  ) => void;
}

export function Step3Education({ formData, errors, setField }: Step3Props) {
  return (
    <>
      <RadioCardGroup
        name="infarction_knowledge"
        label="¿Sabe qué es un infarto?"
        options={INFARCTION_KNOWLEDGE_OPTIONS}
        value={formData.infarction_knowledge}
        onChange={(v) => setField('infarction_knowledge', v)}
        error={errors.infarction_knowledge}
      />

      <RadioCardGroup
        name="symptom_self_assessment"
        label="¿Cree poder reconocer los síntomas de un infarto?"
        options={SYMPTOM_SELF_OPTIONS}
        value={formData.symptom_self_assessment}
        onChange={(v) => setField('symptom_self_assessment', v)}
        error={errors.symptom_self_assessment}
      />

      <CheckboxCardGroup
        name="symptoms"
        label="¿Cuáles considera que son síntomas de un infarto?"
        description="Puede seleccionar todas las opciones que crea correctas."
        options={SYMPTOMS_OPTIONS}
        values={formData.symptoms ?? []}
        onChange={(v) => setField('symptoms', v)}
        error={errors.symptoms}
      />

      <RadioCardGroup
        name="prevention_knowledge"
        label="¿Sabe cómo prevenir un infarto?"
        options={PREVENTION_OPTIONS}
        value={formData.prevention_knowledge}
        onChange={(v) => setField('prevention_knowledge', v)}
        error={errors.prevention_knowledge}
      />

      <RadioCardGroup
        name="risk_factor_knowledge"
        label="¿Conoce los factores de riesgo de las enfermedades del corazón?"
        description="Por ejemplo: presión alta, colesterol alto, tabaquismo, sedentarismo."
        options={RISK_FACTOR_OPTIONS}
        value={formData.risk_factor_knowledge}
        onChange={(v) => setField('risk_factor_knowledge', v)}
        error={errors.risk_factor_knowledge}
      />

      <RadioCardGroup
        name="rcp_knowledge"
        label="¿Sabe qué es la RCP (reanimación cardiopulmonar)?"
        options={RCP_KNOWLEDGE_OPTIONS}
        value={formData.rcp_knowledge}
        onChange={(v) => setField('rcp_knowledge', v)}
        error={errors.rcp_knowledge}
      />
    </>
  );
}