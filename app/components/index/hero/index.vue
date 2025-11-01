<script setup lang="ts">
const isLoaded = ref(false)
const isDesktop = ref(false)
let mediaQuery: MediaQueryList

onMounted(() => {
  mediaQuery = window.matchMedia("(min-width: 769px)")
  isDesktop.value = mediaQuery.matches
  mediaQuery.addEventListener("change", handleMediaChange)

  isLoaded.value = true
})

onBeforeUnmount(() => {
  mediaQuery.removeEventListener("change", handleMediaChange)
})

const handleMediaChange = (e: MediaQueryListEvent) => {
  isDesktop.value = e.matches
}
</script>

<template>
  <IndexSection classname="hero-container">
    <template #default="{ scrolled }">
      <IndexHeroDesktop
        v-if="isDesktop && isLoaded"
        :scrolled
      />
      <IndexHeroTablet
        v-if="!isDesktop && isLoaded"
        :scrolled
      />
    </template>
  </IndexSection>
</template>

<style scoped>
.hero-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
