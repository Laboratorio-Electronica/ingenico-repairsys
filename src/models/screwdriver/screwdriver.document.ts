import { Types } from "mongoose";
import { IScrewdriver } from "./screwdriver.interface";

export interface ScrewdriverDocument extends IScrewdriver, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updateAt: Date;
}