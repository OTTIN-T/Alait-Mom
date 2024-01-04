<template>
  <section class="relative">
    <div class="mx-auto max-w-7xl px-5 pt-5 md:px-10 lg:pt-16">
      <div class="mx-auto w-full max-w-3xl text-center mb-16">
        <p class="uppercase text-my-accent">
          3 étapes faciles
        </p>
        <h2 class="text-2xl font-semibold md:text-4xl">
          Comment ça <div class="px-4 md:px-1 py-1 text bg-my-accent -rotate-3 w-auto md:w-1/2 md:mx-auto">
            <div class="rotate-3">
              marche
            </div>
          </div>
        </h2>
        <p class="mx-auto mb-8 mt-4 max-w-[528px] text-my-gray-800 dark:text-my-gray-300 md:mb-12 lg:mb-16">
          Rien de plus simple Alait'Mom est une application intuitive.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-8 lg:gap-12">
        <HeroTile v-for="{ header, title, description } in heroTileList" :key="title" :header="header" :title="title"
          :description="description">
          <template #content>
            <BtnInstall v-if="header === 1" class="mx-auto" />
            <FormAuth v-if="header === 2" class="mx-auto" />
            <FormAuth v-if="header === 3" class="mx-auto" label="Connecte toi !" />
          </template>
        </HeroTile>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// CONST
const heroTileList: Array<{ header: string | number; title: string; description: string }> = [
  {
    header: 1,
    title: "Installe moi",
    description: "Alait'mom est disponible partout avec une simple installation sur vos appareils !"
  },
  {
    header: 2,
    title: "Inscris toi",
    description: "Procède à une rapide inscription pour accéder à l'ensemble des fonctionnalités !"
  },
  {
    header: 3,
    title: "Le suivis",
    description: "Une fois connecté tu peux choisir le sein utilisé, le jour, la durée de l'allaitements et tout retrouver dans ton dashboard !"
  }
];
</script>

<style lang="sass" scoped>
</style>
