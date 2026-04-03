import { Permission } from "@/shared/auth/permissions";
import { UserRole } from "./types";

/**
 * Mapeo de roles de usuario a los permisos que tienen.
 * - admin: puede leer, crear, actualizar y eliminar
 * - editor: puede leer, crear y actualizar
 * - viewer: solo puede leer
 */
const rolePermissions: Record<UserRole, Permission[]> = {
  ADMIN: ["READ", "CREATE", "UPDATE", "DELETE"],
  EDITOR: ["READ", "CREATE", "UPDATE"],
  VIEWER: ["READ"],
};

/**
 * Verifica si un rol de usuario tiene un permiso específico.
 * 
 * @param role - Rol del usuario ('admin' | 'editor' | 'viewer')
 * @param permission - Permiso a verificar ('read' | 'create' | 'update' | 'delete')
 * @returns true si el rol tiene el permiso, false si no
 */
export function authorize(
  role: UserRole,
  permission: Permission
): boolean {
  // Obtiene los permisos asignados al rol
  const permissions = rolePermissions[role];

  if (!permissions) return false; // Rol no encontrado, no autorizado

  // Verifica si el permiso solicitado está incluido en la lista de permisos del rol
  return permissions.includes(permission);
}
