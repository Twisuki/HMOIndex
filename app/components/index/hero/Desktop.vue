<script setup lang="ts">
defineProps<{ scrolled: boolean }>()
</script>

<template>
  <div class="hero">
    <img
      src="/images/cover.webp"
      alt="cover"
    >
    <div
      class="content"
      :class="{ scrolled }"
    >
      <div class="title">
        HMO-Minecraft 岳麓幻境社
      </div>
      <div class="subline">
        <p>在像素世界里, 用方块搭建</p>
        <p>岳麓山下的幻境</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.hero img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.content {
  position: absolute;
  right: var(--padding-y);
  bottom: var(--padding-y);
  padding: var(--padding-y);
  border: 4px solid var(--text);
  text-align: right;

  & .title {
    font-size: var(--title-size);
    font-weight: bold;
    color: var(--text-light);
    transform: translateX(50%);
    opacity: 0;
    transition: 1s all ease;
  }

  & .subline {
    font-size: var(--font-size);
    margin-top: var(--padding-y);
    cursor: pointer;
    transform: translateX(50%);
    opacity: 0;
    transition: 1.2s all ease;
  }
}

.content.scrolled {
  & .title {
    transform: translateX(0);
    opacity: 1;
  }

  & .subline {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
