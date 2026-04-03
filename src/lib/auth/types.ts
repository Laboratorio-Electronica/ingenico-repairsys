// import { RolePermission } from "@/shared/auth/role.enum";

import { Role } from "@/shared/auth/role.enum";

/**
 * UserRole
 * --------------------------------------------------
 * Define los roles posibles en el sistema.
 * Se utiliza en el RBAC y para tipado de JWT.
 */
export type UserRole = Role;

/**
 * AuthUser
 * --------------------------------------------------
 * Representa un usuario autenticable en el sistema.
 *
 * @property username - Nombre de usuario único
 * @property role - Rol asignado al usuario (UserRole)
 */
export type AuthUser = {
  username: string;
  role: UserRole;
};
