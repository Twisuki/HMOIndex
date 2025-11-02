<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection("dynamic").all())
</script>

<template>
  <div class="page">
    {{ home }}
  </div>
</template>

<style scoped>

</style>
