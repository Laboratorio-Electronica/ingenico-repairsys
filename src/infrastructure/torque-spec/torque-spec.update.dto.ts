import { CreateTorqueSpecDTO, createTorqueSpecSchema } from "./torque-spec.create.dto";

export const updateTorqueSpecSchema = createTorqueSpecSchema.partial();

export type UpdateTorqueSpecDTO = {
  [K in keyof CreateTorqueSpecDTO]?: Partial<CreateTorqueSpecDTO[K]>;
};