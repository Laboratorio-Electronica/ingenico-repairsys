import { TerminalStatus, TerminalTechnology } from "@/shared/enums";
import { Types } from "mongoose";

export interface ITerminalModel {
  _id: Types.ObjectId;
  code: string;
  technology: TerminalTechnology;
  brand: string;
  status: TerminalStatus;
  createdAt?: Date;
  updatedAt?: Date;
}