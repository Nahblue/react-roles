import { z } from "zod"

export const roleSchema = z.object({
  id: z.string(),
  newDescription: z.string()
})

export type RolesSchema = z.infer<typeof roleSchema>