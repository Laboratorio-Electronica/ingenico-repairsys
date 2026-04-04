import { CreateCalibrationTorqueDB, CreateCalibrationTorqueDTO } from "@/infrastructure/calibration-torque/calibration-torque.create.dto";
import { UpdateCalibrationTorqueDTO } from "@/infrastructure/calibration-torque/calibration-torque.update.dto";
import { CalibrationTorque } from "@/models";

export async function findCalibrationTorques(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return CalibrationTorque
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    // .populate({
    //   path: "modelId",
    //   select: "code"
    // });
}

export async function countCalibrationTorques(
  filter: Record<string, unknown> = {}
) {
  return CalibrationTorque.countDocuments(filter);
}

export async function findCalibrationTorqueById(id: string) {
  return CalibrationTorque.findById(id)
}

export async function createCalibrationTorque(data: CreateCalibrationTorqueDB) {
  return CalibrationTorque.create(data);
}

export async function updateCalibrationTorque(id: string, data: UpdateCalibrationTorqueDTO) {
  return CalibrationTorque.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteCalibrationTorque(id: string) {
  return CalibrationTorque.findByIdAndDelete(id);
}