import { serverSupabaseClient } from '#supabase/server'
import { TablesUpdate } from '~/models/database.types'
import { ChildrenSchema } from '~/models/schema/children.schema'

export default eventHandler<{ query: { id: number } }>(async (event) => {
  const client = await serverSupabaseClient<TablesUpdate<'children'>>(event)
  const query = getQuery(event)
  const body = await readValidatedBody(event, (body) => ChildrenSchema.safeParse(body))
  if (!body.success) {
    throw body.error.issues
  }
  const { data, error } = await client.from('children').update([body.data]).eq('id', query.id).select().single()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { data, error }
})
