import { Types } from "mongoose";

export interface ITorqueSpec {
  _id: Types.ObjectId;
  modelId: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}