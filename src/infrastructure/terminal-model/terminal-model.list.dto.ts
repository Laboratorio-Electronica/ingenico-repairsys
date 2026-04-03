import { TerminalTechnology } from "@/shared/enums";
import { Types } from "mongoose"

export type TerminalModelListDTO = {
  id: Types.ObjectId;
  code: string;
  technology: TerminalTechnology;
  brand: string;
}