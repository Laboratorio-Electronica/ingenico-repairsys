import { CreateWorkstationDTO } from "@/infrastructure/workstation/workstation.create.dto";
import { UpdateWorkstationDTO } from "@/infrastructure/workstation/workstation.update.dto";
import { Workstation } from "@/models/workstation/workstation.model";

export async function findWorkstations(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return Workstation
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ code: 1 });
}

export async function countWorkstations(
  filter: Record<string, unknown> = {}
) {
  return Workstation.countDocuments(filter);
}

export async function findWorkstationById(id: string) {
  return Workstation.findById(id)
}

export async function findWorkstationByCode(code: string) {
  return Workstation
    .findOne({ code })
}

export async function createWorkstation(data: CreateWorkstationDTO) {
  return Workstation.create(data);
}

export async function updateWorkstation(id: string, data: UpdateWorkstationDTO) {
  return Workstation.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteWorkstation(id: string) {
  return Workstation.findByIdAndDelete(id);
}