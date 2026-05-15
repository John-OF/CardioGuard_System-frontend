import { useEffect, useState } from 'react';
import { ML_DISCLAIMER } from '../constants';

interface MLProbabilityCardProps {
  probability: number; // 0..1
}

export function MLProbabilityCard({ probability }: MLProbabilityCardProps) {
  const target = Math.max(0, Math.min(1, probability)) * 100;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setWidth(target), 100);
    return () => window.clearTimeout(t);
  }, [target]);

  return (
    <section className="card" aria-labelledby="prob-title">
      <h2 id="prob-title" className="text-xl font-semibold text-slate-900">
        Probabilidad estimada
      </h2>
      <div className="mt-4">
        <div className="flex items-end justify-end mb-2">
          <span className="text-3xl font-bold text-slate-900">
            {target.toFixed(0)}%
          </span>
        </div>
        <div
          className="w-full h-4 bg-slate-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(target)}
          aria-label="Probabilidad estimada de riesgo cardiovascular"
        >
          <div
            className="h-full bg-slate-700 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
      <p className="text-base text-slate-600 mt-4 leading-relaxed">
        {ML_DISCLAIMER}
      </p>
    </section>
  );
}