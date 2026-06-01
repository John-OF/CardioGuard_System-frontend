const GLOSSARY_TERMS = [
  {
    term: 'RCP (Reanimación Cardiopulmonar)',
    definition:
      'Técnica de primeros auxilios que consiste en compresiones rítmicas en el pecho para mantener la circulación de sangre cuando el corazón se detiene. Puede aplicarse mientras llega la ayuda médica.',
  },
  {
    term: 'Cardiovascular',
    definition:
      'Todo lo relacionado con el corazón (cardio) y los vasos sanguíneos (vascular). Las enfermedades cardiovasculares afectan cómo el corazón bombea sangre al resto del cuerpo.',
  },
  {
    term: 'Infarto (Infarto al miocardio)',
    definition:
      'Ocurre cuando una arteria del corazón se bloquea y parte del músculo cardíaco deja de recibir sangre. Es una emergencia que requiere atención médica inmediata.',
  },
  {
    term: 'Colesterol',
    definition:
      'Sustancia grasa presente en la sangre, medida en mg/dL. Un nivel alto (240 mg/dL o más) aumenta el riesgo de bloqueos en las arterias del corazón.',
  },
  {
    term: 'Presión arterial',
    definition:
      'Fuerza con que la sangre empuja contra las paredes de las arterias. Se expresa en mmHg con dos valores (ej. 120/80). Cuando es alta (hipertensión), el corazón trabaja con más esfuerzo del normal.',
  },
  {
    term: 'Diabetes / Glucosa en ayunas',
    definition:
      'La diabetes es una condición en que el cuerpo no controla bien el azúcar en sangre (glucosa). Una glucosa en ayunas mayor a 120 mg/dL puede indicar riesgo. Eleva el riesgo cardiovascular.',
  },
  {
    term: '911',
    definition:
      'Número único de emergencias en Ecuador para situaciones médicas, policiales e incendios. Al llamar, indique la dirección exacta, qué ocurre y el estado de la persona afectada.',
  },
  {
    term: 'Arritmia',
    definition:
      'Alteración del ritmo normal del corazón: puede latir demasiado rápido, demasiado despacio o de forma irregular. Algunas arritmias son leves; otras requieren atención médica urgente.',
  },
  {
    term: 'ACV / Derrame cerebral',
    definition:
      'Ocurre cuando el flujo de sangre al cerebro se interrumpe. Señales de alerta: debilidad repentina en un lado del cuerpo, dificultad para hablar o pérdida de visión. Requiere atención urgente.',
  },
  {
    term: 'IMC (Índice de Masa Corporal)',
    definition:
      'Indicador que relaciona el peso con la talla (kg ÷ m²). Clasifica el estado nutricional: bajo peso (<18.5), normal (18.5–24.9), sobrepeso (25–29.9), obesidad (≥30).',
  },
];

export function GlosarioView() {
  return (
    <dl className="space-y-4">
      {GLOSSARY_TERMS.map(({ term, definition }) => (
        <div
          key={term}
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <dt className="text-lg font-bold text-slate-900">{term}</dt>
          <dd className="mt-2 text-base text-slate-700 leading-relaxed">{definition}</dd>
        </div>
      ))}
    </dl>
  );
}
