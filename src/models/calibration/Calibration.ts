import { Schema, model, models } from "mongoose";

const CalibrationSchema = new Schema(
  {
    technicianId: String,

    bankId: {
      type: Schema.Types.ObjectId,
      ref: "Bank",
    },

    screwdriverId: {
      type: Schema.Types.ObjectId,
      ref: "Screwdriver",
    },

    equipmentModelId: {
      type: Schema.Types.ObjectId,
      ref: "EquipmentModel",
    },

    expectedTorque: Number,

    appliedTorque: Number,

    tolerance: Number,

    status: {
      type: String,
      enum: ["OK", "NOK"],
    },

    validationImage: String,

    measurementImage: String,

    observations: String,
  },
  {
    timestamps: true,
  }
);

export default models.Calibration ||
  model("Calibration", CalibrationSchema);