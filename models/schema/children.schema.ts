import { z } from 'zod'
import { ChildrenGender } from '../children.model'

export const ChildrenSchema = z.object({
  name: z.string().max(255).min(1),
  gender: z.nativeEnum(ChildrenGender),
  birthdate: z.string().optional(),
  size: z.number().optional(),
  weight: z.number().optional(),
  description: z.string().max(255).optional(),
})
export type ChildrenSchemaType = z.output<typeof ChildrenSchema>
