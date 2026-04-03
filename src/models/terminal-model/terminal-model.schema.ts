import { Schema } from "mongoose";
import { ITerminalModel } from "./terminal-model.interface";
import { TerminalStatus, TerminalTechnology } from "@/shared/enums";

export const TerminalModelSchema = new Schema<ITerminalModel>(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    technology: {
      type: String,
      enum: Object.values(TerminalTechnology)
    },
    brand: {
      type: String,
      default: "Ingenico"
    },
    status: {
      type: String,
      enum: Object.values(TerminalStatus),
      default: TerminalStatus.ACTIVE
    }
  }
)