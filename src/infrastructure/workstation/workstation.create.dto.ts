import { Area } from "@/shared/enums";
import z from "zod";

const localizedSchema = z.object({
  name: z.string().min(5),
  description: z.string().min(5),
})

type localizedDTO = {
  name: string,
  description: string,
}

export const createWorkstationSchema = z.object({
  code: z.string().min(1).max(15),
  content: z.object({
    es: localizedSchema,
    en: localizedSchema,
  }),
  area: z.enum(Area),
})

export type CreateWorkstationDTO = {
  code: string,
  content: {
    es: localizedDTO
    en: localizedDTO
  },
  area: Area,
}