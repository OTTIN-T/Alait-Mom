import { serverSupabaseClient } from '#supabase/server'
import { TablesUpdate } from '~/models/database.types'
import { ProfileDeletionSchema } from '~/models/schema/profile.schema'

export default eventHandler<{ query: { id: string } }>(async (event) => {
  const client = await serverSupabaseClient<TablesUpdate<'profile'>>(event)
  const body = await readValidatedBody(event, (body) => ProfileDeletionSchema.safeParse(body))
  if (!body.success) {
    throw body.error.issues
  }

  const { data, error } = await client.rpc('delete_user')

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { profile: data, error }
})
