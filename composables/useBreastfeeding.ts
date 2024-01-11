import type { Tables, TablesInsert } from '~/models/database.types'

interface UseBreastfeeding {
  createBreastfeeding: (formValue: TablesInsert<'breastfeeding'>) => Promise<TablesInsert<'breastfeeding'>[] | null>
  getBreastfeedingList: (isAscending?: boolean, limit?: number) => Promise<Tables<'breastfeeding'>[] | null>
}

export const useBreastfeeding = (): UseBreastfeeding => {
  const client = useSupabaseClient<TablesInsert<'breastfeeding'>>()

  async function createBreastfeeding(formValue: TablesInsert<'breastfeeding'>): Promise<TablesInsert<'breastfeeding'>[] | null> {
    const { data: breastfeeding, error: breastfeedingError } = await useAsyncData('breastfeeding', async () => {
      const { data, error } = await client.from('breastfeeding').insert([formValue]).select().returns<TablesInsert<'breastfeeding'>[]>()
      if (error) throw error
      return data
    })
    if (breastfeedingError.value) throw breastfeedingError.value
    return breastfeeding.value
  }

  async function getBreastfeedingList(isAscending: boolean = false, limit: number = 10): Promise<Tables<'breastfeeding'>[] | null> {
    const { data: breastfeedingList, error: breastfeedingError } = await useAsyncData('breastfeeding', async () => {
      const { data, error } = await client.from('breastfeeding').select().order('created_at', { ascending: isAscending }).limit(limit).returns<Tables<'breastfeeding'>[]>()
      if (error) throw error
      return data
    })
    if (breastfeedingError.value) throw breastfeedingError.value
    return breastfeedingList.value
  }

  return {
    createBreastfeeding,
    getBreastfeedingList,
  }
}
