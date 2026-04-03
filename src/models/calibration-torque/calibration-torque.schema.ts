import { Schema } from "mongoose";
import { ICalibrationTorque } from "./calibration-torque.interface";

export const CalibrationTorqueSchema = new Schema<ICalibrationTorque>(
  {
    technician: {
      type: String,
      required: true
    },
    workstationId: {
      type: Schema.Types.ObjectId,
      ref: "workstation",
      required: true
    },
    screwdriverId: {
      type: Schema.Types.ObjectId,
      ref: "screwdriver",
      required: true
    },
    modelId: {
      type: Schema.Types.ObjectId,
      ref: "equipmentModel",
      required: true
    },
    torqueSpecId: {
      type: Schema.Types.ObjectId,
      ref: "torqueSpec",
      required: true
    },
    expectedTorque: Number,
    appliedTorque: Number,
    tolerance: Number,
    isCorrect: Boolean,
    observations: String,
    // validationImage: String,
    // measurementImage: String
  }
)