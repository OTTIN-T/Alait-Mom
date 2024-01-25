import { serverSupabaseClient } from '#supabase/server'
import { Tables } from '~/models/database.types'

export default eventHandler<{ query: { id: number } }>(async (event) => {
  const client = await serverSupabaseClient<Tables<'children'>>(event)
  const query = getQuery(event)
  const { data, error } = await client.from('children').select('*').eq('id', query.id).single()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { children: data, error }
})
