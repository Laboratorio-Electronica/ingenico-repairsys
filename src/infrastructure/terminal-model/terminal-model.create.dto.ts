import { TerminalTechnology } from "@/shared/enums";
import z from "zod";

export const createTerminalModelSchema = z.object({
  code: z.string().min(1),
  technology: z.enum(TerminalTechnology),
})

export type CreateTerminalModelDTO = {
  code: string;
  technology: TerminalTechnology
}