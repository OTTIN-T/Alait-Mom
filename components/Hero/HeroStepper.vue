<template>
  <section class="relative" ref="container">
    <div class="relative z-50 px-5 pt-5 mx-auto max-w-7xl md:px-10 lg:pt-16">
      <div class="relative z-50 w-full max-w-3xl mx-auto mb-16 text-center">
        <p class="uppercase text-my-accent-700 dark:text-my-accent">
          4 étapes faciles
        </p>
        <h2 class="text-2xl font-semibold md:text-4xl">
          Comment ça
          <div data-aos="flip-up" data-aos-easing="ease-in-quad">
            <div class="w-auto px-4 py-1 md:px-1 text bg-my-accent -rotate-3 md:w-1/2 md:mx-auto">
              <div class="rotate-3">
                marche
              </div>
            </div>
          </div>
        </h2>
        <p class="mx-auto mt-4 mb-8 text-my-gray-800 dark:text-my-gray-300 md:mb-12 lg:mb-16">
          Rien de plus simple Alait'Mom est une application intuitive.
        </p>
      </div>
      <DecorationHeartFloating v-for="({ pos, multiplicator }, index) in heartList" :key="index" :position="pos"
        :multiplicator="multiplicator" :container="container" class="absolute z-0" />
      <div class="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-8 lg:gap-12">
        <LazyHeroTile v-for="{ header, title, description }, index in heroTileList" :key="title" :header="header"
          :title="title" :description="description" :index="index" data-aos="zoom-in"
          :data-aos-delay="setFadeDelay(index)" data-aos-easing="ease-out-cubic" :data-aos-duration="800">
          <template #content>
            <BtnInstall v-if="header === 1" class="mx-auto rounded-md anim-install-btn"
              @mouseover="setAnim('anim-install-btn', 'over')" @mouseleave="setAnim('anim-install-btn', 'leave')" />
            <FormAuth v-if="header === 2" class="mx-auto rounded-md anim-auth-1-btn"
              @mouseover="setAnim('anim-auth-1-btn', 'over')" @mouseleave="setAnim('anim-auth-1-btn', 'leave')" />
            <FormAuth v-if="header === 3" class="mx-auto rounded-md anim-auth-2-btn"
              @mouseover="setAnim('anim-auth-2-btn', 'over')" @mouseleave="setAnim('anim-auth-2-btn', 'leave')"
              label="Connecte toi !" />
            <UButton v-if="header === 4" class="mx-auto rounded-md anim-pricing-btn"
              @mouseover="setAnim('anim-pricing-btn', 'over')" @mouseleave="setAnim('anim-pricing-btn', 'leave')"
              label="Abonne toi !" to="/pricing" size="xl" />
          </template>
        </LazyHeroTile>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// CONST
const container = ref<HTMLElement>()
const heroTileList: Array<{ header: string | number; title: string; description: string }> = [
  {
    header: 1,
    title: "Installe moi",
    description: "Alait'mom est disponible partout avec une simple installation sur vos appareils !"
  },
  {
    header: 2,
    title: "Inscris toi",
    description: "Procède à une rapide inscription avec juste ton email pour suivre ton allaitements !"
  },
  {
    header: 3,
    title: "Le suivis",
    description: "Une fois connecté tu peux choisir le sein utilisé, le jour, la durée de l'allaitements et tout retrouver dans ton dashboard !"
  },
  {
    header: 4,
    title: "Abonnement",
    description: "Les fonctionnalités principales sont gratuites, mais tu peux souscrire à un abonnement pour débloquer des fonctionnalités supplémentaires !"
  }
];
const fadeDelay: Record<number, number> = {
  0: 0,
  1: 150,
  2: 200,
  3: 250,
};
const heartList = [
  {
    pos: 'lg:-top-72 lg:left-96 md:-top-72 md:left-80 -top-72 left-5',
    multiplicator: {
      x: 30,
      y: 20
    }
  },
  {
    pos: 'lg:-top-40 lg:left-20 md:-top-40 md:left-20 -top-52 left-32',
    multiplicator: {
      x: 40,
      y: 30
    }
  },
  {
    pos: 'lg:-top-20 lg:left-[52rem] md:-top-20 md:left-96 -top-24 left-52',
    multiplicator: {
      x: 70,
      y: 40
    }
  },
]

// FUNCTIONS
function setFadeDelay(index: number): number {
  return fadeDelay[index];
}

function setAnim(className: string, mouseDirection: 'over' | 'leave'): void {
  const isOver = mouseDirection === 'over';
  const scale = isOver ? 1.1 : 1.0;
  const backgroundColor = isOver ? ["#9C4EE6", "#8558ED"] : ["#8558ED", "#9C4EE6"];

  useAnime({
    targets: `.${className}`,
    scale,
    duration: 250,
    color: "#fff",
    backgroundColor,
    loop: false,
    easing: 'easeInOutQuad'
  });
}

</script>

<style lang="sass" scoped>
</style>
