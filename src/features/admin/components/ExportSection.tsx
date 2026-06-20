import { useState } from 'react';
import {
  downloadAdminExport,
  AdminUnauthorizedError,
  type AdminExportKind,
} from '@/api/admin';

interface ExportSectionProps {
  token: string;
  onUnauthorized: () => void;
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/**
 * Exporta los datos crudos del sistema para análisis externo, respaldo académico o revisión metodológica.
 * Sirve contra la base a la que apunta el backend (en producción, Supabase).
 */
export function ExportSection({ token, onUnauthorized }: ExportSectionProps) {
  const [busy, setBusy] = useState<AdminExportKind | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleExport(kind: AdminExportKind) {
    setBusy(kind);
    setError(null);
    try {
      const { blob, filename } = await downloadAdminExport(token, kind);
      triggerBrowserDownload(blob, filename);
    } catch (err) {
      if (err instanceof AdminUnauthorizedError) {
        onUnauthorized();
      } else {
        setError('No se pudo generar la exportación. Intente de nuevo.');
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Exportar datos para análisis
      </h2>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
        Descarga los registros del sistema para análisis estadístico externo,
        respaldo académico o revisión metodológica. Los datos son
        anónimos y de uso exclusivamente académico.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleExport('joined')}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0E7490] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0c647c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy === 'joined' ? 'Generando…' : 'Descargar CSV unido'}
        </button>
        <button
          type="button"
          onClick={() => handleExport('tables')}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 rounded-lg border border-[#0E7490] px-4 py-2.5 text-sm font-semibold text-[#0E7490] shadow-sm transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy === 'tables' ? 'Generando…' : 'Descargar ZIP (6 tablas)'}
        </button>
      </div>

      <ul className="mt-4 space-y-1.5 text-xs leading-5 text-slate-500">
        <li>
          <span className="font-medium text-slate-600">CSV unido:</span> una
          fila por evaluación con todas las columnas unidas por{' '}
          <code>evaluation_id</code>. Ideal para cargar directo con{' '}
          <code>pd.read_csv()</code>.
        </li>
        <li>
          <span className="font-medium text-slate-600">ZIP (6 tablas):</span> un
          CSV por tabla (evaluations, health_responses, habit_responses,
          education_responses, emergency_responses, system_results) para hacer
          los joins manualmente.
        </li>
      </ul>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}
    </section>
  );
}
