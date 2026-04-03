import mongoose from "mongoose";
import { FeatureSchema } from "./feature.schema";

/**
 * Modelo Feature.
 *
 * - Reutiliza el modelo si ya existe para evitar errores
 *   durante el hot-reload en Next.js
 * - Usa explícitamente la colección "features"
 * - Vincula el FeatureSchema con Mongoose
 */
export const Feature =
  mongoose.models.Feature ||
  mongoose.model("Feature", FeatureSchema, "features");
