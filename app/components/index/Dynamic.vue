<script setup lang="ts">

</script>

<template>
  <BaseSection
    classname="dynamic-container"
    card
  >
    <template #default="{ scrolled }">
      <div class="dynamic">
        Dynamic Section
        <p> Scrolled: {{ scrolled }}</p>
        <p>同步 DYNAMIC 页面信息. 第一部分为轮播, 第二部分为列表 + 传送门.</p>
      </div>
    </template>
  </BaseSection>
</template>

<style scoped>
.dynamic-container {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
