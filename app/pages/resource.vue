<script setup lang="ts">
useHead({
  title: "资源 | HMO - Minecraft岳麓幻境社",
})
</script>

<template>
  <div class="page">
    <BaseSection classname="title-container">
      <template #title>
        资源下载
      </template>
    </BaseSection>
    <BaseSection classname="body-container">
      <div class="content">
        <span>
          社团网盘搭建中
        </span>
        <span>
          敬请期待
        </span>
      </div>
    </BaseSection>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 var(--padding-x);
}

.title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.body-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    width: 100%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: var(--title-size);
    color: var(--text-light);
  }
}
</style>
