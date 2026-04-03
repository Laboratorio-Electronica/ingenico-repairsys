/**
 * Define los estados posibles dentro del ciclo de vida
 * de una entidad (feature, proyecto, módulo, contenido, etc.).
 *
 * Permite modelar tanto estados editoriales como estados
 * operativos o de resultado.
 */
export enum Status {
  /** Borrador, aún no visible públicamente */
  DRAFT = "DRAFT",

  /** Publicado y disponible para consumo */
  PUBLISHED = "PUBLISHED",

  /** Archivado, ya no activo pero conservado */
  ARCHIVED = "ARCHIVED",

  /** Planificado pero aún no iniciado */
  PLANNED = "PLANNED",

  /** Actualmente en desarrollo o despliegue */
  IN_PROGRESS = "IN_PROGRESS",

  /** Finalizado con éxito, cumple objetivos definidos */
  SUCCESS = "SUCCESS",

  /** Cumple parcialmente los objetivos */
  PARTIAL = "PARTIAL",

  /** No logró cumplir los objetivos esperados */
  FAILED = "FAILED",

  /** Funcionó anteriormente pero ya no se utiliza */
  DEPRECATED = "DEPRECATED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
