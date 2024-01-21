import { z } from 'zod'
import { Breast } from '../breastfeeding.model'

export const BreastfeedingSchema = z.object({
  breast: z.nativeEnum(Breast),
  duration: z.string(),
  children_id: z.number().optional(),
  children: z
    .object({
      id: z.number(),
      name: z.string().min(1),
      created_at: z.string().optional(),
      profile_id: z.string().optional(),
    })
    .optional(),
  description: z.string().trim().optional(),
})
export type BreastfeedingSchemaType = z.output<typeof BreastfeedingSchema>

export const BreastfeedingListSchema = z.object({
  isAscending: z.boolean().default(false).optional(),
  limit: z.number().nonnegative().default(10).optional(),
})
