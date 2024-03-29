import { z } from "zod"

export const createRoleSchema = z.object({
  description: z.string().min(1, 'Informe um ID válido')
})

export type CreateRole = z.infer<typeof createRoleSchema>