import { ToolStatus } from "@/shared/enums";
import { ScrewdriverListDTO } from "./screwdriver.list.dto";

export interface ScrewdriverDetailDTO extends ScrewdriverListDTO {
  status: ToolStatus;
  // currentTorque: number;
  maxRecordedTorque: number;
  minRecordedTorque: number;
  // lastCalibration: Date;
}