<template>
  <table>
    <slot />
  </table>
</template>

<style scoped>
table {
  margin: var(--padding-y) 0;
  color: var(--text-light);
  font-size: var(--font-size);
  border: 2px solid var(--text);
  border-collapse: collapse;
}
</style>
