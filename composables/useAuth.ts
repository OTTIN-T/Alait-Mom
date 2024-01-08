import { z } from 'zod'

interface UseAuth {
  authSchema: z.ZodObject<{
    email: z.ZodString
    captchaToken: z.ZodString
  }>
  tokenOTPSchema: z.ZodArray<z.ZodNumber, 'atleastone'>
}

export const useAuth = (): UseAuth => {
  const authSchema = z.object({
    email: z.string().email('Email au mauvais format').trim(),
    captchaToken: z.string().min(1, 'Captcha invalid').trim(),
  })

  const tokenOTPSchema = z.array(z.number().max(9).nonnegative()).nonempty().length(6)
  return {
    authSchema,
    tokenOTPSchema,
  }
}
