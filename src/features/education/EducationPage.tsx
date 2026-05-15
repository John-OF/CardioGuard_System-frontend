import { useMemo } from 'react';
import { storage } from '@/utils/storage';
import { EducationLayout } from './components/EducationLayout';
import { PriorityBanner } from './components/PriorityBanner';
import { TopicGrid } from './components/TopicGrid';
import { TopicSectionHeader } from './components/TopicSectionHeader';
import { EducationFooter } from './components/EducationFooter';
import { matchBackendTopics } from './utils/priorityMatcher';
import { TOPICS } from './data/topicContents';

export function EducationPage() {
  const lastResult = useMemo(() => storage.getLastResult(), []);

  const hasContext = lastResult !== null;
  const recommendedTopics = hasContext ? lastResult.education.topics : [];
  const priorityLevel = hasContext ? lastResult.education.priority_level : null;

  const { recommended, others } = useMemo(
    () => matchBackendTopics(recommendedTopics),
    [recommendedTopics]
  );

  // CTA al post-test solo si el último resultado fue un pre-test pendiente
  const showPostTestCTA =
    hasContext && lastResult.evaluation_type === 'pre_test';

  return (
    <EducationLayout
      title="Aprender sobre su salud cardiovascular"
      description="Encuentre información clara y práctica sobre el infarto, RCP básica, prevención y qué hacer en una emergencia. Cada tema toma pocos minutos de lectura."
    >
      {hasContext && priorityLevel && (
        <PriorityBanner
          priorityLevel={priorityLevel}
          recommendedCount={recommended.length}
        />
      )}

      {recommended.length > 0 && (
        <section aria-label="Temas recomendados" className="space-y-4">
          <TopicGrid topics={recommended} recommended />
        </section>
      )}

      {others.length > 0 && (
        <section aria-label="Otros temas" className="space-y-4">
          {recommended.length > 0 && (
            <TopicSectionHeader
              title="Otros temas"
              subtitle="Explore todos los temas disponibles a su ritmo."
            />
          )}
          {recommended.length === 0 && !hasContext && (
            <TopicSectionHeader
              title="Todos los temas"
              subtitle="Explore el contenido educativo a su ritmo."
            />
          )}
          <TopicGrid topics={others} />
        </section>
      )}

      {/* Fallback defensivo: si por algún motivo no hay temas en el catálogo */}
      {recommended.length === 0 && others.length === 0 && (
        <div className="card text-center">
          <p className="text-lg text-slate-600">
            No hay temas educativos disponibles en este momento.
          </p>
        </div>
      )}

      <EducationFooter showPostTestCTA={showPostTestCTA} />

      {/* Eco silencioso para el linter sobre TOPICS: lo dejamos importado
          para que un eventual cambio de matchBackendTopics no rompa el árbol */}
      <span hidden>{TOPICS.length}</span>
    </EducationLayout>
  );
}