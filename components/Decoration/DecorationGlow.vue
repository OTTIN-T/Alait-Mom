<template>
  <div ref="blob"
    class="blob absolute -z-10 top-0 left-0 w-[110px] h-[110px] rounded-full bg-my-secondary-300 dark:bg-my-secondary blur-3xl">
  </div>
  <div ref="fakeblob" class="fakeblob opacity-0 absolute -z-10 top-0 left-0 w-[60px] h-[60px] rounded-full"></div>
</template>

<script lang="ts" setup>
interface DecorationGlowPropOptions {
  mouseEvent: MouseEvent | undefined;
};

// CONST
const props = defineProps<DecorationGlowPropOptions>();
const blob = ref<HTMLElement>()
const fakeblob = ref<HTMLElement>()

// FUNCTIONS
function mouseMove(event: MouseEvent): void {
  if (fakeblob.value) {
    const rec = fakeblob.value.getBoundingClientRect()
    if (blob.value) {
      blob.value.animate([{
        transform: `translate(${event.clientX - rec.left - (rec.width / 2)}px,${event.clientY - rec.top - (rec.height / 2)}px)`,
      }],
        {
          duration: 300,
          fill: "forwards",
        })
    }

  }
}

// WATCHER
watch(() => props.mouseEvent, (newValue) => {
  if (newValue) {
    mouseMove(newValue)
  }
})

</script>

<style lang="sass" scoped>
</style>
