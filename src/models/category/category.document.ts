import { Document } from "mongoose";

/**
 * Información localizada de una categoría.
 *
 * Permite almacenar contenido en distintos idiomas.
 */
interface LocalizedCategoryInfo {
  /** Título visible de la categoría */
  title: string;

  /** Descripción detallada de la categoría */
  description: string;
}

/**
 * Documento de Categoría en MongoDB.
 *
 * Extiende de `Document` de Mongoose e incluye:
 * - Contenido multilenguaje (es, en).
 * - Campos automáticos de timestamps.
 *
 * Este tipo se usa en la capa de persistencia,
 * no como DTO público.
 */
export interface CategoryDocument extends Document {
  /**
   * Contenido localizado por idioma.
   *
   * Cada clave representa un idioma soportado.
   */
  content: {
    es: LocalizedCategoryInfo;
    en: LocalizedCategoryInfo;
  };

  /** Fecha de creación */
  createdAt: Date;

  /** Fecha de última actualización */
  updatedAt: Date;
}
