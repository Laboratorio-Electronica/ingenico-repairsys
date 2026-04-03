import { isValidObjectId, Types } from "mongoose";
import z from "zod";

export const createCalibrationTorqueSchema = z.object({
  technician: z.string().min(1),
  workstationId: z.string().refine(isValidObjectId, { message: "Invalid workstationId"}),
  screwdriverId: z.string().refine(isValidObjectId, { message: "Invalid screwdriverId"}),
  modelId: z.string().refine(isValidObjectId, { message: "Invalid modelId"}),
  torqueSpecId: z.string().refine(isValidObjectId, { message: "Invalid torqueSpecId"}),
  expectedTorque: z.number().min(0),
  appliedTorque: z.number().min(0),
  tolerance: z.number().min(0).max(100),
  isCorrect: z.boolean(),
  observations: z.string().optional(),
})

export type CreateCalibrationTorqueDTO = {
  technician: string;
  workstationId: Types.ObjectId | string;
  screwdriverId: Types.ObjectId | string;
  modelId: Types.ObjectId | string;
  torqueSpecId: Types.ObjectId | string;
  expectedTorque: number;
  appliedTorque: number;
  tolerance: number;
  isCorrect: boolean;
  observations?: string;
}