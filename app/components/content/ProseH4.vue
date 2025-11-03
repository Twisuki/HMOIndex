<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h4 :id="id">
    <slot />
  </h4>
</template>

<style scoped>
h4 {
  position: relative;
  color: var(--text-light);
}

h4::before {
  content: "#";
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(calc(-100% - 0.5rem));
  opacity: 0;
  transition: opacity 0.2s ease;
}

h4:hover::before {
  opacity: 1;
}
</style>
