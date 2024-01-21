import { z } from 'zod'

export const ProfileDeletionSchema = z.object({
  id: z.string().uuid(),
})

export const ProfileSchema = z.object({
  name: z.string().max(255).optional(),
  email: z.string().email().max(255).optional(),
})

export type ProfileSchemaType = z.output<typeof ProfileSchema>
