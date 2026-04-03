/**
 * Escapa caracteres especiales de expresiones regulares en una cadena.
 * Esto evita que caracteres como ".", "*", "?" o "[" se interpreten
 * como parte de la sintaxis de regex al construir patrones dinámicos.
 *
 * @param input - Cadena que será usada en un regex
 * @returns Cadena segura para usar en un regex literal
 *
 * @example
 * const userInput = "hello.*";
 * const safeInput = sanitizeRegex(userInput);
 * // safeInput === "hello\.\*"
 */
export function sanitizeRegex(input: string): string {
  // Reemplaza todos los caracteres especiales de regex por su versión escapada
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
