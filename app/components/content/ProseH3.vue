<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h3 :id="id">
    <slot />
  </h3>
</template>

<style scoped>
h3 {
  position: relative;
  color: var(--text-light);
}

h3::before {
  content: "#";
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(calc(-100% - 0.5rem));
  opacity: 0;
  transition: opacity 0.2s ease;
}

h3:hover::before {
  opacity: 1;
}
</style>
