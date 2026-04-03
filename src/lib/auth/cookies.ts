import { cookies } from 'next/headers';
import { AUTH_CONFIG } from './config';

/**
 * Nombre de la cookie utilizada para almacenar
 * el token de autenticación del usuario.
 */
const COOKIE_NAME = 'authToken';

/**
 * =========================================================
 * setAuthToken
 * ---------------------------------------------------------
 * Guarda el token JWT de autenticación en una cookie segura.
 *
 * Configuración de seguridad aplicada:
 * - httpOnly → evita acceso desde JavaScript en el navegador
 * - secure → solo se envía sobre HTTPS en producción
 * - sameSite strict → previene ataques CSRF
 * - path "/" → disponible en toda la aplicación
 * - maxAge → duración definida en AUTH_CONFIG
 *
 * Esta función se usa normalmente después de:
 * - login exitoso
 * - renovación de sesión
 *
 * @param token Token JWT generado para la sesión
 * =========================================================
 */
export async function setAuthToken(token: string) {
  const store = await cookies();

  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: AUTH_CONFIG.TOKEN_EXPIRATION,
  });
}

/**
 * =========================================================
 * deleteAuthToken
 * ---------------------------------------------------------
 * Elimina la cookie de autenticación.
 *
 * Se utiliza principalmente en:
 * - logout del usuario
 * - invalidación de sesión
 *
 * Estrategia:
 * - Se establece la cookie con valor vacío
 * - maxAge = 0 para forzar su expiración inmediata
 *
 * =========================================================
 */
export async function deleteAuthToken() {
  const store = await cookies();

  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}