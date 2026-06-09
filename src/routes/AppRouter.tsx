import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { EvaluationPage } from '@/features/evaluation/EvaluationPage';
import { ResultsPage } from '@/features/results/ResultsPage';
import { HistoryPage } from '@/features/history/HistoryPage';
import { ComparisonPage } from '@/features/history/ComparisonPage';
import { EducacionPage } from '@/features/educacion/EducacionPage';
import { TopicDetailPage } from '@/features/educacion/topics/TopicDetailPage';
import { CapacitacionPage } from '@/features/capacitacion/CapacitacionPage';
import { SimuladorPage } from '@/features/simulador/SimuladorPage';
import { ModelosHomePage } from '@/features/modelos/ModelosHomePage';
import { PipelinePage } from '@/features/modelos/PipelinePage';
import { ModelPage } from '@/features/modelos/ModelPage';
import { UsabilidadPage } from '@/features/usabilidad/UsabilidadPage';
import { AvisoLegalPage } from '@/features/aviso-legal/AvisoLegalPage';
import { AdminPage } from '@/features/admin/AdminPage';
import { AdminDashboard } from '@/features/admin/AdminDashboard';
import { AnalysisLayout } from '@/features/admin/analysis/AnalysisLayout';
import { AnalysisOverviewPage } from '@/features/admin/analysis/AnalysisOverviewPage';
import { DescriptiveAnalysisPage } from '@/features/admin/analysis/DescriptiveAnalysisPage';
import { PrePostAnalysisPage } from '@/features/admin/analysis/PrePostAnalysisPage';
import { EmergencyAnalysisPage } from '@/features/admin/analysis/EmergencyAnalysisPage';
import { ChiSquareAnalysisPage } from '@/features/admin/analysis/ChiSquareAnalysisPage';
import { CorrelationAnalysisPage } from '@/features/admin/analysis/CorrelationAnalysisPage';
import { ModelosRedirectPage } from '@/features/admin/analysis/ModelosRedirectPage';
import { PendingAnalysisPage } from '@/features/admin/analysis/PendingAnalysisPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Panel de tesistas: fuera de AppLayout (sin header/nav público),
            solo accesible escribiendo /admin en la URL. */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminDashboard />} />
          <Route path="analisis" element={<AnalysisLayout />}>
            <Route index element={<AnalysisOverviewPage />} />
            <Route path="descriptivo" element={<DescriptiveAnalysisPage />} />
            <Route path="pre-post" element={<PrePostAnalysisPage />} />
            <Route path="emergencias" element={<EmergencyAnalysisPage />} />
            <Route path="chi-cuadrado" element={<ChiSquareAnalysisPage />} />
            <Route path="correlaciones" element={<CorrelationAnalysisPage />} />
            <Route path="modelos" element={<ModelosRedirectPage />} />
            <Route path="pendientes" element={<PendingAnalysisPage />} />
          </Route>
        </Route>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="evaluacion" element={<EvaluationPage />} />
          <Route path="resultados/:evaluationId" element={<ResultsPage />} />
          <Route path="educacion" element={<EducacionPage />} />
          <Route path="educacion/:topicSlug" element={<TopicDetailPage />} />
          <Route path="capacitacion" element={<CapacitacionPage />} />
          <Route path="simulador" element={<SimuladorPage />} />
          <Route path="modelos" element={<ModelosHomePage />} />
          <Route path="modelos/sistema-hibrido" element={<PipelinePage />} />
          <Route path="modelos/:modelSlug" element={<ModelPage />} />
          <Route path="historial" element={<HistoryPage />} />
          <Route path="/historial/comparacion/:postId" element={<ComparisonPage />} />
          <Route path="usabilidad" element={<UsabilidadPage />} />
          <Route path="aviso-legal" element={<AvisoLegalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


