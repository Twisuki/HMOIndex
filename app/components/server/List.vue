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
      >
        <template #default="{ scrolled }">
          <a
            class="item"
            :href="item.path"
            :class="{ scrolled }"
          >
            <div
              class="cover"
              :style="{
                backgroundImage: `url(${item.cover})`,
              }"
            />
            <div class="content">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="intro">
                {{ item.description || item.intro }}
              </div>
              <div class="date">
                开服日期: {{ item.date || "--已不可考--" }}
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

  & .cover {
    height: 100%;
    aspect-ratio: 16 / 9;
    background-image: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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
