import { serverSupabaseClient } from '#supabase/server'
import { TablesUpdate } from '~/models/database.types'

export default eventHandler<{ query: { id: number } }>(async (event) => {
  const client = await serverSupabaseClient<TablesUpdate<'children'>>(event)
  const query = getQuery(event)
  const { data, error } = await client.from('children').delete().eq('id', query.id).select().single()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { data, error }
})
