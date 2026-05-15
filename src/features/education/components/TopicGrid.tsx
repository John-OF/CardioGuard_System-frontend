import type { Topic } from '../types';
import { TopicCard } from './TopicCard';

interface TopicGridProps {
  topics: Topic[];
  recommended?: boolean;
}

export function TopicGrid({ topics, recommended = false }: TopicGridProps) {
  if (topics.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {topics.map((topic) => (
        <TopicCard key={topic.slug} topic={topic} recommended={recommended} />
      ))}
    </div>
  );
}