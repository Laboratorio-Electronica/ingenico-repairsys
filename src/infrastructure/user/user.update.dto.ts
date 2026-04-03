import { CreateUserDTO, createUserSchema } from "./user.create.dto";

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserDTO = {
  [K in keyof CreateUserDTO]?: Partial<CreateUserDTO[K]>;
};