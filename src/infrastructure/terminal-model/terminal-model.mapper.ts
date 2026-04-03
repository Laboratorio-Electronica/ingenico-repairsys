import { TerminalModelDocument } from "@/models/terminal-model/terminal-model.document";
import { TerminalModelListDTO } from "./terminal-model.list.dto";

export function toTerminalModelListDTO(
  terminalModel: TerminalModelDocument
): TerminalModelListDTO {
  return {
    id: terminalModel._id,
    code: terminalModel.code,
    technology: terminalModel.technology,
    brand: terminalModel.brand
  }
}