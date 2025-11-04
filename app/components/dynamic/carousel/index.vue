<script setup lang="ts">
export interface Item {
  title: string
  description: string
  date: string
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
      "cover",
      "path",
    )
    .limit(5)
    .all()
})

const items = computed<Item[]>(() =>
  dynamic.value as Item[],
)
</script>

<template>
  <BaseSection classname="carousel-container">
    <BaseResponsive :breakpoints="640">
      <template #desktop>
        <DynamicCarouselDesktop :items />
      </template>
      <template #tablet>
        <DynamicCarouselTablet :items />
      </template>
    </BaseResponsive>
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

  & .date {
    font-size: 0.75rem;
    color: var(--text-focus);
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
