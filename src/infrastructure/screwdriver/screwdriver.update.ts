import { CreateScrewdriverDTO, createScrewdriverSchema } from "./screwdriver.create.dto";

export const updateScrewdriverSchema = createScrewdriverSchema.partial();

export type UpdateScrewdriverDTO = {
  [K in keyof CreateScrewdriverDTO]?: Partial<CreateScrewdriverDTO[K]>;
};