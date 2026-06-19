import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
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
import { DescriptiveAnalysisPage } from '@/features/admin/analysis/DescriptiveAnalysisPage';
import { PrePostAnalysisPage } from '@/features/admin/analysis/PrePostAnalysisPage';
import { EmergencyAnalysisPage } from '@/features/admin/analysis/EmergencyAnalysisPage';
import { ChiSquareAcademicPage } from '@/features/admin/academic/chi-square/ChiSquareAcademicPage';
import { SpearmanAcademicPage } from '@/features/admin/academic/spearman/SpearmanAcademicPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Panel de tesistas: fuera de AppLayout (sin header/nav público),
            solo accesible escribiendo /admin en la URL. */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminDashboard />} />
          <Route path="analisis" element={<AnalysisLayout />}>
            <Route index element={<Navigate to="descriptivo" replace />} />
            <Route path="descriptivo" element={<DescriptiveAnalysisPage />} />
            <Route path="pre-post" element={<PrePostAnalysisPage />} />
            <Route path="emergencias" element={<EmergencyAnalysisPage />} />
          </Route>
          <Route path="analisis-academico/chi-cuadrado" element={<ChiSquareAcademicPage />} />
          <Route path="analisis-academico/correlacion" element={<SpearmanAcademicPage />} />
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


