import connectDB from "@/lib/db/connectDB";
import * as repo from "./calibration-torque.repository"
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateCalibrationTorqueDB, CreateCalibrationTorqueDTO } from "@/infrastructure/calibration-torque/calibration-torque.create.dto";
import { UpdateCalibrationTorqueDTO } from "@/infrastructure/calibration-torque/calibration-torque.update.dto";
import { getScrewdriverById, updateScrewdriverLastCalibration } from "../screwdrivers/screwdrivers.service";
import { getWorkstationById } from "../workstations/workstations.service";
import { getUserById } from "../users/users.service";
import { getTerminalModelById } from "../terminal-models/terminal-models.service";

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
//     const calibration = await repo.createCalibrationTorque(data);

//     await updateScrewdriverLastCalibration(
//       data.screwdriverId.toString(),
//       new Date(), // 🔥 por ahora uso la local, pero ideal sería retornar la fecha real de creación desde el repo
//       data.appliedTorque
//     );

//     return calibration;

//   } catch (error: any) {
//     throw error;
//   }
// }
export async function createCalibrationTorque(data: CreateCalibrationTorqueDTO) {
  await connectDB();

  try {
    // 🔥 CÁLCULO (no rompe tu flujo)
    const diff = data.appliedTorque - data.expectedTorque;

    const diffPercentage =
      data.expectedTorque !== 0
        ? (diff / data.expectedTorque) * 100
        : 0;

    // 🔥 VALIDACIÓN BÁSICA (ligera)
    if (data.appliedTorque == null || data.expectedTorque == null) {
      throw new Error("Torque inválido");
    }

    // 🔥 SNAPSHOT (solo si quieres, opcional)
    let screwdriverSnapshot = undefined;
    let workstationSnapshot = undefined;
    let technicianSnapshot = undefined;
    let modelSnapshot = undefined;

    try {
      const [screwdriver, workstation, technician, model] = await Promise.all([
        getScrewdriverById?.(data.screwdriverId.toString()),
        getWorkstationById?.(data.workstationId.toString()),
        getUserById?.(data.technicianId.toString()),
        getTerminalModelById?.(data.modelId.toString()),
      ]);

      if (screwdriver) {
        screwdriverSnapshot = {
          serialNumber: screwdriver.serialNumber,
          model: screwdriver.model,
        };
      }

      if (workstation) {
        workstationSnapshot = {
          code: workstation.code,
        };
      }

      if (technician) {
        technicianSnapshot = {
          username: technician.username,
        };
      }

      if (model) {
        modelSnapshot = {
          code: model.code,
        };
      }

    } catch {
      // 👉 si falla snapshot, NO rompas el flujo
    }

    const calibration = await repo.createCalibrationTorque({
      ...data,

      // 🔥 NUEVO
      diff,
      diffPercentage,

      // 🔥 SNAPSHOT (solo si existe)
      ...(screwdriverSnapshot && { screwdriverSnapshot }),
      ...(workstationSnapshot && { workstationSnapshot }),
      ...(technicianSnapshot && { technicianSnapshot }),
      ...(modelSnapshot && { modelSnapshot }),
    });

    await updateScrewdriverLastCalibration(
      data.screwdriverId.toString(),
      new Date(),
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