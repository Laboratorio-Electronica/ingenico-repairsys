import connectDB from "@/lib/db/connectDB";
import * as repo from "./terminal-models.repository"
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateTerminalModelDTO } from "@/infrastructure/terminal-model/terminal-model.create.dto";
import { UpdateTerminalModelDTO } from "@/infrastructure/terminal-model/terminal-model.update.dto";

export async function getTerminalModels(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findTerminalModels(filter, safePage, safeLimit);
}

export async function getTotalTerminalModels(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countTerminalModels(filter);
}

export async function getTerminalModelById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findTerminalModelById(id);
}

export async function createTerminalModel(data: CreateTerminalModelDTO) {
  await connectDB();

  try {
    return await repo.createTerminalModel(data)
  } catch (error: any) {
    throw error;
  }
}

export async function updateTerminalModel(
  id: string,
  data: UpdateTerminalModelDTO
) {
  await connectDB();
  validateObjectId(id);

  try {
    return await repo.updateTerminalModel(id, data);
  } catch (error: any) {
    throw error;
  }
}

export async function deleteTerminalModel(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteTerminalModel(id);
}