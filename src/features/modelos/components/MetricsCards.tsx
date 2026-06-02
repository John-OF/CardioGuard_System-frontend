import type { ComponentType, SVGProps } from 'react';
import {
  IconCircleCheck,
  IconTarget,
  IconTrendingUp,
  IconBarChart,
} from '@/components/ui/icons';
import type { ModelMetrics } from '../data/models';

const pct = (value: number) => `${(value * 100).toFixed(2)}%`;

const cards: {
  key: keyof ModelMetrics;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  box: string;
  description: string;
}[] = [
  {
    key: 'accuracy',
    label: 'Exactitud (Accuracy)',
    Icon: IconCircleCheck,
    box: 'bg-green-50 border-green-200 text-green-700',
    description: 'Predicciones correctas del total.',
  },
  {
    key: 'precision',
    label: 'Precisión (Precision)',
    Icon: IconTarget,
    box: 'bg-blue-50 border-blue-200 text-blue-700',
    description: 'De los positivos predichos, cuántos son correctos.',
  },
  {
    key: 'recall',
    label: 'Sensibilidad (Recall)',
    Icon: IconTrendingUp,
    box: 'bg-purple-50 border-purple-200 text-purple-700',
    description: 'De los positivos reales, cuántos fueron detectados.',
  },
  {
    key: 'f1Score',
    label: 'F1-Score',
    Icon: IconBarChart,
    box: 'bg-orange-50 border-orange-200 text-orange-700',
    description: 'Media armónica de precisión y recall.',
  },
];

export function MetricsCards({ metrics }: { metrics: ModelMetrics }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.key} className={`rounded-2xl border-2 p-6 ${card.box}`}>
            <div className="flex items-start justify-between mb-4">
              <card.Icon aria-hidden className="w-8 h-8" />
              <p className="text-3xl font-bold">{pct(metrics[card.key])}</p>
            </div>
            <h4 className="font-semibold text-lg mb-1">{card.label}</h4>
            <p className="text-sm opacity-80">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
        <h3 className="text-xl font-bold text-indigo-900 mb-4">
          Validación cruzada (Cross-Validation)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-5 border border-indigo-200">
            <p className="text-base text-slate-600 mb-1">Media F1-Score (CV)</p>
            <p className="text-3xl font-bold text-indigo-900">{pct(metrics.cvMeanF1)}</p>
            <p className="text-sm text-slate-500 mt-2">
              Promedio del rendimiento en todas las particiones.
            </p>
          </div>
          <div className="bg-white rounded-lg p-5 border border-indigo-200">
            <p className="text-base text-slate-600 mb-1">Desviación estándar F1 (CV)</p>
            <p className="text-3xl font-bold text-indigo-900">{pct(metrics.cvStdF1)}</p>
            <p className="text-sm text-slate-500 mt-2">
              Variabilidad del modelo entre particiones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
