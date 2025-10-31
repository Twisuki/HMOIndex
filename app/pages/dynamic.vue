<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection("content").path("/text").first())
</script>

<template>
  <div class="page">
    <ContentRenderer
      v-if="home"
      :value="home"
      tag="article"
    />
    <div v-else>
      Home not found
    </div>
  </div>
</template>

<style scoped>

</style>
