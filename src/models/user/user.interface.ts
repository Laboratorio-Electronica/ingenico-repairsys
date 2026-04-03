import { Role } from "@/shared/auth/role.enum";
import { Types } from "mongoose";

/**
 * Representa un usuario dentro del sistema.
 * Se utiliza para tipar documentos de usuario.
 */
export interface IUser {

  /** Identificador del documento */
  _id?: Types.ObjectId;

  /** Nombre de usuario único */
  username: string;

  /** Nombre visible */
  displayName?: string;

  /** Email del usuario */
  email: string;

  /** Hash de contraseña */
  passwordHash: string;

  /** Rol del usuario */
  role: Role;

  /** Organización asociada */
  organizationId?: Types.ObjectId;

  /** Indica si el usuario está activo */
  isActive: boolean;

  /** Intentos fallidos de login */
  loginAttempts?: number;

  /** Fecha hasta la cual está bloqueado */
  lockUntil?: Date;

  /** Versión del token para invalidar sesiones */
  tokenVersion?: number;

  /** Último login exitoso */
  lastLogin?: Date;

  /** Fechas automáticas de mongoose */
  createdAt?: Date;
  updatedAt?: Date;
}