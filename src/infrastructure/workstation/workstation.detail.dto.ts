import { Area, Status } from "@/shared/enums";
import { WorkstationListDTO } from "./workstation.list.dto";

export interface WorkstationDetailDTO extends WorkstationListDTO {
  description: string;
  area: Area;
  status: Status;
}