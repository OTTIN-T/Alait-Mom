import { serverSupabaseClient } from '#supabase/server'
import { Tables, TablesInsert } from '~/models/database.types'
import { BreastfeedingSchema } from '~/models/schema/breastfeeding.schema'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Tables<'breastfeeding'>>(event)
  const body = await readValidatedBody(event, (body) => BreastfeedingSchema.safeParse(body))
  if (!body.success) {
    throw body.error.issues
  }
  const { data, error } = await client.from('breastfeeding').insert([body.data]).select().returns<TablesInsert<'breastfeeding'>[]>()

  return { data, error }
})
