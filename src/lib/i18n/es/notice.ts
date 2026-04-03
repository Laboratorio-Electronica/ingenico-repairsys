/**
 * =========================================================
 * Notice (Spanish Locale)
 * ---------------------------------------------------------
 * Diccionario de estados informativos para el componente
 * Notice en idioma español.
 *
 * Tipado:
 * - Usa NoticeType como fuente de verdad estructural.
 * - Se define como Record<NoticeType, { title; description }>.
 * - Garantiza que todos los tipos definidos en el dominio
 *   tengan su correspondiente traducción.
 *
 * Arquitectura correcta:
 * - NoticeType vive en el dominio (capa business).
 * - El locale solo aporta contenido textual.
 * - No depende de otro idioma para su estructura.
 *
 * Estados soportados:
 * - dummy → Datos simulados.
 * - construction → Sección en construcción.
 * - incomplete → Página incompleta.
 * - maintenance → Mantenimiento temporal.
 * - comingSoon → Próximamente.
 * - beta → Funcionalidad en beta.
 * - bugs → Problemas conocidos.
 * =========================================================
 */

import { NoticeType } from '@/domain/notice/noticeMeta';

export const notice: Record<
  NoticeType,
  { title: string; description: string }
> = {
  dummy: {
    title: 'Datos de prueba',
    description:
      'Los datos mostrados son simulados y serán actualizados próximamente.',
  },
  construction: {
    title: 'En construcción',
    description:
      'Esta sección está en desarrollo y estará disponible pronto.',
  },
  incomplete: {
    title: 'Página incompleta',
    description:
      'Esta página está en desarrollo y puede no contener toda la información.',
  },
  maintenance: {
    title: 'Mantenimiento',
    description:
      'Esta sección está en mantenimiento y estará disponible en breve.',
  },
  comingSoon: {
    title: 'Próximamente',
    description:
      'Esta funcionalidad estará disponible en una futura actualización.',
  },
  beta: {
    title: 'Beta',
    description:
      'Esta funcionalidad está en fase beta y puede presentar inestabilidades.',
  },
  bugs: {
    title: 'Bug',
    description:
      'Esta página presenta errores conocidos o comportamientos inesperados.',
  },
};

/**
 * Tipo derivado automáticamente del objeto notice.
 * Permite reutilizar la misma estructura en otros idiomas.
 */
export type NoticeLocale = typeof notice;