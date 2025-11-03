<script setup lang="ts">
const props = defineProps({
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

const isCopyed = ref(false)
const resetDelay = 500

const handleClick = () => {
  if (navigator.clipboard && props.code) {
    navigator.clipboard.writeText(props.code)
    isCopyed.value = true

    window.setTimeout(() => {
      isCopyed.value = false
    }, resetDelay)
  }
}
</script>

<template>
  <div class="pre-container">
    <div class="header">
      <div class="left">
        <span>{{ filename ? filename : (language ? language : "") }}</span>
      </div>
      <div class="right">
        <button @click="handleClick">
          <i
            v-if="!isCopyed"
            class="fa-solid fa-clipboard"
          />
          <i
            v-else
            class="fa-solid fa-clipboard-check"
          />
        </button>
      </div>
    </div>
    <div
      class="content"
      :class="$props.class"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.pre-container {
  margin: var(--padding-y) 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--bg-light);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--bg-light);
  color: var(--text-light);
  font-size: 0.875rem;

  & .left {
    font-size: var(--title-size);
  }

  & .right {
    button {
      background: none;
      border: none;
      padding: 2px;
      border-radius: 4px;
      color: var(--text);
      cursor: pointer;
      font-size: 1.2rem;

      &:hover {
        background-color: var(--bg-decoration);
      }
    }
  }
}

.content {
  padding: 0 var(--padding-y);
  white-space: pre-wrap;
}
</style>
