<script setup lang="ts">
interface CarouselProps {
  interval?: number
  defaultIndex?: number
  classname?: string | string[] | Record<string, boolean>
}

const props = withDefaults(defineProps<CarouselProps>(), {
  interval: 5000,
  defaultIndex: 0,
})

const slots = useSlots()
const currentIndex = ref(props.defaultIndex)
let timer: number | null = null

const carouselItems = computed(() => {
  const slotContent = slots.default?.()
  if (!slotContent || slotContent.length === 0) return []

  const firstNode = slotContent[0]
  if (firstNode?.children && Array.isArray(firstNode.children)) {
    return firstNode.children
  }

  return slotContent
})

const totalIndex = computed(() => carouselItems.value.length)

const setIndex = (index: number) => {
  if (index >= 0 && index < totalIndex.value) {
    currentIndex.value = index
  }
}

const startAutoPlay = () => {
  if (totalIndex.value <= 1) return
  timer = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % totalIndex.value
  }, props.interval)
}

onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div
    class="carousel-container"
    :class="classname"
  >
    <div class="carousel">
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        class="carousel-item"
        :class="{ shown: currentIndex === index }"
      >
        <component
          :is="item"
        />
      </div>
    </div>
    <div class="dots">
      <div
        v-for="index in totalIndex"
        :key="index"
        class="dot"
        :class="{ active: currentIndex === index - 1 }"
        @click="setIndex(index - 1)"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 2s ease;
}

.carousel-item.shown {
  opacity: 1;
}

.dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s ease;
}

.dot.active {
  background: white;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.8);
}

@media (max-width: 640px) {
  .dots {
    bottom: 10px;
    gap: 6px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}
</style>
