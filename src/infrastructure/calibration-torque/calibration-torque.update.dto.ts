import { CreateCalibrationTorqueDTO, createCalibrationTorqueSchema } from "./calibration-torque.create.dto";

export const updateCalibrationTorqueSchema = createCalibrationTorqueSchema.partial();

export type UpdateCalibrationTorqueDTO = {
  [K in keyof CreateCalibrationTorqueDTO]?: Partial<CreateCalibrationTorqueDTO[K]>;
};