import { serverSupabaseClient } from '#supabase/server'
import { Tables, TablesInsert } from '~/models/database.types'
import { ChildrenSchema } from '~/models/schema/children.schema'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Tables<'children'>>(event)
  const body = await readValidatedBody(event, (body) => ChildrenSchema.safeParse(body))
  if (!body.success) {
    throw body.error.issues
  }
  const { data, error } = await client.from('children').insert([body.data]).select().single()

  if (error) {
    throw createError({
      status: Number(error.code),
      message: error.message,
      statusCode: 500,
    })
  }

  return { data, error }
})
