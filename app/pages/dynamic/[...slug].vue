<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("dynamic").path(route.path).first()
})
</script>

<template>
  <div class="page">
    <BaseSection classname="nav-container">
      <template #default="{ scrolled }">
        <a
          href="/dynamic"
          :class="{ scrolled }"
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
  padding: 0 var(--padding-x);
}

.nav-container {
  position: relative;
  width: 100%;
  padding: 0;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: var(--text);
  }

  & a {
    width: 100%;
    margin-bottom: 1rem;
    color: var(--text-light);
    text-decoration: none;
    font-size: var(--title-size);
    transform: translateX(5%);
    opacity: 0;
    transition: all 0.3s ease;
    display: block;

    &.scrolled {
      transform: translateX(0);
      opacity: 1;
    }

    & i {
      transition: transform 0.3s ease;
    }

    &:hover i {
      transform: translateX(-2px);
    }
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
