import { OptionCard } from './OptionCard';
import type { Option } from '@/features/evaluation/constants';

interface RadioCardGroupProps<T extends string> {
  label: string;
  description?: string;
  options: Option<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  error?: string;
  name?: string; 
}

export function RadioCardGroup<T extends string>({
  label,
  description,
  options,
  value,
  onChange,
  error,
  name,
}: RadioCardGroupProps<T>) {
  return (
    <fieldset className="space-y-3" data-field={name}>
      <legend className="block">
        <span className="text-xl font-semibold text-slate-800">{label}</span>
        {description && (
          <span className="block text-base text-slate-600 mt-1 font-normal">
            {description}
          </span>
        )}
      </legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
            hint={opt.hint}
            variant="radio"
          >
            {opt.label}
          </OptionCard>
        ))}
      </div>
      {error && (
        <p className="text-base text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}