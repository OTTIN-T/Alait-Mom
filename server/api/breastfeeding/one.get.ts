import { serverSupabaseClient } from '#supabase/server'
import { Breastfeeding } from '~/models/breastfeeding.model'
import { Tables } from '~/models/database.types'

export default eventHandler<{ query: { id: number } }>(async (event) => {
  const client = await serverSupabaseClient<Tables<'breastfeeding'>>(event)
  const query = getQuery(event)
  const { data, error } = await client.from('breastfeeding').select(`*, children (name, id)`).eq('id', query.id).single<Breastfeeding>()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { breastfeeding: data, error }
})
