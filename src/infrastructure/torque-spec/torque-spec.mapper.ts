import { Language } from "@/lib/i18n";
import { TorqueSpecDocument } from "@/models/torque-spec/torque-spec.document";
import { TorqueSpecListDTO } from "./torque-spec.list.dto";

export function toTorqueSpecListDTO(
  torqueSpec: TorqueSpecDocument,
  lang: Language
): TorqueSpecListDTO {
  return {
    id: torqueSpec._id.toString(),
    modelId: torqueSpec.modelId,
    torque: torqueSpec.torque,
    tolerance: torqueSpec.tolerance,
    minTorque: torqueSpec.minTorque,
    maxTorque: torqueSpec.maxTorque,
    use: torqueSpec.use[lang],
    screwType: torqueSpec.screwType,
  }
}