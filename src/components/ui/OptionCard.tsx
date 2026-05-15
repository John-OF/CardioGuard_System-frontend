import type { ReactNode } from 'react';

interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  hint?: string;
  // Si es checkbox, se ve un cuadrado en vez de un círculo
  variant?: 'radio' | 'checkbox';
}

export function OptionCard({
  selected,
  onClick,
  children,
  hint,
  variant = 'radio',
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-left rounded-2xl border-2 p-5 min-h-btn
        transition-all duration-150
        flex items-center gap-4
        ${selected
          ? 'border-primary bg-primary-light shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
        }
      `}
      aria-pressed={selected}
    >
      {/* Indicador visual */}
      <span
        className={`
          flex-shrink-0 w-7 h-7 flex items-center justify-center
          ${variant === 'radio' ? 'rounded-full' : 'rounded-md'}
          border-2
          ${selected ? 'border-primary bg-primary' : 'border-slate-300 bg-white'}
        `}
      >
        {selected && (
          variant === 'radio' ? (
            <span className="w-3 h-3 rounded-full bg-white" />
          ) : (
            <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-3-3a1 1 0 111.4-1.4L9 11.6l6.3-6.3a1 1 0 011.4 0z"
                clipRule="evenodd"
              />
            </svg>
          )
        )}
      </span>

      {/* Contenido */}
      <span className="flex-1">
        <span className={`block text-lg ${selected ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>
          {children}
        </span>
        {hint && (
          <span className="block text-base text-slate-500 mt-1">{hint}</span>
        )}
      </span>
    </button>
  );
}