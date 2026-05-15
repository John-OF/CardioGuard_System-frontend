// Categorías para agrupar temas relacionados internamente
export type TopicCategory =
  | 'enfermedad'      // qué es, factores de riesgo
  | 'prevencion'      // hábitos saludables
  | 'rcp'             // RCP y primeros auxilios
  | 'emergencia';     // qué hacer en el momento

// Bloque dentro del contenido de un tema
export type TopicContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'numbered_list'; items: string[] }
  | { type: 'highlight'; variant: 'warning' | 'tip'; title: string; text: string };

// Metadata + contenido de un tema
export interface Topic {
  // Identificadores
  slug: string;                      // URL amigable (ej. "reconocer-sintomas")
  backendKey: string;                // string exacto que devuelve el backend

  // Presentación
  category: TopicCategory;
  icon: string;                      // emoji
  title: string;                     // título largo en la página de detalle
  shortTitle: string;                // título corto en las cards
  subtitle: string;                  // subtítulo emotivo bajo el título principal
  shortDescription: string;          // 1-2 líneas para las cards

  // Contenido
  importantNote: { title: string; text: string };
  blocks: TopicContentBlock[];
  closing: string;                   // párrafo de cierre "Lo que se lleva"
}