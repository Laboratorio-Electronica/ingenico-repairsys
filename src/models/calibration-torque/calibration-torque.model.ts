import mongoose from "mongoose";
import { CalibrationTorqueSchema } from "./calibration-torque.schema";

export const CalibrationTorque =
  mongoose.models.CalibrationTorque ||
  mongoose.model("CalibrationTorque", CalibrationTorqueSchema, "calibrationTorque");