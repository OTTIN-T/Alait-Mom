import { serverSupabaseClient } from '#supabase/server'
import { Tables } from '~/models/database.types'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Tables<'profile'>>(event)
  const { data, error } = await client.from('profile').select('*').single<Tables<'profile'>>()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { profile: data, error }
})
