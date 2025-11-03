<script setup lang="ts">
defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div class="pre-container">
    <div class="header">
      <div class="filename">
        {{ filename ?? "" }}
      </div>
      <div class="language">
        {{ language ?? "" }}
      </div>
    </div>
    <div class="content">
      <pre :class="$props.class">
    <slot />
  </pre>
    </div>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
