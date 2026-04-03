import { CreateWorkstationDTO, createWorkstationSchema } from "./workstation.create.dto";

export const updateWorkstationSchema = createWorkstationSchema.partial();

export type UpdateWorkstationDTO = {
  [K in keyof CreateWorkstationDTO]?: Partial<CreateWorkstationDTO[K]>;
};