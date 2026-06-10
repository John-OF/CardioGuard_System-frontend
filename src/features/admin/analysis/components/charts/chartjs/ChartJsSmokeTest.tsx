import { Bar } from 'react-chartjs-2';
import './ChartJsRegistry';
import { BaseChartJsCard } from './BaseChartJsCard';

const DATA = {
  labels: ['Categoría A', 'Categoría B'],
  datasets: [
    {
      label: 'Casos',
      data: [42, 78],
      backgroundColor: ['#3b82f6', '#10b981'],
      borderRadius: 4,
    },
  ],
};

const OPTIONS = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export function ChartJsSmokeTest() {
  return (
    <BaseChartJsCard
      title="Prueba Chart.js"
      subtitle="Verificación de compatibilidad"
      dataAvailable
    >
      <Bar data={DATA} options={OPTIONS} />
    </BaseChartJsCard>
  );
}
