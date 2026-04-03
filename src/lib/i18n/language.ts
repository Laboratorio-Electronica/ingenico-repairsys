/**
 * =========================================================
 * Supported Languages
 * ---------------------------------------------------------
 * Fuente única de verdad para los idiomas soportados
 * por el sistema.
 *
 * Uso:
 * - Validaciones
 * - DTOs
 * - Hooks de traducción
 * - Props tipadas
 *
 * La palabra clave `as const` asegura:
 * - Valores inmutables.
 * - Tipado literal exacto ("es" | "en").
 * =========================================================
 */
export const LANGUAGES = {
  ES: 'es',
  EN: 'en',
} as const;

/**
 * =========================================================
 * Language (Type)
 * ---------------------------------------------------------
 * Tipo unión derivado automáticamente de LANGUAGES.
 *
 * Resultado:
 *   "es" | "en"
 *
 * Beneficios:
 * - Evita strings mágicos.
 * - Mantiene sincronización automática con LANGUAGES.
 * - Si agregas un nuevo idioma, el tipo se actualiza solo.
 * =========================================================
 */
export type Language =
  (typeof LANGUAGES)[keyof typeof LANGUAGES];