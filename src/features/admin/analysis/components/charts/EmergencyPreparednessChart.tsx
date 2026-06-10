import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { BaseRechartsChart } from './recharts/BaseRechartsChart';
import { RechartsTooltip } from './recharts/RechartsTooltip';
import type { EmergencyPreparednessItem } from './chartTransformers';

const BAR_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

interface EmergencyPreparednessChartProps {
  data: EmergencyPreparednessItem[];
}

export function EmergencyPreparednessChart({ data }: EmergencyPreparednessChartProps) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Perfil de preparación ante emergencias
      </h2>
      <BaseRechartsChart
        data={data}
        height={280}
        emptyMessage="No hay datos de perfil de preparación."
      >
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v: number) => `${v}%`}
            tick={{ fontSize: 12, fill: '#64748b' }}
          />
          <YAxis
            type="category"
            dataKey="metric"
            width={160}
            tick={{ fontSize: 12, fill: '#334155' }}
          />
          <Tooltip content={<RechartsTooltip suffix="%" />} />
          <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
            {data.map((_entry, i) => (
              <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </BaseRechartsChart>
    </section>
  );
}
