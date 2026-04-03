import { CreateTorqueSpecDTO } from "@/infrastructure/torque-spec/torque-spec.create.dto";
import { UpdateTorqueSpecDTO } from "@/infrastructure/torque-spec/torque-spec.update.dto";
import { TorqueSpec } from "@/models/torque-spec/torque-spec.model";

export async function findTorqueSpecs(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return TorqueSpec
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    // .populate({
    //   path: "modelId",
    //   select: "code"
    // });
}

export async function countTorqueSpecs(
  filter: Record<string, unknown> = {}
) {
  return TorqueSpec.countDocuments(filter);
}

export async function findTorqueSpecById(id: string) {
  return TorqueSpec.findById(id)
}

export async function createTorqueSpec(data: CreateTorqueSpecDTO) {
  return TorqueSpec.create(data);
}

export async function updateTorqueSpec(id: string, data: UpdateTorqueSpecDTO) {
  return TorqueSpec.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteTorqueSpec(id: string) {
  return TorqueSpec.findByIdAndDelete(id);
}