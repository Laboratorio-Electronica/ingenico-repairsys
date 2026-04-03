import { RBAC } from "./rbac.config";
import { Feature } from "@/shared/auth/features.enum";
import { Permission } from "@/shared/auth/permissions";
import { Role } from "@/shared/auth/role.enum";

/**
 * =========================================================
 * canAccess
 * ---------------------------------------------------------
 * Verifica si un rol tiene permiso para realizar una
 * acción específica sobre una feature determinada.
 *
 * Utiliza la configuración RBAC (Role-Based Access Control)
 * definida en `rbac.config`.
 *
 * Flujo de validación:
 *
 * 1️⃣ Obtiene los permisos asociados al rol
 * 2️⃣ Obtiene los permisos definidos para la feature
 * 3️⃣ Verifica si el permiso solicitado está incluido
 *
 * @param role Rol del usuario autenticado
 * @param feature Feature o módulo del sistema
 * @param permission Acción solicitada (READ, CREATE, UPDATE, DELETE)
 *
 * @returns true si el rol tiene el permiso, false en caso contrario
 * =========================================================
 */
export function canAccess(
  role: Role,
  feature: Feature,
  permission: Permission
) {

  /**
   * Obtiene los permisos asociados al rol.
   */
  const rolePermissions = RBAC[role];

  /**
   * Si el rol no tiene configuración definida,
   * se niega el acceso por defecto.
   */
  if (!rolePermissions) return false;

  /**
   * Obtiene los permisos para la feature específica.
   */
  const featurePermissions = rolePermissions[feature];

  /**
   * Si la feature no tiene permisos configurados,
   * se niega el acceso.
   */
  if (!featurePermissions) return false;

  /**
   * Verifica si el permiso solicitado está incluido
   * dentro de los permisos permitidos.
   */
  return featurePermissions.includes(permission);
}