import { CalibrationTorqueDocument } from "@/models/calibration-torque/calibration-torque.document";
import { CalibrationTorqueListDTO } from "./calibration-torque.list.dto";

export function toCalibrationTorqueListDTO(
  calibrationTorque: CalibrationTorqueDocument
): CalibrationTorqueListDTO {
  return {
    id: calibrationTorque._id.toString(),
    technician: calibrationTorque.technician,
    workstationId: calibrationTorque.workstationId,
    screwdriverId: calibrationTorque.screwdriverId,
    modelId: calibrationTorque.modelId,
    torqueSpecId: calibrationTorque.torqueSpecId,
    expectedTorque: calibrationTorque.expectedTorque,
    appliedTorque: calibrationTorque.appliedTorque,
    tolerance: calibrationTorque.tolerance,
    isCorrect: calibrationTorque.isCorrect,
    createdAt: calibrationTorque.createdAt,
  }
}