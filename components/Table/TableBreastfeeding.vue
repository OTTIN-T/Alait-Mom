<template>
  <UTable :columns="columns" :rows="rows" :sort="sort" :loading="isLoading" :ui="{
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
      <span>
        {{ row.description === null ? 'Non renseigné' : row.description }}
      </span>
    </template>
    <template #children_id-data="{ row }">
      <span>
        {{ row.children_id === null ? 'Non renseigné' : row.children_id }}
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
  <UPagination v-if="hasPagination" v-model="page" :page-count="pageCount" :total="breastfeedingList.length"
    class="flex mx-auto" />
</template>

<script lang="ts" setup>
import type { Breast } from '~/models/breastfeeding.model';
import type { Tables } from '~/models/database.types';
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
const { getBreastfeedingList } = useBreastfeeding()
const isLoading = ref<boolean>(true)
const breastfeedingList = ref<(Tables<'breastfeeding'>)[]>([])
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
  key: 'children_id',
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
const rows = computed((): Tables<'breastfeeding'>[] => {
  return breastfeedingList.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

// FUNCTIONS
async function initBreastfeedingList(): Promise<void> {
  isLoading.value = true
  const result = await getBreastfeedingList(props.isAscending, props.limit)
  if (result) {
    breastfeedingList.value = result
  }
  isLoading.value = false
}

// LIFECYCLE
onMounted(async () => {
  await nextTick()
  await initBreastfeedingList()
})
</script>

<style lang="sass" scoped>
</style>
