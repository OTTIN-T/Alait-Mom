import type { TablesInsert } from '~/models/database.types'

interface UseBreastfeeding {
  createBreastfeeding: (formValue: TablesInsert<'breastfeeding'>) => Promise<TablesInsert<'breastfeeding'>[] | null>
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
  return {
    createBreastfeeding,
  }
}
