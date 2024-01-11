import { z } from 'zod'

export const AuthSchema = z.object({
  email: z.string().email('Email au mauvais format').trim(),
  captchaToken: z.string().min(1, 'Captcha invalid').trim(),
})

export const TokenOTPSchema = z.array(z.number().max(9).nonnegative()).nonempty().length(6)
export type AuthSchemaType = z.output<typeof AuthSchema>
export type TokenSchemaType = z.output<typeof TokenOTPSchema>
