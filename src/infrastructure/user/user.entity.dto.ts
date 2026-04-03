import { Role } from "@/shared/auth/role.enum";

/**
 * =========================================================
 * UserEntityDTO
 * ---------------------------------------------------------
 * Data Transfer Object que representa un usuario expuesto
 * hacia el cliente o capas externas de la aplicación.
 *
 * Este DTO define la estructura segura que se devuelve
 * en respuestas de API, evitando exponer información
 * sensible del modelo de base de datos.
 *
 * Campos excluidos deliberadamente:
 * - passwordHash
 * - loginAttempts
 * - tokenVersion
 * - lockUntil
 *
 * Esto ayuda a mantener la seguridad del sistema al no
 * revelar información interna de autenticación.
 * =========================================================
 */
export interface UserEntityDTO {

  /** Identificador único del usuario */
  id: string;

  /** Nombre de usuario utilizado para autenticación */
  username: string;

  /** Nombre visible del usuario (opcional) */
  displayName?: string;

  /** Correo electrónico del usuario */
  email: string;

  /** Rol asignado al usuario dentro del sistema */
  role: Role;

  /** Identificador de la organización asociada (opcional) */
  organizationId?: string;

  /** Indica si la cuenta del usuario está activa */
  isActive: boolean;
}