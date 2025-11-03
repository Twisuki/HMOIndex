<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style scoped>
blockquote {
  position: relative;
  margin: var(--padding-y) 0;
  background-color: var(--bg-light);
  padding: 1rem 1rem 1rem 2rem;
  overflow-x: auto;
  color: var(--text);
  transition: color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: 100%;
    background-color: var(--bg-light);
    transition: background-color 0.2s ease;
  }

  &:hover {
    color: var(--text-light);
  }
}
</style>
