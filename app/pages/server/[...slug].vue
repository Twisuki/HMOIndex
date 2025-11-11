<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("server").path(route.path).first()
})

console.log(page.value)
</script>

<template>
  <div class="page">
    <BaseSection classname="nav-container">
      <template #title>
        <a
          href="/server"
          class="nav"
        >
          <i class="fa-solid fa-arrow-left" />
          返回主页
        </a>
      </template>
    </BaseSection>

    <img
      class="cover"
      :src="page?.cover"
      alt="cover"
    >

    <div class="title">
      <i class="fa-solid fa-play" />
      {{ page?.title }}
    </div>

    <div class="info">
      <span class="date">
        开服日期:
        <i class="fa-solid fa-calendar" />
        <span>
          {{ page?.date || "xxxx-xx-xx" }}
        </span>
      </span>
      <span class="map">
        网页地图:
        <i class="fa-solid fa-earth-americas" />
        <a
          v-if="page?.map"
          :href="`https://${page?.map}`"
          target="_blank"
        >
          {{ page?.map || "暂无" }}
        </a>
        <span v-else>暂无</span>
      </span>
    </div>

    <template v-if="page">
      <ContentRenderer
        :value="page"
      />
    </template>
    <template v-else>
      页面未找到
    </template>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 var(--padding-x) var(--padding-y);
}

.nav {
  width: 100%;
  margin-bottom: 1rem;
  color: var(--text-light);
  text-decoration: none;
  font-size: var(--title-size);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & i {
    transition: transform 0.3s ease;
  }

  &:hover i {
    transform: translateX(-2px);
  }
}

.cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
}

.title {
  font-size: calc(var(--title-size) * 1.5);
  font-weight: bold;
  color: var(--text-light);

  & i {
    font-size: calc(var(--title-size) * 1.5);
  }
}

.info {
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;

  & span {
    font-size: var(--font-size);
    color: var(--text-light);
  }

  & a {
    color: var(--text-light);
    text-decoration: underline;

    &:hover {
      color: var(--text-focus);
    }
  }
}

@media (max-width: 420px) {
  .info {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
