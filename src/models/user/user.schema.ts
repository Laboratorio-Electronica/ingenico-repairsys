import { Schema } from "mongoose";
import { IUser } from "./user.interface";
import { Role } from "@/shared/auth/role.enum";

/**
 * =========================================================
 * User Schema
 * ---------------------------------------------------------
 * Define la estructura del documento User en MongoDB.
 *
 * Responsabilidades:
 * - validar estructura de datos
 * - aplicar restricciones (required, unique, enum)
 * - definir defaults
 * - gestionar timestamps
 *
 * Este modelo representa usuarios del sistema
 * utilizados para autenticación y autorización.
 * =========================================================
 */
export const UserSchema = new Schema<IUser>(
  {
    /**
     * Nombre de usuario único.
     * Se utiliza para autenticación.
     */
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    /**
     * Nombre visible del usuario.
     */
    displayName: {
      type: String,
      trim: true
    },

    /**
     * Email del usuario.
     * Debe ser único dentro del sistema.
     */
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /\S+@\S+\.\S+/
    },

    /**
     * Hash de contraseña generado con bcrypt.
     */
    passwordHash: {
      type: String,
      required: true,
      // select: false
    },

    /**
     * Rol del usuario para RBAC.
     */
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.VIEWER,
      required: true
    },

    /**
     * Organización asociada al usuario.
     */
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization"
    },

    /**
     * Indica si el usuario está activo.
     */
    isActive: {
      type: Boolean,
      default: true
    },

    /**
     * Contador de intentos fallidos de login.
     */
    loginAttempts: {
      type: Number,
      default: 0
    },

    /**
     * Fecha hasta la cual la cuenta está bloqueada.
     */
    lockUntil: {
      type: Date
    },

    /**
     * Versión del token JWT.
     * Permite invalidar sesiones activas.
     */
    tokenVersion: {
      type: Number,
      default: 0
    },

    /**
     * Fecha del último login exitoso.
     */
    lastLogin: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);