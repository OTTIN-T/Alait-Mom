import { serverSupabaseClient } from '#supabase/server'
import { Breastfeeding } from '~/models/breastfeeding.model'
import { Tables } from '~/models/database.types'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Tables<'breastfeeding'>[]>(event)
  const query = getQuery(event)
  const limit = Number(query.limit) ?? 10
  const isAscending = query.isAscending === 'true' ? true : false
  const { data, error } = await client.from('breastfeeding').select(`*, children (name, id)`).order('id', { ascending: isAscending }).limit(limit).returns<Breastfeeding[]>()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { breastfeedingList: data, error }
})
