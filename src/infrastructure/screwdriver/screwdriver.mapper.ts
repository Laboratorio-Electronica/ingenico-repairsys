import { Language } from "@/lib/i18n"
import { ScrewdriverDocument } from "@/models/screwdriver/screwdriver.document"
import { ScrewdriverListDTO } from "./screwdriver.list.dto"
import { ScrewdriverDetailDTO } from "./screwdriver.detail.dto"

export function toScrewdriverListDTO(
  screwdriver: ScrewdriverDocument
): ScrewdriverListDTO {
  return {
    id: screwdriver._id.toString(),
    serialNumber: screwdriver.serialNumber,
    model: screwdriver.model,
    brand: screwdriver.brand,
    workstationId: screwdriver.workstationId,
    toolType: screwdriver.toolType,
    lastCalibration: screwdriver.lastCalibration,
    currentTorque: screwdriver.currentTorque,
  }
}

export function toScrewdriverDetailDTO(
  screwdriver: ScrewdriverDocument
): ScrewdriverDetailDTO {
  return {
    id: screwdriver._id.toString(),
    serialNumber: screwdriver.serialNumber,
    model: screwdriver.model,
    brand: screwdriver.brand,
    workstationId: screwdriver.workstationId,
    status: screwdriver.status,
    lastCalibration: screwdriver.lastCalibration,
    currentTorque: screwdriver.currentTorque,
    maxRecordedTorque: screwdriver.maxRecordedTorque,
    minRecordedTorque: screwdriver.minRecordedTorque,
    toolType: screwdriver.toolType,
  }
}