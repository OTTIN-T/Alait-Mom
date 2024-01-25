import { serverSupabaseClient } from '#supabase/server'
import { Tables } from '~/models/database.types'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Tables<'children'>[]>(event)
  const { data, error } = await client.from('children').select('*').returns<Tables<'children'>[]>()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { childrenList: data, error }
})
