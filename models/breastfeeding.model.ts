import { z } from 'zod'
import type { BreastfeedingSchema } from './schema/breastfeeding.schema'

export enum Breast {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BOTH = 'BOTH',
}

export enum DurationMode {
  MANUAL = 'manual',
  STOPWATCH = 'stopwatch',
}

export type BreastfeedingSchemaType = z.output<typeof BreastfeedingSchema>
