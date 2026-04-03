import { Types } from "mongoose";

export type TorqueSpecListDTO = {
  id: string;
  modelId: Types.ObjectId;
  torque: number;
  tolerance: number;
  minTorque: number;
  maxTorque: number;
  use: string;
  screwType: string;
}