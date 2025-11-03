<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h5 :id="id">
    <slot /> (注意: 不允许使用五级标题)
  </h5>
</template>

<style scoped>
h5 {
  position: relative;
  color: var(--text-light);
}

h5::before {
  content: "#";
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(calc(-100% - 0.5rem));
  opacity: 0;
  transition: opacity 0.2s ease;
}

h5:hover::before {
  opacity: 1;
}
</style>
