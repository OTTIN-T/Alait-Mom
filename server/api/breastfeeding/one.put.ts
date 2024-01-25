import { serverSupabaseClient } from '#supabase/server'
import { TablesUpdate } from '~/models/database.types'
import { BreastfeedingSchema } from '~/models/schema/breastfeeding.schema'

export default eventHandler<{ query: { id: number } }>(async (event) => {
  const client = await serverSupabaseClient<TablesUpdate<'breastfeeding'>>(event)
  const body = await readValidatedBody(event, (body) => BreastfeedingSchema.safeParse(body))
  const query = getQuery(event)
  if (!body.success) {
    throw body.error.issues
  }
  const { data, error } = await client.from('breastfeeding').update([body.data]).eq('id', query.id).select().single()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { data, error }
})
