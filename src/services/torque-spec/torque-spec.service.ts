import connectDB from "@/lib/db/connectDB";
import * as repo from './torque-spec.repository'
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateTorqueSpecDTO } from "@/infrastructure/torque-spec/torque-spec.create.dto";
import { UpdateTorqueSpecDTO } from "@/infrastructure/torque-spec/torque-spec.update.dto";

export async function getTorqueSpecs(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findTorqueSpecs(filter, safePage, safeLimit);
}

export async function getTotalTorqueSpecs(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countTorqueSpecs(filter);
}

export async function getTorqueSpecById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findTorqueSpecById(id);
}

export async function createTorqueSpec(data: CreateTorqueSpecDTO) {
  await connectDB();

  try {
    return await repo.createTorqueSpec(data)
  } catch (error: any) {
    throw error;
  }
}

export async function updateTorqueSpec(
  id: string,
  data: UpdateTorqueSpecDTO
) {
  await connectDB();
  validateObjectId(id);

  try {
    return await repo.updateTorqueSpec(id, data);
  } catch (error: any) {
    throw error;
  }
}

export async function deleteTorqueSpec(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteTorqueSpec(id);
}