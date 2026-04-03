import { ROUTES_LIST } from "@/lib/config/routes.config";
import { PERMISSIONS } from "@/shared/auth/permissions";
import { canAccess } from "./access";
import { Role } from "@/shared/auth/role.enum";

/**
 * =========================================================
 * hasRouteAccess
 * ---------------------------------------------------------
 * Verifica si un usuario con un rol específico puede
 * acceder a una ruta determinada.
 *
 * El control de acceso se basa en:
 * - La configuración de rutas definida en ROUTES_LIST
 * - La feature asociada a la ruta
 * - El sistema de permisos RBAC
 *
 * Flujo de evaluación:
 *
 * 1️⃣ Busca la ruta correspondiente al pathname solicitado
 * 2️⃣ Si la ruta no existe en la configuración → acceso permitido
 * 3️⃣ Si la ruta no tiene feature asociada → acceso permitido
 * 4️⃣ Si tiene feature → valida permisos mediante canAccess
 *
 * @param pathname Ruta solicitada (ej: /dashboard/projects)
 * @param role Rol del usuario autenticado
 * @returns true si el usuario tiene acceso, false si no
 * =========================================================
 */
export function hasRouteAccess(pathname: string, role: Role) {

  /**
   * Busca la configuración de ruta que coincida con el pathname.
   * Se utiliza startsWith para soportar subrutas.
   */
  const route = ROUTES_LIST.find(r =>
    pathname.startsWith(r.path)
  );

  /**
   * Si la ruta no está registrada en la configuración,
   * se permite el acceso por defecto.
   */
  if (!route) return true;

  /**
   * Si la ruta no tiene feature asociada,
   * no requiere verificación de permisos.
   */
  if (!route.feature) return true;

  /**
   * Verifica si el rol tiene permiso de lectura
   * sobre la feature asociada.
   */
  return canAccess(role, route.feature, PERMISSIONS.READ);
}