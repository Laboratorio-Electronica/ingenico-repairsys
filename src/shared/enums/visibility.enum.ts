/**
 * Define los niveles de visibilidad y publicación de una entidad.
 *
 * Determina quién puede acceder al recurso y si se encuentra
 * disponible públicamente dentro del sistema.
 */
export enum Visibility {

  /**
   * Visible para cualquier usuario sin restricciones.
   */
  PUBLIC = "PUBLIC",

  /**
   * Visible únicamente para usuarios autenticados
   * o con permisos específicos.
   */
  PRIVATE = "PRIVATE",

  /**
   * Recurso en estado preliminar.
   * No es visible públicamente ni accesible externamente.
   */
  DRAFT = "DRAFT",
}
