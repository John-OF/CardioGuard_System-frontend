interface PrefillNoticeProps {
  emphasized?: boolean; // para el paso 0 (datos que casi nunca cambian)
}

export function PrefillNotice({ emphasized = false }: PrefillNoticeProps) {
  return (
    <div
      className={`
        rounded-xl p-5 border-2
        ${emphasized
          ? 'bg-amber-50 border-amber-300'
          : 'bg-blue-50 border-blue-200'
        }
      `}
      role="status"
    >
      <div className="flex gap-3 items-start">
        <span className="text-2xl flex-shrink-0" aria-hidden="true">
          {emphasized ? '⚠️' : '📋'}
        </span>
        <div className="flex-1">
          <p className={`text-lg font-semibold ${emphasized ? 'text-amber-900' : 'text-blue-900'}`}>
            Datos de su evaluación anterior
          </p>
          <p className={`text-base mt-1 ${emphasized ? 'text-amber-800' : 'text-blue-800'}`}>
            {emphasized
              ? 'Estos datos vienen de su evaluación anterior. Normalmente no deberían haber cambiado, pero puede corregirlos si nota algún error.'
              : 'Hemos rellenado estos campos con los datos que nos dio antes. Revíselos y si todo sigue igual, simplemente continúe.'}
          </p>
        </div>
      </div>
    </div>
  );
}