import { ToolType } from "@/shared/enums";
import { Types } from "mongoose";

export type ScrewdriverListDTO = {
  id: string;
  serialNumber: string;
  model: string;
  brand: string;
  workstationId: {
    id: Types.ObjectId,
    code: string,
  };
  toolType: ToolType;
  lastCalibration: Date;
  currentTorque: number;
}