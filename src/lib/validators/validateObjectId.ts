/**
 * Valida que un string sea un ObjectId válido de MongoDB.
 * 
 * MongoDB ObjectIds tienen 24 caracteres hexadecimales.
 * 
 * @param id - String a validar
 * @throws Error si el string no es un ObjectId válido
 * @returns true si es válido
 *
 * @example
 * validateObjectId("64f0c1a2b3d4e5f678901234"); // true
 */
export function validateObjectId(id: string) {
  // Regex que verifica 24 caracteres hexadecimales
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid ObjectId");
  }
  return true;
}
