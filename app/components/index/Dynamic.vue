<script setup lang="ts">
export interface Item {
  title: string
  description: string
  date: string
  author: string
  cover: string
  path: string
}

const { data: dynamic } = await useAsyncData(() => {
  return queryCollection("dynamic")
    .order("date", "DESC")
    .order("index", "DESC")
    .select(
      "title",
      "description",
      "date",
      "author",
      "cover",
      "path",
    )
    .limit(5)
    .all()
})

const items = computed<Item[]>(() =>
  dynamic.value as Item[],
)

const currentIndex = ref(0)
const totalIndex = items.value.length
let timer: number | null = null
let hoverTimer: number | null = null
const interval = 5000
const hoverDelay = 300

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

const handleMouseEnter = (index: number) => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
  hoverTimer = window.setTimeout(() => {
    setIndex(index)
  }, hoverDelay)
}

const handleMouseLeave = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()

  if (hoverTimer) {
    clearTimeout(hoverTimer) // 组件卸载时清理悬停计时器
  }
})
</script>

<template>
  <BaseSection
    classname="dynamic-container"
    :scroll="0"
  >
    <template #title>
      <i class="fa-solid fa-play" />
      最新动态
    </template>
    <div class="dynamic">
      <div
        class="carousel-container"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="carousel"
          :class="{ active: currentIndex === index }"
          @click="setIndex(index)"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <img
            :src="item.cover"
            :alt="item.title"
          >
        </div>
      </div>
      <div class="content">
        <a
          class="title"
          :href="items[currentIndex]?.path"
        >
          {{ items[currentIndex]?.title }}
        </a>
        <div class="description">
          {{ items[currentIndex]?.description }}
        </div>
        <div class="info">
          <span class="author">
            {{ items[currentIndex]?.author }}
          </span>
          <span class="date">
            {{ items[currentIndex]?.date }}
          </span>
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<style scoped>
.dynamic-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dynamic {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.carousel-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  & .carousel {
    width: 100%;
    aspect-ratio: 16 / 9;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      filter: brightness(0.3);
      transition: filter 2s ease;
    }

    &.active img {
      filter: brightness(1);
    }
  }
}

.content {
  width: 100%;
  display: flex;
  padding: 0 var(--padding-y);
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text);

  & .title {
    text-decoration: none;
    font-size: var(--title-size);
    color: var(--text-light);

    &:hover {
      text-decoration: underline;
    }
  }

  & .description {
    flex: 1;
    display: block;
    font-size: var(--font-size);
  }

  & .info {
    display: flex;
    gap: var(--padding-y);
    font-size: var(--font-size);

    & .author:hover {
      text-decoration: underline;
    }

    & .date {
      color: var(--text-focus);
    }
  }
}
</style>
