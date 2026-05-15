import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Página no encontrada</h1>
      <Link to="/" className="btn-primary inline-flex">Volver al inicio</Link>
    </div>
  );
}