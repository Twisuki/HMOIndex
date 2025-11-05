<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <h6 :id="id">
    <slot /> (注意: 不允许使用五级标题)
  </h6>
</template>

<style scoped>
h6 {
  position: relative;
  color: var(--text-light);
  margin: var(--padding-y) 0;

  &::before {
    content: "#";
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(calc(-100% - 0.5rem));
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }
}
</style>
