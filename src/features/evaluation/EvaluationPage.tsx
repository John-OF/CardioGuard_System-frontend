import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EvaluationLayout } from './components/EvaluationLayout';
import { FlowIntro } from './components/FlowIntro';
import { AdvancedModePanel } from './components/AdvancedModePanel';
import { useEvaluationForm } from './hooks/useEvaluationForm';
import { useAutoDetectEvaluationType } from './hooks/useAutoDetectEvaluationType';
import { usePrefillFromPretest } from './hooks/usePrefillFromPretest';
import { Step0Control } from './steps/Step0Control';
import { Step1Health } from './steps/Step1Health';
import { Step2Habits } from './steps/Step2Habits';
import { Step3Education } from './steps/Step3Education';
import { Step4Emergency } from './steps/Step4Emergency';
import { scrollToFirstError } from '@/utils/scrollToError';
import { predictEvaluation } from '@/api/evaluation';
import { storage } from '@/utils/storage';
import type { EvaluationRequest } from '@/types/evaluation';

const STEP_LABELS = ['Información básica', 'Salud', 'Hábitos', 'Educación', 'Emergencias'];

const STEP_DESCRIPTIONS = [
  'Empecemos con algunos datos generales.',
  'Cuéntenos sobre su salud cardiovascular.',
  'Háblenos de sus hábitos diarios.',
  'Veamos qué sabe sobre el corazón.',
  'Por último, sobre emergencias.',
];

type ViewState = 'intro' | 'form';

export function EvaluationPage() {
  const navigate = useNavigate();
  const auto = useAutoDetectEvaluationType();
  const form = useEvaluationForm();
  const {
    formData,
    currentStep,
    errors,
    totalSteps,
    setField,
    goToNext,
    goToPrevious,
    validateStep,
  } = form;

  const [view, setView] = useState<ViewState>('intro');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Pre-llenar pasos 1-3 si es post_test y hay datos en storage
  const { isPrefilled } = usePrefillFromPretest({
    evaluationType: formData.evaluation_type,
    setField,
  });

  // Sincronizar tipo recomendado al iniciar
  useEffect(() => {
    if (auto.flow.type === 'loading') return;

    setField('evaluation_type', auto.recommendedType);
    setField('previous_evaluation_id', auto.recommendedPreviousId);

    if (auto.flow.type === 'first_time' || auto.flow.type === 'error') {
      setView('form');
    }
  }, [auto.flow.type, auto.recommendedType, auto.recommendedPreviousId, setField]);

  const isLastStep = currentStep === totalSteps - 1;
  const isPostTest = formData.evaluation_type === 'post_test';

  const handleNext = async () => {
    const stepErrors = validateStep(currentStep);
    const errorKeys = Object.keys(stepErrors);

    if (errorKeys.length > 0) {
      goToNext();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToFirstError(errorKeys));
      });
      return;
    }

    if (isLastStep) {
      await handleSubmit();
      return;
    }

    goToNext();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = formData as EvaluationRequest;
      const result = await predictEvaluation(payload);

      // Persistir según el tipo de evaluación enviada
      if (payload.evaluation_type === 'pre_test') {
        // Guardamos el formulario para poder pre-rellenar el post-test
        storage.setLastPretestForm(payload);
      } else if (payload.evaluation_type === 'post_test') {
        // Ciclo cerrado: limpiamos el pre-test guardado
        storage.clearLastPretestForm();
      }

      storage.setLastResult(result);
      navigate(`/resultados/${result.evaluation_id}`, { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error inesperado al enviar la evaluación.';
      setSubmitError(msg);
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // === Vistas ===

  if (auto.flow.type === 'loading') {
    return (
      <div className="card text-center">
        <p className="text-lg text-slate-600">Preparando su evaluación...</p>
      </div>
    );
  }

  if (view === 'intro') {
    return (
      <FlowIntro
        flow={auto.flow}
        onContinue={() => setView('form')}
        onStartNew={() => {
          setField('evaluation_type', 'pre_test');
          setField('previous_evaluation_id', null);
          // Si arrancan un ciclo nuevo manualmente, limpiamos rastros
          storage.clearLastPretestForm();
          setView('form');
        }}
      />
    );
  }

  // Vista del formulario — solo mostramos banner si es post_test, está pre-rellenado
  // y estamos en alguno de los pasos 0, 1 o 2
  const shouldShowPrefillNotice = isPostTest && isPrefilled && currentStep <= 2;

  const renderStep = () => {
    const props = { formData, errors, setField };
    switch (currentStep) {
      case 0:
        return <Step0Control {...props} showPrefillNotice={shouldShowPrefillNotice} />;
      case 1:
        return <Step1Health {...props} showPrefillNotice={shouldShowPrefillNotice} />;
      case 2:
        return <Step2Habits {...props} showPrefillNotice={shouldShowPrefillNotice} />;
      case 3:
        return <Step3Education {...props} />;
      case 4:
        return <Step4Emergency {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {submitError && (
        <div className="card bg-red-50 border-2 border-red-200">
          <p className="text-base text-red-800 font-medium">⚠ {submitError}</p>
          <p className="text-sm text-red-600 mt-1">
            Verifique su conexión y vuelva a intentarlo.
          </p>
        </div>
      )}

      <EvaluationLayout
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={STEP_LABELS}
        title={STEP_LABELS[currentStep]}
        description={STEP_DESCRIPTIONS[currentStep]}
        onPrevious={goToPrevious}
        onNext={handleNext}
        isFirstStep={currentStep === 0}
        isLastStep={isLastStep}
        isSubmitting={submitting}
      >
        {renderStep()}
      </EvaluationLayout>

      {isLastStep && (
        <AdvancedModePanel
          evaluationType={formData.evaluation_type ?? 'regular'}
          previousEvaluationId={formData.previous_evaluation_id ?? null}
          onChangeType={(t) => setField('evaluation_type', t)}
          onChangePreviousId={(id) => setField('previous_evaluation_id', id)}
        />
      )}
    </div>
  );
}