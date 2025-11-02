<script setup lang="ts">
const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true
})
</script>

<template>
  <div class="app">
    <BaseBackground />

    <div
      v-show="isLoaded"
      class="container"
    >
      <BaseNavbar />
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  width: 100%;
  min-height: 100vh;
  color: var(--text);
}

.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

.content {
  flex: 1;
  position: relative;
  width: var(--max-width);
  padding-top: var(--padding-y);
}
</style>
