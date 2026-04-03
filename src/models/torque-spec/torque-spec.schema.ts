import { Schema } from "mongoose";
import { ITorqueSpec } from "./torque-spec.interface";
import { number } from "zod";

export const TorqueSpecSchema = new Schema<ITorqueSpec>(
  {
    modelId: {
      type: Schema.Types.ObjectId,
      ref: "terminalModel"
    },
    torque: {
      type: Number,
    },
    tolerance: {
      type: Number,
    },
    minTorque: {
      type: Number,
    },
    maxTorque: {
      type: Number,
    },
    screwType: {
      type: String,
    },
    use: {
      es: {
        type: String,
      },
      en: {
        type: String,
      },
    },
    order: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)