import jwt, { JwtPayload } from "jsonwebtoken";
import { AUTH_CONFIG, JWT_SECRET } from "./config";
import { z } from "zod";
import { UserRole } from "./types";
import { Role } from "@/shared/auth/role.enum";

/**
 * Validación de seguridad para el secreto JWT.
 *
 * Garantiza que el secreto exista y tenga una longitud
 * mínima segura para firmar tokens.
 */
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET is not properly configured");
}

/**
 * Schema que valida la estructura del payload del JWT.
 *
 * Este schema asegura que el token contenga:
 * - userId
 * - username
 * - role válido
 *
 * Se utiliza al verificar el token para garantizar
 * integridad del payload.
 */
const SessionPayloadSchema = z.object({
  userId: z.string().min(1),
  username: z.string().min(1),
  role: z.enum(Role),
});

/**
 * Tipo TypeScript derivado del schema de sesión.
 *
 * Representa la estructura confiable del payload
 * una vez validado.
 */
export type SessionPayload = z.infer<typeof SessionPayloadSchema>;

/**
 * =========================================================
 * createToken
 * ---------------------------------------------------------
 * Genera un JWT firmado con la información de sesión
 * del usuario.
 *
 * El token incluye:
 * - userId
 * - username
 * - role
 *
 * Configuración de seguridad:
 * - algoritmo HS256
 * - expiración definida en AUTH_CONFIG
 * - issuer definido
 * - audience definida
 *
 * @param userId Identificador del usuario
 * @param username Nombre del usuario
 * @param role Rol del usuario
 * @returns Token JWT firmado
 * =========================================================
 */
export function createToken(
  userId: string,
  username: string,
  role: UserRole
): string {
  return jwt.sign(
    { userId, username, role },
    JWT_SECRET,
    {
      expiresIn: AUTH_CONFIG.TOKEN_EXPIRATION,
      algorithm: "HS256",
      issuer: "auth",
      audience: "api",
    }
  );
}

/**
 * =========================================================
 * verifyToken
 * ---------------------------------------------------------
 * Verifica la validez de un JWT recibido.
 *
 * Validaciones aplicadas:
 * - firma criptográfica
 * - algoritmo permitido
 * - issuer
 * - audience
 *
 * Posteriormente valida el payload utilizando
 * el schema de Zod para asegurar que la estructura
 * del token sea correcta.
 *
 * @param token Token JWT recibido
 * @returns Payload validado de la sesión
 * =========================================================
 */
export function verifyToken(token: string): SessionPayload {
  const decoded = jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"],
    issuer: "auth",
    audience: "api",
  }) as JwtPayload;

  return SessionPayloadSchema.parse(decoded);
}