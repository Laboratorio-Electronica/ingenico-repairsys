import { z } from "zod";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth/token";
import connectDB from "../db/connectDB";
import { getUserByEmail } from "@/services/users/users.service";

/**
 * LoginSchema
 * --------------------------------------------------
 * Valida el payload de login recibido desde el cliente.
 * Ambos campos son obligatorios.
 */
export const LoginSchema = z.object({
  email: z.string().min(1, "Email cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

/**
 * parseCookies
 * --------------------------------------------------
 * Convierte el header de cookies en un objeto key/value.
 * @param cookieHeader - string del header 'cookie'
 * @returns Record<string, string> de cookies
 */
export const parseCookies = (
  cookieHeader: string | null,
): Record<string, string> =>
  cookieHeader
    ? Object.fromEntries(
        cookieHeader.split(";").map((c) => c.trim().split("=")),
      )
    : {};

/**
 * loginUser
 * --------------------------------------------------
 * Valida las credenciales de un usuario y devuelve
 * un JWT firmado si son correctas.
 *
 * Flujo:
 * 1. Busca el usuario en la lista estática de AUTH_CONFIG.USERS
 * 2. Si no existe → retorna null
 * 3. Valida contraseña usando bcrypt.compareSync contra PASSWORD_HASH
 * 4. Si falla → retorna null
 * 5. Si es correcto → genera token con createToken(username, role)
 *
 * @param username - Nombre de usuario
 * @param password - Contraseña en texto plano
 * @returns token JWT como string | null si falla autenticación
 */

export const loginUser = async (
  email: string,
  password: string,
): Promise<string | null> => {
  try {
    await connectDB();

    const user = await getUserByEmail(email);

    if (!user) return null;
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;

    return createToken(user._id, user.username, user.role);
  } catch (error) {
    return null;
  }
};
