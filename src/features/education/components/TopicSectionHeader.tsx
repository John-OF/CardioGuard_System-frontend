interface TopicSectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function TopicSectionHeader({ title, subtitle }: TopicSectionHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="text-base text-slate-600 mt-1">{subtitle}</p>
      )}
    </div>
  );
}