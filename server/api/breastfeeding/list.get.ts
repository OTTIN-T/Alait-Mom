import { serverSupabaseClient } from '#supabase/server'
import { Breastfeeding } from '~/models/breastfeeding.model'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = getQuery(event)
  const limit = Number(query.limit) ?? 10
  const isAscending = query.isAscending === 'true' ? true : false
  const { data, error } = await client.from('breastfeeding').select(`*, children (name)`).order('id', { ascending: isAscending }).limit(limit).returns<Breastfeeding[]>()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { breastfeedingList: data, error }
})
