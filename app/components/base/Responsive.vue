<script setup lang="ts">
interface ResponsiveProps {
  breakpoints?: 420 | 640 | 768 | 1024 | 1280 | 1536
}

const props = withDefaults(defineProps<ResponsiveProps>(), {
  breakpoints: 768,
})

const isDesktop = ref(false)
let mediaQuery: MediaQueryList

onMounted(() => {
  mediaQuery = window.matchMedia(`(min-width: ${props.breakpoints + 1}px)`)
  isDesktop.value = mediaQuery.matches
  mediaQuery.addEventListener("change", handleMediaChange)
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener("change", handleMediaChange)
})

const handleMediaChange = (e: MediaQueryListEvent) => {
  isDesktop.value = e.matches
}
</script>

<template>
  <slot
    v-if="isDesktop"
    name="desktop"
  />
  <slot
    v-else
    name="tablet"
  />
</template>
