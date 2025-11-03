<template>
  <th>
    <slot />
  </th>
</template>

<style scoped>
th {
  padding: calc(var(--padding-y) / 2) var(--padding-y);
}
</style>
