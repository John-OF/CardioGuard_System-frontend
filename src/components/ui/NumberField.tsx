interface NumberFieldProps {
  label: string;
  description?: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string; // ej: "kg", "cm", "años"
  error?: string;
  name?: string;
}

export function NumberField({
  label,
  description,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  error,
  name,
}: NumberFieldProps) {
  return (
    <div className="space-y-2" data-field={name}>
      <label className="block">
        <span className="text-xl font-semibold text-slate-800">{label}</span>
        {description && (
          <span className="block text-base text-slate-600 mt-1 font-normal">
            {description}
          </span>
        )}
      </label>
      <div className="flex items-center gap-3">
        <input
          name={name}
          type="number"
          inputMode="decimal"
          value={value ?? ''}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === '' ? undefined : Number(v));
          }}
          min={min}
          max={max}
          step={step}
          className={`
            w-full max-w-xs px-4 py-3 text-xl rounded-xl border-2
            focus:outline-none focus:border-primary
            ${error ? 'border-red-400' : 'border-slate-300'}
          `}
        />
        {unit && <span className="text-lg text-slate-600">{unit}</span>}
      </div>
      {error && (
        <p className="text-base text-red-600 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}