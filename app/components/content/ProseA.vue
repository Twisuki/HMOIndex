<script setup lang="ts">
import type { PropType } from "vue"

const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String as PropType<"_blank" | "_parent" | "_self" | "_top" | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
})
</script>

<template>
  <a
    :href="props.href"
    target="_blank"
  >
    <slot />
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--text-focus);

  &:hover {
    text-decoration: underline;
  }
}
</style>
