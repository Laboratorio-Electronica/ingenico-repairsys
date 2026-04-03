/**
 * =========================================================
 * Permissions
 * ---------------------------------------------------------
 * Define las acciones básicas que pueden ejecutarse
 * sobre los recursos del sistema.
 *
 * Estas acciones se utilizan en el sistema de autorización
 * (RBAC - Role Based Access Control).
 *
 * Permiten determinar qué operaciones puede realizar
 * cada rol sobre distintos recursos.
 *
 * Ejemplo:
 * ADMIN → READ, CREATE, UPDATE, DELETE
 * EDITOR → READ, CREATE, UPDATE
 * VIEWER → READ
 * =========================================================
 */
export const PERMISSIONS = {

  /**
   * Permite visualizar o consultar recursos.
   */
  READ: "READ",

  /**
   * Permite crear nuevos recursos.
   */
  CREATE: "CREATE",

  /**
   * Permite modificar recursos existentes.
   */
  UPDATE: "UPDATE",

  /**
   * Permite eliminar recursos.
   */
  DELETE: "DELETE",

} as const;


/**
 * =========================================================
 * Permission Type
 * ---------------------------------------------------------
 * Tipo derivado automáticamente del objeto PERMISSIONS.
 *
 * Resultado:
 * "READ" | "CREATE" | "UPDATE" | "DELETE"
 *
 * Esto garantiza:
 * - consistencia de tipos
 * - autocompletado en TypeScript
 * - seguridad en validaciones
 * =========================================================
 */
export type Permission =
  typeof PERMISSIONS[keyof typeof PERMISSIONS];