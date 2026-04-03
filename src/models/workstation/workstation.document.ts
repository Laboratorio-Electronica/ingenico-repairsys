import { Types } from "mongoose";
import { IWorkstation } from "./workstation.interface";

export interface WorkstationDocument extends IWorkstation, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updateAt: Date;
}