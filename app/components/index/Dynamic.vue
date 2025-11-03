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
    .limit(5)
    .all()
})

const items = computed<Item[]>(() =>
  dynamic.value?.map(({ title, description, date, author, cover, path }) => ({
    title,
    description,
    date,
    author,
    cover,
    path,
  })) || [],
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
  >
    <div class="dynamic">
      <div
        class="carousel-container"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="carousel"
          :style="{
            backgroundImage: `url('${item.cover}')`,
          }"
          :class="{ active: currentIndex === index }"
          @click="setIndex(index)"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        />
      </div>
      <a
        class="content"
        :href="items[currentIndex]?.path"
      >
        <div class="title">
          {{ items[currentIndex]?.title }}
        </div>
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
      </a>
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
    background-image: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.7);
    background-blend-mode: multiply;
    transition: background-color 2s ease;

    &.active {
      background-color: transparent;
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
  text-decoration: none;
  color: var(--text);

  & .title {
    font-size: var(--title-size);
    color: var(--text-light);
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

  &:hover {
    & .title {
      text-decoration: underline;
    }
  }
}
</style>
