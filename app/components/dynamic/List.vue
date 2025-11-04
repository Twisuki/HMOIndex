<script setup lang="ts">
export interface Item {
  title: string
  description: string
  date: string
  author: string
  cover: string
  path: string
}

const skipedCount = 5

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
    .all()
})

const items = computed<Item[]>(() =>
  dynamic.value?.slice(skipedCount) as Item[],
)
</script>

<template>
  <div class="list">
    <BaseSection
      v-for="(item, index) in items"
      :key="index"
      card
      classname="item-container"
      :scroll="0"
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
          <div class="text">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="description">
              {{ item.description }}
            </div>
            <div class="info">
              <span class="author">
                {{ item.author }}
              </span>
              <span class="date">
                {{ item.date }}
              </span>
            </div>
          </div>
        </a>
      </template>
    </BaseSection>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--padding-y);
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
    background-image: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  & .text {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

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
    height: 4rem;
  }
}
</style>
