/**
 * =========================================================
 * Notice (English Locale)
 * ---------------------------------------------------------
 * Diccionario de traducciones para el componente Notice
 * en idioma inglés.
 *
 * Tipado:
 * - Usa NoticeLocale como contrato estructural.
 * - Garantiza coherencia entre idiomas.
 *
 * Estructura:
 * Cada clave representa un tipo de estado informativo
 * reutilizable en distintas secciones del sistema.
 *
 * Estados soportados:
 * - dummy → Datos simulados.
 * - construction → Sección en construcción.
 * - incomplete → Página incompleta.
 * - maintenance → Mantenimiento temporal.
 * - comingSoon → Próximamente.
 * - beta → Funcionalidad en fase beta.
 * - bugs → Problemas conocidos.
 *
 * Nota:
 * Si se agrega un nuevo estado en el idioma base,
 * TypeScript obligará a actualizar este archivo.
 * =========================================================
 */

import { NoticeLocale } from '../es/notice';

export const notice: NoticeLocale = {
  dummy: {
    title: 'Dummy Data',
    description:
      'The displayed data is simulated and will be updated soon.',
  },
  construction: {
    title: 'Under Construction',
    description:
      'This section is under development and will be available soon.',
  },
  incomplete: {
    title: 'Incomplete Page',
    description:
      'This page is under development and may not contain all information.',
  },
  maintenance: {
    title: 'Maintenance',
    description:
      'This section is under maintenance and will be available shortly.',
  },
  comingSoon: {
    title: 'Coming Soon',
    description:
      'This feature will be available in a future update.',
  },
  beta: {
    title: 'Beta',
    description:
      'This feature is in beta and may be unstable.',
  },
  bugs: {
    title: 'Bug',
    description:
      'This page has known bugs or unexpected behavior.',
  },
};