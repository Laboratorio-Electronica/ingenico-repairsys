import { isValidObjectId, Types } from "mongoose"
import z from "zod"

export const createScrewdriverSchema = z.object({
  serialNumber: z.string().min(1),
  model: z.string().min(1),
  brand: z.string().min(1),
  workstationId: z.string().refine(isValidObjectId, { message: "Invalid workstationId"}),
})

export type CreateScrewdriverDTO = {
  serialNumber: string;
  model: string;
  brand: string;
  workstationId: Types.ObjectId | string;
}