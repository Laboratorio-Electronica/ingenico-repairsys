// Validaciones específicas del servidor (de modelos o entradas).
// userValidator.ts, projectSchema.ts

import { z } from "zod";

export const urlValidator = z.string().url("Must be a valid URL");

export const nonEmptyString = (field: string) =>
  z.string().min(1, `${field} is required`);