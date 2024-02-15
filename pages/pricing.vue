<template>
  <NuxtLayout :name="layout">
    <template #body>
      <section>
        <h1 class="mt-32 mb-10 text-3xl font-bold text-center">Un abonnement <span class="text-my-accent">unique</span> !
        </h1>
        <CardPricing v-for="(options, index) in cardList" :index="index" :options="options"
          :class="{ 'mb-10 min-h-60': !index, 'scale-90': index }">
          <template #cta>
            <div v-if="!index">
              <UButton v-if="hasSession" icon="i-heroicons-rocket-launch-20-solid"
                class="px-3.5 py-2.5 shadow-s w-52 mx-auto flex justify-center items-center">
                Abonne toi !
              </UButton>
              <FormAuth v-if="!hasSession" class="px-3.5 py-2.5 shadow-s w-52 mx-auto flex justify-center items-center" />
            </div>
            <div v-if="index">
              <FormAuth v-if="!hasSession" class="px-3.5 py-2.5 shadow-s w-52 mx-auto flex justify-center items-center" />
            </div>
          </template>
        </CardPricing>
      </section>
    </template>
  </NuxtLayout>
</template>

<style lang="css" scoped>
</style>

<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts';
import type { PricingCard } from '~/models/pricing.model';

// CONST
const { auth } = useSupabaseClient()
const session = await auth.getSession()
const layout = ref<LayoutKey>('default')
const premiumOptions: PricingCard = {
  title: 'Premium',
  description: 'Pour débloquer l\'intégralitée des fonctionnalités de l\'application sans limitation. 🚀',
  badge: 'Meilleur choix',
  featureList: [
    'Statistiques sur vos allaitements. 👨‍🍼',
    'Possibilité d\'enregistrer un (ou plusieurs) enfant(s). 👼',
    'Statistiques liées à votre enfant (poids, taille...), pour ne rien louper de sa croissance !🌱',
    'Notifications de rappel, pour une prise de poids sur mesure ! 🔔',
  ],
  hasHeart: true,
  price: 5
}
const freeOptions: PricingCard = {
  title: 'Gratuit',
  description: 'Pour découvrir l\'application et ses fonctionnalités principales sans engagement. 🎉',
  featureList: [
    'Enregistrez vos allaitements. 🍼',
    'Dashboard pour retrouver vos allaitements. 🤱',
    'Conseils et astuces pour vous accompagner. 💡',
  ],
  hasHeart: false
}
const cardList: PricingCard[] = [premiumOptions, freeOptions]

// COMPUTED
const hasSession = computed((): boolean => !!session.data.session)

// LIFE CYCLE
onMounted(async () => {
  if (session.data.session) {
    layout.value = 'connected'
  }
})

// META
definePageMeta({
  layout: false
})
</script>
