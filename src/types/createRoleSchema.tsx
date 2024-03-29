import { z } from "zod"

export const createRoleSchema = z.object({
  description: z.string().min(1, 'Informe um cargo com mais de 1 caractere.')
})

export type CreateRole = z.infer<typeof createRoleSchema>