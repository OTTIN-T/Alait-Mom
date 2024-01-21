import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { TablesInsert } from '~/models/database.types'
import { ProfileSchema } from '~/models/schema/profile.schema'

export default eventHandler<{ query: { id: string } }>(async (event) => {
  const client = await serverSupabaseClient<TablesInsert<'profile'>>(event)
  const user = await serverSupabaseUser(event)
  const body = await readValidatedBody(event, (body) => ProfileSchema.safeParse(body))
  if (!body.success) {
    throw body.error.issues
  }

  const { data, error } = await client.from('profile').update({ user_name: body.data.name }).eq('id', user?.id).single()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { profile: data, error }
})
