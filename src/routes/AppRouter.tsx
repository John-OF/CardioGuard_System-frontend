import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { EvaluationPage } from '@/features/evaluation/EvaluationPage';
import { ResultsPage } from '@/features/results/ResultsPage';
import { HistoryPage } from '@/features/history/HistoryPage';
import { ComparisonPage } from '@/features/history/ComparisonPage';
import { EducationPage } from '@/features/education/EducationPage';
import { TopicDetailPage } from '@/features/education/topics/TopicDetailPage';

const Placeholder = ({ title }: { title: string }) => (
  <div className="card text-center">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-slate-600">En construcción.</p>
  </div>
);

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="evaluacion" element={<EvaluationPage />} />
          <Route path="resultados/:evaluationId" element={<ResultsPage />} />
          <Route path="/educacion" element={<EducationPage />} />
          <Route path="/educacion/:topicSlug" element={<TopicDetailPage />} />
          <Route path="simulador" element={<Placeholder title="Simulador" />} />
          <Route path="historial" element={<HistoryPage />} />
          <Route path="/historial/comparacion/:postId" element={<ComparisonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}