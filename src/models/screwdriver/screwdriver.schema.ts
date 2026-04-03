import { Schema } from "mongoose";
import { IScrewdriver } from "./screwdriver.interface";
import { ToolStatus, ToolType } from "@/shared/enums";

export const ScrewdriverSchema = new Schema<IScrewdriver>(
  {
    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },
    model: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true,
    },
    workstationId: {
      type: Schema.Types.ObjectId,
      ref: "Workstation",
    },
    status: {
      type: String,
      enum: Object.values(ToolStatus),
      default: ToolStatus.ACTIVE,
    },
    lastCalibration: { type: Date },
    currentTorque: {
      type: Number,
      default: 0,
    },
    maxRecordedTorque: {
      type: Number,
      default: 0
    },
    minRecordedTorque: {
      type: Number,
      default: 0,
    },
    toolType: {
      type: String,
      enum: Object.values(ToolType),
      default: ToolType.ELECTRIC
    }
  },
  {
    timestamps: true
  }
)

ScrewdriverSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;

  const newTorque =
    update?.$set?.currentTorque ??
    update?.currentTorque;

  if (newTorque == null) {
    return next();
  }

  const doc = await this.model.findOne(this.getQuery());

  if (!doc) {
    return next();
  }

  let minRecordedTorque = doc.minRecordedTorque;
  let maxRecordedTorque = doc.maxRecordedTorque;

  if (minRecordedTorque == null || newTorque < minRecordedTorque) {
    minRecordedTorque = newTorque;
  }

  if (maxRecordedTorque == null || newTorque > maxRecordedTorque) {
    maxRecordedTorque = newTorque;
  }

  update.$set = {
    ...(update.$set || {}),
    minRecordedTorque,
    maxRecordedTorque
  };

  next();
});