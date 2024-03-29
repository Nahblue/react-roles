import { z } from "zod"

export const roleIdSchema = z.object({
  id: z.string()
})

export type RoleIdSchema = z.infer<typeof roleIdSchema>