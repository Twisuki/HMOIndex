<script setup lang="ts">

</script>

<template>
  <IndexSection
    classname="server-container"
    card
  >
    <template #default="{ scrolled }">
      <div class="server">
        Server Section
        <p> Scrolled: {{ scrolled }}</p>
        <p>服务器展示, 轮播形式, 每张卡片为背景图 + 简介 + 传送门.</p>
      </div>
    </template>
  </IndexSection>
</template>

<style scoped>
.server-container {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
