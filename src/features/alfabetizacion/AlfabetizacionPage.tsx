import { EducationLayout } from './components/EducationLayout';
import { TopicGrid } from './components/TopicGrid';
import { TOPICS } from './data/topicContents';

export function AlfabetizacionPage() {
  return (
    <EducationLayout
      title="Alfabetización en salud cardiovascular"
      description="Explore los temas disponibles a su ritmo. Encuentre información clara sobre el corazón, señales de alarma, RCP y cómo actuar en una emergencia."
    >
      <TopicGrid topics={TOPICS} />
    </EducationLayout>
  );
}
