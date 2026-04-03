import { Language } from "@/lib/i18n";
import { WorkstationDocument } from "@/models/workstation/workstation.document";
import { WorkstationListDTO } from "./workstation.list.dto";
import { WorkstationDetailDTO } from "./workstation.detail.dto";

export function toWorkstationListDTO(
  workstation: WorkstationDocument,
  lang: Language
): WorkstationListDTO {
  return {
    id: workstation._id.toString(),
    code: workstation.code,
    name: workstation.content[lang].name,
  }
}

export function toWorkstationDetailDTO(
  workstation: WorkstationDocument,
  lang: Language
): WorkstationDetailDTO {
  return {
    id: workstation._id.toString(),
    code: workstation.code,
    name: workstation.content[lang].name,
    description: workstation.content[lang].description,
    area: workstation.area,
    status: workstation.status
  }
}