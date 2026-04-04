import { CaptureMethod } from "@/shared/enums/capture-method";
import { isValidObjectId, Types } from "mongoose";
import z from "zod";

export const createCalibrationTorqueSchema = z.object({
  technicianId: z.string().refine(isValidObjectId, {
    message: "Invalid technicianId",
  }),

  workstationId: z.string().refine(isValidObjectId, {
    message: "Invalid workstationId",
  }),

  screwdriverId: z.string().refine(isValidObjectId, {
    message: "Invalid screwdriverId",
  }),

  modelId: z.string().refine(isValidObjectId, {
    message: "Invalid modelId",
  }),

  torqueSpecId: z.string().refine(isValidObjectId, {
    message: "Invalid torqueSpecId",
  }),

  expectedTorque: z.number().min(0),
  appliedTorque: z.number().min(0),

  tolerance: z.number().min(0).max(100),

  captureMethod: z.enum(CaptureMethod),

  observations: z.string().optional(),
});

export type CreateCalibrationTorqueDTO = {
  technicianId: Types.ObjectId | string;

  workstationId: Types.ObjectId | string;
  screwdriverId: Types.ObjectId | string;
  modelId: Types.ObjectId | string;
  torqueSpecId: Types.ObjectId | string;

  expectedTorque: number;
  appliedTorque: number;
  tolerance: number;

  captureMethod: CaptureMethod;

  observations?: string;
};

export type CreateCalibrationTorqueDB = CreateCalibrationTorqueDTO & {
  diff: number;
  diffPercentage: number;
  // isCorrect: boolean;

  technicianSnapshot?: {
    username: string;
  };

  screwdriverSnapshot?: {
    serialNumber: string;
    model: string;
  };

  workstationSnapshot?: {
    code: string;
  };

  modelSnapshot?: {
    code: string;
  };
};

// import { isValidObjectId, Types } from "mongoose";
// import z from "zod";

// export const createCalibrationTorqueSchema = z.object({
//   technician: z.string().min(1),
//   workstationId: z.string().refine(isValidObjectId, { message: "Invalid workstationId"}),
//   screwdriverId: z.string().refine(isValidObjectId, { message: "Invalid screwdriverId"}),
//   modelId: z.string().refine(isValidObjectId, { message: "Invalid modelId"}),
//   torqueSpecId: z.string().refine(isValidObjectId, { message: "Invalid torqueSpecId"}),
//   expectedTorque: z.number().min(0),
//   appliedTorque: z.number().min(0),
//   tolerance: z.number().min(0).max(100),
//   isCorrect: z.boolean(),
//   observations: z.string().optional(),
// })

// export type CreateCalibrationTorqueDTO = {
//   technician: string;
//   workstationId: Types.ObjectId | string;
//   screwdriverId: Types.ObjectId | string;
//   modelId: Types.ObjectId | string;
//   torqueSpecId: Types.ObjectId | string;
//   expectedTorque: number;
//   appliedTorque: number;
//   tolerance: number;
//   isCorrect: boolean;
//   observations?: string;
// }