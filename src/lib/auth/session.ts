import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifyToken, SessionPayload } from "./token";

/**
 * =========================================================
 * isValidSessionPayload
 * ---------------------------------------------------------
 * Type guard que valida que el payload decodificado del
 * JWT tenga la estructura esperada para una sesión.
 *
 * Se utiliza como verificación adicional después de
 * validar el token para evitar estructuras inválidas.
 *
 * @param payload Payload decodificado del token
 * @returns true si cumple la estructura de SessionPayload
 * =========================================================
 */
function isValidSessionPayload(
  payload: unknown
): payload is SessionPayload {

  /** Verifica que el payload exista y sea un objeto */
  if (!payload || typeof payload !== "object") return false;

  const p = payload as Record<string, unknown>;

  /** Validación mínima de campos esperados */
  if (typeof p.role !== "string") return false;
  if (typeof p.username !== "string") return false;

  return true;
}

/**
 * =========================================================
 * getSession
 * ---------------------------------------------------------
 * Obtiene la sesión del usuario a partir del token
 * almacenado en cookies.
 *
 * Flujo de ejecución:
 *
 * 1️⃣ Obtiene el token desde cookies
 * 2️⃣ Verifica el JWT mediante `verifyToken`
 * 3️⃣ Valida la estructura del payload
 * 4️⃣ Devuelve la sesión si es válida
 *
 * Si ocurre algún error o el token no es válido,
 * retorna `null`.
 *
 * Soporta dos contextos:
 * - Request directa (`NextRequest`)
 * - Server Components / Server Actions (`cookies()`)
 *
 * @param req Request opcional de Next.js
 * @returns SessionPayload válido o null
 * =========================================================
 */
export async function getSession(
  req?: NextRequest
): Promise<SessionPayload | null> {
  try {

    /**
     * Obtiene el store de cookies.
     * - Si se recibe request → usa req.cookies
     * - Si no → usa cookies() de Next.js
     */
    const store = req ? req.cookies : await cookies();

    /**
     * Obtiene el token de autenticación.
     */
    const token = store.get("authToken")?.value;

    /** Si no existe token no hay sesión */
    if (!token) return null;

    /**
     * Verifica el token JWT.
     */
    const payload = await verifyToken(token);

    /**
     * Verifica que el payload tenga la estructura correcta.
     */
    if (!isValidSessionPayload(payload)) {
      return null;
    }

    /** Devuelve la sesión validada */
    return payload;

  } catch (error) {

    /**
     * Manejo de errores en token inválido,
     * expirado o corrupto.
     */
    console.error("[AUTH] Invalid session token");

    return null;
  }
}