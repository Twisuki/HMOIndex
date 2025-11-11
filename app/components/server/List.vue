<script setup lang="ts">
interface ServerCard {
  title: string
  intro: string
  description: string
  date: string
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
      "date",
      "cover",
      "path",
    )
    .all()
})

const serverItems = computed<ServerCard[]>(() =>
  server.value as ServerCard[],
)

const isImgLoaded = ref<boolean[]>(
  serverItems.value?.map((_item, index) => (index <= 1)) ?? [],
)

const getServerDays = (dateStr: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(dateStr)) {
    throw new Error("格式错误!")
  }

  const date = new Date(dateStr)
  const timestamp = date.getTime()

  if (isNaN(timestamp)) throw new Error("日期不存在!")

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const todayTimestamp = today.getTime()

  const diffInMs = todayTimestamp - timestamp
  return Math.round(diffInMs / (1000 * 60 * 60 * 24))
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
                {{ item.title }}
              </div>
              <div class="intro">
                {{ item.description || item.intro }}
              </div>
              <div class="date">
                开服日期: {{ item.date || "--已不可考--" }}
                <template v-if="item.date">
                  (已开服 {{ getServerDays(item.date) }} 天)
                </template>
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
  height: 10rem;
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
    height: 100%;
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
      font-size: var(--title-size);
      color: var(--text-light);
    }

    & .intro {
      flex: 1;
      display: block;
      font-size: var(--font-size);
    }

    & .date {
      font-size: var(--font-size);
      color: var(--text-focus);
    }
  }

  &:hover {
    & .title {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .item {
    height: 8rem;
  }
}

@media (max-width: 640px) {
  .item {
    height: 6rem;
  }
}

@media (max-width: 420px) {
  .item {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
}
</style>
