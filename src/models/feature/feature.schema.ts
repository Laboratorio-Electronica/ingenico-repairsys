import { Schema } from "mongoose";
import { IFeature } from "./feature.interface";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { slugify } from "@/lib/utils/slugify";

/**
 * =========================================================
 * Feature Schema
 * ---------------------------------------------------------
 * Define la estructura de una Feature dentro de la base
 * de datos.
 *
 * Características principales:
 * - Soporte de contenido multilenguaje (es / en)
 * - Slug único utilizado para URLs y búsquedas
 * - Clasificación por dominio funcional
 * - Generación automática de timestamps
 *
 * El slug se genera automáticamente a partir del título
 * si no se proporciona explícitamente.
 * =========================================================
 */
export const FeatureSchema = new Schema<IFeature>(
  {
    /**
     * Slug único de la feature.
     *
     * - Se utiliza para URLs amigables
     * - Se genera automáticamente si no existe
     * - Se almacena en minúsculas
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    /**
     * Contenido localizado de la feature.
     *
     * Cada idioma contiene:
     * - title → nombre corto de la feature
     * - description → explicación breve
     */
    content: {
      es: {
        /** Título de la feature en español */
        title: { type: String, required: true },

        /** Descripción de la feature en español */
        description: { type: String, required: true },
      },

      en: {
        /** Título de la feature en inglés */
        title: { type: String, required: true },

        /** Descripción de la feature en inglés */
        description: { type: String, required: true },
      }
    },

    /**
     * Dominio funcional al que pertenece la feature.
     *
     * Permite agrupar features por áreas del sistema
     * (ej: backend, security, automation, etc.).
     */
    domain: {
      type: String,
      enum: Object.values(FeatureDomain),
      required: true,
    },
  },
  {
    /**
     * Habilita timestamps automáticos:
     *
     * - createdAt
     * - updatedAt
     */
    timestamps: true,
  }
);

/* =========================================================
   Hooks
========================================================= */

/**
 * Pre-validate hook
 *
 * Este hook se ejecuta antes de validar el documento.
 *
 * Función:
 * - Genera automáticamente el slug si no fue definido.
 * - Prioriza el título en inglés.
 * - Si no existe, usa el título en español.
 */
FeatureSchema.pre("validate", function (next) {
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
 * Pre-findOneAndUpdate hook
 *
 * Se ejecuta antes de actualizar un documento con
 * `findOneAndUpdate`.
 *
 * Función:
 * - Detecta cambios en el título.
 * - Regenera el slug automáticamente.
 *
 * Compatible con:
 * - actualizaciones directas
 * - actualizaciones mediante `$set`
 */
FeatureSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  const langSource =
    update?.$set?.content?.en?.title ||
    update?.$set?.content?.es?.title ||
    update?.content?.en?.title ||
    update?.content?.es?.title;

  if (langSource) {
    update.$set = {
      ...(update.$set || {}),
      slug: slugify(langSource),
    };
  }

  next();
});