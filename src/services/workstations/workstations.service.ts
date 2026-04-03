import connectDB from "@/lib/db/connectDB";
import * as repo from './workstations.repository'
import { CreateWorkstationDTO } from "@/infrastructure/workstation/workstation.create.dto";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { SlugAlreadyExistsError } from "@/errors/domain/slug-already-exists.error";
import { UpdateWorkstationDTO } from "@/infrastructure/workstation/workstation.update.dto";

export async function getWorkstations(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findWorkstations(filter, safePage, safeLimit);
}

export async function getTotalWorkstations(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countWorkstations(filter);
}

export async function getWorkstationById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findWorkstationById(id);
}

export async function getWorkstationByCode(code: string) {
  await connectDB();
  return repo.findWorkstationByCode(code);
}

export async function createWorkstation(data: CreateWorkstationDTO) {
  await connectDB();

  try {
    return await repo.createWorkstation(data)
  } catch (error: any) {
    throw error;
  }
}

export async function updateWorkstation(
  id: string,
  data: UpdateWorkstationDTO
) {
  await connectDB();
  validateObjectId(id);

  try {
    return await repo.updateWorkstation(id, data);
  } catch (error: any) {
    throw error;
  }
}

export async function deleteWorkstation(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteWorkstation(id);
}