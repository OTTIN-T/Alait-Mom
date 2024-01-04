import { z } from 'zod'

interface UseAuth {
  authSchema: z.ZodObject<{
    email: z.ZodString
    captchaToken: z.ZodString
  }>
}

export const useAuth = (): UseAuth => {
  const authSchema = z.object({
    email: z.string().email('Email au mauvais format').trim(),
    captchaToken: z.string().min(1, 'Captcha invalid').trim(),
  })
  return {
    authSchema,
  }
}
