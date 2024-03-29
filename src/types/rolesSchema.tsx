import { z } from "zod"

export const roleSchema = z.object({
  id: z.string(),
  description: z.string()
})

export type RolesSchema = z.infer<typeof roleSchema>

