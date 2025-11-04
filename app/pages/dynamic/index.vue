<script setup lang="ts">
useHead({
  title: "动态 | HMO - Minecraft岳麓幻境社",
})
</script>

<template>
  <div class="page">
    <BaseSection classname="title-container">
      <template #title>
        社团动态
      </template>
    </BaseSection>
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

.title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
