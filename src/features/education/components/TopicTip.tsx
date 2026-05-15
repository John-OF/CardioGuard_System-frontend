interface TopicTipProps {
  variant: 'warning' | 'tip';
  title: string;
  text: string;
}

const VARIANT_STYLES: Record<
  TopicTipProps['variant'],
  { wrapper: string; iconBg: string; title: string; icon: string }
> = {
  warning: {
    wrapper: 'border-red-200 bg-red-50',
    iconBg: 'bg-red-600',
    title: 'text-red-900',
    icon: '⚠',
  },
  tip: {
    wrapper: 'border-primary/30 bg-primary-light',
    iconBg: 'bg-primary',
    title: 'text-slate-900',
    icon: '💡',
  },
};

export function TopicTip({ variant, title, text }: TopicTipProps) {
  const styles = VARIANT_STYLES[variant];
  return (
    <div
      className={`rounded-2xl border-2 ${styles.wrapper} p-5 sm:p-6 flex gap-4 items-start`}
    >
      <span
        className={`flex-shrink-0 w-10 h-10 rounded-full ${styles.iconBg} text-white flex items-center justify-center text-xl`}
        aria-hidden="true"
      >
        {styles.icon}
      </span>
      <div className="flex-1">
        <p className={`text-base font-bold ${styles.title}`}>{title}</p>
        <p className="text-base text-slate-700 mt-2 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}