import connectDB from "@/lib/db/connectDB";
import * as repo from "./screwdrivers.repository"
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { UpdateScrewdriverDTO } from "@/infrastructure/screwdriver/screwdriver.update";
import { CreateScrewdriverDTO } from "@/infrastructure/screwdriver/screwdriver.create.dto";

export async function getScrewdrivers(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findScrewdrivers(filter, safePage, safeLimit);
}

export async function getTotalScrewdrivers(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countScrewdrivers(filter);
}

export async function getScrewdriverById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findScrewdriverById(id);
}

export async function createScrewdriver(data: CreateScrewdriverDTO) {
  await connectDB();

  try {
    return await repo.createScrewdriver(data)
  } catch (error: any) {
    throw error;
  }
}

export async function updateScrewdriver(
  id: string,
  data: UpdateScrewdriverDTO
) {
  await connectDB();
  validateObjectId(id);

  try {
    return await repo.updateScrewdriver(id, data);
  } catch (error: any) {
    throw error;
  }
}

export async function updateScrewdriverLastCalibration(
  id: string,
  lastCalibration: Date,
  currentTorque: number
) {
  await connectDB();
  validateObjectId(id);
  
  try {
    return await repo.updateScrewdriverLastCalibration(id, lastCalibration, currentTorque);
  } catch (error) {
    throw error;
  }
}

export async function deleteScrewdriver(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteScrewdriver(id);
}