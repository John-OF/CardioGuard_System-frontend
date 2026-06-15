import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { LESSONS } from './data/lessons';
import { WizardProgress } from './components/WizardProgress';
import { LessonCard } from './components/LessonCard';

export function CapacitacionPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [allowed] = useState(
    () => storage.getLastResult()?.evaluation_type === 'pre_test'
  );

  useEffect(() => {
    if (allowed === false) {
      navigate('/evaluacion', { replace: true });
    }
  }, [allowed, navigate]);

  function handleNext() {
    setStep((s) => Math.min(s + 1, LESSONS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePrev() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleFinish() {
    navigate('/simulador');
  }

  if (!allowed) return null;

  return (
    <div className="space-y-5">
      <header>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Capacitación en emergencia cardiovascular
            </h1>
            <p className="text-base text-slate-600 mt-2 max-w-3xl">
              Una guía breve y visual para reconocer señales de alarma y actuar con calma ante una emergencia.
            </p>
          </div>
          <span className="flex-shrink-0 px-4 py-2 rounded-full bg-primary text-white text-base font-bold">
            Adultos mayores
          </span>
        </div>
      </header>

      <WizardProgress current={step} total={LESSONS.length} />

      <LessonCard
        lesson={LESSONS[step]}
        step={step}
        total={LESSONS.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
}
