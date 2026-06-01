const sections = [
  {
    icon: '🧪',
    title: 'Es un prototipo experimental',
    text: 'CardioGuard es un prototipo desarrollado como proyecto de tesis, con fines educativos y de investigación. Se encuentra en fase experimental y no es un producto médico certificado.',
  },
  {
    icon: '⚕️',
    title: 'No es un diagnóstico médico',
    text: 'Los resultados de la evaluación predictiva son una estimación orientativa basada en modelos de inteligencia artificial. No constituyen un diagnóstico médico ni reemplazan la valoración de un profesional de la salud.',
  },
  {
    icon: '👩‍⚕️',
    title: 'Ante cualquier duda, consulte a un médico',
    text: 'Si tiene dudas sobre su salud, presenta síntomas o recibe un resultado que le preocupa, consulte siempre a un médico o profesional de la salud calificado. Solo un profesional puede confirmar un diagnóstico e indicar un tratamiento.',
  },
  {
    icon: '🚨',
    title: 'En una emergencia, llame de inmediato',
    text: 'Si usted o alguien presenta dolor en el pecho, dificultad para respirar, pérdida de conciencia u otros signos de alarma, no use esta herramienta: llame de inmediato al número de emergencias (911) o acuda al centro de salud más cercano.',
  },
  {
    icon: '🔒',
    title: 'Sobre sus datos',
    text: 'El sistema funciona de forma anónima: no se solicita su nombre ni datos que permitan identificarle. La información ingresada se utiliza únicamente con fines educativos y de investigación para mejorar la herramienta.',
  },
];

export function AvisoLegalPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <span aria-hidden className="text-5xl">
          ⚖️
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-3">Aviso legal</h1>
        <p className="text-lg text-slate-600">
          Por favor, lea esta información antes de utilizar CardioGuard. Aquí explicamos qué es esta
          herramienta y cuáles son sus límites.
        </p>
      </header>

      {/* Mensaje principal destacado */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-2 flex items-center gap-2">
          <span aria-hidden>⚠️</span> Importante
        </h2>
        <p className="text-base text-amber-900 leading-relaxed">
          CardioGuard es un <strong>prototipo experimental</strong>. Los resultados de la evaluación
          predictiva <strong>no deben tomarse como un diagnóstico médico</strong>. Ante cualquier
          duda, <strong>consulte siempre a un médico</strong>.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 flex items-start gap-4"
          >
            <span aria-hidden className="text-3xl shrink-0">
              {section.icon}
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{section.title}</h3>
              <p className="text-base text-slate-700 leading-relaxed">{section.text}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-500">
        Al utilizar CardioGuard, usted entiende y acepta que se trata de una herramienta educativa y
        experimental, y que no sustituye la consulta, el diagnóstico ni el tratamiento de un
        profesional de la salud.
      </p>
    </div>
  );
}
