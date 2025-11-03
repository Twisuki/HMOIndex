<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("dynamic").path(route.path).first()
})
</script>

<template>
  <div class="page">
    <template v-if="page">
      <ContentRenderer
        :value="page"
      />
    </template>
    <template v-else>
      <div class="empty-page">
        <h1>页面未找到</h1>
        <p>抱歉！您查找的内容不存在。</p>
        <NuxtLink to="/">返回首页</NuxtLink>
      </div>
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
</style>
