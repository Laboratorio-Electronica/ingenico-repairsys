import mongoose from "mongoose";
import { SuccessCaseSchema } from "./success-case.schema";

/**
 * SuccessCase Model
 *
 * Este patrón evita el error `OverwriteModelError` en entornos con hot-reload
 * (por ejemplo: Next.js, serverless o desarrollo local).
 *
 * - Si el modelo ya fue compilado por Mongoose, reutiliza la instancia existente.
 * - Si no existe, crea el modelo usando:
 *    - "SuccessCase" como nombre interno del modelo
 *    - SuccessCaseSchema como esquema
 *    - "successCases" como nombre explícito de la colección en MongoDB
 *
 * Especificar el nombre de la colección evita la pluralización automática.
 */
export const SuccessCase =
  mongoose.models.SuccessCase ||
  mongoose.model("SuccessCase", SuccessCaseSchema, "successCases");
