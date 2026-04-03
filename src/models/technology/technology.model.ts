import mongoose from "mongoose";
import { TechnologySchema } from "./technology.schema";

/**
 * Modelo de Mongoose para la colección de tecnologías.
 * 
 * - Evita redefinir el modelo si ya existe (útil en Next.js con hot-reload)
 * - Usa la colección "technologies" en la base de datos
 */
export const Technology =
  mongoose.models.Technology ||
  mongoose.model("Technology", TechnologySchema, "technologies");
