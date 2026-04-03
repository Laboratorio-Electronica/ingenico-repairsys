/**
 * Convierte un string en un slug URL-safe.
 * - Minúsculas
 * - Sin acentos
 * - Sin símbolos
 * - Espacios normalizados a "-"
 */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")                 // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9\s-]/g, "")    // elimina símbolos
    .replace(/\s+/g, "-")            // espacios → "-"
    .replace(/-+/g, "-");            // evita "--"
}
