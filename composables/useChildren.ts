import type { Tables } from '~/models/database.types'

interface UseChildren {
  getChildrenList: () => Promise<Tables<'children'>[] | null>
}

export const useChildren = (): UseChildren => {
  const client = useSupabaseClient<Tables<'children'>>()

  async function getChildrenList(): Promise<Tables<'children'>[] | null> {
    const { data: children, error: childrenError } = await useAsyncData('children', async () => {
      const { data, error } = await client.from('children').select('*').returns<Tables<'children'>[]>()
      if (error) throw error
      return data
    })
    if (childrenError.value) throw childrenError.value
    return children.value
  }

  return {
    getChildrenList,
  }
}
