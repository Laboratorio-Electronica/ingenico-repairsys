import { Schema } from "mongoose";
import { IWorkstation } from "./workstation.interface";
import { Area, Status } from "@/shared/enums";

const LocalizedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String }
  }
)

export const WorkstationSchema = new Schema<IWorkstation>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      es: LocalizedSchema,
      en: LocalizedSchema
    },
    area: {
      type: String,
      enum: Object.values(Area),
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    }
  },
  {
    timestamps: true
  }
)