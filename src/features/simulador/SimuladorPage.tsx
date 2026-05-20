import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { storage } from '@/utils/storage';
import type { EvaluationRequest, Symptom } from '@/types/evaluation';
import { SCENARIOS } from './data/scenarios';
import { WizardProgress } from './components/WizardProgress';
import { SimuladorIntro } from './components/SimuladorIntro';
import { ScenarioScreen } from './components/ScenarioScreen';
import { useSimuladorSubmit, type SimuladorAnswers } from './hooks/useSimuladorSubmit';

type Phase = 'intro' | 'scenario';

type Session =
  | { status: 'resolving' }
  | {
      status: 'ready';
      pretestForm: EvaluationRequest;
      previousEvaluationId: string;
    };

export function SimuladorPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const continueId = params.get('continue');

  const [session, setSession] = useState<Session>({ status: 'resolving' });
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<SimuladorAnswers>({});
  const { submit, submitting, error } = useSimuladorSubmit();

  // Guard con dos modos de entrada válidos.
  useEffect(() => {
    // Modo B — ciclo huérfano desde Historial (?continue=<preId>).
    if (continueId) {
      const form = storage.getPretestFormById(continueId);
      if (form) {
        setSession({
          status: 'ready',
          pretestForm: form,
          previousEvaluationId: continueId,
        });
      } else {
        // Pre-test no está en este navegador (otro dispositivo / storage
        // limpiado). Fallback honesto: formulario normal, que reingresa datos.
        navigate(`/evaluacion?continue=${continueId}`, { replace: true });
      }
      return;
    }

    // Modo A — flujo normal: pre_test recién hecho en esta pestaña.
    const result = storage.getLastResult();
    const pretest = storage.getLastPretestForm();
    if (result?.evaluation_type === 'pre_test' && pretest && result.evaluation_id) {
      setSession({
        status: 'ready',
        pretestForm: pretest,
        previousEvaluationId: result.evaluation_id,
      });
    } else {
      navigate('/evaluacion', { replace: true });
    }
  }, [continueId, navigate]);

  if (session.status !== 'ready') return null;

  const scenario = SCENARIOS[index];
  const isFirst = index === 0;
  const isLast = index === SCENARIOS.length - 1;

  const currentValue: string | string[] | undefined =
    scenario.kind === 'multi'
      ? (answers.symptoms as string[] | undefined)
      : (answers[scenario.field as keyof SimuladorAnswers] as string | undefined);

  function handleStart() {
    setPhase('scenario');
    setIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSelectSingle(value: string) {
    const field = scenario.field;
    setAnswers((prev) => ({ ...prev, [field]: value }) as SimuladorAnswers);
  }

  function handleToggleMulti(value: string) {
    setAnswers((prev) => {
      const current = (prev.symptoms ?? []) as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, symptoms: next as Symptom[] };
    });
  }

  function handlePrev() {
    setIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNext() {
    if (isLast) {
      void submit(answers, {
        pretestForm: session.pretestForm,
        previousEvaluationId: session.previousEvaluationId,
      });
      return;
    }
    setIndex((i) => Math.min(i + 1, SCENARIOS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="space-y-5">
      <header>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Simulador de emergencia cardiovascular
            </h1>
            <p className="text-base text-slate-600 mt-2 max-w-3xl">
              Practique con situaciones sencillas y elija qué haría ante una emergencia.
            </p>
          </div>
          <span className="flex-shrink-0 px-4 py-2 rounded-full bg-primary text-white text-base font-bold">
            Evaluación práctica
          </span>
        </div>
      </header>

      {error && (
        <div className="card bg-red-50 border-2 border-red-200">
          <p className="text-base text-red-800 font-medium">⚠ {error}</p>
          <p className="text-sm text-red-600 mt-1">
            Verifique su conexión y vuelva a intentarlo.
          </p>
        </div>
      )}

      <WizardProgress
        current={phase === 'intro' ? -1 : index}
        total={SCENARIOS.length}
      />

      {phase === 'intro' ? (
        <SimuladorIntro onStart={handleStart} />
      ) : (
        <ScenarioScreen
          scenario={scenario}
          index={index}
          total={SCENARIOS.length}
          value={currentValue}
          onSelectSingle={handleSelectSingle}
          onToggleMulti={handleToggleMulti}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirst={isFirst}
          isLast={isLast}
          submitting={submitting}
        />
      )}
    </div>
  );
}
