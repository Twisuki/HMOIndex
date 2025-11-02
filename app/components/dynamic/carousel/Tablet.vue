<script setup lang="ts">
import type { Item } from "./index.vue"

const props = defineProps<{ items: Item[] }>()

const currentIndex = ref(0)
const totalIndex = props.items.length
let timer: number | null = null
const interval = 5000

const startAutoPlay = () => {
  stopAutoPlay()

  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % totalIndex
  }, interval)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const setIndex = (index: number) => {
  if (index >= 0 && index < totalIndex) {
    stopAutoPlay()
    currentIndex.value = index
    startAutoPlay()
  }
}

onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>

<template>
  <BaseSection class="carousel-container">
    <div
      class="carousel"
      :style="{ backgroundImage: `url(${items[currentIndex]?.cover})` }"
    >
      <div class="item">
        <div class="title">
          {{ items[currentIndex]?.title }}
        </div>
        <div class="description">
          {{ items[currentIndex]?.description }}
        </div>
        <div class="date">
          {{ items[currentIndex]?.date }}
        </div>
      </div>
    </div>
    <div class="line-container">
      <div
        v-for="index in totalIndex"
        :key="index"
        class="line"
        :class="{ active: currentIndex === index - 1 }"
        @click="setIndex(index - 1)"
      />
    </div>
  </BaseSection>
</template>

<style scoped>
.carousel-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-image: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: background 2s ease;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.item {
  width: 100%;
  padding: 0 var(--padding-y);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--bg-cover);
  transition: background 2s ease;

  & .title {
    font-size: var(--title-size);
    color: var(--text-light);
  }

  & .description {
    font-size: var(--font-size);
  }

  & .date {
    font-size: 0.75rem;
    color: var(--text-focus);
  }
}

.line-container {
  width: 100%;
  display: flex;
  padding-top: 1rem;
  justify-content: center;
  gap: 0.5rem;

  & .line {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: var(--text);
    cursor: pointer;
    transition: background 0.3s ease;

    &.active {
      background: var(--text-light);
    }
  }
}

@media (max-width: 420px) {
  .line-container {
    padding-top: 0.5rem;
    gap: 0.25rem;
  }
}
</style>
