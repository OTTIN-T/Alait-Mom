import { serverSupabaseClient } from '#supabase/server'
import { TablesInsert } from '~/models/database.types'
import { BreastfeedingSchema } from '~/models/schema/breastfeeding.schema'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<TablesInsert<'breastfeeding'>>(event)
  const body = await readValidatedBody(event, (body) => BreastfeedingSchema.safeParse(body))
  if (!body.success) {
    throw body.error.issues
  }
  const { data, error } = await client.from('breastfeeding').insert([body.data]).select().single()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { data, error }
})
