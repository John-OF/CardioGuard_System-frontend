import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { EvaluationPage } from '@/features/evaluation/EvaluationPage';
import { ResultsPage } from '@/features/results/ResultsPage';
import { HistoryPage } from '@/features/history/HistoryPage';
import { ComparisonPage } from '@/features/history/ComparisonPage';
import { AlfabetizacionPage } from '@/features/alfabetizacion/AlfabetizacionPage';
import { TopicDetailPage } from '@/features/alfabetizacion/topics/TopicDetailPage';
import { CapacitacionPage } from '@/features/capacitacion/CapacitacionPage';
import { SimuladorPage } from '@/features/simulador/SimuladorPage';
import { AdminPage } from '@/features/admin/AdminPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Panel de tesistas: fuera de AppLayout (sin header/nav público),
            solo accesible escribiendo /admin en la URL. */}
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="evaluacion" element={<EvaluationPage />} />
          <Route path="resultados/:evaluationId" element={<ResultsPage />} />
          <Route path="alfabetizacion" element={<AlfabetizacionPage />} />
          <Route path="alfabetizacion/:topicSlug" element={<TopicDetailPage />} />
          <Route path="capacitacion" element={<CapacitacionPage />} />
          <Route path="simulador" element={<SimuladorPage />} />
          <Route path="historial" element={<HistoryPage />} />
          <Route path="/historial/comparacion/:postId" element={<ComparisonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
