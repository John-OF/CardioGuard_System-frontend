/**
 * Hace scroll al primer campo con error.
 * Cada input/grupo del formulario debe tener un `data-field={nombre}` para
 * que esta función pueda encontrarlo.
 *
 * Devuelve true si encontró un campo y scrolleó, false si no.
 */
export function scrollToFirstError(errorKeys: string[]): boolean {
  if (errorKeys.length === 0) return false;

  // Buscamos el primer error que tenga un nodo en el DOM, en el orden
  // visual (no en el orden del objeto errors).
  const allFields = document.querySelectorAll<HTMLElement>('[data-field]');

  for (const node of allFields) {
    const field = node.dataset.field;
    if (field && errorKeys.includes(field)) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Foco para que lectores de pantalla lo anuncien
      const focusable = node.querySelector<HTMLElement>(
        'input, button, [tabindex]'
      );
      focusable?.focus({ preventScroll: true });
      return true;
    }
  }
  return false;
}