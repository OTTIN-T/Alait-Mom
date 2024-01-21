import { serverSupabaseClient } from '#supabase/server'
import { Tables } from '~/models/database.types'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data, error } = await client.from('children').select('*').returns<Tables<'children'>[]>()
  return { childrenList: data, error }
})
