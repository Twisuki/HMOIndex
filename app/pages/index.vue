<script setup lang="ts">
useHead({
  title: "首页 | HMO - Minecraft岳麓幻境社",
})
</script>

<template>
  <div class="page">
    <IndexHero />
    <IndexIntro />
    <IndexServer />
    <IndexDynamic />
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
