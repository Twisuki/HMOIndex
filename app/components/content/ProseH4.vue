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

@media (max-width: 640px) {
  h4::before {
    display: none;
  }
}
</style>
