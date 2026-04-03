import { isValidObjectId, Types } from "mongoose";
import z from "zod";

export const createTorqueSpecSchema = z.object({
  modelId: z.string().refine(isValidObjectId, { message: "Invalid modelID"}),
  torque: z.number().min(0),
  tolerance: z.number().min(0).max(100),
  minTorque: z.number().min(0),
  maxTorque: z.number().min(0),
  screwType: z.string(),
  use: z.object({
    es: z.string().min(1),
    en: z.string().min(1),
  }),
  order: z.number().min(1),
})

export type CreateTorqueSpecDTO = {
  modelId: Types.ObjectId | string;
  torque: number;
  tolerance: number;
  minTorque: number;
  maxTorque: number;
  screwType: string;
  use: {
    es: string;
    en: string;
  }
  order: number;
}