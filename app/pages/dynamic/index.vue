<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection("dynamic").all())
</script>

<template>
  <div class="page">
    <DynamicTitle />
    <DynamicCarousel />
    <DynamicList />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 var(--padding-x);
}
</style>
