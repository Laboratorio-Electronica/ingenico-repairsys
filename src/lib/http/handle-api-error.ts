import { NextResponse } from "next/server";
import { AppError } from "@/errors/base/app.error";
import z from "zod";

/**
 * Headers utilizados para evitar almacenamiento en caché
 * de respuestas de error en proxies o navegadores.
 */
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

/**
 * =========================================================
 * handleApiError
 * ---------------------------------------------------------
 * Función utilitaria para manejar errores de forma
 * centralizada en las API Routes de Next.js.
 *
 * Permite estandarizar las respuestas de error y diferenciar
 * entre distintos tipos de excepciones dentro del backend.
 *
 * Tipos de error manejados:
 *
 * 1️⃣ ZodError
 *    - Errores de validación provenientes de schemas Zod.
 *    - Devuelve status HTTP 400 (Bad Request).
 *
 * 2️⃣ AppError
 *    - Errores controlados definidos por la aplicación.
 *    - Devuelve el statusCode especificado en el error.
 *
 * 3️⃣ Error desconocido
 *    - Cualquier excepción no controlada.
 *    - Se registra en consola y devuelve HTTP 500.
 *
 * La respuesta siempre incluye headers `no-store`
 * para evitar cachear respuestas de error.
 *
 * @param error Error capturado en el handler
 * @returns NextResponse con formato de error consistente
 * =========================================================
 */
export function handleApiError(error: unknown): NextResponse {

  /**
   * Manejo de errores de validación generados por Zod.
   *
   * Se extrae el primer campo que generó el error
   * para construir un mensaje más claro.
   */
  if (error instanceof z.ZodError) {
    const firstIssue = error.issues[0];
    const errorField = firstIssue?.path?.[0] ?? "invalid_field";

    return NextResponse.json(
      { error: `Invalid request data (${String(errorField)})` },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  /**
   * Manejo de errores controlados de la aplicación.
   *
   * AppError permite definir errores de dominio
   * con un status HTTP específico.
   */
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode, headers: NO_STORE_HEADERS }
    );
  }

  /**
   * Manejo de errores inesperados.
   *
   * Se registran en consola para diagnóstico
   * y se devuelve una respuesta genérica al cliente.
   */
  console.error("[API ERROR] Unexpected failure", error);

  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500, headers: NO_STORE_HEADERS }
  );
}