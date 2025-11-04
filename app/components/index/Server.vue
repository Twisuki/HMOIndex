<script setup lang="ts">
interface ServerCard {
  title: string
  intro: string
  cover: string
  path: string
}

const { data: server } = await useAsyncData(() => {
  return queryCollection("server")
    .order("index", "ASC")
    .select(
      "title",
      "intro",
      "cover",
      "path",
    )
    .all()
})

const serverItems = computed<ServerCard[]>(() =>
  server.value as ServerCard[],
)

const currentIndex = ref(0)
const totalIndex = serverItems.value.length
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
  <BaseSection
    classname="server-container"
    :scroll="0"
  >
    <template #title>
      <i class="fa-solid fa-server" />
      我们的服务器
    </template>
    <div class="server">
      <div
        v-for="(item, index) in serverItems"
        :key="index"
        class="server-card"
        :class="{ shown: index === currentIndex }"
        :style="{
          backgroundImage: `url(${item.cover})`,
        }"
      >
        <div class="text">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="intro">
            {{ item.intro }}
          </div>
          <!-- TODO 重构轮播, 修复按钮问题 -->
          <a
            :href="item.path"
            class="button"
          >
            <span>
              详细介绍
              <i class="fa-solid fa-arrow-right" />
            </span>
          </a>
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
.server-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.server {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.server-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0;
  transition: opacity 2s ease;

  & .text {
    position: absolute;
    right: var(--padding-y);
    bottom: var(--padding-y);
    width: 30%;
    padding: var(--padding-y) var(--padding-y);
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-radius: var(--border-radius);
    background-color: var(--bg-cover);

    & .title {
      text-align: right;
      font-size: var(--title-size);
      font-weight: bold;
      color: var(--text-light);
    }

    & .intro {
      font-size: var(--font-size);
      text-indent: 2em;
      overflow-wrap: anywhere;
    }

    & .button {
      width: 50%;
      margin-left: auto;
      transform: skew(-20deg);
      border: 1px solid var(--text-light);
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

  &.shown {
    opacity: 1;
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

@media (max-width: 1024px) {
  .server-card .text {
    width: 50%;
  }
}

@media (max-width: 640px) {
  .server-card .text {
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0;
    border-radius: 0;

    & .button {
      width: 75%;
    }
  }
}

@media (max-width: 420px) {
  .server-card .text {
    width: 75%;
  }

  .line-container {
    padding-top: 0.5rem;
    gap: 0.25rem;
  }
}
</style>
