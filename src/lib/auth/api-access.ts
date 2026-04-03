import { Role } from "@/shared/auth/role.enum";

/**
 * =========================================================
 * API Permissions Configuration
 * ---------------------------------------------------------
 * Define qué roles pueden acceder a determinados
 * endpoints de la API.
 *
 * Estructura:
 *
 * Route → Roles permitidos
 *
 * Este objeto se utiliza para validar acceso a rutas
 * sensibles de la API dentro de middleware o handlers.
 * =========================================================
 */
export const API_PERMISSIONS: Record<string, Role[]> = {

  /**
   * Gestión de usuarios.
   * Solo administradores pueden acceder.
   */
  '/api/v1/users': [Role.ADMIN],

  /**
   * Gestión de proyectos.
   * Administradores y editores pueden acceder.
   */
  '/api/v1/workstations': [Role.ADMIN, Role.EDITOR],
};

/**
 * =========================================================
 * hasApiAccess
 * ---------------------------------------------------------
 * Verifica si un usuario con determinado rol tiene
 * acceso a un endpoint de la API.
 *
 * Flujo de evaluación:
 *
 * 1️⃣ Busca si la ruta solicitada coincide con alguna
 *    configuración definida en API_PERMISSIONS.
 *
 * 2️⃣ Si no existe configuración para la ruta → acceso permitido.
 *
 * 3️⃣ Si existe configuración → valida si el rol del usuario
 *    está incluido en la lista de roles permitidos.
 *
 * @param pathname Ruta de la API solicitada
 * @param role Rol del usuario autenticado
 * @returns true si el rol tiene acceso, false si no
 * =========================================================
 */
export function hasApiAccess(pathname: string, role: Role) {

  /**
   * Busca la regla de permisos que coincida con el pathname.
   * Se utiliza startsWith para soportar subrutas.
   */
  const entry = Object.entries(API_PERMISSIONS)
    .find(([route]) => pathname.startsWith(route));

  /**
   * Si la ruta no tiene configuración específica
   * se permite el acceso por defecto.
   */
  if (!entry) return true;

  const [, roles] = entry;

  /**
   * Verifica si el rol del usuario está dentro
   * de los roles permitidos.
   */
  return roles.includes(role);
}