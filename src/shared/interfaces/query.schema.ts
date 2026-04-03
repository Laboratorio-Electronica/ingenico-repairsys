import { LANGUAGES } from "@/lib/i18n/language";
import { z } from "zod";

/**
 * =========================================================
 * Query Schema
 * ---------------------------------------------------------
 * Schema de validación para parámetros de consulta (query)
 * utilizados en endpoints GET de la API.
 *
 * Este schema permite validar y normalizar parámetros
 * comunes utilizados en listados paginados.
 *
 * Parámetros soportados:
 * - limit → cantidad de registros por página
 * - page → número de página
 * - language → idioma de respuesta
 * - search → texto de búsqueda
 *
 * Características:
 * - conversión automática de strings a números
 * - validación de idioma permitido
 * - normalización de búsqueda (trim + empty → undefined)
 *
 * Este schema se utiliza típicamente en:
 * - endpoints de listados
 * - filtros de búsqueda
 * - APIs paginadas
 * =========================================================
 */
export const querySchema = z.object({

  /**
   * Cantidad máxima de registros por página.
   *
   * - convertido automáticamente a número
   * - mínimo permitido: 1
   */
  limit: z.coerce.number().min(1).optional(),

  /**
   * Número de página solicitada.
   *
   * - convertido automáticamente a número
   * - mínimo permitido: 1
   */
  page: z.coerce.number().min(1).optional(),

  /**
   * Idioma solicitado para resolver contenido localizado.
   *
   * Debe existir dentro del enum LANGUAGES.
   */
  language: z.enum(LANGUAGES).optional(),

  /**
   * Texto de búsqueda opcional.
   *
   * Normalización aplicada:
   * - elimina espacios al inicio y final
   * - si queda vacío → undefined
   *
   * Esto evita búsquedas innecesarias con strings vacíos.
   */
  search: z
    .string()
    .optional()
    .transform((val) => {
      const trimmed = val?.trim();
      return trimmed && trimmed.length > 0 ? trimmed : undefined;
    }),
});