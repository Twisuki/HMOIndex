<script setup lang="ts">
import type { NavbarItem } from "~/components/base/navbar/index.vue"

defineProps<NavbarItem>()
</script>

<template>
  <div class="item-container">
    <div class="item">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>

</style>
