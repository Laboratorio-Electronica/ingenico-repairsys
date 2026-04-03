import { Schema } from "mongoose";
import { ICategory } from "./category.interface";
import { slugify } from "@/lib/utils/slugify";

/**
 * Schema de Categoría.
 *
 * Características:
 * - Contenido multilenguaje (es, en)
 * - Slug único para URLs y búsquedas
 * - Manejo automático de timestamps
 */
export const CategorySchema = new Schema<ICategory>(
  {
    /**
     * Identificador legible usado en URLs.
     * Se genera automáticamente si no se proporciona.
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    /**
     * Contenido localizado por idioma.
     */
    content: {
      /**
       * Contenido en español.
       */
      es: {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },

      /**
       * Contenido en inglés.
       */
      en: {
        title: { type: String, required: true },
        description: { type: String,required: true }
      },
    },
  },
  {
    /**
     * Habilita createdAt y updatedAt automáticamente.
     */
    timestamps: true,
  }
);

/* =========================
   Hooks
========================= */

/**
 * Hook pre-validate
 *
 * Responsabilidad:
 * - Generar automáticamente el slug si no existe
 * - Prioriza el título en inglés, con fallback a español
 */
CategorySchema.pre("validate", function (next) {
  if (!this.slug) {
    const source =
      this.content.en?.title || this.content.es?.title;

    if (source) {
      this.slug = slugify(source);
    }
  }
  next();
});

/**
 * Hook pre-findOneAndUpdate
 *
 * Responsabilidad:
 * - Regenerar el slug cuando cambia el título
 * - Compatible con updates directos y con $set
 */
CategorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  const langSource =
    update?.content.$set?.en?.title ||
    update?.content.$set?.es?.title ||
    update?.content.en?.title ||
    update?.content.es?.title;

  if (langSource) {
    update.$set = {
      ...(update.content.$set || {}),
      slug: slugify(langSource),
    };
  }

  next();
});
