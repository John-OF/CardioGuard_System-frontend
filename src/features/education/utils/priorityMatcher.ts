import type { Topic } from '../types';
import { TOPICS, TOPICS_BY_BACKEND_KEY } from '../data/topicContents';

export interface MatchedTopics {
  recommended: Topic[];   // los que el backend marcó como prioritarios
  others: Topic[];        // el resto del catálogo
}

/**
 * Cruza los topics que devuelve el backend (strings) contra el catálogo local.
 * Si algún topic del backend no matchea, se ignora (con warn).
 */
export function matchBackendTopics(backendTopics: string[]): MatchedTopics {
  const recommendedSet = new Set<string>();

  for (const key of backendTopics) {
    const topic = TOPICS_BY_BACKEND_KEY[key];
    if (topic) {
      recommendedSet.add(topic.slug);
    } else {
      console.warn(
        `[Educación] Topic del backend no encontrado en catálogo: "${key}". ` +
        `Verifique que el string coincida exactamente con backendKey en topicCatalog.ts`
      );
    }
  }

  const recommended = TOPICS.filter((t) => recommendedSet.has(t.slug));
  const others = TOPICS.filter((t) => !recommendedSet.has(t.slug));

  return { recommended, others };
}

/**
 * Temas relacionados a uno dado: prefiere misma categoría, completa con otros si hace falta.
 */
export function getRelatedTopics(currentSlug: string, limit = 2): Topic[] {
  const current = TOPICS.find((t) => t.slug === currentSlug);
  if (!current) return [];

  const sameCategory = TOPICS.filter(
    (t) => t.category === current.category && t.slug !== currentSlug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Completar con temas de otras categorías si no hay suficientes
  const fillers = TOPICS.filter(
    (t) =>
      t.slug !== currentSlug &&
      !sameCategory.some((sc) => sc.slug === t.slug)
  );

  return [...sameCategory, ...fillers].slice(0, limit);
}