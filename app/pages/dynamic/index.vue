<script setup lang="ts">
useHead({
  title: "动态 | HMO - Minecraft岳麓幻境社",
})
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
