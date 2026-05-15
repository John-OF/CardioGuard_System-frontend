import { OptionCard } from './OptionCard';
import type { Option } from '@/features/evaluation/constants';

interface CheckboxCardGroupProps<T extends string> {
  label: string;
  description?: string;
  options: Option<T>[];
  values: T[];
  onChange: (values: T[]) => void;
  error?: string;
  name?: string;
}

export function CheckboxCardGroup<T extends string>({
  label,
  description,
  options,
  values,
  onChange,
  error,
  name
}: CheckboxCardGroupProps<T>) {
  const toggle = (val: T) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

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
            selected={values.includes(opt.value)}
            onClick={() => toggle(opt.value)}
            hint={opt.hint}
            variant="checkbox"
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