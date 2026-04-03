import { Types } from "mongoose";

export type CalibrationTorqueListDTO = {
  id: string;
  technician: string;
  workstationId: Types.ObjectId;
  screwdriverId: Types.ObjectId;
  modelId: Types.ObjectId;
  torqueSpecId: Types.ObjectId;
  expectedTorque: number;
  appliedTorque: number;
  tolerance: number;
  isCorrect: boolean;
  createdAt: Date;
}