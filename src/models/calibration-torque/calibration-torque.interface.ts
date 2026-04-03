import { Types } from "mongoose"

export interface ICalibrationTorque {
  _id: Types.ObjectId;
  technician: string
  workstationId: Types.ObjectId;
  screwdriverId: Types.ObjectId;
  modelId: Types.ObjectId;
  torqueSpecId: Types.ObjectId;
  expectedTorque: number
  appliedTorque: number
  tolerance: number
  isCorrect: boolean
  observations?: string
  createdAt: Date
  updatedAt: Date
}