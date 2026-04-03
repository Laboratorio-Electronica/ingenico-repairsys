/**
 * =========================================================
 * Footer (Spanish Locale)
 * ---------------------------------------------------------
 * Diccionario de traducciones para la sección Footer
 * en idioma español.
 *
 * Estructura:
 * - project → Identidad del proyecto y propuesta de valor.
 * - contact → Información de contacto.
 * - links → Enlaces útiles relacionados al sistema.
 *
 * Este objeto sirve como base estructural para otros
 * idiomas mediante el tipo FooterLocale.
 * =========================================================
 */
export const footer = {
  project: {
    title: 'Techfolio - KrlozMedina',
    slogan:
      'Transformamos ideas en sistemas reales mediante ingeniería, diseño, desarrollo ágil y tecnología moderna escalable.',
  },
  contact: {
    title: 'Contacto',
    email: 'Correo',
    whatsApp: 'WhatsApp',
  },
  links: {
    title: 'Enlaces útiles',
    documentation: 'Documentación',
    license: 'Licencia MIT',
    api: 'API V2'
  },
  bottom: {
    copyright: '© 2026 Techfolio KrlozMedina — Todos los derechos reservados.',
    version: 'Versión 3.0.0'
  }
};

/**
 * =========================================================
 * FooterLocale (Type)
 * ---------------------------------------------------------
 * Tipo derivado automáticamente del objeto `footer`.
 *
 * Beneficios:
 * - Garantiza consistencia estructural entre idiomas.
 * - Si cambia la estructura base, TypeScript obligará
 *   a actualizar las demás traducciones.
 *
 * Nota arquitectónica:
 * Actualmente este tipo vive dentro del archivo español.
 * En proyectos más grandes debería moverse a un módulo
 * independiente (ej: /types/i18n).
 * =========================================================
 */
export type FooterLocale = typeof footer;