import type { TablesInsert } from '~/models/database.types'

interface UseProfile {
  createProfile: () => Promise<TablesInsert<'profile'>[] | null>
  getProfile: () => Promise<TablesInsert<'profile'>[] | null>
}

export const useProfile = (): UseProfile => {
  const client = useSupabaseClient<TablesInsert<'profile'>>()

  async function getProfile(): Promise<TablesInsert<'profile'>[] | null> {
    const { data: profile, error: profileError } = await useAsyncData('profile', async () => {
      const { data, error } = await client.from('profile').select('*').returns<TablesInsert<'profile'>[]>()
      if (error) throw error
      return data
    })
    if (profileError.value) throw profileError.value
    return profile.value
  }

  async function createProfile(): Promise<TablesInsert<'profile'>[] | null> {
    const existingProfile = await getProfile()
    if (existingProfile?.length) return existingProfile

    const user = await client.auth.getUser()
    if (user.error) throw user.error

    const { data: profile, error: profileError } = await useAsyncData('profile', async () => {
      const { data, error } = await client
        .from('profile')
        .insert([{ id: user.data.user?.id }])
        .select()
        .returns<TablesInsert<'profile'>[]>()
      if (error) throw error
      return data
    })
    if (profileError.value) throw profileError.value
    return profile.value
  }

  return {
    createProfile,
    getProfile,
  }
}
