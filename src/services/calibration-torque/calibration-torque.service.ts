import connectDB from "@/lib/db/connectDB";
import * as repo from "./calibration-torque.repository"
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateCalibrationTorqueDTO } from "@/infrastructure/calibration-torque/calibration-torque.create.dto";
import { UpdateCalibrationTorqueDTO } from "@/infrastructure/calibration-torque/calibration-torque.update.dto";
import { updateScrewdriverLastCalibration } from "../screwdrivers/screwdrivers.service";

export async function getCalibrationTorques(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findCalibrationTorques(filter, safePage, safeLimit);
}

export async function getTotalCalibrationTorques(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countCalibrationTorques(filter);
}

export async function getCalibrationTorqueById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findCalibrationTorqueById(id);
}

// export async function createCalibrationTorque(data: CreateCalibrationTorqueDTO) {
//   await connectDB();

//   try {
//     await updateScrewdriverLastCalibration(data.screwdriverId.toString(), new Date(), data.appliedTorque);
//     return await repo.createCalibrationTorque(data)
//   } catch (error: any) {
//     throw error;
//   }
// }
export async function createCalibrationTorque(data: CreateCalibrationTorqueDTO) {
  await connectDB();
  // console.log(data);

  try {
    const calibration = await repo.createCalibrationTorque(data);

    await updateScrewdriverLastCalibration(
      data.screwdriverId.toString(),
      // calibration.createdAt, // 🔥 usa la real de DB
      new Date(), // 🔥 por ahora uso la local, pero ideal sería retornar la fecha real de creación desde el repo
      data.appliedTorque
    );

    return calibration;

  } catch (error: any) {
    throw error;
  }
}

export async function updateCalibrationTorque(
  id: string,
  data: UpdateCalibrationTorqueDTO
) {
  await connectDB();
  validateObjectId(id);

  try {
    return await repo.updateCalibrationTorque(id, data);
  } catch (error: any) {
    throw error;
  }
}

export async function deleteCalibrationTorque(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteCalibrationTorque(id);
}