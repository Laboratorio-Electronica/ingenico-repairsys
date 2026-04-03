import { UserDocument } from "@/models/user/user.document";
import { UserEntityDTO } from "./user.entity.dto";

/**
 * =========================================================
 * toUserEntityDTO
 * ---------------------------------------------------------
 * Convierte un documento de usuario proveniente de la base
 * de datos (UserDocument) en un DTO seguro para exposición
 * hacia el cliente o capas externas del sistema.
 *
 * Responsabilidades:
 * - Transformar el documento de MongoDB en un formato plano
 * - Convertir ObjectIds a string
 * - Exponer únicamente información segura del usuario
 *
 * Campos sensibles que NO se incluyen:
 * - passwordHash
 * - loginAttempts
 * - tokenVersion
 * - lockUntil
 *
 * Esto evita fugas de información interna del sistema
 * de autenticación.
 *
 * @param user Documento de usuario obtenido desde MongoDB
 * @returns UserEntityDTO con datos seguros del usuario
 * =========================================================
 */
export function toUserEntityDTO(
  user: UserDocument
): UserEntityDTO {
  return {

    /** Identificador único del usuario */
    id: user._id.toString(),

    /** Nombre de usuario */
    username: user.username,

    /** Nombre visible del usuario */
    displayName: user.displayName,

    /** Correo electrónico */
    email: user.email,

    /** Rol del usuario dentro del sistema */
    role: user.role,

    /** Organización asociada al usuario */
    organizationId: user.organizationId?.toString(),

    /** Indica si la cuenta está activa */
    isActive: user.isActive
  };
}