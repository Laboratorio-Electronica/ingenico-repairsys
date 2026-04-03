import { CreateTerminalModelDTO } from "@/infrastructure/terminal-model/terminal-model.create.dto";
import { UpdateTerminalModelDTO } from "@/infrastructure/terminal-model/terminal-model.update.dto";
import { TerminalModel } from "@/models";

export async function findTerminalModels(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return TerminalModel
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ code: 1 });
}

export async function countTerminalModels(
  filter: Record<string, unknown> = {}
) {
  return TerminalModel.countDocuments(filter);
}

export async function findTerminalModelById(id: string) {
  return TerminalModel.findById(id)
}

export async function createTerminalModel(data: CreateTerminalModelDTO) {
  return TerminalModel.create(data);
}

export async function updateTerminalModel(id: string, data: UpdateTerminalModelDTO) {
  return TerminalModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteTerminalModel(id: string) {
  return TerminalModel.findByIdAndDelete(id);
}