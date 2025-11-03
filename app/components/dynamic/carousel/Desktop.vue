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
  <BaseSection classname="carousel-container">
    <div
      class="carousel"
      :style="{ backgroundImage: `url(${items[currentIndex]?.cover})` }"
    >
      <div class="item-container">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="item"
          :class="{ active: currentIndex === index }"
          @click="setIndex(index)"
        >
          <div class="title">
            {{ item.title }}
          </div>
          <div class="description">
            {{ item.description }}
          </div>
          <div class="info">
            <span class="date">
              {{ item.date }}
            </span>
            <a
              :href="item.path"
              class="button"
            >
              <span>
                详细信息
                <i class="fa-solid fa-arrow-right" />
              </span>
            </a>
          </div>
        </div>
      </div>
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
}

.item-container {
  width: 30%;
  height: 100%;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item {
  flex: 1;
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

  & .info {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-focus);

    & .button {
      margin-left: auto;
      transform: skew(-20deg);
      border: 1px solid var(--text-light);
      padding: 0 var(--padding-y);
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      transition: all 0.3s ease;

      & span {
        font-size: var(--font-size);
        transform: skew(20deg);
        color: var(--text-light);
      }

      &:hover {
        transform: scale(1.1) skew(-20deg);
      }
    }
  }

  &.active {
    background-color: var(--bg-decoration);
  }
}

@media (max-width: 1024px) {
  .item-container {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .item .description {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
