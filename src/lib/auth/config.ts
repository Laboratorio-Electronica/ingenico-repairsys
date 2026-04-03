import { AuthUser } from "./types";

/**
 * =========================================================
 * Environment Validation
 * ---------------------------------------------------------
 * Validaciones críticas de variables de entorno necesarias
 * para el sistema de autenticación.
 *
 * Si alguna de estas variables no está definida o no cumple
 * los requisitos de seguridad, el proceso se detiene al
 * iniciar la aplicación.
 * =========================================================
 */

/**
 * Hash de contraseña global utilizado para validar
 * autenticación de usuarios estáticos.
 */
if (!process.env.PASSWORD_HASH)
  throw new Error("PASSWORD_HASH not set");

/**
 * Secreto utilizado para firmar y verificar tokens JWT.
 */
if (!process.env.JWT_SECRET)
  throw new Error("JWT_SECRET not set");

/**
 * Validación de seguridad mínima del secreto JWT.
 * Se recomienda al menos 32 caracteres para evitar
 * ataques de fuerza bruta.
 */
if (process.env.JWT_SECRET.length < 32)
  throw new Error("JWT_SECRET must be at least 32 characters long");

/**
 * =========================================================
 * Static Users
 * ---------------------------------------------------------
 * Lista tipada de usuarios autenticados definidos
 * estáticamente (por ejemplo desde variables de entorno).
 *
 * Este array puede ser llenado durante la inicialización
 * de la aplicación al parsear configuraciones externas.
 * =========================================================
 */
let parsedUsers: AuthUser[] = [];

/**
 * =========================================================
 * Authentication Configuration
 * ---------------------------------------------------------
 * Configuración central del módulo de autenticación.
 *
 * Incluye:
 * - Nombre de la cookie de sesión
 * - Tiempo de expiración del token
 * - Lista de usuarios permitidos
 * - Hash de contraseña global
 *
 * Esta configuración se utiliza en múltiples partes
 * del sistema de autenticación.
 * =========================================================
 */
export const AUTH_CONFIG = {

  /** Nombre de la cookie donde se almacena el JWT */
  COOKIE_NAME: "authToken",

  /** Tiempo de expiración del token en segundos (1 hora) */
  TOKEN_EXPIRATION: 60 * 60 * 24,

  /** Lista de usuarios estáticos permitidos */
  USERS: parsedUsers,

  /** Hash de contraseña global para autenticación */
  PASSWORD_HASH: process.env.PASSWORD_HASH,
};

/**
 * =========================================================
 * JWT Secret
 * ---------------------------------------------------------
 * Secreto utilizado para:
 * - Firmar tokens JWT
 * - Verificar tokens JWT
 *
 * Este valor debe mantenerse seguro y nunca exponerse
 * en el cliente.
 * =========================================================
 */
export const JWT_SECRET: string = process.env.JWT_SECRET;