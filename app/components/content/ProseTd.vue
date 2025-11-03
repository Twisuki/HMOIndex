<template>
  <td>
    <slot />
  </td>
</template>

<style scoped>
td {
  padding: calc(var(--padding-y) / 2) var(--padding-y);
}
</style>
