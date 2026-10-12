<script setup lang="ts">
import { od } from "@xtwis/ohday"

interface ServerCard {
  title: string
  intro: string
  description: string
  start: string
  end: string | null
  cover: string
  path: string
}

const { data: server } = await useAsyncData(() => {
  return queryCollection("server")
    .order("index", "ASC")
    .select(
      "title",
      "intro",
      "description",
      "start",
      "end",
      "cover",
      "path",
    )
    .all()
})

const serverItems = computed<ServerCard[]>(() => {
  const items = (server.value as ServerCard[]) ?? []
  // 已关服 (end 有值) 沉到列表末尾, 其余保持原 index 顺序
  return [...items].sort((a, b) => {
    const aClosed = a.end != null
    const bClosed = b.end != null
    if (aClosed === bClosed) return 0
    return aClosed ? 1 : -1
  })
})

const isImgLoaded = ref<boolean[]>(
  serverItems.value?.map((_item, index) => (index <= 1)) ?? [],
)

const getServerDays = (dateStr: string, asOf?: string) => {
  const from = od(dateStr).cs("d")
  const ref = (asOf !== undefined ? od(asOf) : od()).cs("d")
  return ref.diff(from, "d")
}

const getServerDateMsg = (item: ServerCard) => {
  if (!item.start) return ""
  if (item.end) {
    return `(开服 ${getServerDays(item.start, item.end)} 天, 已完结 ${getServerDays(item.end)} 天)`
  }
  return `(已开服 ${getServerDays(item.start)} 天)`
}

const handleScrolled = (scrlled: boolean, index: number) => {
  if (scrlled) {
    if (isImgLoaded.value[index + 2] !== undefined) {
      isImgLoaded.value[index + 2] = true
    }
  }
}
</script>

<template>
  <BaseSection
    classname="list-container"
    :scroll="0"
  >
    <template #title>
      <span class="title">
        服务器列表
      </span>
    </template>

    <div class="list">
      <BaseSection
        v-for="(item, index) in serverItems"
        :key="index"
        classname="item-container"
        card
        :scroll="0"
        @update:scrolled="scrolled => handleScrolled(scrolled, index)"
      >
        <template #default="{ scrolled }">
          <a
            class="item"
            :href="item.path"
            :class="{ scrolled }"
          >
            <img
              :src="isImgLoaded[index] ? item.cover : ''"
              :alt="item.title"
              class="cover"
            >
            <div class="content">
              <div class="title">
                <span class="title-text">{{ item.title }}</span>
                <span
                  v-if="item.end"
                  class="closed-pill"
                >已完结</span>
              </div>
              <div class="intro">
                {{ item.description || item.intro }}
              </div>
              <div class="date">
                <div class="date-line">
                  开服日期: {{ item.start || "--已不可考--" }} {{ getServerDateMsg(item) }}
                </div>
                <div
                  v-if="item.end"
                  class="date-line"
                >
                  完结日期: {{ item.end }}
                </div>
              </div>
            </div>
          </a>
        </template>
      </BaseSection>
    </div>
  </BaseSection>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--padding-y);
  margin: var(--padding-y) 0;
  overflow-x: hidden;
}

.item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: var(--padding-y) var(--padding-y);
}

.item {
  width: 100%;
  display: flex;
  gap: var(--padding-y);
  text-decoration: none;
  color: var(--text);
  transform: translateX(50%);
  opacity: 0;
  transition: all 0.5s ease;

  &.scrolled {
    transform: translateX(0%);
    opacity: 1;
  }

  & .cover {
    height: 10rem;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center;
  }

  & .content {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--title-size);
      color: var(--text-light);
    }

    & .closed-pill {
      padding: 0.1rem 0.6rem;
      border-radius: 999px;
      background: var(--bg-decoration);
      color: var(--bg);
      font-size: calc(var(--font-size) * 0.85);
      font-weight: bold;
      white-space: nowrap;
    }

    & .intro {
      flex: 1;
      display: block;
      font-size: var(--font-size);
    }

    & .date {
      font-size: var(--font-size);
      color: var(--text-focus);
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
    }
  }

  &:hover {
    & .title-text {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .item .cover {
    height: 8rem;
  }
}

@media (max-width: 640px) {
  .item .cover {
    height: 6rem;
  }
}

@media (max-width: 420px) {
  .item {
    flex-direction: column;
    width: 100%;
    height: auto;

    & .cover {
      width: 100%;
      height: auto;
    }
  }
}
</style>
