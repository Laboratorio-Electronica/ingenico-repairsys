import mongoose from "mongoose";
import { UserSchema } from "./user.schema";
import { IUser } from "./user.interface";

/**
 * =========================================================
 * User Model
 * ---------------------------------------------------------
 * Modelo de Mongoose para la colección `users`.
 *
 * Este modelo se encarga de:
 * - interactuar con la colección de usuarios
 * - aplicar el esquema de validación definido en UserSchema
 * - evitar recompilación del modelo en entornos como Next.js
 *
 * La condición `mongoose.models.User ||` previene errores
 * cuando el servidor recarga módulos (hot reload).
 * =========================================================
 */
export const User =
  mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema, "users");