import { CreateTerminalModelDTO, createTerminalModelSchema } from "./terminal-model.create.dto";

export const updateTerminalModelSchema = createTerminalModelSchema.partial();

export type UpdateTerminalModelDTO = {
  [K in keyof CreateTerminalModelDTO]?: Partial<CreateTerminalModelDTO[K]>;
};