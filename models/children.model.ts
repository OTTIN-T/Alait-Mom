import type { Tables } from './database.types'

export enum ChildrenGender {
  M = 'M',
  F = 'F',
  O = 'O',
}

export type ChildrenSelectForm = Pick<Tables<'children'>, 'id' | 'name'>
