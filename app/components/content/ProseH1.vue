<script setup lang="ts">
defineProps<{ id?: string }>()
</script>

<template>
  <BaseSection classname="h1-container">
    <template #default="{ scrolled }">
      <h1
        :id="id"
        :class="{ scrolled }"
      >
        <slot />
      </h1>
    </template>
  </BaseSection>
</template>

<style scoped>
.h1-container {
  position: relative;
  width: 100%;
  padding: 0;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: var(--text);
  }
}

h1 {
  width: 100%;
  margin-bottom: 1rem;
  color: var(--text-light);
  transform: translateX(5%);
  opacity: 0;
  transition: all 0.3s ease;

  &.scrolled {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
