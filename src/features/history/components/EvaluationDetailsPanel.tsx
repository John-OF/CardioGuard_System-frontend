import type { EvaluationDetails, FamilyHistory } from '@/types/results';
import { IconCheck } from '@/components/ui/icons';

interface EvaluationDetailsPanelProps {
  details: EvaluationDetails;
}

/** Badge Sí/No: verde para "No" (sin factor de riesgo), ámbar para "Sí". */
function YesNoBadge({ value }: { value: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
        value
          ? 'bg-amber-100 text-amber-700'
          : 'bg-green-100 text-green-700'
      }`}
    >
      {value ? 'Sí' : 'No'}
    </span>
  );
}

/** Badge de antecedente familiar (tri-estado). */
function FamilyHistoryBadge({ value }: { value: FamilyHistory }) {
  const map = {
    si: { label: 'Sí', className: 'bg-amber-100 text-amber-700' },
    no: { label: 'No', className: 'bg-green-100 text-green-700' },
    no_sabe: { label: 'No sabe', className: 'bg-slate-100 text-slate-600' },
  } as const;
  const { label, className } = map[value];
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${className}`}>
      {label}
    </span>
  );
}

/** Chip etiqueta + valor (datos personales). */
function DataChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="text-base font-bold text-slate-900">{value}</span>
    </div>
  );
}

/** Tarjeta de medición (signos vitales). */
function MeasureCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="text-lg font-bold text-slate-900 mt-1">{value}</p>
      {caption && <p className="text-sm text-slate-500 mt-0.5">{caption}</p>}
    </div>
  );
}

/** Tarjeta con badge a la derecha (síntomas, hábitos sí/no, antecedentes). */
function BadgeCard({
  label,
  caption,
  badge,
}: {
  label: string;
  caption?: string;
  badge: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <p className="text-base font-semibold text-slate-800">{label}</p>
        {caption && <p className="text-sm text-slate-500 mt-0.5">{caption}</p>}
      </div>
      {badge}
    </div>
  );
}

/** Tarjeta con valor de texto (hábitos no binarios). */
function TextCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="text-base font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function SubBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="text-base font-bold text-slate-900 mb-3">{title}</h4>
      {children}
    </section>
  );
}

export function EvaluationDetailsPanel({ details }: EvaluationDetailsPanelProps) {
  const { personal, vitals, symptoms, habits, antecedents, recommendations } = details;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-slate-900">Detalles de la evaluación</h3>

      {/* Datos personales */}
      <SubBlock title="Datos personales">
        <div className="flex flex-wrap gap-3">
          <DataChip label="Edad" value={`${personal.age} años`} />
          <DataChip label="Sexo" value={personal.sex} />
        </div>
      </SubBlock>

      {/* Signos vitales y mediciones */}
      <SubBlock title="Signos vitales y mediciones">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <MeasureCard label="Presión arterial" value={vitals.blood_pressure} />
          <MeasureCard label="Colesterol" value={vitals.cholesterol} />
          <MeasureCard label="Glucosa" value={vitals.glucose} />
          <MeasureCard
            label="Índice de masa corporal"
            value={`${vitals.bmi.toFixed(1)} IMC`}
            caption={vitals.bmi_category}
          />
        </div>
      </SubBlock>

      {/* Síntomas */}
      <SubBlock title="Síntomas">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BadgeCard
            label="Dolor torácico"
            caption={symptoms.chest_pain ? symptoms.chest_pain_type : undefined}
            badge={<YesNoBadge value={symptoms.chest_pain} />}
          />
          <BadgeCard
            label="Dolor provocado por esfuerzo"
            badge={<YesNoBadge value={symptoms.effort_pain} />}
          />
        </div>
      </SubBlock>

      {/* Hábitos de vida */}
      <SubBlock title="Hábitos de vida">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BadgeCard
            label="Fumador"
            caption={habits.smoker_label}
            badge={<YesNoBadge value={habits.smoker} />}
          />
          <BadgeCard
            label="Alcohólico"
            caption={habits.alcohol_label}
            badge={<YesNoBadge value={habits.alcohol} />}
          />
          <TextCard label="Actividad física" value={habits.activity} />
          <TextCard label="Dieta" value={habits.diet} />
        </div>
      </SubBlock>

      {/* Antecedentes médicos */}
      <SubBlock title="Antecedentes médicos">
        <BadgeCard
          label="Antecedentes familiares de enfermedad cardiovascular"
          badge={<FamilyHistoryBadge value={antecedents.family_history} />}
        />
      </SubBlock>

      {/* Recomendaciones */}
      {recommendations.length > 0 && (
        <SubBlock title="Recomendaciones">
          <ul className="space-y-2 rounded-xl border border-blue-100 bg-blue-50 p-4">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
                >
                  <IconCheck className="w-4 h-4" />
                </span>
                <span className="text-base text-slate-700 leading-relaxed">{rec}</span>
              </li>
            ))}
          </ul>
        </SubBlock>
      )}
    </div>
  );
}
