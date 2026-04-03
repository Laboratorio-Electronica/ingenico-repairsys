/**
 * =========================================================
 * Role Enum
 * ---------------------------------------------------------
 * Define los roles disponibles dentro del sistema.
 *
 * Los roles se utilizan para:
 * - control de acceso a rutas
 * - autorización en endpoints de API
 * - asignación de permisos en el middleware
 *
 * Cada rol representa un nivel diferente de privilegios.
 * =========================================================
 */
export enum Role {

  /**
   * Administrador del sistema.
   *
   * Permisos:
   * - acceso completo a todas las rutas
   * - creación, edición y eliminación de recursos
   * - gestión de usuarios y configuraciones
   */
  ADMIN = "ADMIN",

  /**
   * Editor de contenido.
   *
   * Permisos:
   * - crear y modificar recursos
   * - acceso a panel administrativo limitado
   */
  EDITOR = "EDITOR",

  /**
   * Usuario con permisos de solo lectura.
   *
   * Permisos:
   * - visualizar contenido
   * - sin capacidad de modificación
   */
  VIEWER = "VIEWER"
}