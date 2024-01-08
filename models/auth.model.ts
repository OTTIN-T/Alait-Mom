import { z } from 'zod'
import { useAuth } from '~/composables/useAuth'

const { authSchema, tokenOTPSchema } = useAuth()

export enum FormTypeEnum {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export type AuthSchemaType = z.output<typeof authSchema>
export type TokenSchemaType = z.output<typeof tokenOTPSchema>
