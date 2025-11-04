<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("dynamic").path(route.path).first()
})
</script>

<template>
  <div class="page">
    <BaseSection classname="nav-container">
      <template #title>
        <a
          href="/dynamic"
          class="nav"
        >
          <i class="fa-solid fa-arrow-left" />
          返回主页
        </a>
      </template>
    </BaseSection>

    <div
      class="cover"
      :style="{
        backgroundImage: `url(${page?.cover})`,
      }"
    />

    <div class="title">
      <i class="fa-solid fa-play" />
      {{ page?.title }}
    </div>

    <div class="info">
      <span class="date">
        <i class="fa-solid fa-calendar" />
        {{ page?.date }}
      </span>
      <span class="author">
        <i class="fa-solid fa-user" />
        {{ page?.author }}
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
  background-image: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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
}
</style>
