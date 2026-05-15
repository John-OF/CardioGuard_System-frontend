interface RecommendationsListProps {
  recommendations: string[];
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (!recommendations.length) return null;
  return (
    <section aria-labelledby="reco-title">
      <h2 id="reco-title" className="text-xl font-semibold text-slate-900 mb-4">
        Lo que le recomendamos
      </h2>
      <ul className="space-y-3">
        {recommendations.map((rec, i) => (
          <li key={i} className="card flex gap-4 items-start p-4 sm:p-5">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-light text-primary flex items-center justify-center mt-0.5">
              <CheckIcon />
            </span>
            <p className="text-lg text-slate-800 leading-relaxed flex-1">
              {rec}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}