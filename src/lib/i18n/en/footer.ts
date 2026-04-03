import { FooterLocale } from "../es/footer";

/**
 * =========================================================
 * feedbackStates (English)
 * ---------------------------------------------------------
 * Configuración de textos para la sección tipo footer /
 * bloque informativo reutilizable en idioma inglés.
 *
 * Tipado:
 * - Usa FooterLocale importado desde la versión en español.
 * - Garantiza consistencia estructural entre idiomas.
 *
 * Estructura:
 * - project → Identidad y propuesta de valor.
 * - contact → Información de contacto.
 * - links → Enlaces útiles relacionados al proyecto.
 *
 * Nota:
 * Si FooterLocale cambia en el idioma base,
 * este archivo deberá actualizarse para mantener coherencia.
 * =========================================================
 */
export const footer: FooterLocale = {
  project: {
    title: 'Techfolio - KrlozMedina',
    slogan:
      'We transform ideas into real systems through engineering, design, agile development, and modern scalable technology.',
  },
  contact: {
    title: 'Contact',
    email: 'Email',
    whatsApp: 'WhatsApp',
  },
  links: {
    title: 'Useful links',
    documentation: 'Documentation',
    license: 'MIT License',
    api: 'API V2'
  },
  bottom: {
    copyright: '© 2026 Techfolio KrlozMedina — All rights reserved.',
    version: 'Version 3.0.0',
  }
};