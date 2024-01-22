<template>
  <UTable :columns="columns" :rows="childrenList" :sort="sort" :loading="isLoading">
    <template #birth_date-data="{ row }">
      {{ useDateFormat(row.birth_date, 'DD-MM-YYYY HH:mm:ss').value }}
    </template>
    <template #description-data="{ row }">
      <p>
        {{ row.description === null ? 'Non renseigné' : row.description.value }}
      </p>
    </template>
    <template #size-data="{ row }">
      <span>
        {{ row.size === null ? 'Non renseigné' : `${row.size} cm` }}
      </span>
    </template>
    <template #weight-data="{ row }">
      <span>
        {{ row.weight === null ? 'Non renseigné' : `${row.weight} kg` }}
      </span>
    </template>
    <template #created_at-data="{ row }">
      <span>
        {{ useDateFormat(row.created_at, 'DD-MM-YYYY HH:mm:ss').value }}
      </span>
    </template>
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3" v-if="!isLoading">
        <span class="italic text-sm">Vous n'avez pas encore d'enfant renseigné !</span>
        <BtnAddChildren />
      </div>
    </template>
  </UTable>
</template>

<script lang="ts" setup>
import type { Tables } from '~/models/database.types';
import { Sort } from '~/models/table.model';

// CONST
const toast = useToast()
const childrenList = ref<Tables<'children'>[]>([])
const isLoading = ref<boolean>(false)
const sort = ref({
  column: 'created_at',
  direction: Sort.DESC,
})
const columns = [{
  key: 'id',
  label: 'ID',
}, {
  key: 'name',
  label: 'Nom',
  sortable: true
},
{
  key: 'birth_date',
  label: 'Date de naissance',
  sortable: true
},
{
  key: 'description',
  label: 'Description',
},
{
  key: 'gender',
  label: 'Sexe',
  sortable: true
},
{
  key: 'size',
  label: 'Taille',
  sortable: true
},
{
  key: 'weight',
  label: 'Poids',
  sortable: true
},
{
  key: 'created_at',
  label: 'Date',
  sortable: true
}]

// FUNCTIONS
async function getChildrenList(): Promise<void> {
  const { data, error, pending } = await useFetch('/api/children/list', {
    method: 'GET',
  })
  isLoading.value = pending.value
  if (data.value?.childrenList) {
    childrenList.value = data.value.childrenList.map(children => {
      return {
        ...children,
        description: {
          value: children.description,
          class: 'max-w-48 break-words',
        } as unknown as Tables<'children'>['description'],
      }
    })
  }

  if (error.value || data.value?.error) {
    toast.add({
      id: 'children_list_notification',
      title: error.value?.name ?? 'Une erreur est survenue',
      description: error.value?.message ?? String(data.value?.error),
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }
  isLoading.value = false
}

// LIFE CYCLE
onMounted(async () => {
  await nextTick()
  await getChildrenList()
})
</script>

<style lang="sass" scoped>
</style>
