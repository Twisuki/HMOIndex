<script setup lang="ts">
defineProps<{ scrolled: boolean }>()
</script>

<template>
  <div class="hero">
    <img
      src="/images/cover.webp"
      alt="cover"
      class="bg"
    >

    <div
      class="text"
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
}

.bg {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
  display: block;
}

.text {
  width: 100%;
  margin-top: var(--padding-y);
  padding: var(--padding-y);
  text-align: center;

  & .title {
    font-size: var(--title-size);
    font-weight: bold;
    color: var(--text-light);
    transform: translateY(100%);
    opacity: 0;
    transition: 1s all ease;
  }

  & .subline {
    font-size: var(--title-size);
    margin-top: var(--padding-y);
    cursor: pointer;
    transform: translateY(100%);
    opacity: 0;
    transition: 1.2s all ease;
  }
}

.text.scrolled {
  & .title {
    transform: translateY(0);
    opacity: 1;
  }

  & .subline {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
