// import Technology from "@/models/technology/technology.model";

import { Technology } from "@/models/technology/technology.model";

/**
 * Convierte un título a un slug URL-friendly.
 * @param title Título del proyecto.
 * @returns Slug generado.
 */
export function createSlugFromTitle(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, "-");
}

/**
 * Busca la categoría de una tecnología por nombre.
 * @param name Nombre de la tecnología.
 * @returns Categoría asociada o null si no existe.
 */
async function getCategoryByTechnologyName(name: string): Promise<string | null> {
  try {
    const tech = await Technology.findOne({ name });
    return tech?.category ?? null;
  } catch (error) {
    console.warn(`Error finding category for technology: ${name}`, error);
    return null;
  }
}

/**
 * Mapea una lista de tecnologías a sus categorías correspondientes.
 * @param technologies Lista de tecnologías (nombres).
 * @returns Lista de categorías sin valores nulos.
 */
export async function getCategoriesFromTechnologies(technologies: string[]): Promise<string[]> {
  const categories = await Promise.all(technologies.map(getCategoryByTechnologyName));
  return categories.filter(Boolean) as string[];
}
