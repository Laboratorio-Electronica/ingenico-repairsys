import { Area, Status } from "@/shared/enums";
import { Types } from "mongoose";

interface LocalizedContent {
  name: string;
  description: string;
}

export interface IWorkstation {
  _id: Types.ObjectId;
  code: string;
  content: {
    es: LocalizedContent;
    en: LocalizedContent;
  };
  area: Area;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}