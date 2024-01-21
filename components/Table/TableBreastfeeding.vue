<template>
  <UTable :columns="columns" :rows="breastfeedingSlicedList" :sort="sort" :loading="isLoading" :ui="{
    td: {
      color: 'text-black dark:text-white max-w-'
    },
  }">
    <template #breast-data="{ row }">
      <span>
        {{ formatBreast[row.breast as keyof typeof formatBreast] }}
      </span>
    </template>
    <template #duration-data="{ row }">
      <span>
        {{ row.duration.substring(0, 5) }}
      </span>
    </template>
    <template #description-data="{ row }">
      <p>
        {{ row.description === null ? 'Non renseigné' : row.description.value }}
      </p>
    </template>
    <template #children-data="{ row }">
      <span>
        {{ row.children === null ? 'Non renseigné' : row.children.name }}
      </span>
    </template>
    <template #created_at-data="{ row }">
      <span>
        {{ useDateFormat(row.created_at, 'DD-MM-YYYY HH:mm:ss').value }}
      </span>
    </template>
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3" v-if="!isLoading">
        <span class="italic text-sm">Vous n'avez pas encore d'allaitement !</span>
        <BtnAddBreastfeeding />
      </div>
    </template>
  </UTable>
  <UPagination v-if="hasPagination && breastfeedingSlicedList.length" v-model="page" :page-count="pageCount"
    :total="breastfeedingList.length" class="flex mx-auto" />
</template>

<script lang="ts" setup>
import type { Breast, Breastfeeding } from '~/models/breastfeeding.model';
import { Sort } from '~/models/table.model';

interface TableBreastfeedingPropOptions {
  isAscending?: boolean;
  limit?: number;
  hasPagination?: boolean;
};
const props = withDefaults(defineProps<TableBreastfeedingPropOptions>(), {
  isAscending: false,
  limit: 10,
  hasPagination: false,
});

// CONST
const toast = useToast()
const isLoading = ref<boolean>(true)
const breastfeedingList = ref<Breastfeeding[]>([])
const columns = [{
  key: 'id',
  label: 'ID',
}, {
  key: 'breast',
  label: 'Sein',
  sortable: true
}, {
  key: 'duration',
  label: 'Durée',
  sortable: true
}, {
  key: 'description',
  label: 'Description',
}, {
  key: 'children',
  label: 'Enfant',
  sortable: true
}, {
  key: 'created_at',
  label: 'Date',
  sortable: true
}]
const sort = ref({
  column: 'created_at',
  direction: Sort.DESC,
})
const formatBreast: Record<Breast, string> = {
  'LEFT': 'Gauche',
  'RIGHT': 'Droit',
  'BOTH': 'Les deux'
}
const page = ref(1)
const pageCount = 10

// COMPUTED
const breastfeedingSlicedList = computed((): Breastfeeding[] => {
  return breastfeedingList.value.slice((page.value - 1) * pageCount, (page.value) * pageCount).map((breastfeeding: Breastfeeding) => {
    return {
      ...breastfeeding,
      description: {
        value: breastfeeding.description,
        class: 'max-w-48 break-words',
      } as unknown as Breastfeeding['description'],
    }
  })
})

// FUNCTIONS
async function getBreastfeedingList(): Promise<void> {
  const { data, error, pending } = await useFetch('/api/breastfeeding/list', {
    method: 'GET',
    query: {
      isAscending: props.isAscending,
      limit: props.limit,
    },
  })
  isLoading.value = pending.value
  if (data.value?.breastfeedingList) {
    breastfeedingList.value = data.value.breastfeedingList
  }
  if (error.value || data.value?.error) {
    toast.add({
      id: 'breastfeeding_list_notification',
      title: error.value?.name ?? 'Une erreur est survenue',
      description: error.value?.message ?? String(data.value?.error),
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 6000,
      color: 'red',
    })
  }

  isLoading.value = false
}

// LIFECYCLE
onMounted(async () => {
  await nextTick()
  await getBreastfeedingList()
})
</script>

<style lang="sass" scoped>
</style>
