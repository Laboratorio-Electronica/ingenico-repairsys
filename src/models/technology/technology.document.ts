import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { Document } from "mongoose";

/**
 * Representa el documento de Tecnología tal como existe en MongoDB.
 *
 * Extiende de `Document` de Mongoose para incluir:
 * - Propiedades propias del modelo.
 * - Métodos internos de Mongoose.
 * - Campos automáticos como `_id`.
 *
 * Este tipo se usa en la capa de persistencia
 * (modelo / repositorio), no como DTO público.
 */
export interface TechnologyDocument extends Document {
  /** Nombre de la tecnología */
  name: string;

  /** Slug único generado a partir del nombre */
  slug: string;

  /**
   * Categoría asociada.
   * Puede estar populada (objeto con slug)
   * dependiendo de la consulta.
   */
  categoryId: {
    slug: string;
  };

  /** URL del ícono */
  iconUrl?: string;

  /** URL del sitio web oficial */
  websiteUrl?: string;

  /** Nivel de experiencia asociado */
  experienceLevel: ExperienceLevel;

  /** Fecha de creación (timestamp automático) */
  createdAt: Date;

  /** Fecha de última actualización (timestamp automático) */
  updatedAt: Date;
}
