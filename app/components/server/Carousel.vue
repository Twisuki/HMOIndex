<script setup lang="ts">
interface Cover {
  cover: string
  server: string
  description: string
}

const { data: cover } = await useAsyncData(() => {
  return queryCollection("serverCover").select("list").first()
})

const { data: server } = await useAsyncData(() => {
  return queryCollection("server")
    .select(
      "name",
      "title",
    )
    .all()
})

const items = computed<Cover[]>(() =>
  cover.value?.list.map(item => ({
    cover: item.url,
    server: server.value?.find(s => s.name === item.server)?.title || "",
    description: item.description,
  })).sort(() => Math.random() - 0.5) || [],
)

const currentIndex = ref(0)
const totalIndex = items.value.length
let timer: number | null = null
const interval = 3000

const thumbnailList = computed<Cover[]>(() => {
  if (items.value.length === 0) return []

  const length = items.value.length
  const result: Cover[] = []

  for (let i = -2; i <= 2; i++) {
    const index = (currentIndex.value + i + length) % length
    if (items.value[index]) result.push(items.value[index])
  }

  return result
})

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
    <BaseImgPreloader :src="items[(currentIndex + 3) % totalIndex]?.cover" />
    <div
      class="img"
      :style="{
        backgroundImage: `url(${items[currentIndex]?.cover})`,
      }"
    >
      <div class="content">
        {{ items[currentIndex]?.server }} - {{ items[currentIndex]?.description }}
      </div>
    </div>
    <div class="thumbnail-container">
      <div
        v-for="(item, index) in thumbnailList"
        :key="index"
        :class="{ active: index === 2 }"
        class="thumbnail"
        :style="{
          backgroundImage: `url(${item.cover})`,
        }"
        @click="setIndex((currentIndex - 2 + index + totalIndex) % totalIndex)"
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
  gap: 1rem;
}

.img {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-image: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: end;
  transition: background 2s ease;

  & .content {
    width: 100%;
    background: var(--bg-cover);
    color: white;
    padding: var(--padding-y);
    box-sizing: border-box;
    font-size: var(--title-size);
    font-weight: bold;
    display: block;
  }
}

.thumbnail-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  & .thumbnail {
    aspect-ratio: 16 / 9;
    background-image: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.7);
    background-blend-mode: multiply;
    cursor: pointer;
    transition: background-image 0.5s ease;

    &.active {
      background-color: transparent;
    }
  }
}
</style>
