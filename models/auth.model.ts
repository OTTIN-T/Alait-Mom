import { z } from 'zod'
import type { AuthSchema, TokenOTPSchema } from './schema/auth.schema'

export enum FormTypeEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export type AuthSchemaType = z.output<typeof AuthSchema>
export type TokenSchemaType = z.output<typeof TokenOTPSchema>
