import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        Bienvenido a CardioGuard
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
        Una herramienta sencilla para conocer su riesgo cardiovascular y aprender
        a actuar ante una emergencia del corazón.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/evaluacion" className="btn-primary inline-flex items-center justify-center">
          Comenzar evaluación
        </Link>
        <Link to="/historial" className="btn-secondary inline-flex items-center justify-center">
          Ver mi historial
        </Link>
      </div>
    </div>
  );
}