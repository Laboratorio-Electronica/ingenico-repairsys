import { Schema } from "mongoose";
import { ITechnology } from "./technology.interface";
import { slugify } from "@/lib/utils/slugify";
import { ExperienceLevel } from "@/shared/enums/experience-level.enum";

/**
 * Schema de Mongoose para la colección de tecnologías.
 * 
 * Define la estructura de documentos, validaciones y hooks:
 * - `name`: Nombre de la tecnología (único y obligatorio)
 * - `slug`: Identificador legible para URLs, generado automáticamente si no se proporciona
 * - `categoryId`: Referencia a la categoría asociada (FK)
 * - `iconUrl`: URL del ícono opcional
 * - `websiteUrl`: URL del sitio web opcional
 * - `experienceLevel`: Nivel de experiencia requerido, enum
 * - Timestamps automáticos (`createdAt`, `updatedAt`)
 * 
 * Hooks:
 * - `pre-validate`: genera el slug a partir del nombre si no existe
 * - `pre-findOneAndUpdate`: actualiza el slug cuando se cambia el nombre
 */
export const TechnologySchema = new Schema<ITechnology>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    iconUrl: {
      type: String,
      trim: true,
    },

    websiteUrl: {
      type: String,
      trim: true,
    },

    experienceLevel: {
      type: String,
      enum: Object.values(ExperienceLevel),
      required: true,
    }
  },
  { timestamps: true }
);

/* =========================
  Hooks
========================= */

/**
 * Pre-validate hook
 * - Genera el slug automáticamente si no fue enviado
 * - Se basa en el campo `name`
 */
TechnologySchema.pre("validate", function (next) {
  if (!this.slug) {
    const source = this.name;

    if (source) {
      this.slug = slugify(source);
    }
  }
  next();
});

/**
 * Pre-findOneAndUpdate hook
 * - Regenera el slug cuando cambia el nombre
 * - Compatible con updates que usan `$set` o directamente el objeto
 */
TechnologySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  update.$set = {
    ...(update.$set || {}),
    slug: slugify(update.name),
  };

  next();
});
