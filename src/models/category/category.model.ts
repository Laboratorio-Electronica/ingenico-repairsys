import mongoose from "mongoose";
import { CategorySchema } from "./category.schema";

/**
 * Modelo Mongoose para la entidad Category.
 *
 * Responsabilidades:
 * - Define el punto de acceso al collection `categories`
 * - Reutiliza el modelo existente si ya fue registrado
 *   (previene errores de redefinición en hot-reload de Next.js)
 *
 * Notas:
 * - El tercer parámetro fuerza el nombre de la colección en MongoDB
 * - `mongoose.models.Category` se usa como cache interno del runtime
 */
export const Category =
  mongoose.models.Category ||
  mongoose.model("Category", CategorySchema, "categories");
