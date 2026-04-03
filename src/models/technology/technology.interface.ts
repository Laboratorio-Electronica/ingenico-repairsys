import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { Types } from "mongoose";

/**
 * Representa la estructura base de una tecnología.
 * Se usa para tipado del schema y contratos internos.
 */
export interface ITechnology {
  /** Identificador MongoDB (ObjectId o string) */
  _id: Types.ObjectId | string;

  /** Nombre de la tecnología */
  name: string;

  /** Slug único legible para URLs */
  slug: string;

  /** Identificador de la categoría asociada */
  categoryId: Types.ObjectId | string;

  /** URL del icono de la tecnología (opcional) */
  iconUrl?: string;

  /** URL del sitio web de la tecnología (opcional) */
  websiteUrl?: string;

  /** Nivel de experiencia requerido o alcanzado */
  experienceLevel: ExperienceLevel;

  /** Fecha de creación (opcional, generada por el schema) */
  createdAt?: Date;

  /** Fecha de última actualización (opcional, generada por el schema) */
  updatedAt?: Date;
}
