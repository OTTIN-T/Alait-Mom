import type { Tables } from './database.types'

export enum Breast {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BOTH = 'BOTH',
}

export enum DurationMode {
  MANUAL = 'manual',
  STOPWATCH = 'stopwatch',
}

export interface Breastfeeding extends Tables<'breastfeeding'> {
  children: Pick<Tables<'children'>, 'name' | 'id'>
}
