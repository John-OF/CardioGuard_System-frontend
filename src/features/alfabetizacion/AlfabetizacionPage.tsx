import { EducationLayout } from './components/EducationLayout';

export function AlfabetizacionPage() {
  return (
    <EducationLayout
      title="Alfabetización en salud cardiovascular"
      description="Explore los temas disponibles a su ritmo. Encuentre información clara sobre el corazón, señales de alarma, RCP y cómo actuar en una emergencia."
    >
      <div className="card text-center">
        <p className="text-lg text-slate-700">
          Seleccione un tema del menú lateral para comenzar a leer.
        </p>
        <p className="text-base text-slate-500 mt-2">
          Cada tema está pensado para leerse en pocos minutos y a su propio ritmo.
        </p>
      </div>
    </EducationLayout>
  );
}
