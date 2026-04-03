import { ToolStatus, ToolType } from "@/shared/enums";
import { Types } from "mongoose";

export interface IScrewdriver {
  _id: Types.ObjectId;
  serialNumber: string;
  model: string;
  brand: string;
  workstationId: {
    id: Types.ObjectId;
    code: string;
  };
  status: ToolStatus;
  lastCalibration: Date
  currentTorque: number;
  maxRecordedTorque: number;
  minRecordedTorque: number;
  toolType: ToolType;
  calibrationIntervalDays: number;
  createdAt?: Date;
  updatedAt?: Date;
}